const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'secret-code');
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
