import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedButton } from './shared/AnimatedButton';
import { fadeIn } from '../utils/animations';

export const TimelineScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/choice/1');
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        background: 'linear-gradient(to bottom right, #ffd6a5, #ffc8dd, #e0b0ff)'
      }}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-3xl w-full">
        {/* Future Goals Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-10 text-center"
            style={{ 
              fontFamily: 'Pixelify Sans, sans-serif',
              color: '#5d4037',
              textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
            }}
          >
            Our Future Together
          </h2>

          <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
            {/* Goal 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div 
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #caffbf 0%, #9bf6ff 100%)',
                  boxShadow: '0 4px 12px rgba(202, 255, 191, 0.4)',
                }}
              >
                🏠
              </div>
              <div 
                className="flex-1 p-4 sm:p-6 rounded-xl text-left"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                }}
              >
                <p 
                  className="text-base sm:text-lg md:text-xl"
                  style={{ 
                    fontFamily: 'Pixelify Sans, sans-serif',
                    color: '#4a4a4a',
                  }}
                >
                  Find a house to live together
                </p>
              </div>
            </motion.div>

            {/* Goal 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div 
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #ffc8dd 0%, #ffafcc 100%)',
                  boxShadow: '0 4px 12px rgba(255, 200, 221, 0.4)',
                }}
              >
                🐱
              </div>
              <div 
                className="flex-1 p-4 sm:p-6 rounded-xl text-left"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                }}
              >
                <p 
                  className="text-base sm:text-lg md:text-xl"
                  style={{ 
                    fontFamily: 'Pixelify Sans, sans-serif',
                    color: '#4a4a4a',
                  }}
                >
                  Get a kitty and raise it together
                </p>
              </div>
            </motion.div>

            {/* Goal 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div 
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #e0b0ff 0%, #d4b5f0 100%)',
                  boxShadow: '0 4px 12px rgba(224, 176, 255, 0.4)',
                }}
              >
                💍
              </div>
              <div 
                className="flex-1 p-4 sm:p-6 rounded-xl text-left"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                }}
              >
                <p 
                  className="text-base sm:text-lg md:text-xl"
                  style={{ 
                    fontFamily: 'Pixelify Sans, sans-serif',
                    color: '#4a4a4a',
                  }}
                >
                  Get married and have a family
                </p>
              </div>
            </motion.div>
          </div>

          {/* Game Transition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center"
          >
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8"
              style={{ 
                fontFamily: 'Pixelify Sans, sans-serif',
                color: '#5d4037',
                textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
              }}
            >
              Now time for a little game
            </h3>
            
            <AnimatedButton onClick={handleStart} variant="primary">
              Press to Start
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
