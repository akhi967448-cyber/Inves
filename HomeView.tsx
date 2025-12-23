import React, { useState } from 'react';
import { CryptoCoin } from '../types';
import CryptoList from './CryptoList';
import ChartWidget from './ChartWidget';
import ActionModal from './ActionModal';
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Zap } from 'lucide-react';

interface HomeViewProps {
  coins: CryptoCoin[];
  balance: number;
  totalEarnings: number;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number, address: string) => void;
  onProfileClick: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ coins, balance, totalEarnings, onDeposit, onWithdraw, onProfileClick, showToast }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw'>('deposit');

  const openModal = (type: 'deposit' | 'withdraw') => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleConfirmAction = (amount: number, address?: string) => {
    if (modalType === 'deposit') {
      onDeposit(amount);
    } else if (modalType === 'withdraw' && address) {
      onWithdraw(amount, address);
    }
  };

  return (
    <div className="space-y-6 pb-28 animate-fade-in relative">
      <ActionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType} 
        onConfirm={handleConfirmAction}
        balance={balance}
        showToast={showToast}
      />

      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Investor AI
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Welcome back, User</p>
        </div>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border-2 border-white/20 shadow-lg active:scale-95 transition-transform flex items-center justify-center overflow-hidden"
        >
          <span className="text-white font-bold text-sm">U</span>
        </button>
      </div>

      {/* Main Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 shadow-2xl border border-slate-700">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 text-slate-300 font-medium">
            <span className="text-sm">Total Balance (USD)</span>
            <button onClick={() => setShowBalance(!showBalance)} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
              {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
            {showBalance ? `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••••'}
          </h2>
          
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-lg font-bold border border-green-500/20">
              +4.25%
            </span>
            <span className="text-slate-400 font-medium">Past 24h</span>
          </div>

          <ChartWidget />
        </div>
      </div>

      {/* Total Earnings Widget */}
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-purple-500/40 bg-gradient-to-r from-purple-900/20 to-slate-900/50 shadow-lg relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500"></div>
        <div className="flex items-center gap-5">
          <div className="p-3.5 bg-purple-500/20 text-purple-400 rounded-xl shadow-inner border border-purple-500/20">
            <Zap size={28} />
          </div>
          <div>
            <p className="text-sm text-purple-300 font-medium uppercase tracking-wider mb-1">Total AI Earnings</p>
            <p className="font-bold text-white text-3xl tracking-tight">
              ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="text-right">
           <span className="text-sm font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 shadow-sm">
             +12.4%
           </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-5">
        <button 
          onClick={() => openModal('deposit')}
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-blue-900/30"
        >
          <ArrowDownLeft size={22} />
          Deposit
        </button>
        <button 
          onClick={() => openModal('withdraw')}
          className="flex items-center justify-center gap-3 glass-panel hover:bg-slate-700 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 border-slate-600"
        >
          <ArrowUpRight size={22} />
          Withdraw
        </button>
      </div>

      {/* Market List */}
      <CryptoList coins={coins} />
    </div>
  );
};

export default HomeView;