import { ReactNode } from 'react';
import BottomNav from './BottomNav';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg min-h-screen pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
