import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { likePost } = useApp();
  const navigate = useNavigate();

  const timeAgo = () => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden mb-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <Avatar className="h-9 w-9 ring-2 ring-primary/20">
          <AvatarImage src={post.user.avatar} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{post.user.name}</p>
          <p className="text-xs text-muted-foreground">{post.user.college} · {timeAgo()}</p>
        </div>
      </div>

      {/* Image */}
      <div
        className="relative aspect-square cursor-pointer"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Actions */}
      <div className="p-4 pt-3 space-y-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => likePost(post.id)}
            className="flex items-center gap-1.5 group"
          >
            <Heart
              className={cn(
                'h-5 w-5 transition-all',
                post.isLiked
                  ? 'fill-accent text-accent scale-110'
                  : 'text-muted-foreground group-hover:text-accent'
              )}
            />
            <span className="text-sm text-muted-foreground">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-campus-blue transition-colors" />
            <span className="text-sm text-muted-foreground">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <Share2 className="h-5 w-5 text-muted-foreground group-hover:text-campus-green transition-colors" />
            <span className="text-sm text-muted-foreground">{post.shares}</span>
          </button>
        </div>

        <p className="text-sm">
          <span className="font-semibold text-foreground">{post.user.username}</span>{' '}
          <span className="text-foreground/80">{post.caption}</span>
        </p>

        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.hashtags.map(tag => (
              <span key={tag} className="text-xs text-primary font-medium">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
