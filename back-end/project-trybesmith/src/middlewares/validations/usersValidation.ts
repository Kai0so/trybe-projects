import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import httpStatus from '../helpers/httpStatus';

const Schema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),

});

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, classe, level, password } = req.body;
  const { error } = Schema.validate({ username, classe, level, password });
  if (error) {
    const data = [error];
    const [result] = JSON.parse(JSON.stringify(data));
    const { details } = result;
    const errorType = details[0].type;
    return res.status(httpStatus(errorType)).json({ message: error.message });
  }
  next();
};

export default validateUser;