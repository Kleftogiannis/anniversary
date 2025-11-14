/**
 * Framer Motion animation variants for consistent animations across the app
 * Optimized with CSS transforms for GPU acceleration
 */

export const fadeIn = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.6,
    } 
  },
};

export const slideUp = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
    } 
  },
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
    } 
  },
};

export const pageTransition = {
  initial: { 
    opacity: 0, 
    x: 100,
  },
  animate: { 
    opacity: 1, 
    x: 0,
  },
  exit: { 
    opacity: 0, 
    x: -100,
  },
  transition: { 
    duration: 0.5,
  },
};
