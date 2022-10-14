import { NextFunction, Request, Response } from 'express';

import Joi from 'joi';

const Schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { error } = Schema.validate({ username, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export default validateLogin;