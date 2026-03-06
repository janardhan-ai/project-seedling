import { useState } from 'react';
import { X, Heart, Send, MessageCircle } from 'lucide-react';
import { Post } from '@/types';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  post: Post | null;
}

const dummyComments: Comment[] = [
  {
    id: '1',
    user: 'rahul_memes',
    avatar: 'https://i.pravatar.cc/150?img=13',
    text: 'This is amazing!',
    likes: 12,
    time: '2h',
  },
  {
    id: '2',
    user: 'sara_codes',
    avatar: 'https://i.pravatar.cc/150?img=9',
    text: 'Love it',
    likes: 8,
    time: '4h',
  },
  {
    id: '3',
    user: 'arjun_ml',
    avatar: 'https://i.pravatar.cc/150?img=14',
    text: 'Great content',
    likes: 5,
    time: '5h',
  },
];

const CommentsModal = ({ visible, onClose, post }: CommentsModalProps) => {
  const { currentUser } = useApp();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(dummyComments);

  if (!visible) return null;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser?.username || 'you',
      avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?img=1',
      text: commentText,
      likes: 0,
      time: 'Just now',
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-card rounded-t-[20px] max-h-[50vh] flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-2">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Comments</h3>
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <MessageCircle className="h-12 w-12 text-muted-foreground" />
              <p className="text-base font-semibold text-muted-foreground mt-3">No comments yet</p>
              <p className="text-sm text-muted-foreground mt-1">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-[18px]">{comment.text}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{comment.likes}</span>
                    </button>
                    <button>
                      <span className="text-xs text-muted-foreground font-medium">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 p-4 border-t border-border bg-card">
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="You"
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            maxLength={500}
            className="flex-1 bg-background rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border-0"
          />
          <button
            onClick={handleAddComment}
            disabled={!commentText.trim()}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center transition-opacity',
              !commentText.trim() && 'opacity-50'
            )}
          >
            <Send
              className={cn(
                'h-5 w-5',
                commentText.trim() ? 'text-primary' : 'text-muted-foreground'
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
