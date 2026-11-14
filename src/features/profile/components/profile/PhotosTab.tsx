import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { MediaObject } from '@shared/types';
import { postService } from '@/features/feed';
import { Skeleton, MediaViewer, LazyImage, EmptyState } from '@/components/ui';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useFriendIds } from '@/hooks';
import { DocumentSnapshot } from 'firebase/firestore';

const MEDIA_PAGE_SIZE = 15;

interface PhotosTabProps {
  userId: string;
  isViewActivityBlocked?: boolean;
}

type MediaItem = {
  url: string;
  thumbnailUrl?: string;
};

const PhotosTabInner: React.FC<PhotosTabProps> = ({ userId, isViewActivityBlocked = false }) => {
  const [realtimeMedia, setRealtimeMedia] = useState<MediaItem[]>([]);
  const [historyMedia, setHistoryMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { user: currentUser } = useAuthStore();
  const friendIds = useFriendIds();
  const lastDocRef = useRef<DocumentSnapshot | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const extractMedia = useCallback(
    (posts: { media?: MediaObject[] }[]): MediaItem[] =>
      posts.flatMap((post) =>
        (post.media || []).map((m) => ({
          url: m.url,
          thumbnailUrl: m.thumbnailUrl,
        })),
      ),
    [],
  );

  const loadMedia = useCallback(
    async (isLoadMore = false) => {
      if (!currentUser) return;
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      try {
        const { posts, lastDoc } = await postService.getUserPosts(
          userId,
          currentUser.id,
          friendIds,
          MEDIA_PAGE_SIZE,
          isLoadMore ? (lastDocRef.current ?? undefined) : undefined,
        );
        lastDocRef.current = lastDoc;
        setHasMore(posts.length === MEDIA_PAGE_SIZE && !!lastDoc);
        const newMedia = extractMedia(posts);
        if (isLoadMore) {
          setHistoryMedia((prev) => [...prev, ...newMedia]);
        } else {
          setRealtimeMedia(newMedia);
          setHistoryMedia([]);
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [userId, currentUser, friendIds, extractMedia],
  );

  useEffect(() => {
    if (isViewActivityBlocked) {
      setLoading(false);
      setRealtimeMedia([]);
      setHistoryMedia([]);
      setHasMore(false);
      return;
    }

    lastDocRef.current = null;
    setRealtimeMedia([]);
    setHistoryMedia([]);
    setHasMore(true);

    loadMedia(false);

    const unsubscribe = postService.subscribeToUserPosts(
      userId,
      currentUser?.id || '',
      friendIds,
      (action) => {
        if (action === 'add' || action === 'update' || action === 'remove') {
          postService
            .getUserPosts(userId, currentUser?.id || '', friendIds, MEDIA_PAGE_SIZE)
            .then(({ posts: latestPosts, lastDoc }) => {
              setRealtimeMedia(extractMedia(latestPosts));
              if (historyMedia.length === 0) {
                lastDocRef.current = lastDoc;
                setHasMore(latestPosts.length === MEDIA_PAGE_SIZE && !!lastDoc);
              }
            });
        }
      },
      MEDIA_PAGE_SIZE,
    );

    return () => unsubscribe();
  }, [userId, isViewActivityBlocked, currentUser?.id, friendIds, extractMedia, loadMedia]);

  const media = useMemo(() => {
    const combined = [...realtimeMedia, ...historyMedia];
    const seen = new Set();
    return combined.filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    });
  }, [realtimeMedia, historyMedia]);

  useEffect(() => {
    if (!observerRef.current || !hasMore || loading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMore) loadMedia(true);
      },
      { rootMargin: '200px' },
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMedia]);

  const mediaViewerItems = useMemo(
    () =>
      media.map((m) => ({
        type: 'image' as const,
        url: m.url,
      })),
    [media],
  );

  if (loading && !isViewActivityBlocked) return <PhotosTabSkeleton />;

  if (media.length === 0 || isViewActivityBlocked) {
    return <EmptyState icon={ImageIcon} title="Chưa có ảnh nào" variant="boxed" size="md" />;
  }

  return (
    <>
      <div className="bg-surface rounded-card border border-line p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base text-ink">
            Ảnh
            <span className="text-ink-3 font-normal ml-1.5 text-sm tnum">
              ({media.length}
              {hasMore ? '+' : ''})
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {media.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="aspect-square bg-surface-2 rounded-control overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedIndex(index)}
            >
              <LazyImage
                src={item.url}
                alt={`Ảnh ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                wrapperClassName="w-full h-full"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
            </div>
          ))}
        </div>

        <div ref={observerRef} className="h-4" />
        {loadingMore && (
          <div className="flex justify-center py-4">
            <Loader2 size={22} className="animate-spin text-accent" />
          </div>
        )}
      </div>

      <MediaViewer
        media={mediaViewerItems}
        initialIndex={selectedIndex}
        open={selectedIndex >= 0}
        onOpenChange={() => setSelectedIndex(-1)}
      />
    </>
  );
};

const PhotosTabSkeleton: React.FC = () => (
  <div className="bg-surface rounded-card border border-line p-4 md:p-5">
    <Skeleton width={120} height={20} className="mb-4" />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} variant="rect" className="aspect-square rounded-control" />
      ))}
    </div>
  </div>
);

export const PhotosTab = Object.assign(React.memo(PhotosTabInner), { Skeleton: PhotosTabSkeleton });
