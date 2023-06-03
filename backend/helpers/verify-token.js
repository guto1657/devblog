//imports
const jwt = require('jsonwebtoken');
//helpers
const getToken = require('./get-token');

module.exports = verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'ACESSO NEGADO' });
    return;
  }

  try {
    const token = getToken(req);

    if (!token) {
      res.status(401).json({ message: 'ACESSO NEGADO' });
      return;
    }

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;

    // Add the username to the request object
    req.username = verified.name;

    next();
  } catch (err) {
    res.status(400).json({ message: 'TOKEN INVÁLIDO' });
    return;
  }
};
