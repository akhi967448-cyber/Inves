import React, { useState, useEffect } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, Copy, Check, Loader2 } from 'lucide-react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  onConfirm: (amount: number, address?: string) => void;
  balance: number;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, type, onConfirm, balance, showToast }) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Animation States
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Reset state when modal opens and lock body scroll
  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setAddress('');
      setStatus('idle');
      // Prevent scrolling on the background content
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    if (type === 'withdraw') {
      if (val > balance) {
        showToast('Insufficient balance', 'error');
        return;
      }
      if (!address) {
         showToast('Please enter a wallet address', 'error');
         return;
      }
    }

    // Start Processing Animation
    setStatus('processing');
    
    // Simulate Network Delay (2 seconds)
    setTimeout(() => {
      setStatus('success');
      
      // Close after showing success for 1.5 seconds
      setTimeout(() => {
        onConfirm(val, address);
        onClose();
      }, 1500);
    }, 2000);
  };

  const dummyAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleCopy = () => {
    navigator.clipboard.writeText(dummyAddress);
    setCopied(true);
    showToast('Address copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden touch-none p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm transition-opacity" 
        onClick={status === 'idle' ? onClose : undefined}
      ></div>
      
      {/* Modal Container - Centered Card */}
      <div className="relative w-full max-w-[380px] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 transform transition-transform animate-scale-in z-10">
        
        {/* Close Button */}
        {status === 'idle' && (
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-2 bg-slate-800 rounded-full active:scale-90 transition-transform">
            <X size={20} />
          </button>
        )}

        {/* CONTENT BASED ON STATUS */}
        {status === 'processing' && (
          <div className="flex flex-col items-center justify-center text-center py-8 animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <Loader2 size={56} className="text-blue-500 animate-spin relative z-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Processing...</h3>
            <p className="text-slate-400 text-sm">Verifying transaction on blockchain</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center justify-center text-center py-8 animate-scale-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-green-500/30">
                <Check size={32} className="text-white" strokeWidth={3} />
              </div>
            <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-slate-400 text-sm">Your {type} request is pending approval.</p>
          </div>
        )}

        {status === 'idle' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-2xl ${type === 'deposit' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                {type === 'deposit' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
              </div>
              <h2 className="text-2xl font-bold text-white capitalize">{type} Funds</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-medium">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl py-3 pl-9 pr-4 text-white text-lg font-bold focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 appearance-none"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    inputMode="decimal"
                    autoFocus
                  />
                </div>
                {type === 'withdraw' && (
                  <p className="text-xs text-slate-500 mt-2 text-right font-medium">Available: ${balance.toLocaleString()}</p>
                )}
              </div>

              {type === 'deposit' ? (
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Send Bitcoin Here</label>
                  <div className="flex items-center justify-between gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700/50 mb-2">
                    <div className="overflow-hidden">
                      <code className="text-xs text-slate-300 block truncate font-mono">{dummyAddress}</code>
                    </div>
                    <button 
                      type="button"
                      onClick={handleCopy}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300 transition-colors flex-shrink-0"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 text-center">
                    Processing: 10-30 mins • Network: BTC
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Destination Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                    placeholder="Enter wallet address"
                    required
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-bold text-base text-white shadow-lg transition-all active:scale-95 ${
                    type === 'deposit' 
                      ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/30' 
                      : 'bg-red-600 hover:bg-red-500 shadow-red-900/30'
                  }`}
                >
                  Confirm {type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionModal;