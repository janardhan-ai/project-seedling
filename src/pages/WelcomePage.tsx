import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { users } from '@/data/users';
import welcomeImage from '@/assets/images/image.png';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      setCurrentUser(users[0]);
      setLoading(false);
      toast({ title: 'Welcome back! 👋', description: 'Logged in successfully!' });
      navigate('/', { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[45%] opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(263 70% 58%), transparent 70%)' }}
      />

      {/* Top Section */}
      <div className="flex flex-col items-center pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-22 h-22 rounded-[1.5rem] overflow-hidden shadow-xl shadow-primary/25 ring-2 ring-primary/10">
            <img src={welcomeImage} alt="CampusVibe" className="w-[88px] h-[88px] object-cover" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <h1 className="text-[28px] font-bold text-foreground font-display tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Sign in to your campus account</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
        className="flex-1 px-6 pb-10 relative z-10"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-destructive/10 border border-destructive/20 rounded-2xl px-4 py-3 mb-5"
          >
            <p className="text-sm text-destructive text-center font-medium">{error}</p>
          </motion.div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-[13px] font-semibold text-foreground mb-2 block">Email or Username</label>
            <input
              value={emailOrUsername}
              onChange={e => setEmailOrUsername(e.target.value)}
              placeholder="Enter your email or username"
              autoComplete="username"
              className="input-modern"
            />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="input-modern pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <button className="text-sm text-primary font-semibold self-end block ml-auto -mt-1 hover:text-primary/80 transition-colors">
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-[54px] gradient-accent text-white rounded-2xl text-[15px] font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 transition-all press-scale mt-7 relative overflow-hidden"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2.5">
              <motion.div
                className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full"
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
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-border" />
          <span className="mx-4 text-[11px] text-muted-foreground font-semibold tracking-[0.15em] uppercase">Or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={() => navigate('/signup')}
          className="w-full h-[54px] bg-card border-2 border-primary/20 rounded-2xl text-[15px] font-semibold text-primary press-scale transition-all hover:border-primary/40 hover:bg-primary/[0.03]"
        >
          Create New Account
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
