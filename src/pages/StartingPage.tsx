import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-card flex items-center justify-center">
      <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl animate-pulse">
        <span className="text-6xl font-extrabold text-primary-foreground tracking-tight">CV</span>
      </div>
    </div>
  );
};

export default StartingPage;
