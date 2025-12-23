import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import EarningView from './components/EarningView';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';
import Toast from './components/Toast';
import { INITIAL_COINS, MOCK_TRANSACTIONS, EARNING_PLANS } from './constants';
import { ViewState, CryptoCoin, EarningPlan, Transaction, User } from './types';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);

  // App State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [coins, setCoins] = useState<CryptoCoin[]>(INITIAL_COINS);
  const [walletBalance, setWalletBalance] = useState(12450.75);
  const [totalEarnings, setTotalEarnings] = useState(1240.50);
  const [earningPlans, setEarningPlans] = useState<EarningPlan[]>(EARNING_PLANS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type, isVisible: true });
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Simulate Live Crypto Price Updates
  useEffect(() => {
    if (!user) return; // Only run if logged in

    const interval = setInterval(() => {
      setCoins(currentCoins => 
        currentCoins.map(coin => {
          const volatility = 0.002;
          const change = 1 + (Math.random() * volatility * 2 - volatility);
          return {
            ...coin,
            price: coin.price * change,
            change24h: coin.change24h + (Math.random() * 0.1 - 0.05)
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

  // Simulate Balance updates if Auto Earn is active
  useEffect(() => {
    if (!user) return;

    const earnInterval = setInterval(() => {
      const activePlans = earningPlans.filter(p => p.active);
      if (activePlans.length > 0) {
        const increment = 0.05;
        setWalletBalance(prev => prev + increment);
        setTotalEarnings(prev => prev + increment);
      }
    }, 5000);
    return () => clearInterval(earnInterval);
  }, [earningPlans, user]);

  // Auth Handlers
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('home');
    showToast(`Welcome back, ${loggedInUser.name}!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    showToast('Logged out successfully', 'info');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    showToast('Profile updated successfully', 'success');
  };

  // Logic Handlers
  const togglePlan = (id: string) => {
    setEarningPlans(plans => 
      plans.map(plan => {
        if (plan.id === id) {
          const newState = !plan.active;
          showToast(`${plan.name} ${newState ? 'activated' : 'deactivated'}`, newState ? 'success' : 'info');
          return { ...plan, active: newState };
        }
        return plan;
      })
    );
  };

  const handleDeposit = (amount: number) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      amount: amount,
      currency: 'USD',
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Deposit of $${amount} submitted`, 'success');
  };

  const handleWithdraw = (amount: number, address: string) => {
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev - amount);
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'withdraw',
        amount: amount,
        currency: 'USD',
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setTransactions(prev => [newTx, ...prev]);
      showToast(`Withdrawal of $${amount} submitted`, 'success');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView 
          coins={coins} 
          balance={walletBalance} 
          totalEarnings={totalEarnings}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onProfileClick={() => setCurrentView('profile')}
          showToast={showToast}
        />;
      case 'earn':
        return <EarningView 
          plans={earningPlans} 
          togglePlan={togglePlan} 
          totalEarnings={totalEarnings}
          transactions={transactions}
        />;
      case 'history':
        return <HistoryView transactions={transactions} />;
      case 'profile':
        return <ProfileView 
          onBack={() => setCurrentView('home')} 
          user={user!}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
          showToast={showToast}
        />;
      default:
        return <HomeView 
          coins={coins} 
          balance={walletBalance} 
          totalEarnings={totalEarnings}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onProfileClick={() => setCurrentView('profile')}
          showToast={showToast}
        />;
    }
  };

  // If not logged in, show Auth View
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={toast.isVisible} 
          onClose={closeToast} 
        />
        <AuthView onLogin={handleLogin} showToast={showToast} />
      </div>
    );
  }

  // Authenticated App
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={closeToast} 
      />
      
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-slate-900">
        
        {/* Main Content Area */}
        <main className="p-5 pt-8">
          {renderView()}
        </main>

        {/* Bottom Navigation */}
        {currentView !== 'profile' && (
          <Navbar currentView={currentView} setView={setCurrentView} />
        )}
        
      </div>
    </div>
  );
};

export default App;