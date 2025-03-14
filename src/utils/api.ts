
// This is a mock API for frontend demonstration
// In a real application, this would connect to the Python backend

interface QueryResponse {
  answer: string;
  visualization?: {
    data: any[];
    type: 'line' | 'bar' | 'pie' | 'area';
    title: string;
    xKey: string;
    yKey: string;
  };
}

export async function submitQuery(query: string): Promise<QueryResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demonstration, return mock data based on the query
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('renewable energy resources') || lowerQuery.includes('renewable resources')) {
    return {
      answer: `
        <h3>Main Renewable Energy Resources in Sri Lanka</h3>
        <p>Sri Lanka has several key renewable energy resources:</p>
        <ul>
          <li><strong>Hydropower:</strong> The most established renewable resource, contributing about 40% of electricity generation with major facilities at Victoria, Kotmale, and Samanalawewa.</li>
          <li><strong>Solar Energy:</strong> High solar irradiation levels (1,700-1,900 kWh/m²/year) make it suitable for photovoltaic systems and solar thermal applications.</li>
          <li><strong>Wind Energy:</strong> Significant potential in northwestern and southeastern coastal areas, with wind speeds of 7-8 m/s. The Mannar Wind Power Project is a notable development.</li>
          <li><strong>Biomass:</strong> Abundant agricultural residues and dedicated energy plantations provide sustainable biomass resources for power generation.</li>
          <li><strong>Mini/Micro Hydro:</strong> Small-scale hydropower projects in rural areas contribute to distributed generation.</li>
        </ul>
        <p>The government aims to achieve 70% renewable energy in the electricity mix by 2030 as part of its sustainable energy transition strategy.</p>
      `,
      visualization: {
        data: [
          { name: 'Hydropower', value: 40 },
          { name: 'Solar', value: 25 },
          { name: 'Wind', value: 15 },
          { name: 'Biomass', value: 12 },
          { name: 'Mini Hydro', value: 8 }
        ],
        type: 'pie',
        title: 'Renewable Energy Resources Distribution in Sri Lanka (%)',
        xKey: 'name',
        yKey: 'value'
      }
    };
  } else if (lowerQuery.includes('electricity demand') || lowerQuery.includes('past 5 years')) {
    return {
      answer: `
        <h3>Electricity Demand in Sri Lanka (2018-2022)</h3>
        <p>The electricity demand in Sri Lanka has shown steady growth over the past five years, with some fluctuations:</p>
        <ul>
          <li><strong>2018:</strong> 14,091 GWh</li>
          <li><strong>2019:</strong> 15,183 GWh</li>
          <li><strong>2020:</strong> 14,867 GWh (slight decrease due to COVID-19 pandemic)</li>
          <li><strong>2021:</strong> 15,714 GWh (recovery phase)</li>
          <li><strong>2022:</strong> 16,432 GWh</li>
        </ul>
        <p>The demand is projected to grow at approximately 5-6% annually for the next decade, requiring significant capacity additions and grid improvements to meet future needs.</p>
      `,
      visualization: {
        data: [
          { year: '2018', demand: 14091 },
          { year: '2019', demand: 15183 },
          { year: '2020', demand: 14867 },
          { year: '2021', demand: 15714 },
          { year: '2022', demand: 16432 }
        ],
        type: 'line',
        title: 'Electricity Demand in Sri Lanka (GWh)',
        xKey: 'year',
        yKey: 'demand'
      }
    };
  } else if (lowerQuery.includes('hydropower') || lowerQuery.includes('hydro power')) {
    return {
      answer: `
        <h3>Hydropower in Sri Lanka's Energy Mix</h3>
        <p>Hydropower has been the backbone of Sri Lanka's electricity generation system since the commissioning of the Laxapana Power Station in 1950.</p>
        <p>Key hydropower facilities include:</p>
        <ul>
          <li><strong>Mahaweli Complex:</strong> Victoria (210 MW), Kotmale (201 MW), Randenigala (122 MW), Rantambe (49 MW)</li>
          <li><strong>Laxapana Complex:</strong> Old Laxapana (50 MW), New Laxapana (100 MW), Canyon (60 MW), Samanala (120 MW)</li>
          <li><strong>Samanalawewa:</strong> 120 MW</li>
          <li><strong>Upper Kotmale:</strong> 150 MW</li>
          <li><strong>Uma Oya:</strong> 120 MW (newest major addition)</li>
        </ul>
        <p>Hydropower currently accounts for approximately 40% of the total installed capacity in Sri Lanka. However, its contribution to the annual energy mix varies between 25-40% depending on rainfall patterns.</p>
      `,
      visualization: {
        data: [
          { plant: 'Victoria', capacity: 210 },
          { plant: 'Kotmale', capacity: 201 },
          { plant: 'Upper Kotmale', capacity: 150 },
          { plant: 'Randenigala', capacity: 122 },
          { plant: 'Samanalawewa', capacity: 120 },
          { plant: 'Uma Oya', capacity: 120 },
          { plant: 'Samanala', capacity: 120 }
        ],
        type: 'bar',
        title: 'Major Hydropower Plants in Sri Lanka (MW)',
        xKey: 'plant',
        yKey: 'capacity'
      }
    };
  } else {
    // Default response for other queries
    return {
      answer: `
        <h3>Sri Lanka Energy Sector Information</h3>
        <p>The information you've requested might require more specific details. The Sri Lankan energy sector is diverse and evolving, with significant developments in renewable energy, particularly in solar, wind, and hydropower resources.</p>
        <p>You can try asking about:</p>
        <ul>
          <li>Specific renewable energy resources in Sri Lanka</li>
          <li>Electricity demand patterns over recent years</li>
          <li>Government policies on renewable energy</li>
          <li>Major energy projects in development</li>
          <li>Climate change impacts on the energy sector</li>
        </ul>
        <p>For more detailed information, please refine your query to focus on a specific aspect of Sri Lanka's energy sector.</p>
      `
    };
  }
}
