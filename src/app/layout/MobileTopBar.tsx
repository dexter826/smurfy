import React from 'react';
import { useResolvedTheme } from '../../store/themeStore';
import { NotificationDropdown } from '@/features/notification';

export const MobileTopBar: React.FC = () => {
  const mode = useResolvedTheme();

  return (
    <header className="lg:hidden h-14 flex-shrink-0 bg-surface border-b border-default flex items-center justify-between px-4">
      <img
        src={mode === 'dark' ? '/logo_text_white.png' : '/logo_text_blue.png'}
        alt="Smurfy"
        className="h-7 object-contain"
      />
      <NotificationDropdown />
    </header>
  );
};
