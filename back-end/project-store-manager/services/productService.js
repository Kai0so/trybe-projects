const Product = require('../models/productModel');

const getAll = async () => {
  const products = await Product.getAll();
  return products;
};

const getById = async (id) => {
  const [products] = await Product.getById(id);
  return products;
};

const create = async (name, quantity) => {
  const newProduct = await Product.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const updatedProduct = await Product.update(id, name, quantity);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const products = await Product.getById(id);
  if (!products) return false;
  const deletedProduct = await Product.deleteProduct(id);
  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};