//imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;
//models
const User = require('../models/User');
const Post = require('../models/Post');
//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const Comment = require('../models/Comment');

module.exports = class UserController {
  //FUNCTION TO REGISTER NEW USERS
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: 'Por favor, preencha o campo de nome.' });
      return;
    }
    if (!email) {
      res
        .status(422)
        .json({ message: 'Por favor, preencha o campo de email.' });
      return;
    }

    if (!password) {
      res
        .status(422)
        .json({ message: 'Por favor, preencha o campo de senha.' });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({
        message: 'Por favor, preencha o campo de confirmação de senha.',
      });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas não coincidem.' });
      return;
    }

    try {
      //check if user with email exists
      const checkUser = await User.findOne({ email: email });

      if (checkUser) {
        res.status(422).json({
          message: 'Já existe um usuário registrado com esse email.',
        });
        return;
      }

      //hashing password
      const salt = bcrypt.genSaltSync(12);
      const hashPassword = bcrypt.hashSync(password, salt);

      //creating new user
      const newUser = new User({ name, email, password: hashPassword });

      await newUser.save();

      //return JWT
      await createUserToken(newUser, req, res);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message:
          'Não foi possível criar sua conta. Por favor, tente novamente mais tarde.',
      });
      return;
    }
  }
  //FUNCTION TO SIGN IN USERS
  static async login(req, res) {
    const { email, password } = req.body;

    //validations
    if (!email) {
      res
        .status(422)
        .json({ message: 'Por favor, preencha o campo de email.' });
      return;
    }

    if (!password) {
      res
        .status(422)
        .json({ message: 'Por favor, preencha o campo de senha.' });
      return;
    }

    try {
      //check if user with email exists
      const user = await User.findOne({ email: email });

      if (!user) {
        res.status(422).json({
          message: 'Não existe um usuário registrado com esse email.',
        });
        return;
      }

      //check if password matches
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        res
          .status(422)
          .json({ message: 'Senha incorreta. Por favor, tente novamente.' });
        return;
      }

      //return JWT
      await createUserToken(user, req, res);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message:
          'Não foi possível fazer o login. Por favor, tente novamente mais tarde.',
      });
      return;
    }
  }
  //FUNCTION TO CHECK CURRENT USER
  static async checkUser(req, res) {
    let currentUser;

    const token = await getToken(req);

    if (token) {
      try {
        //validate token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!decoded) {
          res.status(401).json({ message: 'Acesso Negado!' });
          return;
        }

        //get current user data
        currentUser = await User.findOne({ _id: decoded.id }).select(
          '-password',
        );
      } catch (err) {
        res.status(401).json({ message: 'Token inválido!' });
        return;
      }
    } else {
      currentUser = null;
    }

    res.status(200).send({ currentUser });
  }

  //FUNCTION TO GET CURRENT USER BY URL PARAM
  static async getUserById(req, res) {
    const id = req.params.id;

    //check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(401).json({ message: 'ID inválido!' });
      return;
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(401).json({ message: 'Usuário não encontrado!' });
      return;
    }

    res.status(200).send(user);
  }

  //FUNCTION TO UPDATE USERS INFORMATION
  static async update(req, res) {
    //get user token
    const token = await getToken(req);
    //get current user by token
    const currentUser = await getUserByToken(token, res);
    const user = {};

    const { name, email, password, confirmpassword } = req.body;

    // adding image path
    if (req.file) {
      user.image = req.file.path;
    }

    //validations

    if (!name) {
      res.status(422).json({ message: 'Por favor, preencha o campo de nome.' });
      return;
    }

    user.name = name;

    if (!email) {
      res
        .status(422)
        .json({ message: 'Por favor, preencha o campo de email.' });
      return;
    }

    //check if email is being used
    const checkEmail = await User.findOne({ email: email });

    if (email !== currentUser.email && checkEmail) {
      res.status(422).json({
        message:
          'Desculpe, este email já está em uso. Por favor, tente outro email.',
      });
      return;
    }

    user.email = email;

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas não coincidem.' });
      return;
    } else if (password === confirmpassword && password) {
      //hashing password
      const salt = await bcrypt.genSaltSync(12);
      const passwordHash = await bcrypt.hashSync(password, salt);

      user.password = passwordHash;
    }

    try {
      // update user information
      const updatedUser = await User.findOneAndUpdate(
        { _id: currentUser.id },
        { $set: user },
        { new: true },
      );

      // update user information in posts
      await Post.updateMany(
        { 'user._id': updatedUser._id },
        {
          $set: {
            user: {
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
            },
          },
        },
      );

      // update user information in comments
      await Comment.updateMany(
        { 'user._id': updatedUser._id },
        {
          $set: {
            user: {
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              image: updatedUser.image,
            },
          },
        },
      );

      res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message:
          'Não foi possível atualizar seus dados. Por favor, tente novamente mais tarde.',
      });
      return;
    }
  }
};
