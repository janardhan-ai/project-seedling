import { Heart, Bookmark, FileText, Link as LinkIcon, File } from 'lucide-react';
import { Note } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const ResourceIcon = resourceIcons[note.resourceType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 mb-3 card-shadow cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/note/${note.id}`)}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl gradient-primary p-2.5 shrink-0 shadow-sm shadow-primary/20">
          <ResourceIcon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-[14px] leading-tight truncate">
            {note.title}
          </h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">{note.subject} · {note.year}</p>
          <p className="text-[12px] text-muted-foreground/80 mt-1.5 line-clamp-2 leading-[17px]">{note.description}</p>

          <div className="flex items-center gap-3 mt-3">
            <Avatar className="h-5 w-5">
              <AvatarImage src={note.user.avatar} />
              <AvatarFallback className="text-[8px]">{note.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[12px] text-muted-foreground font-medium">{note.user.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">
              {note.resourceType.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-border/50">
            <button
              onClick={(e) => { e.stopPropagation(); likeNote(note.id); }}
              className="flex items-center gap-1 group active:scale-90 transition-transform"
            >
              <Heart
                className={cn(
                  'h-4 w-4 transition-all',
                  note.isLiked ? 'fill-accent text-accent' : 'text-muted-foreground group-hover:text-accent'
                )}
              />
              <span className="text-[12px] text-muted-foreground font-medium">{note.likes}</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); saveNote(note.id); }}
              className="flex items-center gap-1 group active:scale-90 transition-transform"
            >
              <Bookmark
                className={cn(
                  'h-4 w-4 transition-all',
                  note.isSaved ? 'fill-primary text-primary' : 'text-muted-foreground group-hover:text-primary'
                )}
              />
              <span className="text-[12px] text-muted-foreground font-medium">{note.saves}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
