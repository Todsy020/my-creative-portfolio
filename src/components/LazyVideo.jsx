import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * LazyVideo - Optimized video component with IntersectionObserver
 * Only loads video when visible in viewport
 *
 * @param {string} src - Video source URL (webm)
 * @param {string} srcMp4 - MP4 fallback for Safari iOS (optional)
 * @param {string} poster - Optional poster image URL
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles (for Framer Motion)
 * @param {boolean} priority - If true, preload immediately (for above-fold videos)
 * @param {object} motionProps - Additional Framer Motion props
 */
const LazyVideo = ({
  src,
  srcMp4,
  poster,
  className = '',
  style = {},
  priority = false,
  motionProps = {},
  ...videoProps
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If priority video, load immediately
    if (priority) {
      setIsLoaded(true);
      return;
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // IntersectionObserver with margin to preload before visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true);
            observer.unobserve(videoElement);
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [priority, isLoaded]);

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load video: ${src}`);
  };

  return (
    <motion.video
      ref={videoRef}
      style={style}
      className={className}
      poster={poster}
      autoPlay={isLoaded && !hasError}
      loop
      muted
      playsInline
      preload={priority ? 'auto' : 'none'}
      onError={handleError}
      {...motionProps}
      {...videoProps}
    >
      {/* MP4 first for better iOS Safari compatibility */}
      {isLoaded && srcMp4 && <source src={srcMp4} type="video/mp4" />}
      {isLoaded && <source src={src} type="video/webm" />}
      {/* Fallback message */}
      {hasError && (
        <div className="flex items-center justify-center h-full bg-gray-800 text-white">
          Video unavailable
        </div>
      )}
    </motion.video>
  );
};

export default LazyVideo;
