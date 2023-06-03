//imports
var ObjectId = require('mongoose').Types.ObjectId;
//models
const Post = require('../models/Post');
const Comment = require('../models/Comment');
//helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PostController {
  //FUNCTION TO CREATE NEW COMMENT
  static async create(req, res) {
    //getting Post Id
    const postId = req.body.postId;

    //check if id is valid
    if (!ObjectId.isValid(postId)) {
      res.status(401).json({ message: 'ID de post inválido!' });
      return;
    }

    //get post by id
    const post = await Post.findById(postId);

    //check if post exists
    if (!post) {
      res.status(404).json({ message: 'Post não encontrado!' });
      return;
    }

    //get current user
    const token = getToken(req);
    const user = await getUserByToken(token, res);

    //getting comment data
    const { commentText } = req.body;

    //validations
    if (!commentText) {
      res
        .status(422)
        .json({ message: 'O comentário do post não pode ser vazio.' });
      return;
    }

    try {
      const comment = new Comment({
        commentText: commentText,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        post: {
          _id: postId,
        },
      });

      await comment.save();

      res.status(201).json({ message: 'Comentário criado com sucesso!' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Houve um erro ao criar o comentário.' });
    }
  }
  //FUNCTION TO GET ALL USER COMMENTS
  static async getUserComments(req, res) {
    //get current user
    const token = getToken(req);
    const user = await getUserByToken(token, res);

    //get comments
    const userComments = await Comment.find({ 'user._id': user._id }).sort(
      '-createdAt',
    );

    res.status(200).send(userComments);
  }

  //FUNCTION TO GET ALL COMMENTS
  static async getAllComments(req, res) {
    const comments = await Comment.find().sort('-createdAt');

    res.status(200).send(comments);
  }

  //FUNCTION TO GET ALL POST COMMENTS
  static async getPostComments(req, res) {
    //post id
    const id = req.params.id;

    //check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(401).json({ message: 'ID de post inválido!' });
      return;
    }

    //get post by id
    const post = await Post.findById(id);

    //check if post exists
    if (!post) {
      res.status(404).json({ message: 'Post não encontrado!' });
      return;
    }

    //get post comments
    const postComments = await Comment.find({ 'post._id': id }).sort(
      '-createdAt',
    );

    res.status(200).send(postComments);
  }

  //FUNCTION TO REMOVE COMMENT BY ID
  static async removeCommentById(req, res) {
    const id = req.params.id;

    //check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(401).json({ message: 'ID inválido!' });
      return;
    }

    //get post by id
    const comment = await Comment.findById(id);

    //check if post exists
    if (!comment) {
      res.status(404).json({ message: 'Comentário não encontrado!' });
      return;
    }

    //get current user
    const token = getToken(req);
    const user = await getUserByToken(token, res);

    //check if comment belongs to current user
    if (user._id.toString() !== comment.user._id.toString()) {
      res.status(403).json({
        message:
          'Você não tem permissão para acessar ou modificar este comentário.',
      });
      return;
    }

    try {
      await Comment.findByIdAndRemove(comment._id);

      res.status(200).json({
        message: 'Comentário removido com sucesso.',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Ocorreu um erro ao remover o comentário.',
      });
      return;
    }
  }

  //FUNCTION TO UPDATE COMMENT BY ID
  static async updateCommentById(req, res) {
    const id = req.params.id;

    //check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(401).json({ message: 'ID de comentário inválido!' });
      return;
    }

    //get comment by id
    const comment = await Comment.findById(id);

    //check if comment exists
    if (!comment) {
      res.status(404).json({ message: 'Comentário não encontrado!' });
      return;
    }

    //get current user
    const token = getToken(req);
    const user = await getUserByToken(token, res);

    //check if comment belong to current user
    if (user._id.toString() !== comment.user._id.toString()) {
      res.status(403).json({
        message:
          'Você não tem permissão para acessar ou modificar este comentário.',
      });
      return;
    }

    //getting request data
    const { commentText } = req.body;

    //creating new data object
    let updatedData = {};

    //validations
    if (!commentText) {
      res
        .status(422)
        .json({ message: 'O comentário do post não pode ser vazio.' });
      return;
    }

    updatedData.commentText = commentText;

    try {
      await Comment.findByIdAndUpdate(id, updatedData);

      res.status(200).json({ message: 'Comentário atualizado com sucesso!' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Houve um erro ao atualizar o comentário.' });
    }
  }
};
