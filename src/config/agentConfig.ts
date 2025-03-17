
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
    id: 'coordinator',
    name: 'Coordinator Agent',
    description: 'Coordinates the entire query workflow and manages sub-agents',
    color: '#8B5CF6',
    icon: 'Bot',
    role: 'Coordination and orchestration of the entire workflow'
  },
  {
    id: 'workflow',
    name: 'Workflow Manager',
    description: 'Manages the workflow and assigns tasks to sub-agents',
    color: '#EC4899',
    icon: 'GitBranch',
    role: 'Workflow management and task assignment',
    promptCount: 15
  },
  {
    id: 'assistant',
    name: 'Assistant Agent',
    description: 'Assists the coordinator agent in processing complex queries',
    color: '#F472B6',
    icon: 'HelpingHand',
    role: 'Assistant to the coordinator',
    promptCount: 12
  }
];

// Sub-agent definitions
export const subAgents: SubAgent[] = [
  {
    id: 'sub-agent-1',
    name: 'Sub Agent 1 (Retriever)',
    description: 'Retrieves relevant information from the Sri Lanka energy knowledge base',
    function: 'Retriever',
    color: '#0EA5E9'
  },
  {
    id: 'sub-agent-2',
    name: 'Sub Agent 2 (Analyzer)',
    description: 'Analyzes and processes the retrieved information using advanced models',
    function: 'Analyzer',
    color: '#8B5CF6'
  },
  {
    id: 'sub-agent-3',
    name: 'Sub Agent 3 (Synthesizer)',
    description: 'Synthesizes the analyzed information into a coherent response',
    function: 'Synthesizer',
    color: '#10B981'
  }
];

// Agent pools that group agents by functionality
export const agentPools: AgentPool[] = [
  {
    id: 'coordinator-pool',
    name: 'Coordinator Pool',
    agents: [agents.find(a => a.id === 'coordinator')!],
    color: '#EDE9FE'
  },
  {
    id: 'workflow-pool',
    name: 'Workflow Pool',
    agents: [agents.find(a => a.id === 'workflow')!],
    color: '#FCE7F3'
  },
  {
    id: 'assistant-pool',
    name: 'Assistant Pool',
    agents: [agents.find(a => a.id === 'assistant')!],
    color: '#FBCFE8'
  }
];

// Query processing pipeline that shows the flow of information
export const queryPipeline = [
  {
    step: 1,
    name: 'Query Reception',
    agentId: 'coordinator',
    description: 'User query is received and initial analysis is performed'
  },
  {
    step: 2,
    name: 'Agentic RAGs Processing',
    agentId: 'coordinator',
    description: 'Coordinator agent processes query through Agentic RAGs'
  },
  {
    step: 3,
    name: 'Sub-Agent Distribution',
    agentId: 'workflow',
    description: 'Workflow manager distributes tasks to specialized sub-agents'
  },
  {
    step: 4,
    name: 'Information Retrieval',
    agentId: 'sub-agent-1',
    description: 'Sub Agent 1 retrieves relevant data from energy knowledge base'
  },
  {
    step: 5,
    name: 'Data Analysis',
    agentId: 'sub-agent-2',
    description: 'Sub Agent 2 processes the retrieved information and applies analysis'
  },
  {
    step: 6,
    name: 'Response Synthesis',
    agentId: 'sub-agent-3',
    description: 'Sub Agent 3 creates a coherent response with visualizations if needed'
  },
  {
    step: 7,
    name: 'Final Response Generation',
    agentId: 'coordinator',
    description: 'Final response is generated and returned to the user'
  }
];

export default {
  agents,
  subAgents,
  agentPools,
  queryPipeline
};
