import { AppDataSource } from '../database/connection';
import { Merchant } from '../entities/merchant';

export const merchantService = {
  getMerchantById: async (merchantId: number) => {
    const repository = AppDataSource.getRepository(Merchant);
    try {
      const merchant = await repository.findOneBy({ id: merchantId });
      return merchant;
    } catch (err) {
      console.log(`Error while looking up merchant ${merchantId}: `, err);
      throw err;
    }
  }
};
