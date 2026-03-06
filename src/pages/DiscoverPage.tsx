import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Compass, SlidersHorizontal, Heart, MessageCircle, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const trendingTags = [
  { tag: '#CollegeLife', count: '12.5k', gradient: 'from-primary to-primary-glow' },
  { tag: '#TechFest2024', count: '8.2k', gradient: 'from-primary-glow to-primary' },
  { tag: '#Notes', count: '15.6k', gradient: 'from-primary to-primary-glow' },
  { tag: '#Memes', count: '20.1k', gradient: 'from-primary-glow to-primary' },
];

const DiscoverPage = () => {
  const { posts } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Colleges');

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
      <div className="glass-header px-4 pt-6 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 bg-secondary/60 rounded-2xl px-4 h-12 border border-border/40">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search students, posts, notes…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="press-scale">
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
            <h2 className="text-lg font-bold text-foreground font-display">Trending Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            {trendingTags.map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  'shrink-0 rounded-2xl px-5 py-3.5 min-w-[150px] bg-gradient-to-br cursor-pointer press-scale',
                  item.gradient
                )}
              >
                <p className="text-base font-bold text-white mb-0.5">{item.tag}</p>
                <p className="text-sm text-white/80 font-medium">{item.count} posts</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Discover Header */}
        <div className="flex items-center gap-2 mb-4">
          <Compass className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground font-display flex-1">Discover</h2>
          <button onClick={() => setFilterVisible(true)} className="p-2 rounded-xl hover:bg-secondary/80 transition-colors press-scale">
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Active filter chip */}
        {selectedFilter !== 'All Colleges' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-3"
          >
            {selectedFilter}
            <button onClick={() => setSelectedFilter('All Colleges')}>
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}

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
                className="relative aspect-square rounded-2xl overflow-hidden group press-scale-sm"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <img src={post.image} alt="" className="w-full h-full object-cover bg-muted group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 inset-x-0 bg-black/30 backdrop-blur-sm px-2.5 py-2 flex gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-white" />
                    <span className="text-[11px] font-semibold text-white">{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5 text-white" />
                    <span className="text-[11px] font-semibold text-white">{post.comments}</span>
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFilterVisible(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card rounded-2xl p-6 w-[85%] max-w-[320px] card-shadow-lg"
          >
            <p className="text-base font-bold text-foreground mb-3 font-display">Filter by</p>
            {['All Colleges', 'My College', 'Other Colleges'].map(opt => (
              <button
                key={opt}
                className={cn(
                  'w-full text-left py-3 border-b border-border text-base transition-colors rounded-lg px-2',
                  selectedFilter === opt ? 'text-primary font-semibold bg-primary/5' : 'text-foreground'
                )}
                onClick={() => { setSelectedFilter(opt); setFilterVisible(false); }}
              >
                {opt}
              </button>
            ))}
            <p className="text-base font-bold text-foreground mt-5 mb-3 font-display">Content Type</p>
            {['All', 'Memes', 'Notes', 'Events'].map(opt => (
              <button key={opt} className="w-full text-left py-3 border-b border-border text-base text-foreground last:border-b-0 rounded-lg px-2 hover:bg-secondary/50 transition-colors" onClick={() => setFilterVisible(false)}>{opt}</button>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
