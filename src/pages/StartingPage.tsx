import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import campusVibe from '@/assets/images/campus_vibe.png';
import { motion } from 'framer-motion';

const StartingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(263,70%,58%)] via-[hsl(263,86%,50%)] to-[hsl(330,81%,60%)] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 mb-6 ring-4 ring-white/20">
          <img src={campusVibe} alt="CampusVibe" className="w-full h-full object-cover" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold text-white tracking-tight font-display"
        >
          CampusVibe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-white/70 text-sm mt-2 font-medium"
        >
          Your College Social Network
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 flex gap-1.5"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default StartingPage;
