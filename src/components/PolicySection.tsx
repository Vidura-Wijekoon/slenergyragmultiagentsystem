
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Send, FileText, X } from 'lucide-react';
import LoadingIndicator from './LoadingIndicator';
import DataVisualization, { ChartType } from './DataVisualization';

interface PolicySectionProps {
  onSubmit: (query: string) => void;
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

const PolicySection: React.FC<PolicySectionProps> = ({ 
  onSubmit, 
  isLoading,
  result,
  visualizationData,
  onClear
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
    }
  };

  const exampleQueries = [
    "What are the key policies for renewable energy development in Sri Lanka?",
    "Explain Sri Lanka's National Energy Policy and its objectives",
    "What incentives are available for private investors in renewable energy?",
    "How does Sri Lanka's energy policy align with global climate commitments?"
  ];

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <>
      <motion.div 
        className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center mb-4 gap-2">
          <Lightbulb className="w-5 h-5 text-srigreen-700" />
          <h2 className="text-xl font-medium text-gray-800">Explore Sri Lankan Energy Policies</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
              Your Policy Query:
            </label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about energy policies and regulations..."
              className="min-h-[120px] w-full resize-none border-gray-300 focus:border-srigreen-600 focus:ring-srigreen-600 transition-all duration-200"
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              disabled={!query.trim() || isLoading}
              className="bg-srigreen-700 hover:bg-srigreen-800 text-white px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? 'Processing...' : 'Get Policy Insights'}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Example policy queries:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, index) => (
              <motion.button
                key={index}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

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
            <h2 className="text-xl font-medium text-gray-800">Policy Insights</h2>
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
                <LoadingIndicator size="lg" text="Analyzing policy information..." />
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
    </>
  );
};

export default PolicySection;
