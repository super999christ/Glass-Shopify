import { apiClient } from "@root/constants/api";

export const searchOrders = async (keyword: string) => {
  try {
    const { data: orders } = await apiClient.get(`/api/search?keyword=${keyword}`);
    return orders;
  } catch (err) {
    console.log("Error while filtering orders: ", err);
    return [];
  }
};