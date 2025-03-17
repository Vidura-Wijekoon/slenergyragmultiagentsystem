
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Bot, Network, RefreshCw, CheckCircle, Clock } from 'lucide-react';
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
    additionalKeys?: string[];
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
  const [currentStep, setCurrentStep] = useState(0);

  // Define the processing steps to simulate the agent pipeline
  const processingSteps = [
    { agent: 'Coordinator Agent', status: 'completed', message: 'Analyzing query and coordinating sub-agents' },
    { agent: 'Workflow Manager', status: isLoading && currentStep >= 1 ? 'processing' : (currentStep > 1 ? 'completed' : 'waiting'), message: 'Managing workflow and assigning tasks' },
    { agent: 'Assistant Agent', status: isLoading && currentStep >= 2 ? 'processing' : (currentStep > 2 ? 'completed' : 'waiting'), message: 'Supporting the coordinator with complex processing' },
    { agent: 'Sub Agent 1 (Retriever)', status: isLoading && currentStep >= 3 ? 'processing' : (currentStep > 3 ? 'completed' : 'waiting'), message: 'Retrieving information from knowledge base' },
    { agent: 'Sub Agent 2 (Analyzer)', status: isLoading && currentStep >= 4 ? 'processing' : (currentStep > 4 ? 'completed' : 'waiting'), message: 'Analyzing retrieved information' },
    { agent: 'Sub Agent 3 (Synthesizer)', status: isLoading && currentStep >= 5 ? 'processing' : (currentStep > 5 ? 'completed' : 'waiting'), message: 'Synthesizing information into coherent response' },
    { agent: 'Coordinator Agent', status: isLoading && currentStep >= 6 ? 'processing' : (currentStep > 6 ? 'completed' : 'waiting'), message: 'Generating final response' }
  ];

  // Use effect to advance the currentStep when isLoading is true
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isLoading) {
      // Show process flow automatically when loading starts
      setShowProcessFlow(true);
      setCurrentStep(0);
      
      // Create a timer to advance the steps - faster now (3-4 seconds total)
      timer = setTimeout(() => {
        const advanceStep = () => {
          setCurrentStep(prev => {
            if (prev < processingSteps.length - 1) {
              const nextStep = prev + 1;
              // Faster step delays - each step takes ~400-500ms
              const stepDelay = [400, 450, 400, 500, 450, 400, 400][nextStep] || 400;
              setTimeout(advanceStep, stepDelay);
              return nextStep;
            }
            return prev;
          });
        };
        
        // Start advancing steps
        advanceStep();
      }, 400); // Start first step faster
    } else {
      if (result) {
        setCurrentStep(processingSteps.length); // Complete all steps when result is available
      }
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, result]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'waiting':
        return <Clock className="h-4 w-4 text-gray-300" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300"></div>;
    }
  };

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'Coordinator Agent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Workflow Manager':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Assistant Agent':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Sub Agent 1 (Retriever)':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sub Agent 2 (Analyzer)':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Sub Agent 3 (Synthesizer)':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
              <span className="text-xs">{showProcessFlow ? 'Hide Agents' : 'View Agents'}</span>
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
          className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm font-medium text-gray-700 mb-3">Multi-Agent Pipeline:</p>
          <div className="space-y-3">
            {processingSteps.map((step, index) => (
              <motion.div 
                key={index} 
                className={`flex items-center gap-3 p-2 rounded-md border ${index === currentStep && isLoading ? 'border-blue-300 shadow-sm bg-white' : 'border-transparent'}`}
                animate={{ 
                  scale: index === currentStep && isLoading ? 1.02 : 1,
                  opacity: index <= currentStep || !isLoading ? 1 : 0.5
                }}
                transition={{ duration: 0.2 }}
              >
                {getStatusIcon(step.status)}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md border ${getAgentColor(step.agent)}`}>
                  <Bot className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{step.agent}</span>
                </div>
                <span className="text-xs text-gray-600">{step.message}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              {isLoading 
                ? "The query is being processed through our intelligent multi-agent system..." 
                : "Query successfully processed through all agents in the pipeline."}
            </p>
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
                        additionalKeys={visualizationData.additionalKeys}
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
