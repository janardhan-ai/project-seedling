import { Search } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import PostCard from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const DiscoverPage = () => {
  const { posts } = useApp();
  const [query, setQuery] = useState('');

  const filtered = query
    ? posts.filter(
        p =>
          p.caption.toLowerCase().includes(query.toLowerCase()) ||
          p.hashtags.some(h => h.toLowerCase().includes(query.toLowerCase()))
      )
    : posts;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50">
        <h1 className="text-lg font-bold font-display text-foreground mb-3">Discover</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, hashtags..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9 bg-secondary border-0 rounded-xl"
          />
        </div>
      </header>

      <div className="flex-1 px-4 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
