import { CryptoCoin, EarningPlan, Transaction } from './types';

export const INITIAL_COINS: CryptoCoin[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 64230.50, change24h: 2.4, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 3450.12, change24h: -1.2, icon: 'Ξ' },
  { symbol: 'SOL', name: 'Solana', price: 145.60, change24h: 5.7, icon: '◎' },
  { symbol: 'BNB', name: 'Binance Coin', price: 590.20, change24h: 0.5, icon: 'BNB' },
  { symbol: 'ADA', name: 'Cardano', price: 0.45, change24h: -0.8, icon: '₳' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', type: 'deposit', amount: 5000, currency: 'USD', date: '2023-10-24', status: 'completed' },
  { id: 'tx-2', type: 'earn', amount: 12.50, currency: 'USDT', date: '2023-10-25', status: 'completed' },
  { id: 'tx-3', type: 'withdraw', amount: 1000, currency: 'USD', date: '2023-10-26', status: 'pending' },
  { id: 'tx-4', type: 'earn', amount: 45.00, currency: 'USDT', date: '2023-10-26', status: 'completed' },
  { id: 'tx-5', type: 'transfer', amount: 0.5, currency: 'ETH', date: '2023-10-27', status: 'completed' },
  { id: 'tx-6', type: 'earn', amount: 15.20, currency: 'USDT', date: '2023-10-27', status: 'completed' },
  { id: 'tx-7', type: 'earn', amount: 14.80, currency: 'USDT', date: '2023-10-28', status: 'completed' },
  { id: 'tx-8', type: 'earn', amount: 16.50, currency: 'USDT', date: '2023-10-29', status: 'completed' },
];

export const EARNING_PLANS: EarningPlan[] = [
  { id: 'p1', name: 'Auto-Trader Alpha', apy: 12.5, minLock: 'Flexible', active: true, totalStaked: 1500 },
  { id: 'p2', name: 'BTC Staking Pool', apy: 5.2, minLock: '30 Days', active: false, totalStaked: 0 },
  { id: 'p3', name: 'DeFi Yield Aggregator', apy: 18.4, minLock: '90 Days', active: true, totalStaked: 5000 },
];