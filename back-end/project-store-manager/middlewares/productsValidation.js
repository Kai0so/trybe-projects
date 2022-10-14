const Joi = require('joi');
const Product = require('../services/productService');
const { errorMessage } = require('./helpers/errorMessages');
const { httpStatus, httpStatusCheck } = require('./helpers/httpStatusCode');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).max(30).required()
    .messages({
      'string.min': '"name" length must be at least 5 characters long',
      'any.required': '"name" is required',
    }),
  quantity: Joi.number().min(1).required()
    .messages({
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
});

const getProductValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await Product.getById(id);
  if (!result) return res.status(httpStatus('notFound')).json(errorMessage('notFoundProduct'));
  next();
};

const createProductValidation = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = PRODUCT.validate({ name, quantity });
  if (error) {
    const errorType = error.details[0].type;
    return res.status(httpStatusCheck(errorType)).json({ message: error.message });
  }
  const checkProduct = await Product.getAll();
  checkProduct.forEach((p) => {
    if (name === p.name) {
      next(res.status(httpStatus('conflict')).json(errorMessage('createProductConflict')));
    }
  });
  next();
};

module.exports = {
  getProductValidation,
  createProductValidation,
};