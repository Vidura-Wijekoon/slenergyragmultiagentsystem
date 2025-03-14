
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Bot, Network, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [showProcessFlow, setShowProcessFlow] = useState(false);

  // Define the processing steps to simulate the agent pipeline
  const processingSteps = [
    { agent: 'Master Agent', status: 'completed', message: 'Analyzing query and coordinating sub-agents' },
    { agent: 'Classification Agent', status: 'completed', message: 'Categorizing query and relevant data sources' },
    { agent: 'Forecasting Agent', status: isLoading ? 'processing' : 'completed', message: 'Analyzing historical data trends' },
    { agent: 'Imputation Agent', status: isLoading ? 'waiting' : 'completed', message: 'Filling gaps in data if needed' },
    { agent: 'Anomaly Detection Agent', status: isLoading ? 'waiting' : 'completed', message: 'Validating data consistency' },
    { agent: 'Master Agent', status: isLoading ? 'waiting' : 'completed', message: 'Compiling final response' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="h-4 w-4 rounded-full bg-green-500"></div>;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'waiting':
        return <div className="h-4 w-4 rounded-full bg-gray-300"></div>;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300"></div>;
    }
  };

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
        
        <div className="flex gap-2">
          {(isLoading || result) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowProcessFlow(!showProcessFlow)}
              className="text-gray-500 hover:text-gray-700 focus:ring-0 flex items-center gap-1"
            >
              <Network className="w-4 h-4" />
              <span className="text-xs">{showProcessFlow ? 'Hide Process' : 'Show Process'}</span>
            </Button>
          )}
          
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
      </div>
      
      {showProcessFlow && (
        <motion.div 
          className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm font-medium text-gray-700 mb-3">Multi-Agent Processing Flow:</p>
          <div className="space-y-2">
            {processingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                {getStatusIcon(step.status)}
                <div className="flex items-center gap-1">
                  <Bot className="h-3.5 w-3.5 text-gray-600" />
                  <span className="text-xs font-medium">{step.agent}:</span>
                </div>
                <span className="text-xs text-gray-600">{step.message}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
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
              <LoadingIndicator size="lg" text="Processing through multi-agent pipeline..." />
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Tabs defaultValue="response">
                <TabsList className="mb-4">
                  <TabsTrigger value="response">Response</TabsTrigger>
                  {visualizationData && <TabsTrigger value="visualization">Visualization</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="response">
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                  </div>
                </TabsContent>
                
                {visualizationData && (
                  <TabsContent value="visualization">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
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
                  </TabsContent>
                )}
              </Tabs>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResultsSection;
