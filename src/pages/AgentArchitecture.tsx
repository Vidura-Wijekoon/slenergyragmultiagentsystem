
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Bot, ArrowRight, GitBranch, Database, HardDrive, ChevronLeft, HelpingHand, Search, PenTool, Cpu, Network, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { agents, subAgents, queryPipeline } from '@/config/agentConfig';

const AgentArchitecture: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
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
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Sri Lanka Energy Knowledge Base - Agent Architecture</h1>
          </div>

          <div className="mb-12">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Multi-Agent System Architecture</h2>
              <p className="text-gray-600 mb-6">
                Our application uses a sophisticated multi-agent system to process your queries about Sri Lanka's energy sector.
                Each agent specializes in different aspects of data analysis and information retrieval, working together to provide
                accurate and comprehensive responses.
              </p>
              
              <div className="flex justify-center mb-8">
                <motion.div 
                  className="relative max-w-3xl w-full rounded-xl overflow-hidden shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <img 
                    src="/lovable-uploads/a80309f4-4315-4192-b207-6c1f4d402446.png" 
                    alt="Multi-Agent System Architecture" 
                    className="w-full rounded-lg border border-indigo-200 shadow-sm bg-white/90"
                  />
                </motion.div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Multi-Agent Pipeline</h3>
              <div className="p-4 bg-slate-50 rounded-lg mb-6 overflow-x-auto">
                <div className="flex items-center gap-2 pb-2 mb-2">
                  <h4 className="text-md font-semibold text-slate-700">Multi-Agent Pipeline:</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-2 rounded-md bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Bot className="h-4 w-4" />
                    <span className="text-sm font-medium">Master Agent</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 self-center" />
                  <div className="px-3 py-2 rounded-md bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    <Search className="h-4 w-4" />
                    <span className="text-sm font-medium">Classification Agent</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 self-center" />
                  <div className="px-3 py-2 rounded-md bg-pink-100 text-pink-800 border border-pink-200 flex items-center gap-1">
                    <PenTool className="h-4 w-4" />
                    <span className="text-sm font-medium">Imputation Agent</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 self-center" />
                  <div className="px-3 py-2 rounded-md bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Database className="h-4 w-4" />
                    <span className="text-sm font-medium">Anomaly Detection Agent</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 self-center" />
                  <div className="px-3 py-2 rounded-md bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Database className="h-4 w-4" />
                    <span className="text-sm font-medium">Forecasting Agent</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Agent Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="relative p-5 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-amber-800">Master Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    The central coordinator that manages the entire query processing pipeline. It receives user queries, 
                    leverages Agentic RAGs, and coordinates with specialized agents to produce comprehensive responses.
                  </p>
                </motion.div>
                
                <motion.div
                  className="relative p-5 rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-blue-800">Classification Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Categorizes energy data and queries by type and domain, ensuring that the right information
                    is retrieved and processed for each specific query.
                  </p>
                </motion.div>
                
                <motion.div
                  className="relative p-5 rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-pink-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-pink-800">Imputation Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Fills in missing data gaps in the energy datasets, ensuring complete and accurate information
                    is available for analysis and response generation.
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  className="relative p-5 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
                    <Database className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-amber-800">Anomaly Detection Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Identifies unusual patterns or outliers in energy data, helping to detect potential issues
                    or interesting phenomena in the Sri Lankan energy sector.
                  </p>
                </motion.div>
                
                <motion.div
                  className="relative p-5 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
                    <Database className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-amber-800">Forecasting Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Predicts future energy trends and consumption patterns based on historical data and current conditions,
                    providing valuable insights for planning and decision-making.
                  </p>
                </motion.div>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-4">Agentic RAGs</h3>
              <div className="p-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
                <motion.div
                  className="p-4 rounded-lg bg-white/70 border border-blue-100 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center mb-2">
                    <Cpu className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="text-md font-semibold">Retrieval-Augmented Generation</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Our system employs advanced Agentic RAGs (Retrieval-Augmented Generation) technology to enhance query processing.
                    This approach combines the power of large language models with the ability to retrieve and reference specific information
                    from our comprehensive Sri Lanka energy sector knowledge base.
                  </p>
                  <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
                    Enhanced information retrieval and context preservation
                  </div>
                </motion.div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Query Processing Flow</h3>
              <div className="relative mb-4">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-500 z-0"></div>
                <div className="space-y-6 relative z-10">
                  {queryPipeline.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border border-indigo-200 shadow-sm flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-md font-semibold">{step.name}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Live Agent Demo</h3>
                <p className="text-sm text-gray-600 mb-4">Experience how our agents work together to process your query:</p>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center gap-3 p-2 rounded-md border border-amber-300 shadow-sm bg-white"
                      animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                        <Bot className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Master Agent</span>
                      </div>
                      <span className="text-xs text-gray-600">Analyzing query and coordinating agents</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 p-2 rounded-md border border-transparent"
                      animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.9] }}
                      transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                        <Search className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Classification Agent</span>
                      </div>
                      <span className="text-xs text-gray-600">Categorizing query and relevant data sources</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 p-2 rounded-md border border-transparent"
                      animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.9] }}
                      transition={{ duration: 2, delay: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                        <Database className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Forecasting Agent</span>
                      </div>
                      <span className="text-xs text-gray-600">Analyzing historical data trends</span>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="font-medium mb-2">Technical Implementation Details:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Agents communicate using a central message bus for efficient coordination</li>
                  <li>Vector embeddings enable fast semantic search across the knowledge base</li>
                  <li>Advanced NLP techniques parse and understand user queries</li>
                  <li>Real-time data integration with Ceylon Electricity Board systems</li>
                  <li>Future forecasting capabilities powered by machine learning models</li>
                  <li>Agentic RAGs provide context-aware information retrieval and processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm">ViduraAI @SriLanka, All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default AgentArchitecture;
