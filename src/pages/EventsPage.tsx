import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const categoryColors: Record<string, string> = {
  Technical: 'bg-campus-blue/10 text-campus-blue',
  Cultural: 'bg-campus-pink/10 text-campus-pink',
  Sports: 'bg-campus-green/10 text-campus-green',
  Workshop: 'bg-campus-orange/10 text-campus-orange',
  Seminar: 'bg-campus-purple/10 text-campus-purple',
  General: 'bg-secondary text-secondary-foreground',
  Arts: 'bg-accent/10 text-accent',
  Health: 'bg-campus-green/10 text-campus-green',
};

const EventsPage = () => {
  const { events } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 glass-card px-4 py-3 border-b border-border/50 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Events</h1>
      </header>

      <div className="flex-1 px-4 py-4 space-y-4">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <Badge className={`absolute top-3 left-3 ${categoryColors[event.category] || 'bg-secondary text-secondary-foreground'}`}>
                {event.category}
              </Badge>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{event.title}</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {new Date(event.event_date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {event.current_attendees}/{event.max_attendees} attending
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
