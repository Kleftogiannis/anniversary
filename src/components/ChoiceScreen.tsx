import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { AnimatedButton } from './shared/AnimatedButton';
import { fadeIn, scaleIn } from '../utils/animations';
import type { ChoiceOption } from '../types';

interface ChoiceScreenProps {
  choiceIndex: number;
}

export const ChoiceScreen = ({ choiceIndex }: ChoiceScreenProps) => {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState<ChoiceOption | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [responseImageError, setResponseImageError] = useState(false);

  const choice = content.choices[choiceIndex];
  const { prompt, options } = choice;

  const handleChoiceSelection = (option: ChoiceOption) => {
    setSelectedChoice(option);
    setShowResponse(true);
    setResponseImageError(false);
  };

  const handleResponseImageError = () => {
    setResponseImageError(true);
    console.error(`Failed to load response image for choice: ${selectedChoice?.id}`);
  };

  useEffect(() => {
    if (showResponse && selectedChoice) {
      // Navigate to next choice or finale after 2.5 seconds
      const timer = setTimeout(() => {
        const nextChoiceIndex = choiceIndex + 1;
        if (nextChoiceIndex < content.choices.length) {
          navigate(`/choice/${nextChoiceIndex + 1}`);
        } else {
          navigate('/finale');
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showResponse, selectedChoice, navigate, choiceIndex]);

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
      <div className="max-w-2xl w-full text-center px-2 sm:px-4">
        {/* Choice Prompt */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-12 leading-tight px-2"
          style={{ fontFamily: 'Pixelify Sans, sans-serif', color: '#2d3748' }}
          variants={fadeIn}
        >
          {prompt}
        </motion.h2>

        {/* Choice Buttons */}
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 items-center"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              variants={slideUp}
              className="w-full max-w-md"
            >
              <AnimatedButton
                onClick={() => handleChoiceSelection(option)}
                variant={index === 0 ? 'primary' : 'secondary'}
              >
                {option.text}
              </AnimatedButton>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Response Modal */}
      <AnimatePresence>
        {showResponse && selectedChoice && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-50"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              {/* Response Image */}
              {selectedChoice.response.image && !responseImageError && (
                <motion.img
                  src={selectedChoice.response.image}
                  alt="Response"
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onError={handleResponseImageError}
                />
              )}
              
              {/* Fallback gradient if image fails */}
              {selectedChoice.response.image && responseImageError && (
                <motion.div
                  className="w-full h-40 sm:h-48 bg-gradient-to-br from-romantic-200 to-romantic-300 rounded-lg mb-4 sm:mb-6 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-4xl">💕</span>
                </motion.div>
              )}

              {/* Response Message */}
              <motion.p
                className="text-xl sm:text-2xl leading-relaxed"
                style={{ fontFamily: 'Pixelify Sans, sans-serif', color: '#4a4a4a' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedChoice.response.message}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
