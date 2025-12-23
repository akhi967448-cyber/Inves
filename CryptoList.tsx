import React from 'react';
import { CryptoCoin } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoListProps {
  coins: CryptoCoin[];
}

const CryptoList: React.FC<CryptoListProps> = ({ coins }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-1 px-1">
        <h3 className="text-xl font-bold text-white">Live Market</h3>
        <span className="text-sm text-slate-400 flex items-center gap-2 font-medium">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          Live Updates
        </span>
      </div>
      
      {coins.map((coin) => (
        <div key={coin.symbol} className="glass-panel p-5 rounded-2xl flex justify-between items-center hover:bg-slate-800 transition-colors cursor-pointer border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl shadow-md border border-slate-600">
              {coin.icon}
            </div>
            <div>
              <p className="font-bold text-white text-lg">{coin.name}</p>
              <p className="text-sm text-slate-400 font-medium">{coin.symbol}/USD</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono font-bold text-white text-lg">
              ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-sm font-semibold flex items-center justify-end gap-1 mt-1 ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(coin.change24h).toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;