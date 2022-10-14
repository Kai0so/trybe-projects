const { Category } = require('../database/models');

const create = async (name) => {
  const createdCategory = await Category.create({ name });
  return createdCategory;
};

const getAll = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  create,
  getAll,
};
