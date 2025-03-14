
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Search, BarChart3, Lightbulb, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import QuerySection from '@/components/QuerySection';
import ResultsSection from '@/components/ResultsSection';
import DataSection from '@/components/DataSection';
import PolicySection from '@/components/PolicySection';
import { submitQuery } from '@/utils/api';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'search' | 'visualize' | 'insights'>('search');
  const [visualizationData, setVisualizationData] = useState<any>(null);
  const { toast } = useToast();

  const handleQuerySubmit = async (query: string) => {
    setIsLoading(true);
    setResult(null);
    setVisualizationData(null);
    
    try {
      const response = await submitQuery(query, activeSection);
      setResult(response.answer);
      
      if (response.visualization) {
        setVisualizationData(response.visualization);
      }
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sri Lanka Energy Knowledge Base</h1>
            <Button variant="outline" asChild className="flex items-center gap-1">
              <Link to="/agent-architecture">
                <Network className="w-4 h-4" />
                <span className="hidden sm:inline">View Agent Architecture</span>
              </Link>
            </Button>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
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
      
      <footer className="py-6 bg-srigreen-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm">© 2023 Ministry of Power and Energy, Sri Lanka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
