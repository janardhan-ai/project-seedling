import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, MapPin, Users, Calendar as CalendarIcon, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/data/events';

const categories = ['All', 'Cultural', 'Technical', 'Sports', 'Workshop', 'Seminar', 'General'];

const EventsPage = () => {
  const { events } = useApp();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const renderEventCard = (item: Event) => {
    const spotsLeft = item.max_attendees - item.current_attendees;

    return (
      <div
        key={item.id}
        className="bg-card rounded-2xl overflow-hidden mb-4 shadow-md cursor-pointer"
        onClick={() => navigate(`/event/${item.id}`)}
      >
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-[180px] object-cover"
          loading="lazy"
        />
        <div className="p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <div className="bg-primary/15 px-2 py-1 rounded-lg">
              <span className="text-xs text-primary font-semibold">{item.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm text-primary font-medium">
                {new Date(item.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
          <p className="text-base text-muted-foreground mb-4 line-clamp-2 leading-5">{item.description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{spotsLeft} spots left</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic">{item.college_name}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card px-4 pt-3 pb-3 shadow-sm flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground flex-1 text-center">Campus Events</h1>
        <button onClick={() => setShowFilterModal(true)} className="w-10 h-10 flex items-center justify-center">
          <Filter className="h-6 w-6 text-primary" />
        </button>
      </header>

      {/* Event List */}
      <div className="flex-1 px-4 py-4">
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <CalendarIcon className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mt-4">No events found</p>
          </div>
        ) : (
          filteredEvents.map(renderEventCard)
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilterModal(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-t-[20px] pb-8 animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Filter Events</h3>
              <button onClick={() => setShowFilterModal(false)}>
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            {/* Filter Options */}
            <div className="p-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={cn(
                    'w-full py-4 border-b border-border text-left',
                    selectedCategory === cat && 'bg-primary/10'
                  )}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilterModal(false);
                  }}
                >
                  <div className="flex items-center justify-between px-2">
                    <span
                      className={cn(
                        'text-lg font-medium text-foreground',
                        selectedCategory === cat && 'text-primary font-semibold'
                      )}
                    >
                      {cat}
                    </span>
                    {selectedCategory === cat && (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
