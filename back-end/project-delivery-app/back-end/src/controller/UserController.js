const authService = require('../service/authService');
const UserService = require('../service/UserService');
const { user: UserModel } = require('../database/models/index');

const UserController = {
  getOneNoPassword: async (req, res) => {
    const { email } = req.body;
    const userCheck = await UserService.getOneNoPassword(email);
    const token = authService.createToken(userCheck);
    const user = {
      ...userCheck, token };

    res.status(200).json(user);
  },

  createUser: async (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = await UserService.createUser({ name, email, password, role });
    return res.status(201).json(newUser);
  },
  // test
  
  adminCreateUser: async (req, res) => {
    const { name, email, password, role } = req.body;
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Missing token' });
    authService.readToken(authorization);
    const newUser = await UserService.adminCreateUser({ name, email, password, role });
    return res.status(201).json(newUser);
  },

  getAllSellers: async (_req, res) => {
    const users = await UserService.getAllSellers();
    
    res.status(200).json(users);
  },
  
  loginValidate: async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Missing token' });
    const readToken = authService.readToken(authorization);
    const { body: { role } } = readToken;
    res.status(200).json({ role });
  },

  getById: async (req, res) => {
    const result = await UserModel.findByPk(req.params.id);
    res.status(200).json(result);
  },
};

module.exports = UserController;
