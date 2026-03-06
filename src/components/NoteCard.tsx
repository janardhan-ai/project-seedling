import { Heart, Bookmark, FileText, Link as LinkIcon, File } from 'lucide-react';
import { Note } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
}

const resourceIcons = {
  pdf: FileText,
  link: LinkIcon,
  doc: File,
};

const NoteCard = ({ note }: NoteCardProps) => {
  const { likeNote, saveNote } = useApp();
  const ResourceIcon = resourceIcons[note.resourceType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 mb-3"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl gradient-primary p-2.5 shrink-0">
          <ResourceIcon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            {note.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{note.subject} · {note.year}</p>
          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">{note.description}</p>

          <div className="flex items-center gap-3 mt-3">
            <Avatar className="h-5 w-5">
              <AvatarImage src={note.user.avatar} />
              <AvatarFallback className="text-[8px]">{note.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{note.user.name}</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {note.resourceType.toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mt-3 pt-2 border-t border-border/50">
            <button onClick={() => likeNote(note.id)} className="flex items-center gap-1 group">
              <Heart
                className={cn(
                  'h-4 w-4 transition-all',
                  note.isLiked ? 'fill-accent text-accent' : 'text-muted-foreground group-hover:text-accent'
                )}
              />
              <span className="text-xs text-muted-foreground">{note.likes}</span>
            </button>
            <button onClick={() => saveNote(note.id)} className="flex items-center gap-1 group">
              <Bookmark
                className={cn(
                  'h-4 w-4 transition-all',
                  note.isSaved ? 'fill-campus-blue text-campus-blue' : 'text-muted-foreground group-hover:text-campus-blue'
                )}
              />
              <span className="text-xs text-muted-foreground">{note.saves}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
