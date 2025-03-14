import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Search, BarChart3, Lightbulb, Network, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import QuerySection from '@/components/QuerySection';
import ResultsSection from '@/components/ResultsSection';
import DataSection from '@/components/DataSection';
import PolicySection from '@/components/PolicySection';
import PowerDashboard from '@/components/PowerDashboard';
import { submitQuery } from '@/utils/api';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'search' | 'visualize' | 'insights' | 'power'>('search');
  const [visualizationData, setVisualizationData] = useState<any>(null);
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const handleQuerySubmit = async (query: string) => {
    setIsLoading(true);
    setResult(null);
    setVisualizationData(null);
    
    try {
      const enhancedQuery = query.toLowerCase().includes('latest') || 
                           query.toLowerCase().includes('current') || 
                           query.toLowerCase().includes('now') || 
                           query.toLowerCase().includes('real-time') || 
                           query.toLowerCase().includes('today')
        ? `${query} [Using real-time data as of ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}]`
        : query;
        
      const response = await submitQuery(enhancedQuery, activeSection);
      setResult(response.answer);
      setLastUpdated(new Date());
      
      if (response.visualization) {
        setVisualizationData(response.visualization);
      }
      
      toast({
        title: "Query Processed",
        description: "The multi-agent system has processed your query successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error processing query:', error);
      toast({
        title: "Error",
        description: "Failed to process your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearResults = () => {
    setResult(null);
    setVisualizationData(null);
  };

  const features = [
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Access comprehensive information about Sri Lanka\'s energy sector',
      onClick: () => setActiveSection('search'),
      section: 'search'
    },
    {
      icon: BarChart3,
      title: 'Data Visualization',
      description: 'Generate insightful charts and graphs from energy sector data',
      onClick: () => setActiveSection('visualize'),
      section: 'visualize'
    },
    {
      icon: Lightbulb,
      title: 'Policy Insights',
      description: 'Understand government policies and regulations in the power sector',
      onClick: () => setActiveSection('insights'),
      section: 'insights'
    },
    {
      icon: Zap,
      title: 'Real-Time Power Stats',
      description: 'Monitor current electricity demand and supply from CEB',
      onClick: () => setActiveSection('power'),
      section: 'power'
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'search':
        return (
          <>
            <QuerySection onSubmit={handleQuerySubmit} isLoading={isLoading} sectionType="search" />
            <ResultsSection 
              isLoading={isLoading}
              result={result}
              visualizationData={visualizationData}
              onClear={handleClearResults}
            />
          </>
        );
      case 'visualize':
        return (
          <>
            <DataSection 
              onSubmit={handleQuerySubmit} 
              isLoading={isLoading}
              result={result}
              visualizationData={visualizationData}
              onClear={handleClearResults}
            />
          </>
        );
      case 'insights':
        return (
          <>
            <PolicySection 
              onSubmit={handleQuerySubmit} 
              isLoading={isLoading}
              result={result}
              visualizationData={visualizationData}
              onClear={handleClearResults}
            />
          </>
        );
      case 'power':
        return <PowerDashboard />;
      default:
        return (
          <>
            <QuerySection onSubmit={handleQuerySubmit} isLoading={isLoading} sectionType="search" />
            <ResultsSection 
              isLoading={isLoading}
              result={result}
              visualizationData={visualizationData}
              onClear={handleClearResults}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Sri Lanka Energy Knowledge Base
              </h1>
              <p className="text-gray-600 mt-1">Powered by Multi-Agent Retrieval-Augmented Generation</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Last updated: {lastUpdated.toLocaleString()}</span>
              </div>
              <Button variant="outline" asChild className="bg-white/50 border-indigo-200 hover:border-indigo-400 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm shadow-sm flex items-center gap-1">
                <Link to="/agent-architecture">
                  <Network className="w-4 h-4" />
                  <span className="hidden sm:inline">View Agent Architecture</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={feature.onClick}
                isActive={activeSection === feature.section}
              />
            ))}
          </motion.div>
          
          {renderActiveSection()}
        </div>
      </main>
      
      <footer className="py-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm">© 2025 Ministry of Power and Energy, Sri Lanka. ViduraAI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
