import { apiClient } from "@root/constants/api";
import { Environment } from "@root/constants/base";
import { parseJwt } from "@root/utils/auth";

export const login = async (email: string, password: string) => {
  try {
    const { data } = await apiClient.post('/api/login', { email, password });
    localStorage.setItem(Environment.STORAGE.ACCESS_TOKEN, data.token);
    return parseJwt(data.token);
  } catch (err) {
    console.log("Error while logging in: ", err);
    return false;
  }
};