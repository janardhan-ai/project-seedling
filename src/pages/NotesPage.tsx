import { useApp } from '@/context/AppContext';
import NoteCard from '@/components/NoteCard';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const collegeOptions = [
  { label: 'All Colleges', value: 'all' },
  { label: 'My College', value: 'my' },
];

const subjectOptions = [
  { label: 'All Subjects', value: 'all' },
  { label: 'CSE', value: 'cse' },
  { label: 'ECE', value: 'ece' },
  { label: 'EEE', value: 'eee' },
];

const NotesPage = () => {
  const { notes } = useApp();
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filtered = notes.filter(note => {
    const matchesSubject =
      subjectFilter === 'all' || note.subject.toLowerCase().includes(subjectFilter);
    return matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-foreground mb-4">Notes</h1>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">College</p>
            <select
              value={collegeFilter}
              onChange={e => setCollegeFilter(e.target.value)}
              className="w-full h-10 bg-background border border-border rounded-lg px-3 text-sm text-foreground outline-none"
            >
              {collegeOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Subject</p>
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className="w-full h-10 bg-background border border-border rounded-lg px-3 text-sm text-foreground outline-none"
            >
              {subjectOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="px-4 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No notes found</p>
          </div>
        ) : (
          filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NoteCard note={note} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage;
