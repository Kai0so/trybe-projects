import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secretPass = process.env.JWT_SECRET || '';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, secretPass);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default tokenValidation;
