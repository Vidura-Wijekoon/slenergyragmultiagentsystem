
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingIndicator from './LoadingIndicator';
import DataVisualization, { ChartType } from './DataVisualization';

interface ResultsSectionProps {
  isLoading: boolean;
  result: string | null;
  visualizationData?: {
    data: any[];
    type: ChartType;
    title: string;
    xKey: string;
    yKey: string;
  } | null;
  onClear: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  isLoading,
  result,
  visualizationData,
  onClear
}) => {
  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: isLoading || result ? 1 : 0,
        height: isLoading || result ? 'auto' : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-srigreen-700" />
          <h2 className="text-xl font-medium text-gray-800">Results</h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 focus:ring-0"
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
          <span className="ml-1">Clear</span>
        </Button>
      </div>
      
      <div className="min-h-[100px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-40"
            >
              <LoadingIndicator size="lg" text="Processing your query..." />
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="prose prose-sm md:prose-base max-w-none">
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </div>
              
              {visualizationData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-8"
                >
                  <DataVisualization
                    data={visualizationData.data}
                    type={visualizationData.type}
                    title={visualizationData.title}
                    xKey={visualizationData.xKey}
                    yKey={visualizationData.yKey}
                    height={350}
                  />
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResultsSection;
