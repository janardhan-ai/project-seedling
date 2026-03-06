import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, BookOpen, Calendar, Heart, MoreVertical, Share2, MessageSquare, Lock, Settings, Upload, X, Link, Search, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProfileTab = 'posts' | 'notes' | 'events';

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop';

const MOCK_POSTS = [
  { id: 'm1', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop', likes: 124, comments: 45 },
  { id: 'm2', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop', likes: 89, comments: 12 },
  { id: 'm3', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop', likes: 56, comments: 8 },
];

const MOCK_NOTES_DATA = [
  { id: 'n1', title: 'Engineering Math III', subject: 'Mathematics', year: '2nd Year', likes: 45 },
  { id: 'n2', title: 'DSA - Trees', subject: 'DSA', year: '2nd Year', likes: 89 },
];

const ALL_USERS_DB = [
  { id: 'u1', name: 'Rahul', username: 'rahul_01', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'u2', name: 'Priya', username: 'priya_x', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const ProfilePage = () => {
  const { currentUser, posts, notes, events } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [menuVisible, setMenuVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser) return null;

  const isOwnProfile = true;
  const userPosts = [...posts.filter(p => p.userId === currentUser.id), ...MOCK_POSTS];
  const userNotes = [...notes.filter(n => n.userId === currentUser.id), ...MOCK_NOTES_DATA];
  const userEvents = events.slice(0, 2).map(e => ({ ...e, status: 'Upcoming' }));

  const shareableUsers = ALL_USERS_DB.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-card pb-20">
      {/* Banner */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <img src={DEFAULT_BANNER} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        {isOwnProfile && (
          <div className="absolute top-12 right-5 z-10">
            <button
              onClick={() => setMenuVisible(!menuVisible)}
              className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm"
            >
              <MoreVertical className="h-5 w-5 text-white" />
            </button>
            {/* Dropdown Menu */}
            {menuVisible && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setMenuVisible(false)} />
                <div className="absolute top-11 right-0 z-30 bg-card rounded-xl shadow-lg w-40 py-2 border border-border">
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-foreground hover:bg-secondary" onClick={() => { setMenuVisible(false); navigate('/settings'); }}>
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <div className="h-px bg-border mx-2" />
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-foreground hover:bg-secondary" onClick={() => setMenuVisible(false)}>
                    <Upload className="h-4 w-4" /> Upload
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center px-6">
        {/* Avatar */}
        <div className="relative -mt-[50px] mb-2.5">
          <div className="p-1 bg-card rounded-full">
            <img src={currentUser.avatar} alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
          </div>
          <div className="absolute bottom-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-green-500 border-[3px] border-card" />
        </div>

        <h2 className="text-2xl font-extrabold text-foreground mb-0.5">{currentUser.name}</h2>
        <p className="text-sm text-muted-foreground mb-2.5">@{currentUser.username}</p>

        {/* Academic Info */}
        <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 mb-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{currentUser.college}</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{currentUser.branch}</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Year {currentUser.year}</span>
        </div>

        {currentUser.bio && <p className="text-sm text-foreground/80 text-center leading-5 mb-3 px-5">{currentUser.bio}</p>}
      </div>

      {/* Stats */}
      <div className="flex justify-center items-center gap-6 mb-5">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{userPosts.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Posts</p>
        </div>
        <div className="w-px h-5 bg-border" />
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{currentUser.followers}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Followers</p>
        </div>
        <div className="w-px h-5 bg-border" />
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{currentUser.following}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Following</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 px-6 mb-6">
        <button onClick={() => navigate('/edit-profile')} className="flex-[4] bg-foreground text-background rounded-lg py-2.5 text-sm font-semibold text-center">
          Edit Profile
        </button>
        <button onClick={() => setShareModalVisible(true)} className="flex-1 bg-secondary rounded-lg flex items-center justify-center text-sm font-semibold text-foreground">
          Share
        </button>
      </div>

      {/* Content Tabs */}
      <div className="border-b border-border flex px-4">
        {(['posts', 'notes', 'events'] as ProfileTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'py-3 mr-6 text-sm font-semibold border-b-2 capitalize transition-colors',
              activeTab === tab ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'posts' && (
          userPosts.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <Heart className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-lg font-bold text-foreground mt-3">No posts yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/post/${post.id}`)}
                  className="aspect-square rounded overflow-hidden bg-muted"
                >
                  <img src={post.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3">
            {userNotes.map(note => (
              <button
                key={note.id}
                onClick={() => navigate(`/note/${note.id}`)}
                className="w-full text-left bg-secondary p-4 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-muted-foreground">{note.subject}</span>
                </div>
                <p className="text-base font-semibold text-foreground">{note.title}</p>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-3">
            {userEvents.map(event => (
              <button
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
                className="w-full flex items-center gap-3 bg-secondary p-3 rounded-xl text-left"
              >
                <div className="w-10 h-10 bg-card rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-base font-bold text-foreground leading-none">{new Date(event.event_date).getDate()}</span>
                  <span className="text-[9px] font-bold text-destructive uppercase">
                    {new Date(event.event_date).toLocaleString('en', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-foreground truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.location}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModalVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShareModalVisible(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-t-[20px] h-[50vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Share Profile</h3>
              <button onClick={() => setShareModalVisible(false)}><X className="h-6 w-6 text-foreground" /></button>
            </div>
            <div className="flex justify-around py-5 px-4">
              <button className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center"><Share2 className="h-5 w-5 text-primary-foreground" /></div>
                <span className="text-xs text-foreground">Share via...</span>
              </button>
              <button onClick={handleCopyLink} className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center"><Link className="h-5 w-5 text-foreground" /></div>
                <span className="text-xs text-foreground">Copy Link</span>
              </button>
            </div>
            <div className="h-px bg-border mx-5 mb-4" />
            <p className="px-5 text-sm font-semibold text-muted-foreground mb-3">Send to friends</p>
            <div className="flex items-center gap-2 mx-5 mb-4 bg-background rounded-xl px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search followers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              {shareableUsers.map(u => (
                <div key={u.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className="text-sm font-semibold text-foreground">{u.name}</span>
                  </div>
                  <button onClick={() => setShareModalVisible(false)} className="bg-foreground text-background text-xs font-semibold px-4 py-1.5 rounded-full">Send</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
