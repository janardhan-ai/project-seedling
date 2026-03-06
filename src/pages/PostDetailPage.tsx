import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, ArrowLeft, X, Share2, Link, Search, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

// --- MOCK POST ---
const MOCK_POSTS = [
  {
    id: 'm1',
    user: { username: 'jana7993', avatar: 'https://i.pravatar.cc/150?u=jana', college: 'CMRTC' },
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
    caption: 'Won the 1st prize at the National Hackathon 2025! 🏆💻',
    description: 'It was an intense 24-hour coding sprint...',
    hashtags: ['#coding', '#hackathon', '#winner', '#cmrtc'],
    likes: 124, comments: 45, shares: 12, isLiked: true,
  },
];

interface CommentData {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies: CommentData[];
}

const dummyComments: CommentData[] = [
  {
    id: '1', user: 'rahul_memes', avatar: 'https://i.pravatar.cc/150?img=13',
    text: 'This is amazing! Congrats guys 🔥', likes: 12, isLiked: false, timestamp: '2h',
    replies: [
      { id: '1a', user: 'jana7993', avatar: 'https://i.pravatar.cc/150?u=jana', text: 'Thanks bro! It was tough but worth it.', likes: 4, isLiked: true, timestamp: '1h', replies: [] },
      { id: '1b', user: 'vijju_rowdy_', avatar: 'https://i.pravatar.cc/150?img=5', text: '@jana7993 Party when? 🥳', likes: 2, isLiked: false, timestamp: '30m', replies: [] },
    ],
  },
  {
    id: '2', user: 'sara_codes', avatar: 'https://i.pravatar.cc/150?img=9',
    text: 'Love the UI design, very clean.', likes: 8, isLiked: false, timestamp: '3h', replies: [],
  },
];

const ALL_USERS_DB = [
  { id: 'u1', name: 'Rahul', username: 'rahul_01', avatar: 'https://i.pravatar.cc/150?img=12', accountType: 'follower', shareCount: 150 },
  { id: 'u2', name: 'Priya', username: 'priya_x', avatar: 'https://i.pravatar.cc/150?img=5', accountType: 'public', shareCount: 85 },
  { id: 'u5', name: 'Kiran', username: 'kiran_tech', avatar: 'https://i.pravatar.cc/150?img=11', accountType: 'public', shareCount: 40 },
  { id: 'u3', name: 'Arjun', username: 'arjun_dev', avatar: 'https://i.pravatar.cc/150?img=3', accountType: 'follower', shareCount: 12 },
];

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { posts, likePost, currentUser } = useApp();

  const postData = posts.find(p => p.id === postId) || MOCK_POSTS.find(p => p.id === postId);

  const [isLiked, setIsLiked] = useState(postData?.isLiked || false);
  const [likesCount, setLikesCount] = useState(postData?.likes || 0);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<CommentData[]>(dummyComments);
  const [isFollowing, setIsFollowing] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyingToUser, setReplyingToUser] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOwner = currentUser?.username === postData?.user.username;

  const shareableUsers = ALL_USERS_DB
    .filter(u => (u.accountType === 'follower' || u.accountType === 'public') && u.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.shareCount - a.shareCount);

  const handleLikeToggle = () => {
    setIsLiked(prev => !prev);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    if (postData) likePost(postData.id);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const obj: CommentData = {
      id: Date.now().toString(), user: currentUser?.username || 'You',
      avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?img=60',
      text: newComment, likes: 0, isLiked: false, timestamp: 'Just now', replies: [],
    };
    if (replyingToId) {
      setCommentsList(prev => prev.map(c => {
        if (c.id === replyingToId) return { ...c, replies: [...c.replies, obj] };
        if (c.replies.some(r => r.id === replyingToId)) return { ...c, replies: [...c.replies, obj] };
        return c;
      }));
      setReplyingToId(null);
      setReplyingToUser(null);
    } else {
      setCommentsList(prev => [obj, ...prev]);
    }
    setNewComment('');
  };

  const handleReplyTo = (commentId: string, username: string) => {
    setReplyingToId(commentId);
    setReplyingToUser(username);
    setNewComment(`@${username} `);
    inputRef.current?.focus();
  };

  const handleLikeComment = (id: string) => {
    const toggle = (list: CommentData[]): CommentData[] =>
      list.map(c => {
        if (c.id === id) return { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 };
        return { ...c, replies: toggle(c.replies) };
      });
    setCommentsList(toggle(commentsList));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareModalVisible(false);
  };

  const handleSendShare = (username: string) => {
    setShareModalVisible(false);
  };

  const renderComment = (comment: CommentData, isReply = false) => (
    <div key={comment.id} className={cn('mb-4', isReply && 'ml-12 mt-3')}>
      <div className="flex items-start gap-3">
        <img src={comment.avatar} alt={comment.user} className="w-9 h-9 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground">
            <span className="font-semibold">{comment.user}</span>
            <span className="text-muted-foreground ml-2 text-xs">{comment.timestamp}</span>
          </p>
          <p className="text-sm text-foreground mt-0.5 leading-[18px]">{comment.text}</p>
          <div className="flex items-center gap-4 mt-1.5">
            <button onClick={() => handleLikeComment(comment.id)} className="flex items-center gap-1">
              <span className={cn('text-xs font-semibold', comment.isLiked ? 'text-destructive' : 'text-muted-foreground')}>Like</span>
              {comment.likes > 0 && <span className="text-xs text-muted-foreground">{comment.likes}</span>}
            </button>
            <button onClick={() => handleReplyTo(comment.id, comment.user)}>
              <span className="text-xs font-semibold text-muted-foreground">Reply</span>
            </button>
          </div>
        </div>
        <button onClick={() => handleLikeComment(comment.id)} className="p-1 shrink-0">
          <Heart className={cn('h-3.5 w-3.5', comment.isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
        </button>
      </div>
      {comment.replies.map(r => renderComment(r, true))}
    </div>
  );

  if (!postData) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="h-6 w-6 text-foreground" /></button>
        <h1 className="text-lg font-bold text-foreground">Post</h1>
        <div className="w-6" />
      </div>

      {/* User Header */}
      <div className="flex items-center gap-3 p-4">
        <img src={postData.user.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-foreground">{postData.user.username}</p>
          <p className="text-sm text-muted-foreground">{postData.user.college}</p>
        </div>
        {!isOwner && (
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors',
              isFollowing ? 'bg-transparent border-border text-foreground' : 'bg-primary border-primary text-primary-foreground'
            )}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>

      {/* Post Image */}
      <img src={postData.image} alt={postData.caption} className="w-full object-cover bg-muted" />

      {/* Actions */}
      <div className="flex items-center gap-5 px-4 py-3">
        <button onClick={handleLikeToggle} className="flex items-center gap-1.5">
          <Heart className={cn('h-7 w-7 transition-all', isLiked ? 'fill-destructive text-destructive' : 'text-foreground')} />
          <span className="text-sm font-medium text-foreground">{likesCount}</span>
        </button>
        <button onClick={() => setCommentsVisible(true)} className="flex items-center gap-1.5">
          <MessageCircle className="h-[26px] w-[26px] text-foreground" />
          <span className="text-sm font-medium text-foreground">{postData.comments}</span>
        </button>
        <button onClick={() => setShareModalVisible(true)} className="flex items-center gap-1.5">
          <Send className="h-[26px] w-[26px] text-foreground" />
          <span className="text-sm font-medium text-foreground">{postData.shares}</span>
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-base text-foreground leading-5">
          <span className="font-semibold">{postData.user.username}</span> {postData.caption}
        </p>
        {postData.description && <p className="text-sm text-muted-foreground mt-2 leading-5">{postData.description}</p>}
        <p className="text-sm text-primary font-medium mt-2">{postData.hashtags.join(' ')}</p>
      </div>

      {/* Inline Comments Preview */}
      <div className="border-t border-border px-4 py-4 pb-24">
        <h3 className="text-lg font-bold text-foreground mb-4">Comments</h3>
        {commentsList.slice(0, 3).map(c => renderComment(c))}
        {commentsList.length > 3 && (
          <button onClick={() => setCommentsVisible(true)} className="text-sm text-muted-foreground mt-2">
            View all {commentsList.length} comments
          </button>
        )}
      </div>

      {/* Comments Modal */}
      {commentsVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCommentsVisible(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-t-[20px] h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Comments</h3>
              <button onClick={() => setCommentsVisible(false)}><X className="h-6 w-6 text-foreground" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {commentsList.map(c => renderComment(c))}
            </div>
            <div className="border-t border-border bg-card p-4">
              {replyingToUser && (
                <div className="flex items-center justify-between mb-2 px-2">
                  <span className="text-xs text-muted-foreground">Replying to {replyingToUser}</span>
                  <button onClick={() => { setReplyingToId(null); setReplyingToUser(null); setNewComment(''); }}>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={replyingToUser ? 'Write a reply...' : 'Add a comment...'}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handlePostComment()}
                  className="flex-1 bg-background rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button onClick={handlePostComment} disabled={!newComment.trim()}>
                  <span className={cn('text-base font-semibold', newComment.trim() ? 'text-primary' : 'text-muted-foreground')}>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShareModalVisible(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-t-[20px] h-[65vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Share to...</h3>
              <button onClick={() => setShareModalVisible(false)}><X className="h-6 w-6 text-foreground" /></button>
            </div>
            {/* External Share */}
            <div className="flex justify-around py-5 px-4">
              <button onClick={handleCopyLink} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Link className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">Copy Link</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Share2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">Share via...</span>
              </button>
            </div>
            <div className="h-px bg-border mx-5 mb-4" />
            <p className="px-5 text-sm font-semibold text-muted-foreground mb-3">Send to friends</p>
            <div className="flex items-center gap-2 mx-5 mb-4 bg-background rounded-xl px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search followers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              {shareableUsers.map(u => (
                <div key={u.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className="text-sm font-semibold text-foreground">{u.name}</span>
                  </div>
                  <button onClick={() => handleSendShare(u.username)} className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                    Send
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
