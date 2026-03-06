import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/discover', icon: Search, label: 'Explore' },
  { path: '/create', icon: PlusCircle, label: 'Create' },
  { path: '/notes', icon: BookOpen, label: 'Notes' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();

  const hiddenRoutes = ['/chat/'];
  const shouldHide = hiddenRoutes.some(r => location.pathname.startsWith(r));
  if (shouldHide) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/60 safe-bottom">
      <div className="mx-auto max-w-lg flex items-center justify-around h-[60px] px-1">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          const isCreate = path === '/create';

          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center gap-[2px] w-14 h-14"
            >
              {isCreate ? (
                <div className="gradient-accent rounded-2xl p-2.5 shadow-lg shadow-primary/25 active:scale-95 transition-transform">
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
              ) : (
                <>
                  <Icon
                    className={cn(
                      'h-[22px] w-[22px] transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    fill={isActive ? 'currentColor' : 'none'}
                  />
                  <span
                    className={cn(
                      'text-[10px] font-semibold tracking-tight transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full gradient-primary" />
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
