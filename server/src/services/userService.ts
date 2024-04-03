import { AppDataSource } from '../database/connection';
import { User } from '../entities/user';
import { jwtService } from './jwtService';

export const userService = {
  authenticate: async (email: string, password: string) => {
    const repository = AppDataSource.getRepository(User);
    try {
      const user = await repository.findOne({
        where: { email, password },
        relations: ['merchant']
      });
      if (!user) {
        console.log(`User not found ${email}`);
        return false;
      }
      const accessToken = jwtService.generateToken({
        id: user.id,
        email: user.email,
        merchant: {
          id: user.merchant.id,
          storeName: user.merchant.storeName,
          storeUrl: user.merchant.storeUrl
        }
      });
      return accessToken;
    } catch (err) {
      console.log('Error while looking up a user: ', err);
      return false;
    }
  }
};
