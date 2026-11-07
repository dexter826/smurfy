import React, { useCallback, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../store/notificationStore';
import { useAuthStore } from '@/features/auth';
import { IconButton, Popover } from '@/components/ui';
import { NotificationList } from './NotificationList';

export const NotificationDropdown: React.FC = () => {
  const { user } = useAuthStore();
  const { unreadCount, markAllAsRead } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewAll = useCallback(() => {
    navigate('/notifications');
    setOpen(false);
  }, [navigate]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      align="end"
      contentClassName="w-[380px] max-w-[calc(100vw-24px)] p-0"
      trigger={
        <IconButton
          icon={
            <div className="relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
              )}
            </div>
          }
          variant="ghost"
          title="Thông báo"
          className={`text-secondary hover:bg-hover hover:text-foreground transition-all duration-200 active:bg-active ${open ? 'bg-primary-soft text-primary-strong' : ''}`}
        />
      }
    >
      <div className="flex items-center justify-between border-b border-border-default bg-surface px-5 py-4">
        <div>
          <h3 className="text-sm font-bold tracking-tight text-foreground">Thông báo</h3>
          {unreadCount > 0 && (
            <p className="mt-0.5 text-caption font-semibold text-primary">
              Bạn có {unreadCount} thông báo mới
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() => user && markAllAsRead(user.id)}
            className="rounded-sm px-2.5 py-1.5 text-caption font-bold text-primary transition-colors duration-200 hover:bg-primary-soft"
          >
            Đọc tất cả
          </button>
        )}
      </div>

      <NotificationList onItemClick={() => setOpen(false)} maxHeight="420px" />

      <div className="border-t border-border-default bg-background/30 p-2">
        <button
          type="button"
          className="w-full rounded-sm py-2.5 text-sm font-bold text-secondary transition-colors duration-200 hover:bg-primary-soft hover:text-primary"
          onClick={handleViewAll}
        >
          Xem tất cả thông báo
        </button>
      </div>
    </Popover>
  );
};
