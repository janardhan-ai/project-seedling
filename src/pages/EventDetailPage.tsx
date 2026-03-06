import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { mockEvents } from '@/data/events';
import {
  ArrowLeft, Share2, Calendar as CalendarIcon, MapPin, Building2,
  Clock, Users, X, Search, Link as LinkIcon, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const MY_REGISTRATIONS = [
  { eventId: '1', status: 'Attending' },
  { eventId: '2', status: 'Attended' },
  { eventId: '4', status: 'Attended' },
];

const ALL_USERS_DB = [
  { id: 'u1', name: 'Rahul', username: 'rahul_01', avatar: 'https://i.pravatar.cc/150?img=12', accountType: 'follower', shareCount: 150 },
  { id: 'u2', name: 'Priya', username: 'priya_x', avatar: 'https://i.pravatar.cc/150?img=5', accountType: 'public', shareCount: 85 },
  { id: 'u5', name: 'Kiran', username: 'kiran_tech', avatar: 'https://i.pravatar.cc/150?img=11', accountType: 'public', shareCount: 40 },
  { id: 'u3', name: 'Arjun', username: 'arjun_dev', avatar: 'https://i.pravatar.cc/150?img=3', accountType: 'follower', shareCount: 12 },
];

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useApp();

  const event = mockEvents.find(e => e.id === eventId);
  const reg = MY_REGISTRATIONS.find(r => r.eventId === eventId);

  const [bookingStatus, setBookingStatus] = useState<string | null>(reg?.status || null);
  const [attendees, setAttendees] = useState(event?.current_attendees || 0);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shareableUsers = ALL_USERS_DB
    .filter(u => {
      const eligible = u.accountType === 'follower' || u.accountType === 'public';
      const matches = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase());
      return eligible && matches;
    })
    .sort((a, b) => b.shareCount - a.shareCount);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-card">
        <header className="sticky top-0 z-40 bg-card px-4 pt-3 pb-3 shadow-sm">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center">
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Event not found</p>
        </div>
      </div>
    );
  }

  const spotsLeft = event.max_attendees - attendees;
  const isFull = spotsLeft <= 0;

  const handleBooking = () => {
    if (isFull) return;
    setBookingStatus('Attending');
    setAttendees(prev => prev + 1);
    toast.success('You have successfully registered for this event!');
  };

  const handleCopyLink = () => {
    toast.success('Event link copied to clipboard.');
    setShareModalVisible(false);
  };

  const handleSendInApp = (username: string) => {
    toast.success(`Event shared with @${username}`);
    setShareModalVisible(false);
    setSearchQuery('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-card">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Image with overlay buttons */}
        <div className="relative w-full">
          <img src={event.image_url} alt={event.title} className="w-full aspect-square object-cover bg-muted" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <button onClick={() => setShareModalVisible(true)} className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center">
              <Share2 className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="self-start bg-primary/15 px-4 py-1 rounded-full mb-4 inline-block">
            <span className="text-sm text-primary font-semibold">{event.category}</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">{event.title}</h1>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-base text-muted-foreground">{formatDate(event.event_date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span className="text-base text-muted-foreground">{event.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-base text-muted-foreground">{event.college_name}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around bg-background rounded-2xl p-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{attendees}</p>
              <p className="text-sm text-muted-foreground mt-1">Registered</p>
            </div>
            <div className="text-center">
              <p className={cn('text-2xl font-bold', isFull ? 'text-destructive' : 'text-primary')}>{spotsLeft}</p>
              <p className="text-sm text-muted-foreground mt-1">Spots Left</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{event.max_attendees}</p>
              <p className="text-sm text-muted-foreground mt-1">Capacity</p>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-3">About Event</h3>
            <p className="text-base text-muted-foreground leading-[22px]">{event.description}</p>
          </div>

          {/* Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Event Details</h3>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-base text-foreground font-medium">3 hours (estimated)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Expected Attendees</p>
                <p className="text-base text-foreground font-medium">{attendees} / {event.max_attendees}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-card border-t border-border max-w-lg mx-auto">
        {bookingStatus === 'Attended' ? (
          <button disabled className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-muted">
            <CheckCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-bold text-muted-foreground">Event Attended</span>
          </button>
        ) : bookingStatus === 'Attending' ? (
          <button disabled className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 opacity-90">
            <CheckCircle className="h-5 w-5 text-white" />
            <span className="text-base font-semibold text-white">Registered / Attending</span>
          </button>
        ) : (
          <button
            onClick={handleBooking}
            disabled={isFull}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl',
              isFull ? 'bg-muted-foreground' : 'bg-primary'
            )}
          >
            <CalendarIcon className="h-5 w-5 text-white" />
            <span className="text-base font-semibold text-white">{isFull ? 'Event Full' : 'Book Now'}</span>
          </button>
        )}
      </div>

      {/* Share Modal */}
      {shareModalVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShareModalVisible(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-t-[20px] h-[65vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Share Event</h3>
              <button onClick={() => setShareModalVisible(false)}>
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            {/* External share */}
            <div className="flex justify-around py-5">
              <button className="flex flex-col items-center gap-2" onClick={() => { toast.info('Share dialog opened'); setShareModalVisible(false); }}>
                <div className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-foreground font-medium">Share via...</span>
              </button>
              <button className="flex flex-col items-center gap-2" onClick={handleCopyLink}>
                <div className="w-[50px] h-[50px] rounded-full bg-muted flex items-center justify-center">
                  <LinkIcon className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-xs text-foreground font-medium">Copy Link</span>
              </button>
            </div>

            <div className="h-px bg-border mx-5 mb-4" />
            <p className="px-5 text-sm font-semibold text-muted-foreground mb-3">Send to friends</p>

            {/* Search */}
            <div className="flex items-center gap-2 bg-background mx-5 mb-4 px-3 py-2.5 rounded-xl">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                placeholder="Search followers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none border-0"
              />
            </div>

            {/* User list */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {shareableUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-base text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSendInApp(user.username)}
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold"
                  >
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

export default EventDetailPage;
