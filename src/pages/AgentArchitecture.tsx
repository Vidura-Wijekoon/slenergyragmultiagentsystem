
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Bot, ArrowRight, GitBranch, Database, HardDrive, ChevronLeft, HelpingHand, Search, PenTool } from 'lucide-react';
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
                <img 
                  src="/lovable-uploads/0e22b9d3-a942-4774-8e55-e7309ee80559.png" 
                  alt="Multi-Agent System Architecture" 
                  className="max-w-full md:max-w-2xl rounded-lg border border-indigo-200 shadow-sm"
                />
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Agent Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="relative p-5 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-purple-800">Coordinator Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    The central coordinator that manages the entire query processing pipeline. It receives user queries, 
                    delegates to specialized sub-agents, and synthesizes the final response.
                  </p>
                </motion.div>
                
                <motion.div
                  className="relative p-5 rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center">
                    <HelpingHand className="w-5 h-5 text-pink-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-pink-800">Assistant Agent</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Assists the coordinator in handling complex queries and knowledge gaps. It provides supplementary
                    information and helps with response refinement.
                  </p>
                </motion.div>
                
                <motion.div
                  className="relative p-5 rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="text-md font-semibold ml-6 text-indigo-800">Workflow Manager</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Plans and manages the query processing workflow. It determines which sub-agents to engage
                    and in what sequence for optimal information processing.
                  </p>
                </motion.div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Specialized Sub-Agents</h3>
              <div className="p-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subAgents.map((agent, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg bg-white/70 border border-blue-100 shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center mb-2">
                        {index === 0 && <Search className="w-5 h-5 text-blue-600 mr-2" />}
                        {index === 1 && <Database className="w-5 h-5 text-indigo-600 mr-2" />}
                        {index === 2 && <PenTool className="w-5 h-5 text-emerald-600 mr-2" />}
                        <h4 className="text-md font-semibold">{agent.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                      <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
                        Function: {agent.function}
                      </div>
                    </motion.div>
                  ))}
                </div>
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
              
              <div className="text-sm text-gray-500 mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="font-medium mb-2">Technical Implementation Details:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Agents communicate using a central message bus for efficient coordination</li>
                  <li>Vector embeddings enable fast semantic search across the knowledge base</li>
                  <li>Advanced NLP techniques parse and understand user queries</li>
                  <li>Real-time data integration with Ceylon Electricity Board systems</li>
                  <li>Future forecasting capabilities powered by machine learning models</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm">© 2025 Ministry of Power and Energy, Sri Lanka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AgentArchitecture;
