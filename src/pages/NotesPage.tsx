import { useApp } from '@/context/AppContext';
import NoteCard from '@/components/NoteCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const subjects = ['All', 'DSA', 'Web Dev', 'ML/AI', 'DBMS', 'OS', 'Networks'];

const NotesPage = () => {
  const { notes } = useApp();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = notes.filter(note => {
    const matchesQuery =
      !query ||
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.subject.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === 'All' || note.subject.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50">
        <h1 className="text-lg font-bold font-display text-foreground mb-3">Notes</h1>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9 bg-secondary border-0 rounded-xl"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {subjects.map(s => (
            <Badge
              key={s}
              variant={activeFilter === s ? 'default' : 'secondary'}
              className={cn(
                'cursor-pointer shrink-0 transition-all',
                activeFilter === s && 'gradient-primary border-0'
              )}
              onClick={() => setActiveFilter(s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </header>

      <div className="flex-1 px-4 py-4">
        {filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <NoteCard note={note} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
