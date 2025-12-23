import React from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, CheckCircle, Clock, XCircle } from 'lucide-react';

interface HistoryViewProps {
  transactions: Transaction[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ transactions }) => {
  const [filter, setFilter] = React.useState<'all' | 'pending'>('all');

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft size={22} className="text-green-400" />;
      case 'withdraw': return <ArrowUpRight size={22} className="text-red-400" />;
      case 'earn': return <RefreshCcw size={22} className="text-purple-400" />;
      case 'transfer': return <ArrowUpRight size={22} className="text-blue-400" />;
      default: return <ArrowDownLeft size={22} />;
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'failed': return <XCircle size={16} className="text-red-500" />;
    }
  };

  const filteredData = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === 'pending');

  return (
    <div className="space-y-6 pb-28 animate-fade-in">
      <div className="mb-6 pt-2">
        <h2 className="text-3xl font-extrabold text-white">History</h2>
        <p className="text-slate-400 text-base font-medium mt-1">Recent transactions & requests</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1.5 bg-slate-800 rounded-xl mb-6 w-max border border-slate-700">
        <button 
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'pending' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Pending
        </button>
      </div>

      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-lg">
            No transactions found.
          </div>
        ) : (
          filteredData.map((tx) => (
            <div key={tx.id} className="glass-panel p-5 rounded-2xl flex items-center justify-between group hover:bg-slate-800/80 transition-colors border border-slate-700/50">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-slate-700 group-hover:bg-slate-600 transition-colors shadow-sm`}>
                  {getIcon(tx.type)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg capitalize mb-0.5">{tx.type}</p>
                  <p className="text-sm text-slate-400 font-medium">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-mono font-bold text-lg ${tx.type === 'withdraw' ? 'text-white' : 'text-green-400'}`}>
                  {tx.type === 'withdraw' || tx.type === 'transfer' ? '-' : '+'}{tx.amount} {tx.currency}
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1.5">
                   {getStatusIcon(tx.status)}
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{tx.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;