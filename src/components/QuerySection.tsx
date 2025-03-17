
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Send, Bot, Network } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuerySectionProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  sectionType?: 'search' | 'visualize' | 'insights';
}

const QuerySection: React.FC<QuerySectionProps> = ({ 
  onSubmit, 
  isLoading,
  sectionType = 'search' 
}) => {
  const [query, setQuery] = useState('');
  const [showAgentInfo, setShowAgentInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
    }
  };

  const getExampleQueries = () => {
    switch (sectionType) {
      case 'search':
        return [
          "What are the main renewable energy resources in Sri Lanka?",
          "How is climate change affecting Sri Lanka's energy production?",
          "What is the current status of the Uma Oya hydropower project?",
          "What are the energy efficiency standards for buildings in Sri Lanka?"
        ];
      case 'visualize':
        return [
          "Generate the electricity demand for Sri Lanka in past 5 years",
          "Show me the renewable energy capacity growth in Sri Lanka",
          "Compare hydropower vs solar energy production in Sri Lanka",
          "Visualize the energy mix evolution in Sri Lanka from 2010 to 2023"
        ];
      case 'insights':
        return [
          "What are the key policies for renewable energy development in Sri Lanka?",
          "Explain Sri Lanka's National Energy Policy and its objectives",
          "What incentives are available for private investors in renewable energy?",
          "How does Sri Lanka's energy policy align with global climate commitments?"
        ];
      default:
        return [
          "What are the main renewable energy resources in Sri Lanka?",
          "Generate the electricity demand for Sri Lanka in past 5 years",
          "What are the major hydropower projects in Sri Lanka?",
          "How is climate change affecting Sri Lanka's energy production?"
        ];
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  // Define the agents used in the pipeline with colors
  const agentTypes = [
    { 
      name: 'Master Agent', 
      description: 'Coordinates the workflow and delegates tasks to specialized sub-agents',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Bot className="h-4 w-4 text-yellow-700" /> 
    },
    { 
      name: 'Forecasting Agent', 
      description: 'Analyzes time-series data and predicts future trends in energy production and consumption',
      color: 'bg-amber-100 text-amber-800 border-amber-200', 
      icon: <Bot className="h-4 w-4 text-amber-700" /> 
    },
    { 
      name: 'Imputation Agent', 
      description: 'Fills in missing data in energy datasets to provide complete analysis',
      color: 'bg-rose-100 text-rose-800 border-rose-200', 
      icon: <Bot className="h-4 w-4 text-rose-700" /> 
    },
    { 
      name: 'Classification Agent', 
      description: 'Categorizes and organizes energy policy data and research',
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: <Bot className="h-4 w-4 text-blue-700" /> 
    },
    { 
      name: 'Anomaly Detection Agent', 
      description: 'Identifies unusual patterns in energy data that may require attention',
      color: 'bg-orange-100 text-orange-800 border-orange-200', 
      icon: <Bot className="h-4 w-4 text-orange-700" /> 
    }
  ];

  return (
    <motion.div 
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-srigreen-700" />
          <h2 className="text-xl font-medium text-gray-800">
            {sectionType === 'search' && "Ask About Sri Lankan Energy Sector"}
            {sectionType === 'visualize' && "Visualize Sri Lankan Energy Data"}
            {sectionType === 'insights' && "Explore Sri Lankan Energy Policies"}
          </h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAgentInfo(!showAgentInfo)}
          className="flex items-center gap-1"
        >
          <Network className="w-4 h-4" />
          <span className="text-xs">{showAgentInfo ? 'Hide Agents' : 'View Agents'}</span>
        </Button>
      </div>
      
      <AnimatePresence>
        {showAgentInfo && (
          <motion.div 
            className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium text-gray-700 mb-3">Multi-Agent Pipeline:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {agentTypes.map((agent, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border ${agent.color}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                >
                  {agent.icon}
                  <span className="text-xs font-medium">{agent.name}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500">Your query will be processed through this intelligent agent system to provide accurate information and analysis.</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Your Query:
          </label>
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              sectionType === 'search' 
                ? "Type your question about Sri Lanka's energy sector..." 
                : sectionType === 'visualize'
                  ? "Ask for specific energy data visualization..."
                  : "Ask about energy policies and regulations..."
            }
            className="min-h-[120px] w-full resize-none border-gray-300 focus:border-srigreen-600 focus:ring-srigreen-600 transition-all duration-200"
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            disabled={!query.trim() || isLoading}
            className="bg-srigreen-700 hover:bg-srigreen-800 text-white px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
          >
            {isLoading ? 'Processing...' : 'Submit Query'}
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Example queries:</p>
        <div className="flex flex-wrap gap-2">
          {getExampleQueries().map((example, index) => (
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
  );
};

export default QuerySection;
