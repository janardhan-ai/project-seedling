import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { users } from '@/data/users';
import welcomeImage from '@/assets/images/image.png';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!emailOrUsername || !password) {
      setError('Please enter your email/username and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Demo: log in as first user (replace with real auth later)
      setCurrentUser(users[0]);
      setLoading(false);
      toast({ title: 'Success', description: 'Logged in successfully!' });
      navigate('/', { replace: true });
    }, 1000);
  };

  const inputClass =
    'w-full h-[50px] border border-border rounded-xl px-4 text-[15px] text-foreground bg-background placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all';

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Top Section */}
      <div className="flex flex-col items-center pt-14 pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl shadow-primary/20 ring-2 ring-primary/10">
            <img src={welcomeImage} alt="CampusVibe" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-5 text-center"
        >
          <h1 className="text-[26px] font-bold text-foreground font-display">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your campus account</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="flex-1 px-6 pb-10"
      >
        {error && (
          <div className="bg-destructive/8 border border-destructive/20 rounded-xl px-4 py-3 mb-5">
            <p className="text-sm text-destructive text-center font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Email or Username</label>
            <input
              value={emailOrUsername}
              onChange={e => setEmailOrUsername(e.target.value)}
              placeholder="Enter your email or username"
              autoComplete="username"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          <button className="text-sm text-primary font-semibold self-end block ml-auto -mt-1">
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-[52px] gradient-primary text-white rounded-xl text-[15px] font-semibold shadow-lg shadow-primary/25 disabled:opacity-50 transition-all active:scale-[0.98] mt-6"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-7">
          <div className="flex-1 h-px bg-border" />
          <span className="mx-4 text-xs text-muted-foreground font-semibold tracking-wider uppercase">Or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={() => navigate('/signup')}
          className="w-full h-[52px] bg-card border-2 border-primary/30 rounded-xl text-[15px] font-semibold text-primary active:scale-[0.98] transition-all hover:border-primary/50"
        >
          Create New Account
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
