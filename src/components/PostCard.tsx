import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '@/types';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onCommentPress?: () => void;
}

const PostCard = ({ post, onPress, onCommentPress }: PostCardProps) => {
  const { likePost } = useApp();

  const formatTime = (date: Date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden mb-4 shadow-sm border border-border/30">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={post.user.avatar}
          alt={post.user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{post.user.username}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {post.user.college} • {formatTime(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Post Image */}
      <div
        className="w-full cursor-pointer"
        onClick={onPress}
      >
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-[300px] object-cover bg-secondary"
          loading="lazy"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 px-4 py-3">
        <button
          onClick={() => likePost(post.id)}
          className="flex items-center gap-1.5"
        >
          <Heart
            className={cn(
              'h-6 w-6 transition-all',
              post.isLiked
                ? 'fill-destructive text-destructive'
                : 'text-foreground'
            )}
          />
          <span className="text-sm font-medium text-foreground">{post.likes}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCommentPress?.();
          }}
          className="flex items-center gap-1.5"
        >
          <MessageCircle className="h-[22px] w-[22px] text-foreground" />
          <span className="text-sm font-medium text-foreground">{post.comments}</span>
        </button>

        <button className="flex items-center gap-1.5">
          <Share2 className="h-[22px] w-[22px] text-foreground" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-foreground leading-5 line-clamp-2">
          <span className="font-semibold">{post.user.username}</span>{' '}
          {post.caption}
        </p>
        {post.hashtags.length > 0 && (
          <p className="text-sm text-primary font-medium mt-1">
            {post.hashtags.join(' ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
