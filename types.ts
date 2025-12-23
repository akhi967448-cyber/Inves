export interface CryptoCoin {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string; // URL or emoji
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'earn' | 'transfer';
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface EarningPlan {
  id: string;
  name: string;
  apy: number;
  minLock: string;
  active: boolean;
  totalStaked: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, never store plain text passwords
  isVerified: boolean;
  avatar?: string;
}

export type ViewState = 'home' | 'earn' | 'history' | 'profile';