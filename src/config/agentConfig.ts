
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
    name: 'Workflow Manager Agent',
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
    name: 'Retriever Agent',
    description: 'Retrieves relevant information from the knowledge base',
    function: 'Data retrieval and vector search',
    color: '#0EA5E9'
  },
  {
    id: 'sub-agent-2',
    name: 'Analyzer Agent',
    description: 'Analyzes and processes the retrieved information',
    function: 'Data analysis and processing',
    color: '#8B5CF6'
  },
  {
    id: 'sub-agent-3',
    name: 'Synthesizer Agent',
    description: 'Synthesizes the analyzed information into a coherent response',
    function: 'Response generation and formatting',
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
    name: 'Workflow Planning',
    agentId: 'workflow',
    description: 'Workflow manager determines the optimal processing path'
  },
  {
    step: 3,
    name: 'Information Retrieval',
    agentId: 'sub-agent-1',
    description: 'Retriever agent extracts relevant data from knowledge base'
  },
  {
    step: 4,
    name: 'Data Analysis',
    agentId: 'sub-agent-2',
    description: 'Analyzer agent processes the retrieved information'
  },
  {
    step: 5,
    name: 'Response Synthesis',
    agentId: 'sub-agent-3',
    description: 'Synthesizer agent creates a coherent response'
  },
  {
    step: 6,
    name: 'Final Coordination',
    agentId: 'coordinator',
    description: 'Final response is reviewed and returned to the user'
  }
];

export default {
  agents,
  subAgents,
  agentPools,
  queryPipeline
};
