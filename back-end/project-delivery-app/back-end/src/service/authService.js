const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = require('fs')
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const authService = {
  createToken: (body) => {
    const create = jwt.sign({ body }, jwtKey, { expiresIn: '3h' });
    return create;
  },
  readToken: (token) => {
    try {
      const vrf = jwt.verify(token, jwtKey);
      return vrf;
    } catch (error) {
      throw new Error('Token must be a valid token');
    }
  },
};

module.exports = authService;