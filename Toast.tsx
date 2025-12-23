import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-400" size={20} />;
      case 'error': return <AlertCircle className="text-red-400" size={20} />;
      case 'info': return <Info className="text-blue-400" size={20} />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-green-500/30';
      case 'error': return 'border-red-500/30';
      case 'info': return 'border-blue-500/30';
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[200] w-[90%] max-w-sm animate-slide-down">
      <div className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border ${getBorderColor()} bg-slate-800/90 backdrop-blur-xl text-white`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <p className="flex-1 text-sm font-medium pr-2">{message}</p>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <X size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default Toast;