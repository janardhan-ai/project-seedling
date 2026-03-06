import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      setError('Username must be at least 3 characters and contain only letters, numbers, and underscores');
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
    // Simulate signup — replace with Supabase auth later
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Success', description: 'Account created successfully!' });
      navigate('/welcome');
    }, 1200);
  };

  const inputClass = "w-full h-[48px] border border-border rounded-xl px-4 text-sm text-foreground bg-muted/30 placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-card relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-12 left-4 z-10 w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center border border-border"
      >
        <ArrowLeft size={20} className="text-foreground" />
      </button>

      <div className="max-w-md mx-auto px-6 pt-24 pb-10">
        <h1 className="text-2xl font-bold text-foreground mb-1">Create your student account</h1>
        <p className="text-sm text-muted-foreground mb-5">Join the campus community</p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 mb-5">
            <p className="text-sm text-destructive text-center">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter a unique username" autoComplete="username" className={inputClass} />
            <p className="text-xs text-muted-foreground mt-1">No spaces or special characters except underscore</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" autoComplete="name" className={inputClass} />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Date of Birth</label>
            <input value={dob} onChange={e => setDob(formatDOB(e.target.value))} placeholder="DD/MM/YYYY" maxLength={10} className={inputClass} />
            <p className="text-xs text-muted-foreground mt-1">Format: DD/MM/YYYY (automatically formatted)</p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@gmail.com" type="email" autoComplete="email" className={inputClass} />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" type="tel" autoComplete="tel" className={inputClass} />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" type="password" autoComplete="new-password" className={inputClass} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" type="password" autoComplete="new-password" className={inputClass} />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full h-[52px] bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-md disabled:opacity-50 transition-opacity mt-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{' '}
            <button onClick={() => navigate('/welcome')} className="text-primary font-semibold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
