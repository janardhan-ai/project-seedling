import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Zap, BookOpen, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/discover', icon: Search, label: 'Discover' },
  { path: '/create', icon: Zap, label: 'Vibes' },
  { path: '/notes', icon: BookOpen, label: 'Notes' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();

  const hiddenRoutes = ['/chat/'];
  const shouldHide = hiddenRoutes.some(r => location.pathname.startsWith(r));
  if (shouldHide) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="mx-auto max-w-lg flex items-center justify-around h-16 px-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          const isVibes = path === '/create';

          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1"
            >
              {isVibes ? (
                <>
                  <div className="gradient-primary rounded-xl p-2 shadow-md">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-primary mt-0.5">{label}</span>
                </>
              ) : (
                <>
                  <Icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                    fill={isActive && path === '/' ? 'currentColor' : 'none'}
                  />
                  <span
                    className={cn(
                      'text-[10px] font-medium transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {label}
                  </span>
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
