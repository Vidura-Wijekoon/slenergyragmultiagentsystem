
/**
 * Ceylon Electricity Board (CEB) Service
 * Fetches real-time electricity data from CEB.lk
 */

interface PowerStatistics {
  currentDemand: number;
  currentSupply: number;
  renewablePercentage: number;
  hydroPower: number;
  thermalPower: number;
  solarPower: number;
  windPower: number;
  timestamp: string;
  forecasted: boolean;
}

// Helper to generate realistic mock data within Sri Lankan context
const generateRealisticData = (forecasted: boolean = false): PowerStatistics => {
  // Base values - approximate real Sri Lankan power statistics
  const baseHydro = 900 + Math.random() * 300; // 900-1200 MW
  const baseThermal = 1200 + Math.random() * 400; // 1200-1600 MW
  const baseSolar = forecasted 
    ? (80 + Math.random() * 120) * (1 + (forecasted ? 0.4 : 0)) // Higher for forecasts
    : Math.random() > 0.5 ? 80 + Math.random() * 120 : 10 + Math.random() * 30; // Day/night variation
  const baseWind = forecasted
    ? (70 + Math.random() * 80) * (1 + (forecasted ? 0.3 : 0)) // Higher for forecasts
    : 70 + Math.random() * 80;

  // Calculate totals
  const hydroPower = Math.round(baseHydro);
  const thermalPower = Math.round(baseThermal);
  const solarPower = Math.round(baseSolar);
  const windPower = Math.round(baseWind);
  
  const totalSupply = hydroPower + thermalPower + solarPower + windPower;
  // Demand is usually close to supply, with some variation
  const currentDemand = Math.round(totalSupply * (0.97 + Math.random() * 0.06));
  
  // Calculate renewable percentage
  const renewablePercentage = Math.round((hydroPower + solarPower + windPower) / totalSupply * 100);
  
  return {
    currentDemand,
    currentSupply: totalSupply,
    renewablePercentage,
    hydroPower,
    thermalPower,
    solarPower,
    windPower,
    timestamp: new Date().toISOString(),
    forecasted
  };
};

// In a real implementation, this would fetch from CEB API
// For now, we simulate with realistic mock data
export const fetchCurrentPowerStatistics = async (): Promise<PowerStatistics> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would be:
  // const response = await fetch('https://api.ceb.lk/power-statistics');
  // const data = await response.json();
  // return data;
  
  return generateRealisticData();
};

// Get forecasted power statistics for future dates
export const getForecastedStatistics = async (daysAhead: number = 1): Promise<PowerStatistics[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const forecasts: PowerStatistics[] = [];
  
  // Generate hourly forecasts for the requested days ahead
  const hoursToForecast = daysAhead * 24;
  
  for (let i = 0; i < hoursToForecast; i++) {
    const forecast = generateRealisticData(true);
    
    // Create a future timestamp
    const forecastDate = new Date();
    forecastDate.setHours(forecastDate.getHours() + i);
    forecast.timestamp = forecastDate.toISOString();
    
    forecasts.push(forecast);
  }
  
  return forecasts;
};

// Get historical power statistics
export const getHistoricalStatistics = async (daysBack: number = 7): Promise<PowerStatistics[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const historicalData: PowerStatistics[] = [];
  
  // Generate hourly historical data for the requested days back
  const hoursToGoBack = daysBack * 24;
  
  for (let i = hoursToGoBack; i > 0; i--) {
    const historicalPoint = generateRealisticData();
    
    // Create a past timestamp
    const historicalDate = new Date();
    historicalDate.setHours(historicalDate.getHours() - i);
    historicalPoint.timestamp = historicalDate.toISOString();
    
    historicalData.push(historicalPoint);
  }
  
  return historicalData;
};
