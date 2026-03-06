import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockConversations } from '@/data/messages';

const MessagesPage = () => {
  const navigate = useNavigate();

  const formatTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Messages</h1>
      </header>

      <div className="flex-1">
        {mockConversations.map(conv => (
          <button
            key={conv.id}
            onClick={() =>
              navigate(`/chat/${conv.id}`, {
                state: { name: conv.participant1_name, avatar: conv.participant1_avatar },
              })
            }
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={conv.participant1_avatar} />
              <AvatarFallback>{conv.participant1_name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground truncate">{conv.participant1_name}</p>
                <span className="text-xs text-muted-foreground shrink-0">{formatTime(conv.last_message_time)}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{conv.last_message}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
