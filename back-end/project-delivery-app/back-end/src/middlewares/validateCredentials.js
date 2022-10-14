const md5 = require('md5');
const UserService = require('../service/UserService');

const validateCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const body = { email, password };
  const validate = await UserService.validateBodyLogin(body);

  const credentials = await UserService.getOneWichEmail(validate.email);

  if (!credentials) {
    throw new Error('Invalid email');
  }

  if (credentials.email !== email || credentials.password !== md5(password)) {
    throw new Error('Invalid password');
  }

  next();
};

module.exports = validateCredentials;
