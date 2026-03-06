import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav safe-bottom">
      <div className="mx-auto max-w-lg flex items-center justify-around h-[64px] px-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          const isCreate = path === '/create';

          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center gap-[3px] w-14 h-14"
            >
              {isCreate ? (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="gradient-accent rounded-2xl p-2.5 shadow-lg shadow-primary/25"
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </motion.div>
              ) : (
                <>
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="relative"
                  >
                    <Icon
                      className={cn(
                        'h-[22px] w-[22px] transition-all duration-200',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                      strokeWidth={isActive ? 2.2 : 1.7}
                      fill={isActive ? 'currentColor' : 'none'}
                    />
                  </motion.div>
                  <span
                    className={cn(
                      'text-[10px] font-semibold tracking-tight transition-all duration-200',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -top-0.5 w-6 h-[3px] rounded-full gradient-accent"
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
