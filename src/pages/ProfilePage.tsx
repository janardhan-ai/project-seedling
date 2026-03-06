import { useApp } from '@/context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Grid3X3, BookOpen, MapPin, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { currentUser, posts, notes } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const userPosts = posts.filter(p => p.userId === currentUser.id);
  const userNotes = notes.filter(n => n.userId === currentUser.id);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <h1 className="text-lg font-bold font-display text-foreground">{currentUser.username}</h1>
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <Settings className="h-5 w-5 text-foreground" />
        </button>
      </header>

      <div className="px-4 py-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5"
        >
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-accent">
            <Avatar className="h-20 w-20 border-3 border-background">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-xl">{currentUser.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 flex justify-around">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{userPosts.length}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="text-lg font-bold text-foreground">{currentUser.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="text-lg font-bold text-foreground">{currentUser.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 space-y-1">
          <h2 className="font-semibold text-foreground">{currentUser.name}</h2>
          {currentUser.bio && <p className="text-sm text-muted-foreground">{currentUser.bio}</p>}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" /> {currentUser.college}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {currentUser.branch} · Year {currentUser.year}
            </span>
          </div>
        </div>

        <button className="mt-4 w-full py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          Edit Profile
        </button>

        {/* Tab Grid */}
        <div className="mt-6 border-t border-border pt-4">
          <div className="flex justify-center gap-8 mb-4">
            <button className="flex items-center gap-1 text-sm font-medium text-primary border-b-2 border-primary pb-2">
              <Grid3X3 className="h-4 w-4" /> Posts
            </button>
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground pb-2">
              <BookOpen className="h-4 w-4" /> Notes
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-square rounded-lg overflow-hidden cursor-pointer group">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
