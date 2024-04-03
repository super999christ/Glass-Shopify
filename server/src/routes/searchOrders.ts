import type { Request, Response } from 'express';

import { shopifyService } from '../services/shopifyService';

export const searchOrders = async (req: Request, res: Response) => {
  const user = req.user;
  const { keyword } = req.query;
  const orders = await shopifyService.searchOrders(
    user.merchant.id,
    user.email,
    String(keyword || '')
  );
  res.send(orders);
};
