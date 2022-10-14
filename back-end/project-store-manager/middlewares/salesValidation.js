const Joi = require('joi');
const Sale = require('../services/saleService');
const { errorMessage } = require('./helpers/errorMessages');
const { httpStatus, httpStatusCheck } = require('./helpers/httpStatusCode');

const SALE = Joi.object({
  quantity: Joi.number().min(1).required()
    .messages({
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
  productId: Joi.number().required()
    .messages({
      'any.required': '"productId" is required',
    }),
});

const getSaleValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await Sale.getById(id);
  if (result === null) {
    return res.status(httpStatus('notFound')).json(errorMessage('notFoundSale'));
  }
  next();
};

const createSaleValidation = async (req, res, next) => {
  const sales = req.body;
  sales.forEach((s) => {
    const { productId, quantity } = s;
    const { error } = SALE.validate({ productId, quantity });
    if (error) {
      const errType = error.details[0].type;
      const errMessage = error.details[0].message;
      next(res.status(httpStatusCheck(errType)).json({ message: errMessage }));
    }
  });
  next();
};

module.exports = {
  getSaleValidation,
  createSaleValidation,
};