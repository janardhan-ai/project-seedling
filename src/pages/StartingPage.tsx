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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, hsl(263 86% 22%) 0%, hsl(263 70% 42%) 50%, hsl(263 70% 58%) 100%)',
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(263 70% 65%), transparent 70%)' }}
      />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(263 86% 55%), transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center relative z-10"
      >
        <div className="w-28 h-28 rounded-[1.75rem] overflow-hidden shadow-2xl shadow-black/40 ring-4 ring-white/15 mb-8">
          <img src={campusVibe} alt="CampusVibe" className="w-full h-full object-cover" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
          className="text-4xl font-bold text-white tracking-tight font-display"
        >
          CampusVibe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-white/60 text-sm mt-2.5 font-medium tracking-wide"
        >
          Your College Social Network
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 flex gap-2"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/50"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default StartingPage;
