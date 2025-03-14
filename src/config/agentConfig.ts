
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
    color: '#FFD700',
    icon: 'Bot',
    role: 'Coordination and orchestration of the entire workflow'
  },
  {
    id: 'forecasting',
    name: 'Forecasting Agent',
    description: 'Analyzes time-series data and predicts future trends in energy production and consumption',
    color: '#FFA500',
    icon: 'LineChart',
    role: 'Time-series analysis and prediction',
    promptCount: 10
  },
  {
    id: 'imputation',
    name: 'Imputation Agent',
    description: 'Fills in missing data in energy datasets to provide complete analysis',
    color: '#FF6B6B',
    icon: 'Database',
    role: 'Data completion and gap filling',
    promptCount: 8
  },
  {
    id: 'classification',
    name: 'Classification Agent',
    description: 'Categorizes and organizes energy policy data and research',
    color: '#4682B4',
    icon: 'Folder',
    role: 'Information categorization and organization',
    promptCount: 12
  },
  {
    id: 'anomaly',
    name: 'Anomaly Detection Agent',
    description: 'Identifies unusual patterns in energy data that may require attention',
    color: '#FF8C00',
    icon: 'AlertTriangle',
    role: 'Outlier detection and data validation',
    promptCount: 6
  }
];

// Agent pools that group agents by functionality
export const agentPools: AgentPool[] = [
  {
    id: 'forecasting-pool',
    name: 'Forecasting Pool',
    agents: [agents.find(a => a.id === 'forecasting')!],
    color: '#FFEFD5'
  },
  {
    id: 'imputation-pool',
    name: 'Imputation Pool',
    agents: [agents.find(a => a.id === 'imputation')!],
    color: '#FFE4E1'
  },
  {
    id: 'classification-pool',
    name: 'Classification Pool',
    agents: [agents.find(a => a.id === 'classification')!],
    color: '#E6E6FA'
  },
  {
    id: 'anomaly-pool',
    name: 'Anomaly Detection Pool',
    agents: [agents.find(a => a.id === 'anomaly')!],
    color: '#FFEFD5'
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
    name: 'Task Delegation',
    agentId: 'master',
    description: 'Master agent determines which specialized agents to engage'
  },
  {
    step: 3,
    name: 'Parallel Processing',
    agentId: 'multiple',
    description: 'Multiple agents process the query in parallel according to their specialization'
  },
  {
    step: 4,
    name: 'Result Aggregation',
    agentId: 'master',
    description: 'Results from all sub-agents are collected and compiled'
  },
  {
    step: 5,
    name: 'Response Generation',
    agentId: 'master',
    description: 'Final response is created and returned to the user'
  }
];

export default {
  agents,
  agentPools,
  queryPipeline
};
