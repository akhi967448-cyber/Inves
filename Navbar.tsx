import React from 'react';
import { Home, Zap, History } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-panel border-t border-slate-700 z-50 pb-safe shadow-2xl">
      <div className="flex justify-around items-center p-4 max-w-md mx-auto">
        <button
          onClick={() => setView('home')}
          className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${
            currentView === 'home' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home size={26} strokeWidth={currentView === 'home' ? 2.5 : 2} />
          <span className="text-xs font-bold tracking-wide">Home</span>
        </button>

        <button
          onClick={() => setView('earn')}
          className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${
            currentView === 'earn' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap size={26} strokeWidth={currentView === 'earn' ? 2.5 : 2} />
          <span className="text-xs font-bold tracking-wide">Earn</span>
        </button>

        <button
          onClick={() => setView('history')}
          className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${
            currentView === 'history' ? 'text-green-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History size={26} strokeWidth={currentView === 'history' ? 2.5 : 2} />
          <span className="text-xs font-bold tracking-wide">History</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;