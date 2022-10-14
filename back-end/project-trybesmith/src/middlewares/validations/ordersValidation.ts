import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import httpStatus from '../helpers/httpStatus';

const Schema = Joi.object({
  productsIds: Joi.array().min(1).required().messages({
    'array.min': '"productsIds" must include only numbers',
  }),
});

const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { productsIds } = req.body;
  const { error } = Schema.validate({ productsIds });
  if (error) {
    const data = [error];
    const [result] = JSON.parse(JSON.stringify(data));
    const { details } = result;
    const errorType = details[0].type;
    return res.status(httpStatus(errorType)).json({ message: error.message });
  }
  next();
};

export default validateOrder;