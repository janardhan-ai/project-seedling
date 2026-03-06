import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Heart, MessageCircle, Share2, Eye, Plus, MapPin, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockVibes = [
  {
    id: 1,
    username: 'rahul_memes',
    userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=711',
    caption: 'When the professor says "This will be in the exam" 😂',
    likes: 1247,
    comments: 89,
    views: 2341,
    location: 'IIT Delhi Library',
    music: 'Study Vibes Playlist',
    timeAgo: '2h',
    tags: ['@priya_codes', '@arjun_dev'],
  },
  {
    id: 2,
    username: 'priya_codes',
    userImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=711',
    caption: 'Late night coding session 💻✨ #CodeLife',
    likes: 892,
    comments: 45,
    views: 1876,
    location: 'Computer Lab B',
    music: 'Lo-fi Hip Hop',
    timeAgo: '4h',
    tags: ['@rahul_memes'],
  },
  {
    id: 3,
    username: 'arjun_dev',
    userImage: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400&h=711',
    caption: 'Campus sunset hits different 🌅',
    likes: 1534,
    comments: 67,
    views: 3245,
    location: 'Main Campus Ground',
    music: 'Chill Vibes',
    timeAgo: '6h',
    tags: [],
  },
  {
    id: 4,
    username: 'sneha_art',
    userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=711',
    caption: 'Art therapy session 🎨 Finding peace in colors',
    likes: 756,
    comments: 23,
    views: 1432,
    location: 'Art Studio',
    music: 'Peaceful Piano',
    timeAgo: '8h',
    tags: ['@creative_minds'],
  },
];

const CreatePage = () => {
  const navigate = useNavigate();
  const [likedVibes, setLikedVibes] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedVibes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-card border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="h-[18px] w-[18px] text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Vibes</h1>
        </div>
        <button
          onClick={() => navigate('/create/new')}
          className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30"
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Feed */}
      <div className="py-2">
        {mockVibes.map(vibe => {
          const liked = likedVibes.has(vibe.id);
          return (
            <div key={vibe.id} className="bg-card rounded-2xl overflow-hidden mx-4 mb-4 shadow-sm">
              {/* Post Header */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  <img src={vibe.userImage} alt={vibe.username} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-foreground">{vibe.username}</p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{vibe.location}</span>
                      <span className="text-xs"> • {vibe.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vibe Image */}
              <div className="relative">
                <img
                  src={vibe.image}
                  alt={vibe.caption}
                  className="w-full aspect-[9/16] object-cover bg-muted"
                  loading="lazy"
                />
                {/* Music overlay */}
                {vibe.music && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                    <Music className="h-3.5 w-3.5" />
                    <span>{vibe.music}</span>
                  </div>
                )}
                {/* Views overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{vibe.views.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-5 px-4 py-3">
                <button onClick={() => toggleLike(vibe.id)} className="flex items-center gap-1.5">
                  <Heart className={cn('h-6 w-6 transition-all', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {(liked ? vibe.likes + 1 : vibe.likes).toLocaleString()}
                  </span>
                </button>
                <button className="flex items-center gap-1.5">
                  <MessageCircle className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">{vibe.comments}</span>
                </button>
                <button>
                  <Share2 className="h-6 w-6 text-muted-foreground" />
                </button>
              </div>

              {/* Caption & Tags */}
              <div className="px-4 pb-4">
                <p className="text-sm text-foreground leading-5 mb-1">
                  <span className="font-semibold">{vibe.username}</span> {vibe.caption}
                </p>
                {vibe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {vibe.tags.map((tag, i) => (
                      <span key={i} className="text-sm font-medium text-indigo-500">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePage;
