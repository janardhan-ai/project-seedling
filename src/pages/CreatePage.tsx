import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Image, FileText, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CreatePage = () => {
  const { currentUser, addPost, addNote } = useApp();
  const navigate = useNavigate();

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hashtags, setHashtags] = useState('');

  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('');
  const [noteDesc, setNoteDesc] = useState('');

  const handleCreatePost = () => {
    if (!currentUser || !caption) return;
    addPost({
      userId: currentUser.id,
      user: currentUser,
      image: imageUrl || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption,
      hashtags: hashtags.split(' ').filter(Boolean),
      visibility: 'all_colleges',
    });
    navigate('/');
  };

  const handleCreateNote = () => {
    if (!currentUser || !noteTitle) return;
    addNote({
      userId: currentUser.id,
      user: currentUser,
      title: noteTitle,
      subject: noteSubject,
      year: `Year ${currentUser.year}`,
      description: noteDesc,
      resourceType: 'pdf',
    });
    navigate('/notes');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2">
          <X className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Create</h1>
        <div className="w-9" />
      </header>

      <div className="flex-1 px-4 py-4">
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="w-full gradient-primary mb-6">
            <TabsTrigger value="post" className="flex-1 data-[state=active]:bg-background/90 data-[state=active]:text-foreground text-primary-foreground/70">
              <Image className="h-4 w-4 mr-1.5" /> Post
            </TabsTrigger>
            <TabsTrigger value="note" className="flex-1 data-[state=active]:bg-background/90 data-[state=active]:text-foreground text-primary-foreground/70">
              <FileText className="h-4 w-4 mr-1.5" /> Note
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="min-h-[100px] bg-secondary border-0 rounded-xl"
            />
            <Input
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="bg-secondary border-0 rounded-xl"
            />
            <Input
              placeholder="#hashtags separated by spaces"
              value={hashtags}
              onChange={e => setHashtags(e.target.value)}
              className="bg-secondary border-0 rounded-xl"
            />
            <Button onClick={handleCreatePost} className="w-full gradient-primary text-primary-foreground rounded-xl">
              Share Post
            </Button>
          </TabsContent>

          <TabsContent value="note" className="space-y-4">
            <Input
              placeholder="Note title"
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
              className="bg-secondary border-0 rounded-xl"
            />
            <Input
              placeholder="Subject"
              value={noteSubject}
              onChange={e => setNoteSubject(e.target.value)}
              className="bg-secondary border-0 rounded-xl"
            />
            <Textarea
              placeholder="Description"
              value={noteDesc}
              onChange={e => setNoteDesc(e.target.value)}
              className="min-h-[100px] bg-secondary border-0 rounded-xl"
            />
            <Button onClick={handleCreateNote} className="w-full gradient-primary text-primary-foreground rounded-xl">
              Share Note
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatePage;
