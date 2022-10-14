import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, 'secretPass');
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
};

export default validateToken;