import { useEffect } from 'react';
import { soundManager } from '../../../services/soundManager';
import { useUnreadCount } from '../../../hooks/utils/useUnreadCount';

export const useSoundUnlock = () => {
  useEffect(() => {
    const unlock = () => {
      soundManager.unlock();
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
    window.addEventListener('touchstart', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);
};

export const useDocumentTitle = () => {
  const totalUnread = useUnreadCount();

  useEffect(() => {
    document.title = totalUnread > 0 ? `(${totalUnread}) Smurfy` : 'Smurfy';
  }, [totalUnread]);

  return totalUnread;
};
