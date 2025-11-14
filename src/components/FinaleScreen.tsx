import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { content } from '../data/content';
import { scaleIn, fadeIn } from '../utils/animations';
import { PhotoGallery } from './shared/PhotoGallery';

export const FinaleScreen = () => {
  const navigate = useNavigate();
  const { message, submessage, animation } = content.finale;
  const [easterEggClicked, setEasterEggClicked] = useState(false);
  const [showEasterEggMessage, setShowEasterEggMessage] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Gallery images with hover messages
  const galleryImages = [
    { src: '/src/assets/extraPic1.jpg', caption: 'Woop, our first time😏💦' },
    { src: '/src/assets/extraPic2.jpg', caption: 'So pretty...😍' },
    { src: '/src/assets/extraPic3.jpg', caption: 'Plokamakiaaa' },
    { src: '/src/assets/extraPic4.jpg', caption: 'Little Bouzouktzou' },
  ];

  // Calculate days together
  const startDate = new Date('2024-12-01');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const handleBackToStart = () => {
    // Clear session storage to allow revisiting
    sessionStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    // Trigger confetti celebration on mount
    try {
      const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire confetti from two sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
    } catch (error) {
      console.error('Failed to initialize confetti animation:', error);
    }
  }, []);

  const handleEasterEggClick = () => {
    if (!easterEggClicked) {
      setEasterEggClicked(true);
      setShowEasterEggMessage(true);
      
      // Hide message after 3 seconds
      setTimeout(() => {
        setShowEasterEggMessage(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom right, #e0b0ff, #ffe5ec, #ffd6a5)'
        }}
      />

      {/* Back to Start Link */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={handleBackToStart}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 py-2 rounded-lg cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          fontFamily: 'Pixelify Sans, sans-serif',
          color: '#5d4037',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Start
      </motion.button>

      {/* Photo Gallery Button - Top Left */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        onClick={() => setIsGalleryOpen(true)}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 px-4 py-2 rounded-lg cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
          border: '3px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 8px 24px rgba(255, 107, 157, 0.4)',
          fontFamily: 'Pixelify Sans, sans-serif',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📸 Honorable Mentions
      </motion.button>

      {/* Content container */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
        {/* Wooden Sign Achievement Card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          <div 
            className="relative p-8 sm:p-10 md:p-12"
            style={{
              background: 'linear-gradient(135deg, #f5deb3 0%, #e8d5c4 50%, #d4c5b0 100%)',
              borderRadius: '20px',
              border: '6px solid #8b5a2b',
              boxShadow: '0 12px 40px rgba(139, 90, 43, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.6), inset 0 -2px 8px rgba(139, 90, 43, 0.3)',
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 text-2xl opacity-60">⭐</div>
            <div className="absolute top-2 right-2 text-2xl opacity-60">⭐</div>
            <div className="absolute bottom-2 left-2 text-2xl opacity-60">🎉</div>
            <div className="absolute bottom-2 right-2 text-2xl opacity-60">🎉</div>

            {/* Inner wooden frame */}
            <div 
              className="p-6 sm:p-8 rounded-lg"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
                border: '2px solid rgba(139, 90, 43, 0.3)',
              }}
            >
              {/* Trophy/Achievement icon */}
              <div className="text-5xl sm:text-6xl md:text-7xl mb-4 animate-bounce">🏆</div>
              
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
                style={{ 
                  fontFamily: 'Pixelify Sans, sans-serif',
                  color: '#5d4037',
                  textShadow: '2px 2px 0px rgba(255,255,255,0.5), -1px -1px 0px rgba(139, 90, 43, 0.3)',
                }}
              >
                {message}
              </h1>

              {/* Submessage */}
              {submessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium"
                  style={{ 
                    fontFamily: 'Pixelify Sans, sans-serif',
                    color: '#6d4c41',
                  }}
                >
                  {submessage}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Days Together Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div 
            className="inline-block p-6 sm:p-8 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            }}
          >
            <p 
              className="text-lg sm:text-xl md:text-2xl mb-2"
              style={{ 
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#6d4c41',
              }}
            >
              Days I tolerate you
            </p>
            <p 
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              style={{ 
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#ff6b9d',
                textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
              }}
            >
              {daysTogether}
            </p>
          </div>
        </motion.div>

        {/* Optional Lottie animation */}
        {animation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            {/* Placeholder for Lottie animation - would need lottie-react package */}
            <div className="text-sm text-gray-600">
              [Lottie animation: {animation}]
            </div>
          </motion.div>
        )}

      </div>

      {/* Decorative hearts around the message - responsive positioning */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-12 left-4 sm:top-16 sm:left-8 md:top-20 md:left-20 text-romantic-pink text-4xl sm:text-5xl md:text-6xl animate-pulse"
      >
        ♥
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-12 right-4 sm:top-16 sm:right-8 md:top-20 md:right-20 text-romantic-rose text-4xl sm:text-5xl md:text-6xl animate-pulse"
        style={{ animationDelay: '0.3s' }}
      >
        ♥
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="hidden sm:block absolute bottom-16 left-1/4 text-romantic-lavender text-3xl md:text-4xl animate-pulse"
        style={{ animationDelay: '0.6s' }}
      >
        ♥
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="hidden sm:block absolute bottom-16 right-1/4 text-romantic-peach text-3xl md:text-4xl animate-pulse"
        style={{ animationDelay: '0.9s' }}
      >
        ♥
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="hidden md:block absolute top-1/3 left-6 lg:left-10 text-romantic-pink text-2xl md:text-3xl animate-pulse"
        style={{ animationDelay: '1.2s' }}
      >
        ♥
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="hidden md:block absolute top-1/3 right-6 lg:right-10 text-romantic-rose text-2xl md:text-3xl animate-pulse"
        style={{ animationDelay: '1.5s' }}
      >
        ♥
      </motion.div>

      {/* Easter Egg - Hidden Clickable Pixel Hearts */}
      {!easterEggClicked && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleEasterEggClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(255, 0, 0, 0.4))',
          }}
        >
          <img 
            src="/src/assets/hearts.svg" 
            alt="Hearts" 
            className="w-40 sm:w-48 h-auto"
          />
        </motion.div>
      )}

      {/* Easter Egg Toast Message */}
      {showEasterEggMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            className="px-6 py-3 rounded-lg text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid #ff6b9d',
              boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: 2,
            }}
          >
            <p
              className="text-lg sm:text-xl font-bold whitespace-nowrap"
              style={{
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#ff1744',
              }}
            >
              Don't waste this chance
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Photo Gallery Modal */}
      <PhotoGallery 
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </motion.div>
  );
};
