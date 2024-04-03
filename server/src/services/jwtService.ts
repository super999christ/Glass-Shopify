import jwt from 'jsonwebtoken';

import { Environment } from '../constants/base';

export const jwtService = {
  generateToken: (payload: any) => {
    return jwt.sign(payload, Environment.TOKEN_SECRET, { expiresIn: '3600s' });
  },
  verifyToken: async (token: string) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, Environment.TOKEN_SECRET, (err, user) => {
        if (err) {
          console.error('Failed to verify token: ', err);
          reject(err);
          return;
        }
        resolve(user);
      });
    });
  }
};
