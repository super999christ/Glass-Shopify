import type { NextFunction, Request, Response } from 'express';

import { jwtService } from '../services/jwtService';
import { userService } from '../services/userService';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'Unauthorized attempt to login' });
    return;
  }

  try {
    const userPayload: any = await jwtService.verifyToken(token);
    req.user = userPayload;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Invalid access token' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authResult = await userService.authenticate(email, password);
  if (authResult) {
    const token = authResult;
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Unauthorized attempt to login' });
  }
};
