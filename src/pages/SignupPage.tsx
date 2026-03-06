import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { users } from '@/data/users';

const SignupPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateUsername = (val: string) => /^[a-zA-Z0-9_]+$/.test(val) && val.length >= 3;
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validateDOB = (val: string) => /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(val);

  const formatDOB = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned.slice(0, 2);
    if (cleaned.length > 2) formatted += '/' + cleaned.slice(2, 4);
    if (cleaned.length > 4) formatted += '/' + cleaned.slice(4, 8);
    return formatted;
  };

  const handleSignup = () => {
    setError('');
    if (!username || !name || !dob || !email || !phoneNumber || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (!validateUsername(username)) {
      setError('Username must be at least 3 characters (letters, numbers, underscore only)');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!validateDOB(dob)) {
      setError('Please enter date of birth in DD/MM/YYYY format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setCurrentUser(users[0]);
      setLoading(false);
      toast({ title: 'Welcome to CampusVibe! 🎉', description: 'Account created successfully!' });
      navigate('/', { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-card">
      {/* Back button */}
      <div className="sticky top-0 z-10 glass-header px-4 pt-4 pb-3 safe-top">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-2xl bg-secondary/80 flex items-center justify-center press-scale"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto px-6 pt-2 pb-10"
      >
        <h1 className="text-[26px] font-bold text-foreground mb-1 font-display tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-7">Join the campus community</p>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-destructive/10 border border-destructive/20 rounded-2xl px-4 py-3 mb-5"
          >
            <p className="text-sm text-destructive text-center font-medium">{error}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" autoComplete="username" className="input-modern" />
            <p className="text-[11px] text-muted-foreground mt-1.5 ml-1">Letters, numbers, and underscores only</p>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" autoComplete="name" className="input-modern" />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Date of Birth</label>
            <input value={dob} onChange={e => setDob(formatDOB(e.target.value))} placeholder="DD/MM/YYYY" maxLength={10} className="input-modern" />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@gmail.com" type="email" autoComplete="email" className="input-modern" />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Phone Number</label>
            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter phone number" type="tel" autoComplete="tel" className="input-modern" />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" className="input-modern pr-12" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Confirm Password</label>
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" type="password" autoComplete="new-password" className="input-modern" />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full h-[54px] gradient-accent text-white rounded-2xl text-[15px] font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 transition-all press-scale mt-3"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2.5">
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                Creating Account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{' '}
            <button onClick={() => navigate('/welcome')} className="text-primary font-semibold">
              Log in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
