
/**
 * Agent Configuration for Sri Lanka Energy Knowledge Base
 * 
 * This file defines the multi-agent structure used in the application
 * as shown in the architecture diagram.
 */

export interface Agent {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  role: string;
  promptCount?: number;
}

export interface SubAgent {
  id: string;
  name: string;
  description: string;
  function: string;
  color: string;
}

export interface AgentPool {
  id: string;
  name: string;
  agents: Agent[];
  color: string;
}

// Main agent definitions
export const agents: Agent[] = [
  {
    id: 'master',
    name: 'Master Agent',
    description: 'Coordinates the entire query workflow and manages sub-agents',
    color: '#F59E0B',
    icon: 'Bot',
    role: 'Coordination and orchestration of the entire workflow'
  },
  {
    id: 'forecasting',
    name: 'Forecasting Agent',
    description: 'Predicts future energy trends and consumption patterns',
    color: '#F59E0B',
    icon: 'Database',
    role: 'Energy forecasting and prediction',
    promptCount: 3
  },
  {
    id: 'imputation',
    name: 'Imputation Agent',
    description: 'Fills in missing data gaps in the energy datasets',
    color: '#EC4899',
    icon: 'PenTool',
    role: 'Data gap filling and completion',
    promptCount: 2
  },
  {
    id: 'classification',
    name: 'Classification Agent',
    description: 'Categorizes energy data and queries by type and domain',
    color: '#3B82F6',
    icon: 'Search',
    role: 'Energy data classification',
    promptCount: 2
  },
  {
    id: 'anomaly',
    name: 'Anomaly Detection Agent',
    description: 'Identifies unusual patterns or outliers in energy data',
    color: '#F59E0B',
    icon: 'Database',
    role: 'Anomaly and outlier detection',
    promptCount: 3
  }
];

// Sub-agent definitions aligned with the architecture diagram
export const subAgents: SubAgent[] = [
  {
    id: 'sub-agent-1',
    name: 'Sub Agent 1',
    description: 'Retrieves relevant information from the Sri Lanka energy knowledge base',
    function: 'Retriever',
    color: '#0EA5E9'
  },
  {
    id: 'sub-agent-2',
    name: 'Sub Agent 2',
    description: 'Analyzes and processes the retrieved information using advanced models',
    function: 'Analyzer',
    color: '#8B5CF6'
  },
  {
    id: 'sub-agent-3',
    name: 'Sub Agent 3',
    description: 'Synthesizes the analyzed information into a coherent response',
    function: 'Synthesizer',
    color: '#10B981'
  }
];

// Agent pools that group agents by functionality
export const agentPools: AgentPool[] = [
  {
    id: 'master-pool',
    name: 'Master Pool',
    agents: [agents.find(a => a.id === 'master')!],
    color: '#FEF3C7'
  },
  {
    id: 'forecasting-pool',
    name: 'Forecasting Pool',
    agents: [agents.find(a => a.id === 'forecasting')!],
    color: '#FEF3C7'
  },
  {
    id: 'imputation-pool',
    name: 'Imputation Pool',
    agents: [agents.find(a => a.id === 'imputation')!],
    color: '#FCE7F3'
  },
  {
    id: 'classification-pool',
    name: 'Classification Pool',
    agents: [agents.find(a => a.id === 'classification')!],
    color: '#DBEAFE'
  },
  {
    id: 'anomaly-pool',
    name: 'Anomaly Pool',
    agents: [agents.find(a => a.id === 'anomaly')!],
    color: '#FEF3C7'
  }
];

// Query processing pipeline that shows the flow of information
export const queryPipeline = [
  {
    step: 1,
    name: 'Query Reception',
    agentId: 'master',
    description: 'User query is received and initial analysis is performed'
  },
  {
    step: 2,
    name: 'Classification',
    agentId: 'classification',
    description: 'Query is categorized based on energy domain and required data types'
  },
  {
    step: 3,
    name: 'Data Imputation',
    agentId: 'imputation',
    description: 'Missing data is identified and filled using advanced imputation techniques'
  },
  {
    step: 4,
    name: 'Anomaly Detection',
    agentId: 'anomaly',
    description: 'Unusual patterns in the data are identified and flagged'
  },
  {
    step: 5,
    name: 'Forecasting',
    agentId: 'forecasting',
    description: 'Future trends are predicted based on historical data and current patterns'
  },
  {
    step: 6,
    name: 'Response Synthesis',
    agentId: 'master',
    description: 'Insights from all agents are compiled into a comprehensive response'
  },
  {
    step: 7,
    name: 'Final Response Generation',
    agentId: 'master',
    description: 'Final response is generated and returned to the user'
  }
];

export default {
  agents,
  subAgents,
  agentPools,
  queryPipeline
};
