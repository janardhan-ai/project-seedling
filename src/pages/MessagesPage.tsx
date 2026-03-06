import { useState } from 'react';
import { ArrowLeft, Search, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { mockConversations, Conversation } from '@/data/messages';
import { cn } from '@/lib/utils';

const onlineUsers = ['2', '3', '6', '9', '14'];
const unreadCounts: Record<string, number> = { '1': 2, '3': 1, '5': 3, '8': 1 };

const MessagesPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const getOther = (conv: Conversation) => {
    if (conv.participant1_id === currentUser?.id) {
      return { id: conv.participant2_id, name: conv.participant2_name, avatar: conv.participant2_avatar };
    }
    return { id: conv.participant1_id, name: conv.participant1_name, avatar: conv.participant1_avatar };
  };

  const formatTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filtered = mockConversations.filter(conv => {
    const other = getOther(conv);
    return other.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card px-4 pt-3 pb-3 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground flex-1 text-center">Messages</h1>
        <div className="w-10" />
      </header>

      {/* Search */}
      <div className="mx-4 mt-4 mb-2">
        <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2.5 shadow-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none border-0"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <MessageSquare className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-semibold text-muted-foreground mt-4">No conversations yet</p>
            <p className="text-base text-muted-foreground mt-1">Start chatting with your classmates!</p>
          </div>
        ) : (
          filtered.map(conv => {
            const other = getOther(conv);
            const online = onlineUsers.includes(other.id);
            const unread = unreadCounts[conv.id] || 0;

            return (
              <button
                key={conv.id}
                onClick={() => navigate(`/chat/${conv.id}`, {
                  state: { name: other.name, avatar: other.avatar, userId: other.id },
                })}
                className="w-full flex items-center gap-4 bg-card p-4 mx-4 mt-2 rounded-2xl shadow-sm text-left"
                style={{ width: 'calc(100% - 32px)' }}
              >
                {/* Avatar with online indicator */}
                <div className="relative shrink-0">
                  <img
                    src={other.avatar}
                    alt={other.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-card"
                  />
                  {online && (
                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-foreground truncate mr-2">{other.name}</span>
                    <span className="text-xs text-muted-foreground font-medium shrink-0">{formatTime(conv.last_message_time)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      'text-base truncate flex-1 leading-5',
                      unread > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'
                    )}>
                      {conv.last_message || 'No messages yet'}
                    </p>
                    {unread > 0 && (
                      <div className="ml-2 bg-primary min-w-[22px] h-[22px] rounded-full flex items-center justify-center px-1.5 shrink-0">
                        <span className="text-xs font-bold text-primary-foreground">{unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
