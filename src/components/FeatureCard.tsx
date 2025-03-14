
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, onClick }) => {
  return (
    <motion.div 
      className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm border border-gray-100 card-hover cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-14 h-14 rounded-full bg-srigreen-700 flex items-center justify-center text-white mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
