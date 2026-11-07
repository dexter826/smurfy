import React, { RefObject } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Post, PostType } from '@shared/types';
import { SensitiveMediaGuard } from '@/components/ui';
import { SystemPostMedia } from '../shared/SystemPostMedia';

interface PostViewCinemaProps {
  post: Post;
  allMedia: Array<{
    url: string;
    thumbnail?: string;
    type: 'image' | 'video';
    isSensitive?: boolean;
  }>;
  activeMediaIndex: number;
  setActiveMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsMediaViewerOpen: (open: boolean) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
}

export const PostViewCinema: React.FC<PostViewCinemaProps> = ({
  post,
  allMedia,
  activeMediaIndex,
  setActiveMediaIndex,
  setIsMediaViewerOpen,
  videoRef,
  isVideoPlaying,
  setIsVideoPlaying,
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
      ) : allMedia[activeMediaIndex].type === 'video' ? (
        <SensitiveMediaGuard
          isSensitive={allMedia[activeMediaIndex].isSensitive}
          className="w-full h-full min-h-0 min-w-0"
        >
          <div className="w-full h-full flex items-center justify-center relative group/player">
            <video
              ref={videoRef}
              src={allMedia[activeMediaIndex].url}
              poster={allMedia[activeMediaIndex].thumbnail}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                }
              }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-background hover:bg-active text-foreground rounded-full border border-border transition-all duration-200 active:scale-95 z-20 ${
                isVideoPlaying ? 'opacity-0 group-hover/player:opacity-100' : 'opacity-100'
              }`}
            >
              {isVideoPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
          </div>
        </SensitiveMediaGuard>
      ) : (
        <SensitiveMediaGuard
          isSensitive={allMedia[activeMediaIndex].isSensitive}
          className="w-full h-full min-h-0 min-w-0"
        >
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={allMedia[activeMediaIndex].url}
              alt=""
              className="w-full h-full object-contain hover:opacity-95 transition-opacity duration-200 animate-fade-in"
            />
          </div>
        </SensitiveMediaGuard>
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
