import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { AnimatedButton } from './shared/AnimatedButton';
import { LoadingScreen } from './shared/LoadingScreen';
import { fadeIn } from '../utils/animations';

interface StoryScreenProps {
  storyIndex: number;
}

export const StoryScreen = ({ storyIndex }: StoryScreenProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch story content based on index
  const story = content.stories[storyIndex];

  useEffect(() => {
    // Reset loading state when story changes
    setImageError(false);
    
    // If there's no image, skip loading state
    if (!story?.image) {
      setImageLoading(false);
    } else {
      setImageLoading(true);
    }
  }, [storyIndex, story?.image]);

  // Handle case where story doesn't exist
  if (!story) {
    console.error(`Story at index ${storyIndex} not found`);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-pink to-pastel-lavender">
        <div className="text-center">
          <p className="text-xl text-gray-700">Story not found</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 text-romantic-500 hover:text-romantic-600"
          >
            Return to start
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    // Fade out before navigation
    setIsVisible(false);
    
    // Wait for fade-out animation to complete
    setTimeout(() => {
      // Determine next screen
      const nextStoryIndex = storyIndex + 1;
      if (nextStoryIndex < content.stories.length) {
        navigate(`/story/${nextStoryIndex + 1}`);
      } else {
        navigate('/timeline');
      }
    }, 500);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
    console.error(`Failed to load image: ${story.image}`);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageLoading && !imageError) {
    return <LoadingScreen message="Loading story..." />;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="min-h-screen"
          style={{
            background: 'linear-gradient(to bottom right, #ffafcc, #d4b5f0, #bde0fe)'
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              {/* Responsive layout with text and image sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                
                {/* Story Text Section */}
                <motion.div
                  className="order-2 lg:order-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div 
                    className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'Pixelify Sans, sans-serif', color: '#4a4a4a' }}>
                      {story.text}
                    </p>
                    
                    {/* Heart decoration */}
                    <div className="mt-4 sm:mt-6 flex justify-center space-x-2">
                      <span className="text-xl sm:text-2xl animate-pulse" style={{ color: '#ff6b9d' }}>♥</span>
                      <span className="text-lg sm:text-xl animate-pulse" style={{ animationDelay: '0.2s', color: '#ff8fab' }}>♥</span>
                      <span className="text-xl sm:text-2xl animate-pulse" style={{ animationDelay: '0.4s', color: '#ff6b9d' }}>♥</span>
                    </div>
                  </div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                  className="order-1 lg:order-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    {story.image && !imageError ? (
                      <img
                        src={story.image}
                        alt={story.imageAlt}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      // Fallback gradient background with alt text
                      <div className="w-full aspect-square bg-gradient-to-br from-romantic-200 to-romantic-300 flex items-center justify-center p-6 sm:p-8">
                        <p className="text-center text-white text-base sm:text-lg font-medium">
                          {story.imageAlt}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Next Button */}
              <motion.div
                className="mt-8 sm:mt-10 md:mt-12 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <AnimatedButton onClick={handleNext}>
                  Next →
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
