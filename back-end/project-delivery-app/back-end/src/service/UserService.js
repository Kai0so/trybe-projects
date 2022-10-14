const md5 = require('md5');
const joi = require('joi');
const { user: UserModel } = require('../database/models');
const authService = require('./authService');

const UserService = {
  validateBodyLogin: async (body) => {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).messages({
      'string.empty': 'Invalid email or password.',
      'string.required': 'Email and password are required.',
      'string.min': 'password must be greater or equal to 6',
    });
    const result = await schema.validateAsync(body);
    return result;
  },

  getOneWichEmail: async (email) => {
    const user = await UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });

    return user;
  },

  getOneNoPassword: async (email) => {
    const user = await UserModel.findOne({
      where: {
        email,
      },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    return user;
  },

  createUser: async ({ name, email, password, role }) => {
    const emailExists = await UserModel.findOne({ where: { email } });

    if (emailExists !== null) {
      throw new Error('User already exists');
    }

    const newPassword = md5(password);
    const { id } = await UserModel.create({ name, email, password: newPassword, role });
    const token = authService.createToken({ name, email, role });
    return {
      id,
      name,
      email,
      role,
      token,
    };
  },

  adminCreateUser: async ({ name, email, password, role }) => {
    const emailExists = await UserModel.findOne({ where: { email } });
    const nameExists = await UserModel.findOne({ where: { name } });

    if (emailExists !== null || nameExists !== null) {
      throw new Error('User already exists');
    }

    const newPassword = md5(password);
    const { id } = await UserModel.create({ name, email, password: newPassword, role });
    return {
      id,
      name,
      email,
      role,
    };
  },

  getAllSellers: async () => {
    const user = await UserModel.findAll({
      where: {
        role: 'seller',
      },
      attributes: { exclude: ['password', 'email', 'role'] },
      raw: true,
    });

    return user;
  },
};

module.exports = UserService;