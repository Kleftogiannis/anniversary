import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}: AnimatedButtonProps) => {
  const baseClasses = 'px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-medium transition-all duration-300 text-base sm:text-lg shadow-lg w-full sm:w-auto';
  const fontStyle = { fontFamily: 'Pixelify Sans, sans-serif' };
  
  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #caffbf 0%, #9bf6ff 100%)',
      color: '#2d3748',
      border: 'none',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#2d3748',
      border: '2px solid rgba(202, 255, 191, 0.5)',
      backdropFilter: 'blur(10px)',
    },
  };

  return (
    <motion.button
      className={baseClasses}
      style={{ ...variantStyles[variant], ...fontStyle }}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 20px 25px -5px rgba(202, 255, 191, 0.3), 0 10px 10px -5px rgba(155, 246, 255, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};
