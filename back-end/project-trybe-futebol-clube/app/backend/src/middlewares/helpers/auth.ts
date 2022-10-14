import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import decodeJWT from './decodeJWT';

const auth = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const decoded = decodeJWT<jwt.JwtPayload>(token);
    if (decoded) return res.status(200).json({ role: decoded.data.role });
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default auth;
