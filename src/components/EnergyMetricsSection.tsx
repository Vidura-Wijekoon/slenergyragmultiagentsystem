
import React, { useState } from 'react';
import { 
  Zap, 
  BarChart3, 
  Wind, 
  Droplets, 
  LineChart, 
  Lightbulb, 
  Gauge, 
  Factory, 
  Home, 
  MonitorSmartphone,
  AreaChart,
  Leaf,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataVisualization from './DataVisualization';

// Energy metric categories and their respective metrics
const energyMetrics = [
  {
    category: "supply-demand",
    title: "Energy Supply & Demand",
    icon: Zap,
    description: "Key metrics measuring energy consumption and supply balance",
    metrics: [
      {
        name: "Energy Demand Index (EDI)",
        description: "Measures the total energy consumption across sectors (residential, industrial, commercial)",
        value: 87.3,
        change: 3.2,
        unit: "points",
        trend: "up"
      },
      {
        name: "Grid Load Factor",
        description: "Percentage of electricity demand met by available supply capacity",
        value: 78.4,
        change: -2.1,
        unit: "%",
        trend: "down"
      },
      {
        name: "Renewable Energy Penetration Rate",
        description: "Percentage of total energy demand met by renewables",
        value: 32.5,
        change: 5.4,
        unit: "%",
        trend: "up"
      },
      {
        name: "Peak Demand vs. Base Load Ratio",
        description: "Compares peak electricity demand to the minimum base load",
        value: 1.67,
        change: 0.11,
        unit: "ratio",
        trend: "up"
      }
    ],
    chartData: [
      { month: 'Jan', demand: 2400, supply: 2800, renewable: 900 },
      { month: 'Feb', demand: 2200, supply: 2600, renewable: 950 },
      { month: 'Mar', demand: 2000, supply: 2400, renewable: 1000 },
      { month: 'Apr', demand: 2780, supply: 3000, renewable: 1100 },
      { month: 'May', demand: 2890, supply: 3200, renewable: 1300 },
      { month: 'Jun', demand: 3390, supply: 3600, renewable: 1500 }
    ]
  },
  {
    category: "renewable",
    title: "Renewable Energy Performance",
    icon: Wind,
    description: "Metrics showing the efficiency and contribution of renewable energy sources",
    metrics: [
      {
        name: "Solar Utilization Index (SUI)",
        description: "Measures the efficiency and contribution of solar power to the national grid",
        value: 41.2,
        change: 7.8,
        unit: "%",
        trend: "up"
      },
      {
        name: "Wind Energy Capacity Factor",
        description: "Percentage of actual wind power output vs. its maximum potential",
        value: 33.7,
        change: 1.5,
        unit: "%",
        trend: "up"
      },
      {
        name: "Hydropower Efficiency Index",
        description: "Ratio of actual hydro energy generated vs. theoretical maximum based on water availability",
        value: 76.9,
        change: -3.2,
        unit: "%",
        trend: "down"
      }
    ],
    chartData: [
      { month: 'Jan', solar: 400, wind: 300, hydro: 700 },
      { month: 'Feb', solar: 450, wind: 350, hydro: 650 },
      { month: 'Mar', solar: 500, wind: 400, hydro: 600 },
      { month: 'Apr', solar: 550, wind: 450, hydro: 550 },
      { month: 'May', solar: 600, wind: 500, hydro: 600 },
      { month: 'Jun', solar: 650, wind: 550, hydro: 650 }
    ]
  },
  {
    category: "grid",
    title: "Power Grid Stability & Reliability",
    icon: Gauge,
    description: "Metrics related to power grid performance and reliability",
    metrics: [
      {
        name: "Grid Stability Index (GSI)",
        description: "Measures the frequency and duration of power fluctuations or outages",
        value: 92.4,
        change: 1.3,
        unit: "points",
        trend: "up"
      },
      {
        name: "Power Outage Frequency (SAIFI)",
        description: "Number of power interruptions per customer",
        value: 1.25,
        change: -0.42,
        unit: "outages/customer",
        trend: "down"
      },
      {
        name: "Power Outage Duration (SAIDI)",
        description: "Average duration of power outages",
        value: 65.3,
        change: -12.7,
        unit: "min",
        trend: "down"
      },
      {
        name: "Voltage Stability Index (VSI)",
        description: "Measures the reliability of voltage levels across the grid",
        value: 88.7,
        change: 0.9,
        unit: "points",
        trend: "up"
      }
    ],
    chartData: [
      { month: 'Jan', stability: 90, outages: 1.5, duration: 75 },
      { month: 'Feb', stability: 91, outages: 1.4, duration: 70 },
      { month: 'Mar', stability: 92, outages: 1.3, duration: 68 },
      { month: 'Apr', stability: 91, outages: 1.35, duration: 72 },
      { month: 'May', stability: 93, outages: 1.2, duration: 60 },
      { month: 'Jun', stability: 92.4, outages: 1.25, duration: 65 }
    ]
  },
  {
    category: "environment",
    title: "Environmental & Sustainability",
    icon: Leaf,
    description: "Metrics tracking environmental impact and sustainability of energy generation",
    metrics: [
      {
        name: "Carbon Intensity of Power Generation",
        description: "Measures CO2 emissions per kWh of electricity generated",
        value: 425,
        change: -32,
        unit: "g CO2/kWh",
        trend: "down"
      },
      {
        name: "Energy Efficiency Score",
        description: "Compares energy input vs. useful energy output across different power generation methods",
        value: 72.8,
        change: 3.6,
        unit: "points",
        trend: "up"
      },
      {
        name: "Fossil Fuel Dependency Index",
        description: "Tracks reliance on non-renewable energy sources",
        value: 67.5,
        change: -5.4,
        unit: "%",
        trend: "down"
      }
    ],
    chartData: [
      { month: 'Jan', carbon: 450, efficiency: 68, fossil: 72 },
      { month: 'Feb', carbon: 445, efficiency: 69, fossil: 71 },
      { month: 'Mar', carbon: 440, efficiency: 70, fossil: 70 },
      { month: 'Apr', carbon: 435, efficiency: 71, fossil: 69 },
      { month: 'May', carbon: 430, efficiency: 72, fossil: 68 },
      { month: 'Jun', carbon: 425, efficiency: 73, fossil: 67 }
    ]
  },
  {
    category: "economic",
    title: "Economic & Policy Insights",
    icon: DollarSign,
    description: "Metrics related to economic aspects of energy sector",
    metrics: [
      {
        name: "Electricity Price Index (EPI)",
        description: "Tracks fluctuations in electricity costs for different sectors",
        value: 112.7,
        change: 4.3,
        unit: "points",
        trend: "up"
      },
      {
        name: "Energy Affordability Index",
        description: "Compares electricity prices with household incomes",
        value: 68.4,
        change: -2.1,
        unit: "points",
        trend: "down"
      },
      {
        name: "Subsidy Dependence Ratio",
        description: "Measures the extent to which government subsidies support energy production",
        value: 24.3,
        change: -1.8,
        unit: "%",
        trend: "down"
      }
    ],
    chartData: [
      { month: 'Jan', price: 108, affordability: 70, subsidy: 26 },
      { month: 'Feb', price: 109, affordability: 69, subsidy: 26 },
      { month: 'Mar', price: 110, affordability: 69, subsidy: 25 },
      { month: 'Apr', price: 111, affordability: 68, subsidy: 25 },
      { month: 'May', price: 112, affordability: 68, subsidy: 24 },
      { month: 'Jun', price: 113, affordability: 68, subsidy: 24 }
    ]
  },
  {
    category: "consumer",
    title: "Consumer Behavior & Market Trends",
    icon: MonitorSmartphone,
    description: "Metrics tracking consumer behavior and market trends in energy sector",
    metrics: [
      {
        name: "Smart Meter Adoption Rate",
        description: "Percentage of consumers using smart metering technology",
        value: 42.5,
        change: 8.3,
        unit: "%",
        trend: "up"
      },
      {
        name: "Energy Conservation Index",
        description: "Tracks reduction in energy use due to conservation policies or behavioral changes",
        value: 64.8,
        change: 5.2,
        unit: "points",
        trend: "up"
      },
      {
        name: "Industrial vs. Residential Energy Consumption Ratio",
        description: "Helps policymakers understand sectoral energy distribution",
        value: 2.34,
        change: -0.12,
        unit: "ratio",
        trend: "down"
      }
    ],
    chartData: [
      { month: 'Jan', smartMeter: 34, conservation: 59, industrial: 2.5, residential: 1 },
      { month: 'Feb', smartMeter: 36, conservation: 60, industrial: 2.46, residential: 1 },
      { month: 'Mar', smartMeter: 38, conservation: 61, industrial: 2.42, residential: 1 },
      { month: 'Apr', smartMeter: 40, conservation: 62, industrial: 2.38, residential: 1 },
      { month: 'May', smartMeter: 41, conservation: 63, industrial: 2.36, residential: 1 },
      { month: 'Jun', smartMeter: 43, conservation: 65, industrial: 2.34, residential: 1 }
    ]
  }
];

const EnergyMetricsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("supply-demand");
  
  const selectedMetricData = energyMetrics.find(category => category.category === selectedCategory);
  
  const renderMetricCard = (metric: any) => {
    const trendColor = metric.trend === "up" 
      ? (metric.name.includes("Carbon") || metric.name.includes("Outage") || metric.name.includes("Fossil")) 
        ? "text-red-500" 
        : "text-green-500"
      : (metric.name.includes("Carbon") || metric.name.includes("Outage") || metric.name.includes("Fossil"))
        ? "text-green-500"
        : "text-red-500";
    
    const trendIcon = metric.trend === "up" ? "↑" : "↓";
    
    return (
      <Card key={metric.name} className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-semibold">{metric.name}</CardTitle>
          <CardDescription className="text-xs line-clamp-2" title={metric.description}>
            {metric.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">
              {metric.value.toLocaleString()} <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            <div className={`flex items-center ${trendColor}`}>
              <span className="text-sm font-medium">
                {trendIcon} {Math.abs(metric.change).toLocaleString()} {metric.unit}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Sri Lanka Energy Metrics & Indices
          </h2>
          <p className="mt-2 text-gray-600">
            Key metrics and indicators to understand the energy landscape of Sri Lanka
          </p>
        </div>
        
        <Tabs 
          defaultValue="supply-demand" 
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1">
              {energyMetrics.map(category => (
                <TabsTrigger 
                  key={category.category} 
                  value={category.category}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm"
                >
                  {React.createElement(category.icon, { className: "w-3.5 h-3.5 md:w-4 md:h-4" })}
                  <span className="hidden md:inline">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {energyMetrics.map(category => (
            <TabsContent key={category.category} value={category.category} className="pt-2">
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <DataVisualization 
                      data={category.chartData}
                      type={category.category === "renewable" ? "area" : (category.category === "grid" ? "line" : "bar")}
                      title={`${category.title} Trends (Last 6 Months)`}
                      xKey="month"
                      yKey={Object.keys(category.chartData[0]).filter(key => key !== "month")[0]}
                      additionalKeys={Object.keys(category.chartData[0]).filter(key => key !== "month" && key !== Object.keys(category.chartData[0]).filter(key => key !== "month")[0])}
                      height={300}
                    />
                  </div>
                  <div className="md:w-1/3 flex flex-col justify-center">
                    <Card className="h-full bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-sm">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          {React.createElement(category.icon, { className: "w-5 h-5 text-indigo-600" })}
                          <CardTitle>{category.title}</CardTitle>
                        </div>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          These metrics provide insights into {category.title.toLowerCase()} in Sri Lanka's energy sector, 
                          helping stakeholders make informed decisions.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.metrics.map(metric => renderMetricCard(metric))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default EnergyMetricsSection;
