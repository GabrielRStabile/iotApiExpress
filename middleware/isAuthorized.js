const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(403).json({ error: 'Token vazio' });

  jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });

    req.userId = decoded.id;
    return next();
  });
};

module.exports = isAuthorized;
