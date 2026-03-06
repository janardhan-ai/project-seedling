import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, BookOpen, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/discover', icon: Search, label: 'Discover' },
  { path: '/create', icon: PlusSquare, label: 'Create' },
  { path: '/notes', icon: BookOpen, label: 'Notes' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();

  // Hide on certain routes
  const hiddenRoutes = ['/messages/', '/chat/'];
  const shouldHide = hiddenRoutes.some(r => location.pathname.startsWith(r));
  if (shouldHide) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 safe-area-bottom">
      <div className="mx-auto max-w-lg flex items-center justify-around h-16 px-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          const isCreate = path === '/create';

          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1"
            >
              {isCreate ? (
                <div className="gradient-primary rounded-xl p-2.5 shadow-lg shadow-primary/30">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
              ) : (
                <>
                  <Icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[10px] font-medium transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-0.5 h-0.5 w-6 rounded-full gradient-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
