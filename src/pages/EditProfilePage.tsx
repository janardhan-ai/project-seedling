import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Camera, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EditProfilePage = () => {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [college, setCollege] = useState(currentUser?.college || '');
  const [branch, setBranch] = useState(currentUser?.branch || '');
  const [year, setYear] = useState(currentUser?.year?.toString() || '');
  const [skill1, setSkill1] = useState('');
  const [skill2, setSkill2] = useState('');

  if (!currentUser) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !username.trim() || !college.trim() || !branch.trim() || !year.trim()) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    setCurrentUser({
      ...currentUser,
      name,
      username,
      bio,
      avatar: avatar || currentUser.avatar,
      college,
      branch,
      year: parseInt(year) || 1,
    });

    toast({ title: 'Success', description: 'Profile updated successfully.' });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-card pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Edit Profile</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 py-6 space-y-4 max-w-lg mx-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-2">
          <label className="relative cursor-pointer mb-2">
            {avatar ? (
              <img src={avatar} alt="" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center border border-border">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-card">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <span className="text-sm font-medium text-primary">Change Profile Photo</span>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Name <span className="text-destructive">*</span></label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        </div>

        {/* Username */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Username <span className="text-destructive">*</span></label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Your username" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell something about yourself..." rows={3} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>

        {/* Skills */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Top Skills</label>
          <div className="flex gap-3">
            <input value={skill1} onChange={e => setSkill1(e.target.value)} placeholder="Skill 1" className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
            <input value={skill2} onChange={e => setSkill2(e.target.value)} placeholder="Skill 2" className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        {/* College */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">College <span className="text-destructive">*</span></label>
          <input value={college} onChange={e => setCollege(e.target.value)} placeholder="Enter College Name" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
          <p className="text-xs text-muted-foreground mt-1 italic">Note: Please enter the College Short Form only (e.g., IITB, SRM)</p>
        </div>

        {/* Branch */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Branch <span className="text-destructive">*</span></label>
          <input value={branch} onChange={e => setBranch(e.target.value)} placeholder="Enter Branch (e.g. CSE)" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        </div>

        {/* Year */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Year <span className="text-destructive">*</span></label>
          <input value={year} onChange={e => setYear(e.target.value)} type="number" min="1" max="4" placeholder="Current Year (1-4)" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        </div>

        {/* Save */}
        <button onClick={handleSave} className="w-full bg-foreground text-background rounded-lg py-3 text-sm font-semibold mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
