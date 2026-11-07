import React from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Post, PostType } from '@shared/types';
import { SystemPostMedia } from '../shared/SystemPostMedia';

interface PostViewCinemaProps {
  post: Post;
  allMedia: Array<{
    url: string;
    thumbnail?: string;
    type: 'image';
  }>;
  activeMediaIndex: number;
  setActiveMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsMediaViewerOpen: (open: boolean) => void;
}

export const PostViewCinema: React.FC<PostViewCinemaProps> = ({
  post,
  allMedia,
  activeMediaIndex,
  setActiveMediaIndex,
  setIsMediaViewerOpen,
}) => (
  <div className="hidden lg:flex flex-[1.6] bg-chat items-center justify-center relative overflow-hidden border-r border-white/5 shrink-0">
    <div
      className="w-full h-full relative flex items-center justify-center min-h-0 min-w-0"
      style={{ zIndex: 10 }}
    >
      <div className="absolute top-4 right-4" style={{ zIndex: 40 }}>
        <button
          onClick={() => setIsMediaViewerOpen(true)}
          className="w-11 h-11 flex items-center justify-center bg-black/20 hover:bg-black/30 active:scale-95 backdrop-blur-md text-white rounded-full border border-white/10 shadow-xl transition-all duration-150"
          title="Xem toàn màn hình"
        >
          <Maximize2 size={22} strokeWidth={2} />
        </button>
      </div>

      {!allMedia[activeMediaIndex] ? (
        <p className="text-white/40 text-sm">Không tìm thấy nội dung</p>
      ) : post.type === PostType.AVATAR_UPDATE || post.type === PostType.COVER_UPDATE ? (
        <SystemPostMedia
          type={post.type as PostType.AVATAR_UPDATE | PostType.COVER_UPDATE}
          media={post.media || []}
          variant="cinema"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={allMedia[activeMediaIndex].url}
            alt=""
            className="w-full h-full object-contain hover:opacity-95 transition-opacity duration-200 animate-fade-in"
          />
        </div>
      )}

      {allMedia.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((p) => (p === 0 ? allMedia.length - 1 : p - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/20 hover:bg-black/30 active:scale-90 backdrop-blur-md text-white rounded-full border border-white/10 shadow-xl transition-all duration-150"
            style={{ zIndex: 30 }}
            aria-label="Media trước"
          >
            <ChevronLeft size={28} strokeWidth={2} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((p) => (p === allMedia.length - 1 ? 0 : p + 1));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/20 hover:bg-black/30 active:scale-90 backdrop-blur-md text-white rounded-full border border-white/10 shadow-xl transition-all duration-150"
            style={{ zIndex: 30 }}
            aria-label="Media sau"
          >
            <ChevronRight size={28} strokeWidth={2} />
          </button>
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white/90 text-xs font-medium pointer-events-none"
            style={{ zIndex: 30 }}
          >
            {activeMediaIndex + 1} / {allMedia.length}
          </div>
        </>
      )}
    </div>
  </div>
);
