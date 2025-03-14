
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BarChart3, Send, FileText, X, BarChart, LineChart, PieChart } from 'lucide-react';
import LoadingIndicator from './LoadingIndicator';
import DataVisualization, { ChartType } from './DataVisualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface DataSectionProps {
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

const DataSection: React.FC<DataSectionProps> = ({ 
  onSubmit, 
  isLoading,
  result,
  visualizationData,
  onClear
}) => {
  const [query, setQuery] = useState('');
  const [preferredChartType, setPreferredChartType] = useState<ChartType>('line');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      // Append chart type preference to the query
      const fullQuery = `${query} (preferred chart type: ${preferredChartType})`;
      onSubmit(fullQuery);
    }
  };

  const exampleQueries = [
    "Generate the electricity demand for Sri Lanka in past 5 years",
    "Show me the renewable energy capacity growth in Sri Lanka",
    "Compare hydropower vs solar energy production in Sri Lanka",
    "Visualize the energy mix evolution in Sri Lanka from 2010 to 2023"
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
          <BarChart3 className="w-5 h-5 text-srigreen-700" />
          <h2 className="text-xl font-medium text-gray-800">Visualize Sri Lankan Energy Data</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
              Your Visualization Request:
            </label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for specific energy data visualization..."
              className="min-h-[120px] w-full resize-none border-gray-300 focus:border-srigreen-600 focus:ring-srigreen-600 transition-all duration-200"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="chartType" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Chart Type:
            </label>
            <Select 
              value={preferredChartType} 
              onValueChange={(value) => setPreferredChartType(value as ChartType)}
            >
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">
                  <div className="flex items-center">
                    <LineChart className="w-4 h-4 mr-2" />
                    Line Chart
                  </div>
                </SelectItem>
                <SelectItem value="bar">
                  <div className="flex items-center">
                    <BarChart className="w-4 h-4 mr-2" />
                    Bar Chart
                  </div>
                </SelectItem>
                <SelectItem value="pie">
                  <div className="flex items-center">
                    <PieChart className="w-4 h-4 mr-2" />
                    Pie Chart
                  </div>
                </SelectItem>
                <SelectItem value="area">
                  <div className="flex items-center">
                    <LineChart className="w-4 h-4 mr-2" />
                    Area Chart
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              disabled={!query.trim() || isLoading}
              className="bg-srigreen-700 hover:bg-srigreen-800 text-white px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? 'Processing...' : 'Generate Visualization'}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Example visualization requests:</p>
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
          opacity: isLoading || result || visualizationData ? 1 : 0,
          height: isLoading || result || visualizationData ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-srigreen-700" />
            <h2 className="text-xl font-medium text-gray-800">Visualization Results</h2>
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
                <LoadingIndicator size="lg" text="Generating visualization..." />
              </motion.div>
            ) : (visualizationData || result) ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {result && (
                  <div className="prose prose-sm md:prose-base max-w-none mb-8">
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                  </div>
                )}
                
                {visualizationData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Tabs defaultValue={visualizationData.type}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="line" disabled={!['line', 'area'].includes(visualizationData.type)}>Line</TabsTrigger>
                        <TabsTrigger value="bar" disabled={!['bar'].includes(visualizationData.type)}>Bar</TabsTrigger>
                        <TabsTrigger value="pie" disabled={!['pie'].includes(visualizationData.type)}>Pie</TabsTrigger>
                        <TabsTrigger value="area" disabled={!['area', 'line'].includes(visualizationData.type)}>Area</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="line">
                        <DataVisualization
                          data={visualizationData.data}
                          type="line"
                          title={visualizationData.title}
                          xKey={visualizationData.xKey}
                          yKey={visualizationData.yKey}
                          height={350}
                        />
                      </TabsContent>
                      
                      <TabsContent value="bar">
                        <DataVisualization
                          data={visualizationData.data}
                          type="bar"
                          title={visualizationData.title}
                          xKey={visualizationData.xKey}
                          yKey={visualizationData.yKey}
                          height={350}
                        />
                      </TabsContent>
                      
                      <TabsContent value="pie">
                        <DataVisualization
                          data={visualizationData.data}
                          type="pie"
                          title={visualizationData.title}
                          xKey={visualizationData.xKey}
                          yKey={visualizationData.yKey}
                          height={350}
                        />
                      </TabsContent>
                      
                      <TabsContent value="area">
                        <DataVisualization
                          data={visualizationData.data}
                          type="area"
                          title={visualizationData.title}
                          xKey={visualizationData.xKey}
                          yKey={visualizationData.yKey}
                          height={350}
                        />
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default DataSection;
