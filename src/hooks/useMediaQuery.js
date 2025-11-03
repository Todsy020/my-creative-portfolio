import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media queries and respond to window resize
 * @param {string} query - Media query string (e.g., '(min-width: 1024px)')
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Handler to update state when media query changes
    const handleChange = (e) => setMatches(e.matches);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Add listener (modern API)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
};

// Preset hooks for common breakpoints
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
