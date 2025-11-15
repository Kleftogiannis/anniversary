import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

/**
 * LoadingScreen displays a loading state for asset-heavy screens
 */
export const LoadingScreen = ({ message = 'Loading...' }: LoadingScreenProps) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom right, #ffc8dd, #e0b0ff, #bde0fe)'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <div className="text-center">
        {/* Animated hearts loading indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          <motion.span
            className="text-4xl text-romantic-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.span>
          <motion.span
            className="text-4xl text-romantic-300"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          >
            ♥
          </motion.span>
          <motion.span
            className="text-4xl text-romantic-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          >
            ♥
          </motion.span>
        </div>
        
        <p className="text-lg text-gray-700 font-medium" style={{ fontFamily: 'Pixelify Sans, sans-serif' }}>{message}</p>
      </div>
    </motion.div>
  );
};
