import React, { useState, useRef, useEffect } from 'react';

const DEFAULT_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdG09IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGNEY1RjciLz48cmVjdCB4PSIxNTAiIHk9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMiIgZmlsbD0iI0QxRDVREIi8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMiIgZmlsbD0iI0Y0RjVGNyIvPjxwYXRoIGQ9Ik0xNTAgMTYwTDE4MCAxMzBMMjEwIDE2MEwyMzAgMTQwTDI1MCAxNjBWMTkwSDE1MFYxNjBaIiBmaWxsPSIjRjRGNUY3Ii8+PC9zdmc+';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  fallback?: string;
  className?: string;
  wrapperClassName?: string;
  onLoad?: (e?: any) => void;
}

/**
 * Hiển thị ảnh với cơ chế Lazy load và hiệu ứng Fade-in
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallback = DEFAULT_PLACEHOLDER,
  onLoad: externalOnLoad,
  ...props
}) => {
  const isBlob = src.startsWith('blob:');
  const [isInView, setIsInView] = useState(isBlob);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBlob) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [src, isBlob]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && <div className={`w-full h-full bg-background animate-pulse ${className}`} />}

      {isInView && (
        <img
          src={error ? fallback : src}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
            externalOnLoad?.();
          }}
          onError={() => {
            setError(true);
            setIsLoaded(true);
            externalOnLoad?.();
          }}
          className={`relative z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading={isBlob ? 'eager' : 'lazy'}
          {...props}
        />
      )}
    </div>
  );
};
