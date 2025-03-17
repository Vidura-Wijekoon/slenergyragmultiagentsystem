
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
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Scatter
} from 'recharts';

// Chart type options
export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'radar' | 'composed';

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
  additionalKeys?: string[];  // For multi-series charts
}

const COLORS = ['#0D6938', '#61876E', '#3C6255', '#A6BB8D', '#8EC3B0', '#66BFBF', '#3A8891', '#0E5E6F', '#00B8A9', '#97C4B8'];

const DataVisualization: React.FC<DataVisualizationProps> = ({
  data,
  type,
  title,
  xKey,
  yKey,
  color = '#0D6938',
  width = '100%',
  height = 300,
  margin = { top: 10, right: 30, left: 0, bottom: 0 },
  additionalKeys = []
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
            {additionalKeys && additionalKeys.length > 0 ? (
              // Multi-series line chart
              <>
                <Line 
                  type="monotone" 
                  dataKey={yKey} 
                  stroke={color} 
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                {additionalKeys.map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[(index + 1) % COLORS.length]}
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                ))}
              </>
            ) : (
              // Single line chart
              <Line 
                type="monotone" 
                dataKey={yKey} 
                stroke={color} 
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
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
            {additionalKeys && additionalKeys.length > 0 ? (
              // Multi-series bar chart
              <>
                <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
                {additionalKeys.map((key, index) => (
                  <Bar 
                    key={key}
                    dataKey={key} 
                    fill={COLORS[(index + 1) % COLORS.length]}
                    radius={[4, 4, 0, 0]} 
                  />
                ))}
              </>
            ) : (
              // Single bar chart
              <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        );
        
      case 'pie':
        return (
          <PieChart margin={margin}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={yKey}
              nameKey={xKey}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationBegin={0}
              animationDuration={1000}
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
              formatter={(value, name) => [`${value} (${((value / data.reduce((sum, entry) => sum + entry[yKey], 0)) * 100).toFixed(1)}%)`, name]}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: 20 }}
            />
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
            {additionalKeys && additionalKeys.length > 0 ? (
              // Multi-series area chart
              <>
                <Area 
                  type="monotone" 
                  dataKey={yKey} 
                  stroke={color} 
                  fillOpacity={0.2}
                  fill={color} 
                />
                {additionalKeys.map((key, index) => (
                  <Area 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    stroke={COLORS[(index + 1) % COLORS.length]} 
                    fillOpacity={0.2}
                    fill={COLORS[(index + 1) % COLORS.length]}
                  />
                ))}
              </>
            ) : (
              // Single area chart
              <Area 
                type="monotone" 
                dataKey={yKey} 
                stroke={color} 
                fillOpacity={0.2}
                fill={color} 
              />
            )}
          </AreaChart>
        );
      
      case 'radar':
        return (
          <RadarChart outerRadius={90} width={730} height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xKey} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Radar name={yKey} dataKey={yKey} stroke={color} fill={color} fillOpacity={0.6} />
            {additionalKeys && additionalKeys.map((key, index) => (
              <Radar 
                key={key}
                name={key} 
                dataKey={key} 
                stroke={COLORS[(index + 1) % COLORS.length]} 
                fill={COLORS[(index + 1) % COLORS.length]} 
                fillOpacity={0.6} 
              />
            ))}
            <Legend />
            <Tooltip />
          </RadarChart>
        );
      
      case 'composed':
        return (
          <ComposedChart data={data} margin={margin}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={xKey} scale="band" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <Legend />
            <Bar dataKey={yKey} barSize={20} fill={color} />
            {additionalKeys && additionalKeys.length > 0 && (
              <Line type="monotone" dataKey={additionalKeys[0]} stroke={COLORS[1]} />
            )}
          </ComposedChart>
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
