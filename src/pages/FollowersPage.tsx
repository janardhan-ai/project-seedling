import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';

const DUMMY_FOLLOWERS = [
  { id: '101', name: 'Rahul Kumar', username: 'rahul_k', avatar: 'https://i.pravatar.cc/150?u=101' },
  { id: '102', name: 'Priya Sharma', username: 'priya_s', avatar: 'https://i.pravatar.cc/150?u=102' },
  { id: '103', name: 'Amit Verma', username: 'amit_v', avatar: 'https://i.pravatar.cc/150?u=103' },
];

const FollowersPage = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const isOwnList = true; // For now, always viewing own followers

  const [followers, setFollowers] = useState(DUMMY_FOLLOWERS);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setFollowers(prev => prev.filter(u => u.id !== id));
    setConfirmRemoveId(null);
  };

  return (
    <div className="min-h-screen bg-card pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Followers</h1>
        <div className="w-6" />
      </div>

      {/* List */}
      <div className="p-4 space-y-5">
        {followers.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No followers yet.</p>
        )}
        {followers.map(user => (
          <div key={user.id} className="flex items-center justify-between">
            <button onClick={() => {}} className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover bg-secondary" />
              <div className="text-left">
                <p className="text-base font-semibold text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </button>
            {isOwnList && (
              <button
                onClick={() => setConfirmRemoveId(user.id)}
                className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs font-semibold text-foreground"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Confirm Remove Modal */}
      {confirmRemoveId && (() => {
        const user = followers.find(u => u.id === confirmRemoveId);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmRemoveId(null)} />
            <div className="relative bg-card rounded-xl p-6 w-[90%] max-w-sm shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-2">Remove Follower?</h3>
              <p className="text-sm text-muted-foreground mb-5">Are you sure you want to remove {user?.name}?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmRemoveId(null)} className="flex-1 py-2.5 rounded-lg bg-secondary text-sm font-semibold text-foreground">Cancel</button>
                <button onClick={() => handleRemove(confirmRemoveId)} className="flex-1 py-2.5 rounded-lg bg-destructive text-sm font-semibold text-destructive-foreground">Remove</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default FollowersPage;
