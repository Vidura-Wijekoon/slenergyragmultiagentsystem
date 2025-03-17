
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Bot, Network, RefreshCw, CheckCircle, Clock, GitBranch, HelpingHand, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
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

interface AgentStep {
  agent: string;
  status: 'waiting' | 'processing' | 'completed';
  message: string;
  icon: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  isLoading,
  result,
  visualizationData,
  onClear
}) => {
  const [showProcessFlow, setShowProcessFlow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [processingSteps, setProcessingSteps] = useState<AgentStep[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState<number | null>(null);

  // Initialize the processing steps
  useEffect(() => {
    const steps: AgentStep[] = [
      { agent: 'Coordinator Agent', status: 'waiting', message: 'Analyzing query and orchestrating agents', icon: 'Bot' },
      { agent: 'Workflow Manager', status: 'waiting', message: 'Planning query processing workflow', icon: 'GitBranch' },
      { agent: 'Assistant Agent', status: 'waiting', message: 'Providing supplementary information', icon: 'HelpingHand' },
      { agent: 'Sub Agent (Retriever)', status: 'waiting', message: 'Retrieving information from knowledge base', icon: 'Bot' },
      { agent: 'Sub Agent (Analyzer)', status: 'waiting', message: 'Analyzing retrieved information', icon: 'Bot' },
      { agent: 'Sub Agent (Synthesizer)', status: 'waiting', message: 'Synthesizing information into coherent response', icon: 'Bot' },
      { agent: 'Coordinator Agent', status: 'waiting', message: 'Generating final response', icon: 'Bot' }
    ];
    setProcessingSteps(steps);
  }, []);

  // Use effect to advance the currentStep when isLoading is true
  useEffect(() => {
    if (isLoading) {
      // Show process flow automatically when loading starts
      setShowProcessFlow(true);
      setCurrentStep(0);
      setStartTime(Date.now());
      setTotalDuration(null);
      
      // Reset processing steps
      setProcessingSteps(prev => prev.map(step => ({
        ...step,
        status: 'waiting',
        startTime: undefined,
        endTime: undefined,
        duration: undefined
      })));
      
      // Start the first step
      setProcessingSteps(prev => {
        const newSteps = [...prev];
        newSteps[0] = {
          ...newSteps[0],
          status: 'processing',
          startTime: Date.now()
        };
        return newSteps;
      });
      
      // Create a timer to advance the steps
      let stepIndex = 0;
      const timings = [800, 1200, 1500, 2000, 1800, 1600, 1200]; // Adjusted timings for each step
      
      const advanceStep = () => {
        if (stepIndex < processingSteps.length - 1) {
          // Complete current step
          setProcessingSteps(prev => {
            const newSteps = [...prev];
            const now = Date.now();
            const stepStartTime = newSteps[stepIndex].startTime || now;
            const duration = now - stepStartTime;
            
            newSteps[stepIndex] = {
              ...newSteps[stepIndex],
              status: 'completed',
              endTime: now,
              duration: duration
            };
            
            // Start next step
            stepIndex++;
            newSteps[stepIndex] = {
              ...newSteps[stepIndex],
              status: 'processing',
              startTime: now
            };
            
            return newSteps;
          });
          
          setCurrentStep(stepIndex);
          setOverallProgress(Math.round((stepIndex / (processingSteps.length - 1)) * 100));
          
          // Schedule next step
          setTimeout(advanceStep, timings[stepIndex]);
        } else {
          // Complete final step when result is ready
          if (result) {
            setProcessingSteps(prev => {
              const newSteps = [...prev];
              const now = Date.now();
              const stepStartTime = newSteps[stepIndex].startTime || now;
              const duration = now - stepStartTime;
              
              newSteps[stepIndex] = {
                ...newSteps[stepIndex],
                status: 'completed',
                endTime: now,
                duration: duration
              };
              
              return newSteps;
            });
            
            setOverallProgress(100);
            
            // Calculate total duration
            if (startTime) {
              setTotalDuration(Date.now() - startTime);
            }
          }
        }
      };
      
      // Start the process after a small initial delay
      setTimeout(advanceStep, timings[0]);
    }
  }, [isLoading, result]);

  // Complete all steps when the result is ready
  useEffect(() => {
    if (result && !isLoading) {
      // Complete all steps
      setProcessingSteps(prev => 
        prev.map((step, index) => {
          if (step.status !== 'completed') {
            return {
              ...step,
              status: 'completed',
              endTime: Date.now(),
              duration: index * 500 + 1000 // Assign some dummy duration
            };
          }
          return step;
        })
      );
      
      setCurrentStep(processingSteps.length);
      setOverallProgress(100);
      
      // Calculate total duration if not already done
      if (startTime && !totalDuration) {
        setTotalDuration(Date.now() - startTime);
      }
    }
  }, [result, isLoading]);

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

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="h-3.5 w-3.5" />;
      case 'GitBranch':
        return <GitBranch className="h-3.5 w-3.5" />;
      case 'HelpingHand':
        return <HelpingHand className="h-3.5 w-3.5" />;
      default:
        return <Bot className="h-3.5 w-3.5" />;
    }
  };

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'Coordinator Agent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Workflow Manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assistant Agent':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Sub Agent (Retriever)':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sub Agent (Analyzer)':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Sub Agent (Synthesizer)':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (ms: number | undefined) => {
    if (!ms) return '—';
    const seconds = (ms / 1000).toFixed(1);
    return `${seconds}s`;
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
      
      {/* Live Agent Demo Section - Always visible */}
      <div 
        className="mb-6 bg-slate-50 p-5 rounded-lg border border-slate-200"
      >
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Network className="w-4 h-4 text-srigreen-700" />
          Live Agent Demo
        </h3>
        
        <p className="text-xs text-gray-600 mb-3">
          Experience how our agents work together to process your query:
        </p>
        
        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Processing Progress</span>
            <span className="text-xs font-medium text-gray-600">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2 bg-gray-200" />
        </div>
        
        {/* Agent Steps with Timing */}
        <div className="space-y-3 mt-4">
          {processingSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className={`flex items-start justify-between gap-3 p-2 rounded-md border ${index === currentStep && isLoading ? 'border-blue-300 shadow-sm bg-white' : 'border-transparent'}`}
              animate={{ 
                scale: index === currentStep && isLoading ? 1.02 : 1,
                opacity: index <= currentStep || !isLoading ? 1 : 0.5
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md border ${getAgentColor(step.agent)}`}>
                  {getAgentIcon(step.icon)}
                  <span className="text-xs font-medium">{step.agent}</span>
                </div>
                <span className="text-xs text-gray-600">{step.message}</span>
              </div>
              
              <div className="flex items-center">
                <Timer className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <span className="text-xs font-mono">
                  {step.status === 'processing' ? (
                    <span className="text-blue-500">Processing...</span>
                  ) : (
                    formatDuration(step.duration)
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Total Time */}
        {totalDuration && !isLoading && (
          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">Total processing time:</span>
            <span className="text-xs font-mono font-medium text-srigreen-700">{formatDuration(totalDuration)}</span>
          </div>
        )}
        
        <div className="mt-3 pt-2 border-t border-slate-200">
          <p className="text-xs text-gray-500">
            {isLoading 
              ? "Your query is being processed through our intelligent multi-agent system..." 
              : result ? "Query successfully processed through all agents in the pipeline." : "Submit a query to see the agents in action."}
          </p>
        </div>
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
