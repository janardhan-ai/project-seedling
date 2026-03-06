import { useState, useCallback } from 'react';
import { ArrowLeft, Heart, MessageCircle, UserPlus, Calendar, Info, CheckCheck, Bell, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// --- Types ---
type NotificationType = 'like' | 'comment' | 'follow' | 'event' | 'system';

interface NotifUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface Notification {
  id: string;
  type: NotificationType;
  user: NotifUser;
  content?: string;
  postImage?: string;
  timestamp: string;
  isFollowing?: boolean;
  isRequest?: boolean;
  read: boolean;
  relatedId?: string;
}

interface NotificationSection {
  title: string;
  data: Notification[];
}

// --- Mock Data ---
const RAW_NOTIFICATIONS: Notification[] = [
  {
    id: '1', type: 'follow',
    user: { id: 'u1', name: 'Priya Sharma', username: 'priya_s', avatar: 'https://i.pravatar.cc/150?img=5' },
    timestamp: '2m', isFollowing: false, read: false, isRequest: true, relatedId: 'u1',
  },
  {
    id: '2', type: 'like',
    user: { id: 'u2', name: 'Rahul Verma', username: 'rahul_v', avatar: 'https://i.pravatar.cc/150?img=12' },
    postImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=200&auto=format&fit=crop',
    timestamp: '15m', read: false, relatedId: 'post_101',
  },
  {
    id: '3', type: 'comment',
    user: { id: 'u3', name: 'Arjun Das', username: 'arjun_d', avatar: 'https://i.pravatar.cc/150?img=3' },
    content: 'Bro, is this notes pdf available for ECE branch too?',
    postImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop',
    timestamp: '1d', read: true, relatedId: 'post_102',
  },
  {
    id: '4', type: 'follow',
    user: { id: 'u4', name: 'Neha Gupta', username: 'neha_g', avatar: 'https://i.pravatar.cc/150?img=9' },
    timestamp: '1d', isFollowing: true, read: true, relatedId: 'u4',
  },
  {
    id: '5', type: 'event',
    user: { id: 'sys', name: 'Campus Vibe', username: 'system', avatar: '' },
    content: 'Reminder: "Tech Fest 2025" starts tomorrow!',
    timestamp: '1d', read: true, relatedId: 'event_55',
  },
  {
    id: '6', type: 'like',
    user: { id: 'u5', name: 'Kiran Kumar', username: 'kiran_k', avatar: 'https://i.pravatar.cc/150?img=11' },
    postImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&auto=format&fit=crop',
    timestamp: '3d', read: true, relatedId: 'post_103',
  },
  {
    id: '7', type: 'system',
    user: { id: 'sys', name: 'Campus Vibe', username: 'system', avatar: '' },
    content: 'Your profile is now 100% complete. Great job!',
    timestamp: '5d', read: true, relatedId: '',
  },
];

const INITIAL_SECTIONS: NotificationSection[] = [
  { title: 'New', data: RAW_NOTIFICATIONS.slice(0, 2) },
  { title: 'Yesterday', data: RAW_NOTIFICATIONS.slice(2, 5) },
  { title: 'This Week', data: RAW_NOTIFICATIONS.slice(5) },
];

// --- Badge config ---
const badgeConfig: Record<NotificationType, { icon: typeof Heart; color: string; bg: string }> = {
  like: { icon: Heart, color: 'text-red-500', bg: 'bg-red-100' },
  comment: { icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
  follow: { icon: UserPlus, color: 'text-violet-500', bg: 'bg-violet-100' },
  event: { icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-100' },
  system: { icon: Info, color: 'text-muted-foreground', bg: 'bg-muted' },
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<NotificationSection[]>(INITIAL_SECTIONS);

  const updateSections = useCallback((fn: (sections: NotificationSection[]) => NotificationSection[]) => {
    setSections(prev => fn(prev).filter(s => s.data.length > 0));
  }, []);

  const handleMarkAllAsRead = () => {
    updateSections(secs => secs.map(s => ({ ...s, data: s.data.map(n => ({ ...n, read: true })) })));
  };

  const handleConfirmRequest = (id: string) => {
    updateSections(secs => secs.map(s => ({ ...s, data: s.data.map(n => n.id === id ? { ...n, isRequest: false, read: true } : n) })));
  };

  const handleDeleteRequest = (id: string) => {
    updateSections(secs => secs.map(s => ({ ...s, data: s.data.filter(n => n.id !== id) })));
  };

  const handleFollowToggle = (id: string) => {
    updateSections(secs => secs.map(s => ({ ...s, data: s.data.map(n => n.id === id ? { ...n, isFollowing: !n.isFollowing } : n) })));
  };

  const handlePress = (item: Notification) => {
    updateSections(secs => secs.map(s => ({ ...s, data: s.data.map(n => n.id === item.id ? { ...n, read: true } : n) })));
    // Navigate to related content
    if (item.type === 'like' && item.relatedId?.startsWith('post_')) {
      navigate(`/post/${item.relatedId}`);
    } else if (item.type === 'comment' && item.relatedId?.startsWith('post_')) {
      navigate(`/post/${item.relatedId}`);
    } else if (item.type === 'follow' && item.relatedId?.startsWith('u')) {
      // Could navigate to user profile when implemented
    } else if (item.type === 'event' && item.relatedId?.startsWith('event_')) {
      const eventId = item.relatedId.replace('event_', '');
      navigate(`/event/${eventId}`);
    }
  };

  const isSystemType = (type: NotificationType) => type === 'event' || type === 'system';

  const getNotifText = (n: Notification) => {
    const name = isSystemType(n.type) ? 'Campus Vibe' : n.user.name;
    let action = '';
    if (n.type === 'like') action = ' liked your post.';
    else if (n.type === 'comment') action = ` commented: "${n.content}"`;
    else if (n.type === 'follow') action = n.isRequest ? ' requested to follow you.' : ' started following you.';
    else if (n.type === 'event' || n.type === 'system') action = ` ${n.content}`;
    return { name, action };
  };

  return (
    <div className="flex flex-col min-h-screen bg-card">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Notifications</h1>
        <button onClick={handleMarkAllAsRead}>
          <CheckCheck className="h-6 w-6 text-primary" />
        </button>
      </header>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-5">
        {sections.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-24 gap-2.5">
            <Bell className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-base text-muted-foreground">No notifications yet</p>
          </div>
        )}

        {sections.map(section => (
          <div key={section.title}>
            {/* Section header */}
            <div className="px-4 py-3">
              <span className="text-[15px] font-bold text-foreground">{section.title}</span>
            </div>

            {/* Items */}
            {section.data.map(item => {
              const badge = badgeConfig[item.type];
              const BadgeIcon = badge.icon;
              const { name, action } = getNotifText(item);

              return (
                <button
                  key={item.id}
                  onClick={() => handlePress(item)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                    !item.read && 'bg-primary/5'
                  )}
                >
                  {/* Avatar + badge */}
                  <div className="relative shrink-0">
                    {isSystemType(item.type) ? (
                      <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-destructive-foreground" />
                      </div>
                    ) : (
                      <img src={item.user.avatar} alt={item.user.name} className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div className={cn('absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-card', badge.bg)}>
                      <BadgeIcon className={cn('h-2.5 w-2.5', badge.color)} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="text-sm text-foreground leading-5">
                      <span className="font-bold">{name}</span>
                      {action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
                  </div>

                  {/* Right action */}
                  <div className="shrink-0 flex items-center" onClick={(e) => e.stopPropagation()}>
                    {item.type === 'follow' ? (
                      item.isRequest ? (
                        <div className="flex gap-1.5">
                          <button onClick={() => handleConfirmRequest(item.id)} className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-md">
                            Confirm
                          </button>
                          <button onClick={() => handleDeleteRequest(item.id)} className="px-3 py-1.5 bg-muted text-foreground text-xs font-semibold rounded-md border border-border">
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleFollowToggle(item.id)}
                          className={cn(
                            'px-3.5 py-1.5 text-xs font-semibold rounded-md',
                            item.isFollowing ? 'bg-muted text-foreground border border-border' : 'bg-primary text-primary-foreground'
                          )}
                        >
                          {item.isFollowing ? 'Following' : 'Follow'}
                        </button>
                      )
                    ) : (
                      item.postImage && (
                        <img src={item.postImage} alt="" className="w-11 h-11 rounded-md object-cover" />
                      )
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
