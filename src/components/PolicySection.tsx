
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Send, FileText, X, ExternalLink, BookOpen } from 'lucide-react';
import LoadingIndicator from './LoadingIndicator';
import DataVisualization, { ChartType } from './DataVisualization';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface PolicyReference {
  title: string;
  source: string;
  url: string;
  year: number;
  type: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({ 
  onSubmit, 
  isLoading,
  result,
  visualizationData,
  onClear
}) => {
  const [query, setQuery] = useState('');
  const [referenceType, setReferenceType] = useState<'government' | 'academic' | 'all'>('all');

  // Mock policy references - in a real implementation, these would come from the API
  const policyReferences: PolicyReference[] = [
    {
      title: "National Energy Policy and Strategies of Sri Lanka",
      source: "Ministry of Power and Energy",
      url: "https://powermin.gov.lk/english/national-energy-policy/",
      year: 2019,
      type: "government"
    },
    {
      title: "Sri Lanka Energy Sector Development Plan (2015-2025)",
      source: "Ceylon Electricity Board",
      url: "https://www.ceb.lk/policy/en",
      year: 2015,
      type: "government"
    },
    {
      title: "Renewable Energy Development in Sri Lanka: Status, Potential and Barriers",
      source: "Energy Policy Journal",
      url: "https://www.sciencedirect.com/journal/energy-policy",
      year: 2021,
      type: "academic"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      const fullQuery = referenceType !== 'all' 
        ? `${query} (Find ${referenceType} policy references)`
        : query;
      onSubmit(fullQuery);
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference Type:
            </label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={referenceType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setReferenceType('all')}
                className={referenceType === 'all' ? 'bg-srigreen-700' : ''}
              >
                All Sources
              </Button>
              <Button
                type="button"
                variant={referenceType === 'government' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setReferenceType('government')}
                className={referenceType === 'government' ? 'bg-srigreen-700' : ''}
              >
                Government
              </Button>
              <Button
                type="button"
                variant={referenceType === 'academic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setReferenceType('academic')}
                className={referenceType === 'academic' ? 'bg-srigreen-700' : ''}
              >
                Academic
              </Button>
            </div>
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
                <Tabs defaultValue="analysis">
                  <TabsList className="mb-4">
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="references">References</TabsTrigger>
                    {visualizationData && <TabsTrigger value="visualization">Visualization</TabsTrigger>}
                  </TabsList>
                  
                  <TabsContent value="analysis">
                    <div className="prose prose-sm md:prose-base max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: result }} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="references">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {policyReferences
                        .filter(ref => referenceType === 'all' || ref.type === referenceType)
                        .map((reference, index) => (
                          <Card key={index} className="transition-all duration-200 hover:shadow-md">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{reference.title}</CardTitle>
                              <CardDescription className="flex justify-between">
                                <span>{reference.source}</span>
                                <Badge variant="outline">{reference.year}</Badge>
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-2 flex justify-between">
                              <Badge variant={reference.type === 'government' ? 'default' : 'secondary'}>
                                {reference.type === 'government' ? 'Government' : 'Academic'}
                              </Badge>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={reference.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  View Source
                                </a>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
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
    </>
  );
};

export default PolicySection;
