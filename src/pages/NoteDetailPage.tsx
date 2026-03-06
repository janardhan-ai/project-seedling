import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Bookmark, Share2, X, Link, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const MOCK_NOTES = [
  {
    id: 'n1', resourceType: 'PDF', title: 'Engineering Mathematics III - Full Unit 1', subject: 'Mathematics',
    description: 'Comprehensive notes covering Laplace Transforms, Fourier Series, and Z-Transforms. Includes solved examples from last 5 years question papers. Perfect for last-minute revision.',
    likes: 45, isLiked: true, saves: 120, isSaved: false,
    user: { name: 'Janardhan reddy', avatar: 'https://i.pravatar.cc/150?u=jana', college: 'CMRTC', branch: 'ECE', year: '4' },
    resourceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'n2', resourceType: 'Handwritten', title: 'Data Structures & Algorithms - Trees', subject: 'DSA',
    description: 'Detailed explanation of Binary Trees, AVL Trees, and B-Trees with code snippets in C++. Hand-drawn diagrams for better visualization of rotations.',
    likes: 89, isLiked: false, saves: 340, isSaved: true,
    user: { name: 'Janardhan reddy', avatar: 'https://i.pravatar.cc/150?u=jana', college: 'CMRTC', branch: 'CSE', year: '3' },
    resourceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'n3', resourceType: 'Slides', title: 'Digital Electronics - Logic Gates', subject: 'DLD',
    description: 'Professor approved slides for Digital Logic Design. Covers logic gates, K-Maps, and boolean algebra simplification techniques.',
    likes: 23, isLiked: false, saves: 85, isSaved: false,
    user: { name: 'Janardhan reddy', avatar: 'https://i.pravatar.cc/150?u=jana', college: 'CMRTC', branch: 'EEE', year: '2' },
    resourceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

const ALL_USERS_DB = [
  { id: 'u1', name: 'Rahul', username: 'rahul_01', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'u2', name: 'Priya', username: 'priya_x', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'u5', name: 'Kiran', username: 'kiran_tech', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'u3', name: 'Arjun', username: 'arjun_dev', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const NoteDetailPage = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const { notes, likeNote, saveNote } = useApp();

  const note = notes.find(n => n.id === noteId) || MOCK_NOTES.find(n => n.id === noteId);

  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shareableUsers = ALL_USERS_DB.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!note) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="h-6 w-6 text-foreground" /></button>
        </div>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Note not found</p>
        </div>
      </div>
    );
  }

  const handleOpenResource = () => {
    const url = (note as any).resourceUrl;
    if (url) window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="h-6 w-6 text-foreground" /></button>
        <h1 className="text-lg font-semibold text-foreground">Note</h1>
        <button onClick={() => setShareModalVisible(true)} className="p-1"><Share2 className="h-6 w-6 text-foreground" /></button>
      </div>

      {/* Content */}
      <div className="p-5 pb-24">
        {/* Badge */}
        <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded mb-4">
          {note.resourceType.toUpperCase()}
        </span>

        <h2 className="text-2xl font-bold text-foreground mb-2">{note.title}</h2>
        <p className="text-lg font-medium text-primary mb-5">{note.subject}</p>

        {/* User Info */}
        <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl mb-5">
          <img src={note.user.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="text-base font-semibold text-foreground">{note.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {note.user.college} • {(note as any).user?.branch || ''} • Year {note.user.year}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-5">
          <button onClick={() => likeNote(note.id)} className="flex items-center gap-1.5">
            <Heart className={cn('h-6 w-6', note.isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
            <span className="text-sm text-muted-foreground">{note.likes} likes</span>
          </button>
          <button onClick={() => saveNote(note.id)} className="flex items-center gap-1.5">
            <Bookmark className={cn('h-6 w-6', note.isSaved ? 'fill-primary text-primary' : 'text-muted-foreground')} />
            <span className="text-sm text-muted-foreground">{note.saves} saves</span>
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
          <p className="text-base text-muted-foreground leading-relaxed">{note.description}</p>
        </div>

        {/* Open Resource */}
        <button
          onClick={handleOpenResource}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base"
        >
          Open Resource
        </button>
      </div>

      {/* Share Modal */}
      {shareModalVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShareModalVisible(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-t-[20px] h-[65vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Share Note</h3>
              <button onClick={() => setShareModalVisible(false)}><X className="h-6 w-6 text-foreground" /></button>
            </div>
            <div className="flex justify-around py-5 px-4">
              <button onClick={handleCopyLink} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Link className="h-5 w-5 text-foreground" /></div>
                <span className="text-xs font-medium text-foreground">Copy Link</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"><Share2 className="h-5 w-5 text-primary-foreground" /></div>
                <span className="text-xs font-medium text-foreground">Share via...</span>
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
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-base font-semibold text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">@{u.username}</p>
                    </div>
                  </div>
                  <button onClick={() => setShareModalVisible(false)} className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">Send</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;