// This is a mock API for frontend demonstration
// In a real application, this would connect to the Python backend

interface QueryResponse {
  answer: string;
  visualization?: {
    data: any[];
    type: 'line' | 'bar' | 'pie' | 'area' | 'radar' | 'composed';
    title: string;
    xKey: string;
    yKey: string;
    additionalKeys?: string[];
  };
}

export async function submitQuery(query: string, section: 'search' | 'visualize' | 'insights' | 'power' = 'search'): Promise<QueryResponse> {
  // Simulate API delay - reduced to 3-4 seconds total
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demonstration, return mock data based on the query and section
  const lowerQuery = query.toLowerCase();
  
  // SEARCH SECTION RESPONSES
  if (section === 'search') {
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
    } else if (lowerQuery.includes('energy landscape') || lowerQuery.includes('current energy landscape')) {
      return {
        answer: `
          <h3>Current Energy Landscape of Sri Lanka</h3>
          <p>Sri Lanka's energy landscape is characterized by a diverse mix of conventional and renewable sources:</p>
          <ul>
            <li><strong>Fossil Fuels:</strong> Still account for approximately 55% of the total energy mix, primarily in thermal power plants and transportation.</li>
            <li><strong>Hydropower:</strong> Contributing around 30% of the electricity generation, dependent on seasonal rainfall patterns.</li>
            <li><strong>Other Renewables:</strong> Growing rapidly, with solar, wind, biomass, and mini-hydro collectively accounting for about 15% of electricity generation.</li>
          </ul>
          <p>The country is actively working toward transitioning to cleaner energy sources, with a national target of achieving 70% renewable energy in the electricity mix by 2030.</p>
        `,
        visualization: {
          data: [
            { name: 'Fossil Fuels', value: 55 },
            { name: 'Hydropower', value: 30 },
            { name: 'Solar', value: 8 },
            { name: 'Wind', value: 4 },
            { name: 'Biomass', value: 3 }
          ],
          type: 'pie',
          title: 'Sri Lanka Energy Mix (2023)',
          xKey: 'name',
          yKey: 'value'
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
    }
  }
  
  // VISUALIZATION SECTION RESPONSES
  else if (section === 'visualize') {
    if (lowerQuery.includes('electricity demand') || lowerQuery.includes('past 5 years')) {
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
    } else if (lowerQuery.includes('renewable energy capacity') || lowerQuery.includes('capacity growth')) {
      return {
        answer: `
          <h3>Renewable Energy Capacity Growth in Sri Lanka (2018-2022)</h3>
          <p>Sri Lanka has seen significant growth in renewable energy capacity over the last five years:</p>
          <ul>
            <li><strong>2018:</strong> 2,100 MW</li>
            <li><strong>2019:</strong> 2,350 MW</li>
            <li><strong>2020:</strong> 2,650 MW</li>
            <li><strong>2021:</strong> 2,950 MW</li>
            <li><strong>2022:</strong> 3,300 MW</li>
          </ul>
          <p>This represents a compound annual growth rate (CAGR) of approximately 12%, with solar and wind power showing the fastest growth rates among all renewable technologies.</p>
        `,
        visualization: {
          data: [
            { year: '2018', capacity: 2100 },
            { year: '2019', capacity: 2350 },
            { year: '2020', capacity: 2650 },
            { year: '2021', capacity: 2950 },
            { year: '2022', capacity: 3300 }
          ],
          type: 'area',
          title: 'Renewable Energy Capacity Growth in Sri Lanka (MW)',
          xKey: 'year',
          yKey: 'capacity'
        }
      };
    } else if (lowerQuery.includes('hydropower vs solar') || lowerQuery.includes('compare')) {
      return {
        answer: `
          <h3>Hydropower vs Solar Energy Production in Sri Lanka (2018-2022)</h3>
          <p>A comparison of hydropower and solar energy production in Sri Lanka shows interesting trends:</p>
          <ul>
            <li><strong>Hydropower:</strong> Production varies significantly with rainfall patterns, showing volatility year to year.</li>
            <li><strong>Solar Energy:</strong> Shows consistent growth with increasing installed capacity and improved technology.</li>
          </ul>
          <p>While hydropower still dominates in terms of total production, solar energy is growing at a much faster rate and is expected to play an increasingly important role in Sri Lanka's energy mix.</p>
        `,
        visualization: {
          data: [
            { year: '2018', Hydropower: 5400, Solar: 190 },
            { year: '2019', Hydropower: 4900, Solar: 310 },
            { year: '2020', Hydropower: 5700, Solar: 470 },
            { year: '2021', Hydropower: 5100, Solar: 710 },
            { year: '2022', Hydropower: 5300, Solar: 980 }
          ],
          type: 'bar',
          title: 'Hydropower vs Solar Energy Production (GWh)',
          xKey: 'year',
          yKey: 'Hydropower',
          additionalKeys: ['Solar']
        }
      };
    } else if (lowerQuery.includes('energy mix evolution') || lowerQuery.includes('2010 to 2023')) {
      return {
        answer: `
          <h3>Energy Mix Evolution in Sri Lanka (2010-2023)</h3>
          <p>Sri Lanka's energy mix has undergone significant changes over the past decade:</p>
          <ul>
            <li><strong>Fossil Fuels:</strong> Decreased from 67% in 2010 to 55% in 2023.</li>
            <li><strong>Hydropower:</strong> Relatively stable, fluctuating between 28-35% based on rainfall patterns.</li>
            <li><strong>Solar:</strong> Dramatic increase from negligible amounts in 2010 to 8% in 2023.</li>
            <li><strong>Wind:</strong> Growth from less than 1% in 2010 to 4% in 2023.</li>
            <li><strong>Biomass:</strong> Steady increase to 3% of the energy mix.</li>
          </ul>
          <p>This evolution reflects Sri Lanka's commitment to transitioning toward cleaner energy sources and reducing dependence on imported fossil fuels.</p>
        `,
        visualization: {
          data: [
            { year: '2010', 'Fossil Fuels': 67, 'Hydropower': 30, 'Solar': 0.1, 'Wind': 0.5, 'Biomass': 2.4 },
            { year: '2015', 'Fossil Fuels': 63, 'Hydropower': 29, 'Solar': 1.5, 'Wind': 2.0, 'Biomass': 4.5 },
            { year: '2020', 'Fossil Fuels': 58, 'Hydropower': 31, 'Solar': 6.0, 'Wind': 3.0, 'Biomass': 2.0 },
            { year: '2023', 'Fossil Fuels': 55, 'Hydropower': 30, 'Solar': 8.0, 'Wind': 4.0, 'Biomass': 3.0 }
          ],
          type: 'bar',
          title: 'Energy Mix Evolution in Sri Lanka (2010-2023)',
          xKey: 'year',
          yKey: 'Fossil Fuels',
          additionalKeys: ['Hydropower', 'Solar', 'Wind', 'Biomass']
        }
      };
    } else if (lowerQuery.includes('pie') || lowerQuery.includes('chart type: pie')) {
      // Case when user explicitly requests a pie chart
      return {
        answer: `
          <h3>Sri Lanka Energy Mix (2023)</h3>
          <p>The current energy mix in Sri Lanka shows a gradual transition toward renewable sources:</p>
          <ul>
            <li><strong>Fossil Fuels:</strong> 55% (Coal and oil-based generation)</li>
            <li><strong>Hydropower:</strong> 30% (Large-scale and mini-hydro projects)</li>
            <li><strong>Solar:</strong> 8% (Both utility-scale and rooftop installations)</li>
            <li><strong>Wind:</strong> 4% (Primarily from Mannar Wind Power Project and other coastal installations)</li>
            <li><strong>Biomass & Others:</strong> 3% (Agricultural waste and dedicated energy crops)</li>
          </ul>
          <p>The government's policy framework aims to further reduce fossil fuel dependency and increase the share of renewables to 70% by 2030.</p>
        `,
        visualization: {
          data: [
            { name: 'Fossil Fuels', value: 55 },
            { name: 'Hydropower', value: 30 },
            { name: 'Solar', value: 8 },
            { name: 'Wind', value: 4 },
            { name: 'Biomass & Others', value: 3 }
          ],
          type: 'pie',
          title: 'Sri Lanka Energy Mix (2023)',
          xKey: 'name',
          yKey: 'value'
        }
      };
    }
  }
  
  // POLICY INSIGHTS SECTION RESPONSES
  else if (section === 'insights') {
    if (lowerQuery.includes('key policies') || lowerQuery.includes('renewable energy development')) {
      return {
        answer: `
          <h3>Key Policies for Renewable Energy Development in Sri Lanka</h3>
          <p>Sri Lanka has implemented several key policies to promote renewable energy development:</p>
          <ul>
            <li><strong>National Energy Policy (2019):</strong> Sets a target of 70% renewable energy in the electricity mix by 2030.</li>
            <li><strong>Feed-in Tariff (FiT) Scheme:</strong> Guarantees a fixed price for renewable energy fed into the grid, making investments more attractive and predictable.</li>
            <li><strong>Net Metering System:</strong> Allows consumers to generate their own electricity using solar PV systems and feed excess power back to the grid.</li>
            <li><strong>Green Energy Fund:</strong> Provides financial support for renewable energy projects, particularly for rural electrification and community-based initiatives.</li>
            <li><strong>Tax Incentives:</strong> Includes import duty exemptions for renewable energy equipment and tax holidays for qualifying renewable energy projects.</li>
            <li><strong>Renewable Energy Development Zones:</strong> Designated areas with streamlined approval processes and infrastructure support for renewable energy projects.</li>
          </ul>
          <p>These policies are complemented by the Sustainable Energy Authority Act, which established a dedicated agency to drive sustainable energy development in the country.</p>
        `,
        visualization: {
          data: [
            { policy: 'FiT Scheme', impact: 85 },
            { policy: 'Tax Incentives', impact: 75 },
            { policy: 'Net Metering', impact: 70 },
            { policy: 'Green Energy Fund', impact: 65 },
            { policy: 'Development Zones', impact: 60 }
          ],
          type: 'bar',
          title: 'Estimated Impact of Renewable Energy Policies (Scale 0-100)',
          xKey: 'policy',
          yKey: 'impact'
        }
      };
    } else if (lowerQuery.includes('national energy policy') || lowerQuery.includes('policy objectives')) {
      return {
        answer: `
          <h3>Sri Lanka's National Energy Policy and Its Objectives</h3>
          <p>The National Energy Policy of Sri Lanka, last updated in 2019, provides a comprehensive framework for the country's energy sector development. Its key objectives include:</p>
          <ol>
            <li><strong>Energy Security:</strong> Ensuring reliable and adequate energy supply to meet the country's growing demand through diversification of energy sources.</li>
            <li><strong>Renewable Energy Integration:</strong> Increasing the share of renewable energy in the national energy mix to 70% by 2030 and 80% by 2050.</li>
            <li><strong>Energy Efficiency:</strong> Promoting efficient use of energy across all sectors to reduce waste and lower costs.</li>
            <li><strong>Energy Equity:</strong> Ensuring affordable access to modern energy services for all citizens, including those in rural and remote areas.</li>
            <li><strong>Environmental Sustainability:</strong> Minimizing the environmental impacts of energy production and use, with a focus on reducing greenhouse gas emissions.</li>
            <li><strong>Market Development:</strong> Creating a competitive energy market with transparent pricing mechanisms and private sector participation.</li>
            <li><strong>Research and Innovation:</strong> Supporting research, development, and demonstration of new energy technologies and solutions.</li>
          </ol>
          <p>The policy is implemented through a series of strategic actions and is overseen by the Ministry of Power and Energy in collaboration with the Sustainable Energy Authority, Ceylon Electricity Board, and other key stakeholders.</p>
        `,
        visualization: {
          data: [
            { objective: 'Renewable Integration', priority: 90 },
            { objective: 'Energy Security', priority: 85 },
            { objective: 'Environmental Sustainability', priority: 80 },
            { objective: 'Energy Efficiency', priority: 75 },
            { objective: 'Energy Equity', priority: 70 },
            { objective: 'Market Development', priority: 65 },
            { objective: 'Research & Innovation', priority: 60 }
          ],
          type: 'pie',
          title: 'National Energy Policy Objectives by Priority',
          xKey: 'objective',
          yKey: 'priority'
        }
      };
    } else if (lowerQuery.includes('incentives') || lowerQuery.includes('private investors')) {
      return {
        answer: `
          <h3>Incentives for Private Investors in Sri Lanka's Renewable Energy Sector</h3>
          <p>Sri Lanka offers various incentives to attract private investment in renewable energy:</p>
          <ul>
            <li><strong>Standardized Power Purchase Agreements (SPPAs):</strong> Long-term contracts (typically 20 years) with guaranteed purchase of electricity by the Ceylon Electricity Board.</li>
            <li><strong>Cost-Based Tariffs:</strong> Technology-specific tariffs that ensure fair returns on investment based on the technology cost structure.</li>
            <li><strong>Tax Incentives:</strong>
              <ul>
                <li>Import duty exemptions for renewable energy equipment and machinery</li>
                <li>Income tax holidays of up to 12 years for qualifying projects</li>
                <li>Accelerated depreciation allowances for renewable energy assets</li>
              </ul>
            </li>
            <li><strong>Land Leasing:</strong> Favorable terms for leasing government land for renewable energy projects.</li>
            <li><strong>Green Certificates:</strong> Tradable certificates for renewable energy generation that can provide additional revenue streams.</li>
            <li><strong>Dedicated Funding:</strong> Access to special credit lines and funding mechanisms through state and commercial banks.</li>
            <li><strong>One-Stop Shop:</strong> Streamlined approval process through the Sustainable Energy Authority to reduce bureaucratic delays.</li>
          </ul>
          <p>These incentives have successfully attracted both domestic and international investors to Sri Lanka's renewable energy sector, particularly in wind, solar, and small hydropower projects.</p>
        `,
        visualization: {
          data: [
            { incentive: 'SPPAs', effectiveness: 90 },
            { incentive: 'Tax Holidays', effectiveness: 85 },
            { incentive: 'Duty Exemptions', effectiveness: 80 },
            { incentive: 'Cost-Based Tariffs', effectiveness: 75 },
            { incentive: 'Green Certificates', effectiveness: 65 },
            { incentive: 'Land Leasing', effectiveness: 60 }
          ],
          type: 'bar',
          title: 'Effectiveness of Incentives for Private Investment',
          xKey: 'incentive',
          yKey: 'effectiveness'
        }
      };
    }
  }
  
  // POWER SECTION RESPONSES
  else if (section === 'power') {
    if (lowerQuery.includes('demand') || lowerQuery.includes('consumption')) {
      return {
        answer: `
          <h3>Real-Time Power Demand in Sri Lanka</h3>
          <p>The current electricity demand in Sri Lanka is constantly fluctuating throughout the day. Peak demand typically occurs between 6:30 PM and 10:30 PM when residential consumption is at its highest.</p>
          <p>The Ceylon Electricity Board (CEB) manages this demand through a combination of baseload power plants (primarily coal and major hydropower) and peaking power plants (including gas turbines and smaller hydropower stations).</p>
          <p>Real-time monitoring and forecasting systems help grid operators anticipate and respond to changes in demand, ensuring grid stability and reliability.</p>
        `,
        visualization: {
          data: [
            { time: '00:00', demand: 1850 },
            { time: '03:00', demand: 1650 },
            { time: '06:00', demand: 1950 },
            { time: '09:00', demand: 2350 },
            { time: '12:00', demand: 2600 },
            { time: '15:00', demand: 2500 },
            { time: '18:00', demand: 2800 },
            { time: '21:00', demand: 2950 },
          ],
          type: 'line',
          title: 'Daily Power Demand Pattern (MW)',
          xKey: 'time',
          yKey: 'demand'
        }
      };
    } else if (lowerQuery.includes('generation') || lowerQuery.includes('supply')) {
      return {
        answer: `
          <h3>Real-Time Power Generation in Sri Lanka</h3>
          <p>Sri Lanka's electricity generation comes from a diverse mix of sources, with real-time proportions varying based on resource availability, demand patterns, and economic dispatching decisions.</p>
          <p>The generation mix includes:</p>
          <ul>
            <li><strong>Coal:</strong> Provides baseload power from the Norochcholai power plant</li>
            <li><strong>Major Hydropower:</strong> Varies seasonally based on reservoir levels</li>
            <li><strong>Oil & Diesel:</strong> Used primarily for peaking and backup</li>
            <li><strong>Wind & Solar:</strong> Fluctuate based on weather conditions</li>
            <li><strong>Mini-hydro:</strong> Provides distributed generation across the country</li>
          </ul>
          <p>The CEB's System Control Center continuously optimizes this mix to ensure reliable supply at minimum cost.</p>
        `,
        visualization: {
          data: [
            { source: 'Coal', output: 890 },
            { source: 'Major Hydro', output: 760 },
            { source: 'Oil & Diesel', output: 510 },
            { source: 'Mini Hydro', output: 290 },
            { source: 'Wind', output: 180 },
            { source: 'Solar', output: 270 },
            { source: 'Biomass', output: 100 }
          ],
          type: 'pie',
          title: 'Current Power Generation by Source (MW)',
          xKey: 'source',
          yKey: 'output'
        }
      };
    }
  }
  
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
