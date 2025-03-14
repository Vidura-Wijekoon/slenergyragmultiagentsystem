
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'md', 
  text = 'Processing'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [0, -10, 0] }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex space-x-2 mb-2">
        {[1, 2, 3].map((dot) => (
          <motion.div
            key={dot}
            className={`${sizeClasses[size]} bg-srigreen-600 rounded-full`}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: 'loop',
              delay: dot * 0.1
            }}
          />
        ))}
      </div>
      {text && (
        <p className={`${textSizeClasses[size]} text-srigreen-700 animate-pulse-light`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingIndicator;
