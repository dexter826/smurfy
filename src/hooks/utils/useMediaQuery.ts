import { useState, useEffect } from 'react';

/**
 * Kiểm tra media query
 */
export const useMediaQuery = (query: string): boolean => {
  // Khởi tạo đồng bộ từ matchMedia để tránh nháy layout sai ở lần render đầu
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Kiểm tra màn hình mobile.
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
