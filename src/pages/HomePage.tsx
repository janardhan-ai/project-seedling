import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, MessageSquare } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PostCard from '@/components/PostCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser, posts, notifications } = useApp();
  const navigate = useNavigate();

  // Auto-rotating notification card
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

  const getNotificationMessage = (n: typeof activeNotification) => {
    if (!n) return '';
    switch (n.type) {
      case 'like': return ' liked your post.';
      case 'comment': return ' commented on your post.';
      case 'follow': return ' started following you.';
      case 'event': return ' posted an event.';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card px-4 pt-3 pb-3 shadow-sm border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-foreground font-display">CampusVibe</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate('/events')}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Calendar className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="w-10 h-10 flex items-center justify-center"
            >
              <MessageSquare className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        {/* Greeting */}
        <h2 className="text-2xl font-bold text-foreground mb-4 font-display">
          {getGreeting()}, {currentUser?.name}!
        </h2>

        {/* Auto-rotating Notification Card */}
        {activeNotification && (
          <button
            onClick={() => navigate('/notifications')}
            className="relative w-full bg-card rounded-2xl p-4 mb-4 shadow-sm border border-border/30 flex items-center gap-3 text-left h-[70px]"
          >
            {activeNotification.user && (
              <img
                src={activeNotification.user.avatar}
                alt={activeNotification.user.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">
                <span className="font-bold">{activeNotification.user?.name}</span>
                {getNotificationMessage(activeNotification)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeNotification.time || 'Just now'}
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="absolute top-3 right-3 flex gap-1">
              {recentNotifications.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    currentIndex === idx ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </button>
        )}

        {/* Posts Feed */}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPress={() => navigate(`/post/${post.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
