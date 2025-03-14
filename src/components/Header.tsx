
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="w-full bg-srigreen-800 text-white py-6 px-4 md:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-2xl md:text-3xl lg:text-4xl font-medium mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sri Lankan Energy Sector Knowledge Base
        </motion.h1>
        <motion.p 
          className="text-sm md:text-base text-srigreen-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Ministry of Power and Energy
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
