import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TypewriterText } from './shared/TypewriterText';
import { AnimatedButton } from './shared/AnimatedButton';
import { LoadingScreen } from './shared/LoadingScreen';
import { content } from '../data/content';
import { fadeIn } from '../utils/animations';

export const IntroScreen = () => {
  const navigate = useNavigate();
  const { title, subtitle } = content.intro;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mark intro screen as visited for navigation guard
    const hasVisited = sessionStorage.getItem('visited_paths');
    const visitedPaths = hasVisited ? JSON.parse(hasVisited) : [];
    if (!visitedPaths.includes('/')) {
      visitedPaths.push('/');
      sessionStorage.setItem('visited_paths', JSON.stringify(visitedPaths));
    }

    // Preload images from story screens and choice responses
    const storyImages = content.stories
      .map(story => story.image)
      .filter(Boolean);

    const choiceImages = content.choices
      .flatMap(choice => choice.options.map(option => option.response.image))
      .filter(Boolean);

    const imagesToPreload = [...storyImages, ...choiceImages];

    // Short timeout to prevent blocking - preloading is optional
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (imagesToPreload.length === 0) {
      clearTimeout(timeout);
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    // Attempt to preload images in background (non-blocking)
    imagesToPreload.forEach(src => {
      if (!src) return;

      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          clearTimeout(timeout);
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        // Silently fail - images will load on demand
        loadedCount++;
        if (loadedCount === totalImages) {
          clearTimeout(timeout);
          setIsLoading(false);
        }
      };
      img.src = src;
    });

    return () => clearTimeout(timeout);
  }, []);

  const handleStart = () => {
    navigate('/lock');
  };

  if (isLoading) {
    return <LoadingScreen message="Preparing your journey..." />;
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #ffc8dd, #e0b0ff, #bde0fe)'
      }}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >

      {/* Wooden Sign Container */}
      <div className="text-center px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
        <motion.div
          className="relative p-8 sm:p-10 md:p-12"
          style={{
            background: 'linear-gradient(135deg, #f5deb3 0%, #e8d5c4 50%, #d4c5b0 100%)',
            borderRadius: '20px',
            border: '6px solid #8b5a2b',
            boxShadow: '0 12px 40px rgba(139, 90, 43, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.6), inset 0 -2px 8px rgba(139, 90, 43, 0.3)',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 text-2xl opacity-60">🌿</div>
          <div className="absolute top-2 right-2 text-2xl opacity-60">🌿</div>
          <div className="absolute bottom-2 left-2 text-2xl opacity-60">🍂</div>
          <div className="absolute bottom-2 right-2 text-2xl opacity-60">🍂</div>

          {/* Inner wooden frame */}
          <div
            className="p-6 sm:p-8 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
              border: '2px solid rgba(139, 90, 43, 0.3)',
            }}
          >
            {/* Title with pixel font */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight"
              style={{
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#5d4037',
                textShadow: '2px 2px 0px rgba(255,255,255,0.5), -1px -1px 0px rgba(139, 90, 43, 0.3)',
              }}
            >
              {title}
            </h1>

            {/* Subtitle with typewriter animation */}
            <p
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 min-h-[2rem] px-2"
              style={{
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#6d4c41',
              }}
            >
              <TypewriterText text={subtitle} speed={50} />
            </p>

            {/* Start button */}
            <AnimatedButton onClick={handleStart} variant="primary">
              Let's see
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Decorative hearts - responsive positioning */}
      <div className="absolute top-6 left-4 sm:top-10 sm:left-10 text-romantic-pink text-3xl sm:text-4xl md:text-5xl opacity-50 animate-pulse">
        ♥
      </div>
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 text-romantic-rose text-3xl sm:text-4xl md:text-5xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}>
        ♥
      </div>
      <div className="hidden md:block absolute top-1/4 right-12 lg:right-20 text-romantic-lavender text-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>
        ♥
      </div>
      <div className="hidden md:block absolute bottom-1/4 left-12 lg:left-20 text-romantic-peach text-3xl opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}>
        ♥
      </div>
    </motion.div>
  );
};
