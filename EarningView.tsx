import React from 'react';
import { EarningPlan, Transaction } from '../types';
import { Bot, Play, Pause, Coins, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

interface EarningViewProps {
  plans: EarningPlan[];
  togglePlan: (id: string) => void;
  totalEarnings: number;
  transactions: Transaction[];
}

const EarningView: React.FC<EarningViewProps> = ({ plans, togglePlan, totalEarnings, transactions }) => {
  // Filter only earning transactions and sort by date (newest first)
  const earningHistory = transactions
    .filter(t => t.type === 'earn')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10); // Show last 10

  return (
    <div className="space-y-8 pb-28 animate-fade-in">
      <div className="mb-6 pt-2">
        <h2 className="text-3xl font-extrabold text-white">AI Earning</h2>
        <p className="text-slate-400 text-base font-medium mt-1">Automate your crypto growth</p>
      </div>

      {/* Earning Stats */}
      <div className="grid grid-cols-2 gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-purple-900/10 shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-purple-400">
            <Coins size={20} />
            <span className="text-sm font-bold uppercase tracking-wide">Total Earned</span>
          </div>
          <p className="text-3xl font-bold text-white tracking-tight">
            ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-700 shadow-lg">
           <div className="flex items-center gap-2 mb-3 text-green-400">
            <TrendingUp size={20} />
            <span className="text-sm font-bold uppercase tracking-wide">Avg APY</span>
          </div>
          <p className="text-3xl font-bold text-white tracking-tight">12.4%</p>
        </div>
      </div>

      {/* Active Bots / Plans */}
      <div className="space-y-5">
        <h3 className="text-xl font-bold text-white px-1">Active AI Strategies</h3>
        
        {plans.map((plan) => (
          <div key={plan.id} className="glass-panel p-6 rounded-3xl relative overflow-hidden group border-slate-700/60 transition-all hover:border-slate-500">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${plan.active ? 'bg-green-500' : 'bg-slate-600'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${plan.active ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{plan.name}</h4>
                  <p className="text-sm text-slate-400 font-medium">Lock Period: {plan.minLock}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-400">{plan.apy}%</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">APY</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-700/50">
              <div className="text-base">
                <span className="text-slate-400 font-medium">Staked: </span>
                <span className="text-white font-bold font-mono text-lg">${plan.totalStaked.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={() => togglePlan(plan.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md ${
                  plan.active 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20' 
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/20'
                }`}
              >
                {plan.active ? (
                  <> <Pause size={16} /> Stop </>
                ) : (
                  <> <Play size={16} /> Activate </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Earning History */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white px-1">Daily Yield History</h3>
        
        {earningHistory.length === 0 ? (
           <div className="text-center py-10 glass-panel rounded-2xl border-dashed border-slate-600">
             <p className="text-slate-500">No earning records yet.</p>
           </div>
        ) : (
          <div className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/50">
            {earningHistory.map((tx, index) => (
              <div 
                key={tx.id} 
                className={`flex items-center justify-between p-4 ${index !== earningHistory.length - 1 ? 'border-b border-slate-800' : ''} hover:bg-slate-800/50 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{tx.date}</p>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-green-500" /> Auto Payout
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-green-400">+{tx.amount} {tx.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningView;