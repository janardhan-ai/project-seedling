import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import campusVibe from '@/assets/images/campus_vibe.png';

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
      <img src={campusVibe} alt="CampusVibe" className="w-72 h-72 rounded-3xl object-cover shadow-2xl animate-pulse" />
    </div>
  );
};

export default StartingPage;
