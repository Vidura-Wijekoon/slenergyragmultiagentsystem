
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Bot, ArrowRight, GitBranch, Database, HardDrive, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AgentArchitecture: React.FC = () => {
  // Agent system components
  const components = [
    {
      title: "Master Agent",
      description: "Coordinates all sub-agents and manages the entire query processing workflow",
      color: "bg-yellow-100 border-yellow-300",
      icon: <Bot className="w-6 h-6 text-yellow-600" />,
      delay: 0.1
    },
    {
      title: "Forecasting Agent",
      description: "Specializes in time-series analysis and predicting future energy trends",
      color: "bg-amber-100 border-amber-300",
      icon: <Bot className="w-6 h-6 text-amber-600" />,
      delay: 0.2
    },
    {
      title: "Imputation Agent",
      description: "Handles missing data in datasets to ensure comprehensive analysis",
      color: "bg-rose-100 border-rose-300",
      icon: <Bot className="w-6 h-6 text-rose-600" />,
      delay: 0.3
    },
    {
      title: "Classification Agent",
      description: "Categorizes information and documents for easier retrieval and understanding",
      color: "bg-blue-100 border-blue-300",
      icon: <Bot className="w-6 h-6 text-blue-600" />,
      delay: 0.4
    },
    {
      title: "Anomaly Detection Agent",
      description: "Identifies unusual patterns or outliers in energy data",
      color: "bg-orange-100 border-orange-300",
      icon: <Bot className="w-6 h-6 text-orange-600" />,
      delay: 0.5
    }
  ];

  // Data flow steps
  const dataFlow = [
    {
      step: 1,
      title: "User Query",
      description: "The process begins when a user submits a question or request",
      icon: <GitBranch className="w-5 h-5 text-gray-600" />,
      delay: 0.2
    },
    {
      step: 2,
      title: "Master Agent Processing",
      description: "The Master Agent analyzes the query and delegates tasks to appropriate sub-agents",
      icon: <Bot className="w-5 h-5 text-yellow-600" />,
      delay: 0.3
    },
    {
      step: 3,
      title: "Knowledge Retrieval",
      description: "Agents access the vector database to retrieve relevant information",
      icon: <Database className="w-5 h-5 text-indigo-600" />,
      delay: 0.4
    },
    {
      step: 4,
      title: "Specialized Processing",
      description: "Sub-agents process the data according to their specialized functions",
      icon: <HardDrive className="w-5 h-5 text-emerald-600" />,
      delay: 0.5
    },
    {
      step: 5,
      title: "Response Generation",
      description: "The Master Agent compiles the processed information into a coherent response",
      icon: <ArrowRight className="w-5 h-5 text-purple-600" />,
      delay: 0.6
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/" className="flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Sri Lanka Energy Knowledge Base - Agent Architecture</h1>
          </div>

          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Multi-Agent System Architecture</h2>
              <p className="text-gray-600 mb-6">
                Our application uses a sophisticated multi-agent system to process your queries about Sri Lanka's energy sector.
                Each agent specializes in different aspects of data analysis and information retrieval, working together to provide
                accurate and comprehensive responses.
              </p>
              
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/af9470a8-7a11-4fce-981e-a711bd32bf24.png" 
                  alt="Multi-Agent System Architecture" 
                  className="max-w-full md:max-w-2xl rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Agent Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {components.map((component, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border ${component.color} transition-all duration-200`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: component.delay, duration: 0.4 }}
                  >
                    <div className="flex items-center mb-2">
                      {component.icon}
                      <h4 className="text-md font-semibold ml-2">{component.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Data Flow Process</h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                <div className="space-y-6 relative z-10">
                  {dataFlow.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.delay, duration: 0.4 }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {step.icon}
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-md font-semibold">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-srigreen-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm">© 2023 Ministry of Power and Energy, Sri Lanka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AgentArchitecture;
