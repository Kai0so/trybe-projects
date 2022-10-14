const jwt = require('jsonwebtoken');

const secretPass = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, secretPass, jwtConfig);
  return token;
};

module.exports = generateJWT;
