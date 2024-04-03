import { Environment } from "@root/constants/base";
import { isTokenValid, parseJwt } from "@root/utils/auth";
import { useState, createContext, PropsWithChildren, useEffect } from "react";

interface IUser {
  id: number;
  email: string;
}

interface IMerchant {
  id: number;
  storeName: string;
  storeUrl: string;
}

export interface IAuthContextProps {
  user?: IUser;
  setUser: (user?: IUser) => void;
  merchant?: IMerchant;
  setMerchant: (merchant?: IMerchant) => void;
}

export const AuthContext = createContext<IAuthContextProps>({
  user: undefined,
  merchant: undefined,
  setUser: () => {},
  setMerchant: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser>();
  const [merchant, setMerchant] = useState<IMerchant>();
  const [accessToken] = useState(localStorage.getItem(Environment.STORAGE.ACCESS_TOKEN) || '');

  useEffect(() => {
    if (isTokenValid(accessToken)) {
      const auth = parseJwt(accessToken);
      setUser({ id: auth.id, email: auth.email });
      setMerchant(auth.merchant);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, merchant, setUser, setMerchant }}>
      {children}
    </AuthContext.Provider>
  )
};