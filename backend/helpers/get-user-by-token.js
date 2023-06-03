//imports
const jwt = require('jsonwebtoken');
//Models
const User = require('../models/User');

//get user by jwt token
const getUserByToken = async (token, res) => {
  if (!token) {
    res.status(401).json({ message: 'Acesso Negado!' });
    return;
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.status(404).json({ message: 'Usuário não encontrado!' });
    return;
  }

  return user;
};

module.exports = getUserByToken;
