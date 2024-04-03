import Shopify from 'shopify-api-node';

import { merchantService } from './merchantService';

export const shopifyService = {
  searchOrders: async (
    merchantId: number,
    customerEmail: string,
    keyword: string
  ) => {
    try {
      const merchant = await merchantService.getMerchantById(merchantId);
      const shopify = new Shopify({
        accessToken: merchant.shopifyAccessToken,
        shopName: merchant.storeUrl.replace('.myshopify.com', '')
      });
      const customers = await shopify.customer.search({
        query: `email:${customerEmail}`
      });
      if (customers?.length > 0) {
        const customerOrders = await shopify.order.list({
          customer_id: customers[0].id
        });
        keyword = keyword.toLowerCase();
        const filteredOrders = customerOrders.filter(order => {
          return (
            String(order.order_number) === keyword ||
            order.line_items.find(
              item =>
                item.name.toLowerCase().includes(keyword) ||
                item.sku.toLowerCase().includes(keyword)
            )
          );
        });
        return filteredOrders;
      }
      console.log(`Customer doesn't exist for email ${customerEmail}`);
      return [];
    } catch (err) {
      console.log('Something went wrong: ', err);
      return [];
    }
  }
};
