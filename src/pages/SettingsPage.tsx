import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, Bell, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

const settingsItems = [
  { icon: User, label: 'Account' },
  { icon: Lock, label: 'Privacy' },
  { icon: Bell, label: 'Notifications' },
  { icon: HelpCircle, label: 'Help & Support' },
  { icon: Info, label: 'About' },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="h-6 w-6 text-foreground" /></button>
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        <div className="w-6" />
      </div>

      {/* Items */}
      <div className="mt-3">
        {settingsItems.map(({ icon: Icon, label }) => (
          <button key={label} className="w-full flex items-center justify-between px-5 py-4 bg-card mb-px hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-4">
              <Icon className="h-6 w-6 text-foreground" />
              <span className="text-base text-foreground">{label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        ))}

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center gap-4 px-5 py-4 bg-card mt-4 hover:bg-secondary/50 transition-colors"
        >
          <LogOut className="h-6 w-6 text-destructive" />
          <span className="text-base font-medium text-destructive">Logout</span>
        </button>
      </div>

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-card rounded-xl p-6 w-[80%] max-w-[300px] animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-foreground mb-2">Logout</h3>
            <p className="text-sm text-muted-foreground mb-5">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground">Cancel</button>
              <button onClick={handleLogout} className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;