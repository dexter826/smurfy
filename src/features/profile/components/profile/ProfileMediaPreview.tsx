import React from 'react';
import { MediaObject } from '@shared/types';
import { EmptyState, MediaViewer } from '@/components/ui';

interface ProfileMediaPreviewProps {
  media: MediaObject[];
  isBlocked: boolean;
  onSeeAll: () => void;
}

export const ProfileMediaPreview: React.FC<ProfileMediaPreviewProps> = ({
  media,
  isBlocked,
  onSeeAll,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const mediaViewerItems = React.useMemo(
    () =>
      media.map((m) => ({
        url: m.url,
        type: 'image' as const,
      })),
    [media],
  );

  return (
    <div className="bg-surface rounded-card border border-line p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base text-ink">Ảnh</h3>
        <button
          onClick={onSeeAll}
          className="text-xs text-accent-strong font-semibold hover:underline transition-colors"
        >
          Xem tất cả
        </button>
      </div>

      {media.length > 0 && !isBlocked ? (
        <div className="grid grid-cols-3 gap-1.5">
          {media.map((item, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-control overflow-hidden bg-surface-2 cursor-pointer group"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Chưa có ảnh nào" size="sm" className="py-4" />
      )}

      <MediaViewer
        media={mediaViewerItems}
        initialIndex={selectedIndex}
        open={selectedIndex >= 0}
        onOpenChange={() => setSelectedIndex(-1)}
      />
    </div>
  );
};
