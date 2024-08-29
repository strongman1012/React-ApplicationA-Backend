import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = verifyToken(token);
    if (decoded)
      next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};