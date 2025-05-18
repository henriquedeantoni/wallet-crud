import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_JWT;

if (!secret) {
  throw new Error('SECRET_JWT must be defined.');
}

const SECRET: string = secret;

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction):void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
        res.sendStatus(403);
        return;
    }

    (req as any).user = user;
    next();
  });

};
