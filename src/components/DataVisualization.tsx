
import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Chart type options
export type ChartType = 'line' | 'bar' | 'pie' | 'area';

interface DataVisualizationProps {
  data: any[];
  type: ChartType;
  title: string;
  xKey: string;
  yKey: string;
  color?: string;
  width?: number | string;
  height?: number;
  margin?: { top: number; right: number; left: number; bottom: number };
}

const COLORS = ['#0D6938', '#61876E', '#3C6255', '#A6BB8D', '#8EC3B0', '#66BFBF'];

const DataVisualization: React.FC<DataVisualizationProps> = ({
  data,
  type,
  title,
  xKey,
  yKey,
  color = '#0D6938',
  width = '100%',
  height = 300,
  margin = { top: 10, right: 30, left: 0, bottom: 0 }
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data}
            margin={margin}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey={xKey} tick={{ fill: '#666' }} />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={margin}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey={xKey} tick={{ fill: '#666' }} />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }} 
            />
            <Legend />
            <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
        
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={yKey}
              nameKey={xKey}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }} 
            />
            <Legend />
          </PieChart>
        );
        
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={margin}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey={xKey} tick={{ fill: '#666' }} />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }} 
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              fillOpacity={0.2}
              fill={color} 
            />
          </AreaChart>
        );
        
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width={width} height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataVisualization;
