//imports
const jwt = require('jsonwebtoken');

module.exports = createUserToken = async (newUser, req, res) => {
  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
    },
    process.env.TOKEN_SECRET,
  );

  res.status(201).json({
    token,
    userId: newUser._id,
    message: 'Usuário Autenticado!',
  });
};
