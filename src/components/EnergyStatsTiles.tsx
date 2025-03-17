
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const EnergyStatsTiles = () => {
  // Energy flow animation variants
  const flowVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.98, 1.02, 0.98],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const iconVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Incoming Solar Energy */}
      <Card className="p-4 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-orange-50/80 border border-yellow-100">
        <div className="flex items-start justify-between">
          <div className="z-10">
            <h3 className="text-lg font-medium text-amber-800">Solar Energy Received</h3>
            <p className="text-2xl font-bold text-amber-900 mt-2">173,000 TW</p>
            <p className="text-sm text-amber-700 mt-1">per second</p>
          </div>
          <motion.div 
            variants={iconVariants}
            animate="animate"
            className="bg-amber-100 p-2 rounded-full"
          >
            <Sun className="h-8 w-8 text-amber-500" />
          </motion.div>
        </div>
        <p className="text-xs text-amber-700 mt-3 z-10">Total energy from the sun hitting Earth's surface</p>
        
        {/* Animated Energy Flow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 to-transparent"
          variants={flowVariants}
          animate="animate"
        />
      </Card>

      {/* Human Energy Generation */}
      <Card className="p-4 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100">
        <div className="flex items-start justify-between">
          <div className="z-10">
            <h3 className="text-lg font-medium text-blue-800">Human Energy Generated</h3>
            <p className="text-2xl font-bold text-blue-900 mt-2">18 TW</p>
            <p className="text-sm text-blue-700 mt-1">average consumption</p>
          </div>
          <motion.div 
            variants={iconVariants}
            animate="animate"
            className="bg-blue-100 p-2 rounded-full"
          >
            <Zap className="h-8 w-8 text-blue-500" />
          </motion.div>
        </div>
        <p className="text-xs text-blue-700 mt-3 z-10">Global energy consumption by human civilization</p>
        
        {/* Animated Energy Flow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-blue-200/20 to-transparent"
          variants={flowVariants}
          animate="animate"
        />
      </Card>

      {/* Outgoing Energy */}
      <Card className="p-4 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-100">
        <div className="flex items-start justify-between">
          <div className="z-10">
            <h3 className="text-lg font-medium text-purple-800">Energy Radiated to Space</h3>
            <p className="text-2xl font-bold text-purple-900 mt-2">163,000 TW</p>
            <p className="text-sm text-purple-700 mt-1">per second</p>
          </div>
          <motion.div 
            variants={iconVariants}
            animate="animate"
            className="bg-purple-100 p-2 rounded-full"
          >
            <ArrowUpRight className="h-8 w-8 text-purple-500" />
          </motion.div>
        </div>
        <p className="text-xs text-purple-700 mt-3 z-10">Energy radiated back to space as infrared radiation</p>
        
        {/* Animated Energy Flow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-purple-200/20 to-transparent"
          variants={flowVariants}
          animate="animate"
        />
      </Card>
    </div>
  );
};

export default EnergyStatsTiles;
