import { useApp } from '@/context/AppContext';
import { ArrowLeft, Heart, MessageCircle, UserPlus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  event: Calendar,
};

const colorMap = {
  like: 'text-accent bg-accent/10',
  comment: 'text-campus-blue bg-campus-blue/10',
  follow: 'text-campus-green bg-campus-green/10',
  event: 'text-campus-orange bg-campus-orange/10',
};

const NotificationsPage = () => {
  const { notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Notifications</h1>
      </header>

      <div className="flex-1 px-4 py-2">
        {notifications.map(n => {
          const Icon = iconMap[n.type];
          return (
            <button
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left',
                !n.isRead ? 'bg-primary/5' : 'hover:bg-secondary'
              )}
            >
              {n.user ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={n.user.avatar} />
                  <AvatarFallback>{n.user.name[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', colorMap[n.type])}>
                  <Icon className="h-5 w-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{n.message}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
              {!n.isRead && <div className="h-2 w-2 rounded-full gradient-primary shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
