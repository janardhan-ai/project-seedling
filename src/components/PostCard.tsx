import { Heart, MessageCircle, Send } from 'lucide-react';
import { Post } from '@/types';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onCommentPress?: () => void;
}

const PostCard = ({ post, onPress, onCommentPress }: PostCardProps) => {
  const { likePost } = useApp();
  const navigate = useNavigate();

  const formatTime = (date: Date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden mb-4 card-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 p-3.5">
        <img
          src={post.user.avatar}
          alt={post.user.username}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-foreground leading-tight">{post.user.username}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            {post.user.college} · {formatTime(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Post Image */}
      <div className="w-full cursor-pointer active:opacity-95 transition-opacity" onClick={onPress}>
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-[320px] object-cover bg-secondary"
          loading="lazy"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 px-4 py-3">
        <button
          onClick={() => likePost(post.id)}
          className="flex items-center gap-1.5 active:scale-90 transition-transform"
        >
          <Heart
            className={cn(
              'h-[22px] w-[22px] transition-all',
              post.isLiked
                ? 'fill-destructive text-destructive'
                : 'text-foreground'
            )}
            strokeWidth={post.isLiked ? 0 : 1.8}
          />
          <span className="text-[13px] font-semibold text-foreground">{post.likes}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCommentPress?.();
          }}
          className="flex items-center gap-1.5 active:scale-90 transition-transform"
        >
          <MessageCircle className="h-[21px] w-[21px] text-foreground" strokeWidth={1.8} />
          <span className="text-[13px] font-semibold text-foreground">{post.comments}</span>
        </button>

        <button
          onClick={() => navigate(`/post/${post.id}`)}
          className="flex items-center gap-1.5 active:scale-90 transition-transform ml-auto"
        >
          <Send className="h-[20px] w-[20px] text-foreground" strokeWidth={1.8} />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3.5 -mt-1">
        <p className="text-[14px] text-foreground leading-[19px] line-clamp-2">
          <span className="font-bold">{post.user.username}</span>{' '}
          {post.caption}
        </p>
        {post.hashtags.length > 0 && (
          <p className="text-[13px] text-primary font-medium mt-1">
            {post.hashtags.join(' ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
