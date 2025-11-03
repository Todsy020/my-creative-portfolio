/**
 * Animation constants and variants
 * Centralized to maintain consistency and ease of modification
 */

// Timing constants
export const TIMING = {
  LOADING_SCREEN_DELAY: 500,
  LOADING_SCREEN_EXIT: 600,
  LOADING_FALLBACK_TIMEOUT: 6000,
  ANIMATION_START_DELAY: 500,
  COUNTER_DURATION: 2500,
  COUNTER_FPS: 16,
};

// Spring configurations
export const SPRING_CONFIGS = {
  smooth: {
    stiffness: 80,
    damping: 12,
  },
  smoothY: {
    stiffness: 70,
    damping: 15,
  },
  bouncy: {
    stiffness: 140,
    damping: 15,
  },
  stiff: {
    stiffness: 300,
    damping: 15,
  },
  video: {
    stiffness: 80,
    damping: 15,
  },
};

// Scroll transform ranges
export const SCROLL_RANGES = {
  firstSection: {
    scale: [0, 1],
    hello: {
      offset: [0, 0.2],
      opacity: [0, 0.16],
    },
  },
  secondSection: {
    scale: [0.36, 1.36],
    rotate: [8, -8.8],
    text: {
      offset: ['start 45%', 'start 5%'],
      y: ['30vh', 0],
      opacity: [0, 1],
      scale: [0.8, 1],
    },
    video: {
      offset: ['start 65%', 'start 15%'],
      video1: {
        y: [0, 0.3],
        opacity: [0, 0.5],
      },
      video2: {
        y: [0.8, 0.98],
        opacity: [0.75, 0.98],
      },
      video3: {
        y: [0.6, 0.8],
        opacity: [0.55, 0.8],
      },
      image1: {
        y: [0.3, 0.65],
        opacity: [0.3, 0.65],
      },
    },
  },
  thirdSection: {
    scale: [0.66, 1.66],
    rotate: [-8, 8.8],
    text: {
      desktop: {
        y: [290, -110],
      },
      mobile: {
        y: [150, -40],
      },
      scale: [0.6, 1],
      opacity: [0, 1],
    },
  },
  fourthSection: {
    rotate: [8, -7.2],
    text: {
      y: ['8vh', 0],
      opacity: [0, 1],
      scale: [0.7, 1],
    },
  },
};

// Common animation variants
export const VARIANTS = {
  // Hello text animation
  helloContainer: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  },
  helloLetter: {
    hidden: { y: '85vh', opacity: 1, rotate: 15 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 15,
        duration: 0.5,
      },
    },
  },
  // Avatar image animation
  avatarImgContainer: {
    hidden: { y: '30vh', opacity: 0.1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  // Fade in from bottom
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  // Loading screen
  loadingScreen: {
    initial: { opacity: 1, x: 0, y: 0 },
    animate: { opacity: 1 },
    exit: (offsetExit) => ({
      opacity: 0,
      x: offsetExit ? 30 : 0,
      y: offsetExit ? 30 : 0,
      transition: { duration: 0.6 },
    }),
  },
};

// Motion preferences
export const getMotionConfig = (prefersReducedMotion) => {
  if (prefersReducedMotion) {
    return {
      initial: false,
      animate: false,
      exit: false,
      transition: { duration: 0 },
    };
  }
  return {};
};

// Rotation angles for sections
export const ROTATION_ANGLES = {
  secondSection: {
    desktop: [8, -8.8],
    mobile: [0, 0],
  },
  thirdSection: {
    desktop: [-8, 8.8],
    mobile: [0, 0],
  },
  fourthSection: {
    desktop: [8, -7.2],
    mobile: [0, 0],
  },
};
