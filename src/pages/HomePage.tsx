import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, MessageSquare } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PostCard from '@/components/PostCard';
import CommentsModal from '@/components/CommentsModal';
import { useNavigate } from 'react-router-dom';
import { Post } from '@/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const { currentUser, posts, notifications } = useApp();
  const navigate = useNavigate();

  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const recentNotifications = notifications.slice(0, 4);

  useEffect(() => {
    if (recentNotifications.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentNotifications.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [recentNotifications.length]);

  const activeNotification = recentNotifications[currentIndex];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getNotificationText = (n: typeof activeNotification) => {
    if (!n) return '';
    switch (n.type) {
      case 'like': return ' liked your post.';
      case 'comment': return ' commented on ...';
      case 'follow': return ' started following you.';
      case 'event': return ' posted an event.';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-header px-4 pt-3 pb-3 safe-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-md shadow-primary/20">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground font-display tracking-tight">CampusVibe</h1>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/events')}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <Calendar className="h-[22px] w-[22px] text-foreground" strokeWidth={1.8} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/messages')}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <MessageSquare className="h-[22px] w-[22px] text-foreground" strokeWidth={1.8} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        {/* Greeting */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-[22px] font-bold text-foreground mb-4 font-display leading-tight"
        >
          {getGreeting()},<br />
          <span className="gradient-text">{currentUser?.name}!</span>
        </motion.h2>

        {/* Auto-rotating Notification Card */}
        {activeNotification && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={() => navigate('/notifications')}
            className="relative w-full glass-card rounded-2xl p-4 mb-5 flex items-center gap-3 text-left h-[72px] press-scale"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                {activeNotification.user && (
                  <img
                    src={activeNotification.user.avatar}
                    alt={activeNotification.user.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/10"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-foreground truncate leading-5">
                    <span className="font-bold">{activeNotification.user?.name}</span>
                    {getNotificationText(activeNotification)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeNotification.time || 'Just now'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="absolute top-3 right-3 flex gap-1">
              {recentNotifications.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    currentIndex === idx ? 'bg-primary w-4' : 'bg-border w-1.5'
                  )}
                />
              ))}
            </div>
          </motion.button>
        )}

        {/* Posts Feed */}
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
          >
            <PostCard
              post={post}
              onPress={() => navigate(`/post/${post.id}`)}
              onCommentPress={() => {
                setSelectedPost(post);
                setShowComments(true);
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Comments Modal */}
      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        post={selectedPost}
      />
    </div>
  );
};

export default HomePage;
