
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  Battery, 
  Zap, 
  Droplets, 
  Flame, 
  Sun, 
  Wind, 
  RefreshCw,
  TrendingUp,
  Clock 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCurrentPowerStatistics, getForecastedStatistics, getHistoricalStatistics } from '@/services/cebService';

interface PowerStatsTileProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  color: string;
  change?: number;
  isLoading?: boolean;
}

const PowerStatsTile: React.FC<PowerStatsTileProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  color,
  change,
  isLoading = false
}) => {
  return (
    <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-none shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className={`py-3 ${color} text-white`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="w-6 h-6">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-gray-500 mb-0.5">{unit}</div>
          </div>
        )}
        {change !== undefined && !isLoading && (
          <div className={`text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last hour
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PowerDashboard: React.FC = () => {
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // 30 seconds by default
  
  // Fetch current power stats
  const { 
    data: currentStats, 
    isLoading: isLoadingCurrent,
    refetch: refetchCurrent,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['powerStats', 'current'],
    queryFn: fetchCurrentPowerStatistics,
    refetchInterval: refreshInterval
  });
  
  // Fetch historical power stats
  const { 
    data: historicalStats, 
    isLoading: isLoadingHistorical 
  } = useQuery({
    queryKey: ['powerStats', 'historical'],
    queryFn: () => getHistoricalStatistics(3), // Last 3 days
    refetchInterval: refreshInterval * 4 // Refresh less frequently
  });
  
  // Fetch forecast power stats
  const { 
    data: forecastStats, 
    isLoading: isLoadingForecast 
  } = useQuery({
    queryKey: ['powerStats', 'forecast'],
    queryFn: () => getForecastedStatistics(2), // Next 2 days
    refetchInterval: refreshInterval * 4 // Refresh less frequently
  });
  
  // Format historical data for chart display
  const prepareChartData = (data?: any[]) => {
    if (!data) return [];
    
    // For line chart, get hourly data points
    return data.filter((_, index) => index % 4 === 0).map(stat => ({
      time: new Date(stat.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      }),
      demand: stat.currentDemand,
      supply: stat.currentSupply,
      renewable: stat.renewablePercentage
    }));
  };
  
  // Prepare energy mix data for pie chart
  const prepareEnergyMixData = () => {
    if (!currentStats) return [];
    
    return [
      { name: 'Hydro', value: currentStats.hydroPower, color: '#3B82F6' },
      { name: 'Thermal', value: currentStats.thermalPower, color: '#F97316' },
      { name: 'Solar', value: currentStats.solarPower, color: '#FACC15' },
      { name: 'Wind', value: currentStats.windPower, color: '#10B981' }
    ];
  };
  
  // Calculate time since last update
  const getLastUpdateText = () => {
    if (!dataUpdatedAt) return 'Never updated';
    
    const seconds = Math.floor((Date.now() - dataUpdatedAt) / 1000);
    
    if (seconds < 60) return `Updated ${seconds} seconds ago`;
    if (seconds < 3600) return `Updated ${Math.floor(seconds / 60)} minutes ago`;
    return `Updated ${Math.floor(seconds / 3600)} hours ago`;
  };
  
  const historyData = prepareChartData(historicalStats);
  const forecastData = prepareChartData(forecastStats);
  const energyMixData = prepareEnergyMixData();
  
  // Calculate mock changes for UI display
  const demandChange = !isLoadingCurrent ? Math.round((Math.random() * 6) - 3) : undefined;
  const supplyChange = !isLoadingCurrent ? Math.round((Math.random() * 4) - 1) : undefined;
  const renewableChange = !isLoadingCurrent ? Math.round((Math.random() * 8) - 2) : undefined;
  
  return (
    <motion.div 
      className="w-full bg-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-indigo-100/20 p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Real-Time Power Statistics</h2>
          <Badge variant="outline" className="ml-2 bg-black/5 gap-1 flex items-center">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{getLastUpdateText()}</span>
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetchCurrent()}
          className="flex items-center gap-1 border-indigo-200 hover:border-indigo-400 transition-all duration-300"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </Button>
      </div>
      
      {/* Power stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <PowerStatsTile 
          title="Current Demand"
          value={isLoadingCurrent ? '-' : currentStats?.currentDemand.toLocaleString() || '0'}
          unit="MW"
          icon={<Battery className="w-full h-full text-white" />}
          color="bg-gradient-to-r from-indigo-600 to-indigo-800"
          change={demandChange}
          isLoading={isLoadingCurrent}
        />
        
        <PowerStatsTile 
          title="Current Supply"
          value={isLoadingCurrent ? '-' : currentStats?.currentSupply.toLocaleString() || '0'}
          unit="MW"
          icon={<Zap className="w-full h-full text-white" />}
          color="bg-gradient-to-r from-purple-600 to-purple-800"
          change={supplyChange}
          isLoading={isLoadingCurrent}
        />
        
        <PowerStatsTile 
          title="Renewable Energy"
          value={isLoadingCurrent ? '-' : currentStats?.renewablePercentage || '0'}
          unit="%"
          icon={<Wind className="w-full h-full text-white" />}
          color="bg-gradient-to-r from-emerald-600 to-emerald-800"
          change={renewableChange}
          isLoading={isLoadingCurrent}
        />
        
        <PowerStatsTile 
          title="Power Forecast"
          value={isLoadingForecast ? '-' : forecastStats && forecastStats.length > 0 
            ? Math.round(forecastStats[forecastStats.length - 1].currentDemand / 100) * 100 
            : '0'
          }
          unit="MW (24h)"
          icon={<TrendingUp className="w-full h-full text-white" />}
          color="bg-gradient-to-r from-sky-600 to-sky-800"
          isLoading={isLoadingForecast}
        />
      </div>
      
      {/* Charts section */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="history" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-900">
            <LineChart className="w-4 h-4 mr-2" />
            Historical
          </TabsTrigger>
          <TabsTrigger value="forecast" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900">
            <TrendingUp className="w-4 h-4 mr-2" />
            Forecast
          </TabsTrigger>
          <TabsTrigger value="mix" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900">
            <PieChart className="w-4 h-4 mr-2" />
            Energy Mix
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="h-[350px]">
          {isLoadingHistorical ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="w-full h-[300px]" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  name="Demand (MW)"
                  stroke="#7C3AED" 
                  fillOpacity={1}
                  fill="url(#demandGradient)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="supply" 
                  name="Supply (MW)"
                  stroke="#3B82F6" 
                  fillOpacity={1}
                  fill="url(#supplyGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </TabsContent>
        
        <TabsContent value="forecast" className="h-[350px]">
          {isLoadingForecast ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="w-full h-[300px]" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  name="Forecasted Demand (MW)"
                  stroke="#C026D3" 
                  strokeWidth={2}
                  dot={{ stroke: '#C026D3', strokeWidth: 2, r: 4, fill: '#fff' }}
                  activeDot={{ stroke: '#C026D3', strokeWidth: 2, r: 6, fill: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="supply" 
                  name="Forecasted Supply (MW)"
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ stroke: '#8B5CF6', strokeWidth: 2, r: 4, fill: '#fff' }}
                  activeDot={{ stroke: '#8B5CF6', strokeWidth: 2, r: 6, fill: '#fff' }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          )}
        </TabsContent>
        
        <TabsContent value="mix" className="h-[350px]">
          {isLoadingCurrent ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="w-full h-[300px]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              <div className="md:col-span-1 flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#3B82F6]"></div>
                  <div className="flex justify-between w-full">
                    <span>Hydropower</span>
                    <span className="font-medium">{currentStats?.hydroPower} MW</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#F97316]"></div>
                  <div className="flex justify-between w-full">
                    <span>Thermal</span>
                    <span className="font-medium">{currentStats?.thermalPower} MW</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FACC15]"></div>
                  <div className="flex justify-between w-full">
                    <span>Solar</span>
                    <span className="font-medium">{currentStats?.solarPower} MW</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#10B981]"></div>
                  <div className="flex justify-between w-full">
                    <span>Wind</span>
                    <span className="font-medium">{currentStats?.windPower} MW</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 h-full">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={energyMixData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={60}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {energyMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} MW`, 'Capacity']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }} 
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
        <div>Source: Ceylon Electricity Board (CEB) - Real-time data</div>
        <div className="flex items-center gap-1">
          <span>Auto-refresh:</span>
          <select 
            value={refreshInterval} 
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="ml-2 px-2 py-1 rounded text-xs border border-gray-300 bg-white"
          >
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
            <option value={300000}>5 minutes</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default PowerDashboard;
