import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Compass, SlidersHorizontal, Heart, MessageCircle, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const trendingTags = [
  { tag: '#CollegeLife', count: '12.5k', color: 'bg-purple-500' },
  { tag: '#TechFest2024', count: '8.2k', color: 'bg-pink-500' },
  { tag: '#Notes', count: '15.6k', color: 'bg-green-500' },
  { tag: '#Memes', count: '20.1k', color: 'bg-blue-500' },
];

const DiscoverPage = () => {
  const { posts } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  const filteredPosts = searchQuery.trim()
    ? posts.filter(p =>
        p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hashtags.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts;

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Search */}
      <div className="bg-card px-4 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 bg-background rounded-xl px-4 h-12">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search students, posts, notes…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Trending */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Trending Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            {trendingTags.map(item => (
              <div
                key={item.tag}
                className={cn('shrink-0 rounded-xl px-4 py-3 min-w-[140px]', item.color)}
              >
                <p className="text-base font-semibold text-white mb-0.5">{item.tag}</p>
                <p className="text-sm text-white/90">{item.count} posts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Discover Header */}
        <div className="flex items-center gap-2 mb-4">
          <Compass className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground flex-1">Discover</h2>
          <button onClick={() => setFilterVisible(true)} className="p-1">
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <img src={post.image} alt="" className="w-full h-full object-cover bg-muted group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute bottom-0 inset-x-0 bg-black/30 px-2 py-1.5 rounded-b-xl flex gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-white" />
                    <span className="text-xs font-medium text-white">{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-white" />
                    <span className="text-xs font-medium text-white">{post.comments}</span>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {filterVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterVisible(false)} />
          <div className="relative bg-card rounded-xl p-6 w-[80%] max-w-[300px] animate-in fade-in zoom-in-95 duration-200">
            <p className="text-base font-semibold text-foreground mb-2">Filter by</p>
            {['All Colleges', 'My College', 'Other Colleges'].map(opt => (
              <button key={opt} className="w-full text-left py-3 border-b border-border text-base text-foreground" onClick={() => setFilterVisible(false)}>{opt}</button>
            ))}
            <p className="text-base font-semibold text-foreground mt-4 mb-2">Content Type</p>
            {['All', 'Memes', 'Notes', 'Events'].map(opt => (
              <button key={opt} className="w-full text-left py-3 border-b border-border text-base text-foreground last:border-b-0" onClick={() => setFilterVisible(false)}>{opt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
