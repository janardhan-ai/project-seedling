import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import welcomeImage from '@/assets/images/image.png';

const WelcomePage = () => {
  const navigate = useNavigate();
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
    // Simulate login — replace with Supabase auth later
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Success', description: 'Logged in successfully!' });
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col items-center justify-center px-6 py-10">
      {/* Logo */}
      <div className="mb-8">
        <img src={welcomeImage} alt="CampusVibe" className="w-28 h-28 rounded-3xl object-cover shadow-lg" />
      </div>

      {/* Form */}
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-foreground text-center mb-1">Welcome to CampusVibe</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Sign in to continue</p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 mb-5">
            <p className="text-sm text-destructive text-center">{error}</p>
          </div>
        )}

        <div className="mb-5">
          <label className="text-sm font-semibold text-foreground mb-2 block">Email or Username</label>
          <input
            value={emailOrUsername}
            onChange={e => setEmailOrUsername(e.target.value)}
            placeholder="Enter your email or username"
            autoComplete="username"
            className="w-full h-[52px] border-[1.5px] border-border rounded-lg px-4 text-sm text-foreground bg-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-semibold text-foreground mb-2 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full h-[52px] border-[1.5px] border-border rounded-lg px-4 text-sm text-foreground bg-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-[52px] bg-primary text-primary-foreground rounded-lg text-sm font-semibold shadow-md disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Divider */}
        <div className="flex items-center my-7">
          <div className="flex-1 h-px bg-border" />
          <span className="mx-4 text-sm text-muted-foreground font-medium">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={() => navigate('/signup')}
          className="w-full h-[52px] bg-card border-[1.5px] border-primary rounded-lg text-sm font-semibold text-primary"
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
