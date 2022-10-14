const Category = require('../services/categoryService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Category.create(name);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await Category.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getAll,
};