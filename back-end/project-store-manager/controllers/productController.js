const Product = require('../services/productService');
const { httpStatus } = require('../middlewares/helpers/httpStatusCode');
const { errorMessage } = require('../middlewares/helpers/errorMessages');

const getAll = async (_req, res) => {
  const products = await Product.getAll();
  res.status(httpStatus('ok')).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await Product.getById(id);
  if (!products) return res.status(httpStatus('notFound')).json(errorMessage('notFoundProduct'));
  res.status(httpStatus('ok')).json(products);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Product.create(name, quantity);
  res.status(httpStatus('created')).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await Product.update(id, name, quantity);
  res.status(httpStatus('ok')).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleted = await Product.deleteProduct(id);
  if (!deleted) return res.status(httpStatus('notFound')).json(errorMessage('notFoundProduct'));
  res.status(httpStatus('noContent')).json(deleted);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};