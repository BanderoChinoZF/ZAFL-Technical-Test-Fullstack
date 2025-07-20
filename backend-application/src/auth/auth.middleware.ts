import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "l3gasp1P@s3cR3tK3y";

interface JwtPayload {
    id: string;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not Provider Token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as any).user = { id: payload.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not Provider Token' });
  }
};
