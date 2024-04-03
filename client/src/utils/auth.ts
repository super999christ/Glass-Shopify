import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return false;
    }
    const expirationTimeInSeconds = decoded.exp;
    const currentDateInSeconds = new Date().getTime() / 1000;
    return currentDateInSeconds <= expirationTimeInSeconds;
  } catch (err) {
    console.log("Token validation error: ", err);
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
  if (window.location.pathname !== '/' && window.location.pathname !== '/login')
    window.location.href = '/';
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};