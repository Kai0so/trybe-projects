const User = require('../services/userService');
const generateJWT = require('../middlewares/helpers/generateJWT');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createdUser = await User.create(displayName, email, password, image);
    const token = generateJWT(createdUser);
    res.status(201).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await User.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.getById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
