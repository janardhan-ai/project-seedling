import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DUMMY_FOLLOWING = [
  { id: '201', name: 'Elon Musk', username: 'elonmusk', avatar: 'https://i.pravatar.cc/150?u=201' },
  { id: '202', name: 'Bill Gates', username: 'billgates', avatar: 'https://i.pravatar.cc/150?u=202' },
];

const FollowingPage = () => {
  const navigate = useNavigate();
  const isOwnList = true;

  const [following, setFollowing] = useState(DUMMY_FOLLOWING);
  const [confirmUnfollowId, setConfirmUnfollowId] = useState<string | null>(null);

  const handleUnfollow = (id: string) => {
    setFollowing(prev => prev.filter(u => u.id !== id));
    setConfirmUnfollowId(null);
  };

  return (
    <div className="min-h-screen bg-card pb-20">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Following</h1>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-5">
        {following.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">Not following anyone yet.</p>
        )}
        {following.map(user => (
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
                onClick={() => setConfirmUnfollowId(user.id)}
                className="px-4 py-1.5 bg-secondary rounded-lg text-xs font-semibold text-foreground"
              >
                Following
              </button>
            )}
          </div>
        ))}
      </div>

      {confirmUnfollowId && (() => {
        const user = following.find(u => u.id === confirmUnfollowId);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmUnfollowId(null)} />
            <div className="relative bg-card rounded-xl p-6 w-[90%] max-w-sm shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-2">Unfollow?</h3>
              <p className="text-sm text-muted-foreground mb-5">Stop following {user?.name}?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmUnfollowId(null)} className="flex-1 py-2.5 rounded-lg bg-secondary text-sm font-semibold text-foreground">Cancel</button>
                <button onClick={() => handleUnfollow(confirmUnfollowId)} className="flex-1 py-2.5 rounded-lg bg-destructive text-sm font-semibold text-destructive-foreground">Unfollow</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default FollowingPage;
