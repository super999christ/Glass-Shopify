export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
      };
      merchant: {
        id: number;
        storeName: string;
        storeUrl: string;
      };
    }
  }
}