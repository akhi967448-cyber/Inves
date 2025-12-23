import React, { useState } from 'react';
import { 
  ChevronLeft, 
  User as UserIcon, 
  Shield, 
  Bell, 
  LogOut, 
  ChevronRight, 
  CreditCard,
  HelpCircle,
  Moon,
  Camera,
  Save,
  X,
  Lock
} from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  onBack: () => void;
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onBack, user, onLogout, onUpdateUser, showToast }) => {
  const [notifications, setNotifications] = useState(true);
  const [editMode, setEditMode] = useState<'none' | 'details' | 'password'>('none');

  // Edit Forms State
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSaveDetails = () => {
    onUpdateUser({ ...user, name: editName, email: editEmail });
    setEditMode('none');
  };

  const handleSavePassword = () => {
    if (newPass.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    // In real app, verify oldPass with backend
    onUpdateUser({ ...user, password: newPass });
    setEditMode('none');
    setOldPass('');
    setNewPass('');
    showToast("Password updated successfully!", "success");
  };

  const SettingItem = ({ icon: Icon, title, value, onClick, toggle, subtext }: any) => (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl mb-3 border border-slate-700/50 active:scale-[0.98] transition-all cursor-pointer hover:bg-slate-800"
    >
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-full bg-slate-700 text-slate-300">
          <Icon size={20} />
        </div>
        <div>
          <span className="font-semibold text-slate-200 block">{title}</span>
          {subtext && <span className="text-xs text-slate-500 font-medium">{subtext}</span>}
        </div>
      </div>
      
      {toggle !== undefined ? (
        <div 
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          className={`w-12 h-6 rounded-full relative transition-colors ${value ? 'bg-blue-600' : 'bg-slate-600'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${value ? 'left-7' : 'left-1'}`}></div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-sm font-medium">{value}</span>
          <ChevronRight size={18} />
        </div>
      )}
    </div>
  );

  // Edit Modal/Overlay
  if (editMode !== 'none') {
    return (
      <div className="pb-28 animate-fade-in">
         <div className="flex items-center justify-between py-2 mb-6">
          <button 
            onClick={() => setEditMode('none')}
            className="p-2 -ml-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronLeft size={28} />
          </button>
          <h2 className="text-xl font-bold text-white">
            {editMode === 'details' ? 'Edit Profile' : 'Change Password'}
          </h2>
          <div className="w-10"></div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-700 space-y-6">
          {editMode === 'details' ? (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button 
                onClick={handleSaveDetails}
                className="w-full py-4 bg-blue-600 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Save size={20} /> Save Changes
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button 
                onClick={handleSavePassword}
                className="w-full py-4 bg-blue-600 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Lock size={20} /> Update Password
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2 mb-6">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-xl font-bold text-white">Profile & Settings</h2>
        <div className="w-10"></div>
      </div>

      {/* Profile Card */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4 group">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden flex items-center justify-center border-4 border-slate-900">
               <span className="text-4xl font-bold text-white">{user.name.charAt(0)}</span>
            </div>
          </div>
          <button className="absolute bottom-1 right-1 p-2 bg-blue-600 rounded-full text-white shadow-lg border-4 border-slate-900 hover:bg-blue-500 transition-colors">
            <Camera size={18} />
          </button>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-1">{user.name}</h3>
        <p className="text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          {user.email}
          {user.isVerified && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Account */}
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">Account</h4>
          <SettingItem 
            icon={UserIcon} 
            title="Personal Details" 
            subtext="Name, Email"
            onClick={() => { setEditMode('details'); setEditName(user.name); setEditEmail(user.email); }}
          />
          <SettingItem icon={CreditCard} title="Payment Methods" value="2 Linked" />
        </div>

        {/* Security */}
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">Security</h4>
          <SettingItem 
            icon={Shield} 
            title="Change Password" 
            value="High" 
            onClick={() => setEditMode('password')}
          />
          <SettingItem icon={Moon} title="Dark Mode" value={true} toggle={() => {}} />
        </div>

        {/* Preferences */}
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">Preferences</h4>
          <SettingItem 
            icon={Bell} 
            title="Push Notifications" 
            value={notifications} 
            toggle={() => {
              setNotifications(!notifications);
              showToast(`Notifications ${!notifications ? 'enabled' : 'disabled'}`, 'info');
            }} 
          />
          <SettingItem icon={HelpCircle} title="Help & Support" />
        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full p-4 mt-4 rounded-xl flex items-center justify-center gap-3 text-red-400 font-bold bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all active:scale-[0.98]"
        >
          <LogOut size={20} />
          Log Out
        </button>

        <p className="text-center text-xs text-slate-600 font-medium pt-4">
          Investor AI v1.0.2
        </p>
      </div>
    </div>
  );
};

export default ProfileView;