import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Upload, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type TabType = 'post' | 'story' | 'notes';

const CreatePage = () => {
  const { addPost, addNote, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('post');

  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [visibility, setVisibility] = useState<'my_college' | 'all_colleges' | 'followers'>('all_colleges');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      setAspectRatio(Math.max(0.5, Math.min(ratio, 1.91)));
      setSelectedImage(url);
    };
    img.src = url;
  };

  const resetForm = () => {
    setCaption('');
    setDescription('');
    setHashtags('');
    setTitle('');
    setSubject('');
    setSelectedImage(null);
    setAspectRatio(1);
  };

  const handlePost = () => {
    if (!currentUser) return;

    if (activeTab === 'post') {
      if (!caption.trim()) {
        toast({ title: 'Error', description: 'Please add a caption', variant: 'destructive' });
        return;
      }
      addPost({
        userId: currentUser.id,
        user: currentUser,
        image: selectedImage || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption,
        description,
        hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
        visibility,
      });
      toast({ title: 'Success', description: 'Post created successfully!' });
      resetForm();
    } else if (activeTab === 'story') {
      toast({ title: 'Success', description: 'Story shared successfully!' });
      resetForm();
    } else if (activeTab === 'notes') {
      if (!title.trim() || !subject.trim()) {
        toast({ title: 'Error', description: 'Please fill title and subject', variant: 'destructive' });
        return;
      }
      addNote({
        userId: currentUser.id,
        user: currentUser,
        title,
        subject,
        description,
        resourceType: 'pdf',
        year: `Year ${currentUser.year}`,
      });
      toast({ title: 'Success', description: 'Note published successfully!' });
      resetForm();
    }
  };

  const inputClass = 'w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring';

  return (
    <div className="min-h-screen bg-card pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-card shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Create</h1>
        <p className="text-sm text-muted-foreground mt-1">Share your college moments</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-6">
        {(['post', 'story', 'notes'] as TabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-3 text-sm font-medium border-b-2 capitalize transition-colors',
              activeTab === tab ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground'
            )}
          >
            {tab === 'notes' ? 'Notes' : tab === 'story' ? 'Story' : 'Post'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-5 max-w-lg mx-auto">
        {/* Image Upload / Preview */}
        {selectedImage ? (
          <div className="relative rounded-lg overflow-hidden bg-secondary">
            <img src={selectedImage} alt="" className="w-full object-cover" style={{ aspectRatio }} />
            <label className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer">
              <RefreshCw className="h-4 w-4" /> Change
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-2 py-10 border-2 border-dashed border-primary rounded-lg bg-secondary/50 cursor-pointer">
            <Upload className="h-12 w-12 text-primary" />
            <span className="text-sm text-foreground">Choose File *</span>
            <span className="text-xs font-semibold text-primary">Browse Gallery</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}

        {/* Post Tab */}
        {activeTab === 'post' && (
          <>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Caption *</label>
              <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="What's on your mind? Share your story…" rows={3} className={cn(inputClass, 'resize-none')} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Description (Optional)</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Add more details..." rows={3} className={cn(inputClass, 'resize-none')} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Hashtags / Tags (Optional)</label>
              <input value={hashtags} onChange={e => setHashtags(e.target.value)} placeholder="#CollegeLife #Coding" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Visibility</label>
              <div className="flex gap-2">
                {(['my_college', 'all_colleges', 'followers'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setVisibility(v)}
                    className={cn(
                      'flex-1 py-2 text-sm font-medium rounded-lg border transition-colors',
                      visibility === v
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground border-border'
                    )}
                  >
                    {v === 'my_college' ? 'My College' : v === 'all_colleges' ? 'All Colleges' : 'Followers'}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handlePost} className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold">Post</button>
          </>
        )}

        {/* Story Tab */}
        {activeTab === 'story' && (
          <>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Caption (Optional)</label>
              <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="Add a caption..." rows={2} className={cn(inputClass, 'resize-none')} />
            </div>
            <button onClick={handlePost} className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold">Share to Story</button>
          </>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., DSP Unit-3 Short Notes" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Course / Subject *</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., Digital Signal Processing" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Description or Summary</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the notes..." rows={3} className={cn(inputClass, 'resize-none')} />
            </div>
            <button onClick={handlePost} className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold">Publish Note</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
