import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  caption?: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGallery = ({ images, isOpen, onClose }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="text-center mb-6 p-6 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl mb-2"
              style={{ 
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#5d4037',
              }}
            >
              Honorable Mentions
            </h2>
            <p 
              className="text-base sm:text-lg"
              style={{ 
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#6d4c41',
              }}
            >
              Young and in love (I assume)
            </p>
          </div>

          {/* Image Display */}
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
            }}
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].caption || `Gallery ${currentIndex + 1}`}
              className="w-full h-auto max-h-[60vh] object-contain"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover Caption */}
            {images[currentIndex].caption && (
              <AnimatePresence>
                {showCaption && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg"
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      fontFamily: 'Pixelify Sans, sans-serif',
                      color: 'white',
                      fontSize: '1.125rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      maxWidth: '90%',
                      textAlign: 'center',
                    }}
                  >
                    {images[currentIndex].caption}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span className="text-2xl">←</span>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span className="text-2xl">→</span>
                </button>
              </>
            )}

            {/* Image Counter */}
            <div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                fontFamily: 'Pixelify Sans, sans-serif',
                color: 'white',
              }}
            >
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full text-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
