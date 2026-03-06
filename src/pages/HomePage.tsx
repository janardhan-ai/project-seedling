import { Bell, MessageSquare } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PostCard from '@/components/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { currentUser, posts, notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold font-display gradient-text">CampusVibe</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <Bell className="h-5 w-5 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary-foreground">{unreadCount}</span>
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Stories-like avatars */}
      <div className="px-4 py-3 overflow-x-auto hide-scrollbar">
        <div className="flex gap-3">
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-1 shrink-0"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-accent">
                <Avatar className="h-14 w-14 border-2 border-background">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">You</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 px-4 pb-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
