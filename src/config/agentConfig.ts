
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
    color: '#F59E0B',
    icon: 'Bot',
    role: 'The central coordinator that manages the entire query processing pipeline'
  },
  {
    id: 'assistant',
    name: 'Assistant Agent',
    description: 'Assists the coordinator in handling complex queries and knowledge gaps',
    color: '#EC4899',
    icon: 'HelpingHand',
    role: 'Provides supplementary information and helps with response refinement',
    promptCount: 2
  },
  {
    id: 'workflow',
    name: 'Workflow Manager',
    description: 'Plans and manages the query processing workflow',
    color: '#3B82F6',
    icon: 'GitBranch',
    role: 'Determines which sub-agents to engage and in what sequence',
    promptCount: 2
  }
];

// Sub-agent definitions aligned with the architecture diagram
export const subAgents: SubAgent[] = [
  {
    id: 'retriever',
    name: 'Retriever',
    description: 'Retrieves relevant information from the Sri Lanka energy knowledge base',
    function: 'Information Retrieval',
    color: '#0EA5E9'
  },
  {
    id: 'analyzer',
    name: 'Analyzer',
    description: 'Analyzes and processes the retrieved information using advanced models',
    function: 'Information Analysis',
    color: '#8B5CF6'
  },
  {
    id: 'synthesizer',
    name: 'Synthesizer',
    description: 'Synthesizes the analyzed information into a coherent response',
    function: 'Response Synthesis',
    color: '#10B981'
  }
];

// Agent pools that group agents by functionality
export const agentPools: AgentPool[] = [
  {
    id: 'coordinator-pool',
    name: 'Coordinator Pool',
    agents: [agents.find(a => a.id === 'coordinator')!],
    color: '#FEF3C7'
  },
  {
    id: 'assistant-pool',
    name: 'Assistant Pool',
    agents: [agents.find(a => a.id === 'assistant')!],
    color: '#FCE7F3'
  },
  {
    id: 'workflow-pool',
    name: 'Workflow Pool',
    agents: [agents.find(a => a.id === 'workflow')!],
    color: '#DBEAFE'
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
    description: 'Query processing workflow is planned and sub-agents are assigned'
  },
  {
    step: 3,
    name: 'Information Retrieval',
    agentId: 'retriever',
    description: 'Relevant information is retrieved from the knowledge base'
  },
  {
    step: 4,
    name: 'Information Analysis',
    agentId: 'analyzer',
    description: 'Retrieved information is analyzed and processed'
  },
  {
    step: 5,
    name: 'Supplementary Information',
    agentId: 'assistant',
    description: 'Additional context and information is provided to enhance the response'
  },
  {
    step: 6,
    name: 'Response Synthesis',
    agentId: 'synthesizer',
    description: 'Analyzed information is synthesized into a coherent response'
  },
  {
    step: 7,
    name: 'Final Response Generation',
    agentId: 'coordinator',
    description: 'Final response is reviewed and delivered to the user'
  }
];

export default {
  agents,
  subAgents,
  agentPools,
  queryPipeline
};
