
# Multi-Agent Retrieval-Augmented Generation (RAG) System

This repository contains a Multi-Agent RAG system for the Sri Lankan Energy Sector Knowledge Base, including both a React frontend and Python backend.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Introduction

The Sri Lankan Energy Sector Knowledge Base uses a Multi-Agent Retrieval-Augmented Generation (RAG) System to provide insights and visualizations about Sri Lanka's energy sector. The system enhances large language models by integrating retrieval mechanisms that provide up-to-date and domain-specific information.

## Features

- **Intelligent Search**: Ask questions about Sri Lanka's energy sector and get detailed, accurate answers
- **Data Visualization**: View charts and graphs about energy production, consumption, and trends
- **Policy Insights**: Explore government policies and regulations in the energy sector
- **Multi-Agent Architecture**: Uses specialized agents for retrieval, generation, visualization, and orchestration
- **Vector Database Integration**: Stores document embeddings in Pinecone for efficient retrieval

## System Architecture

The system consists of two main components:

1. **React Frontend**: A user-friendly web interface built with React, Tailwind CSS, and shadcn/ui
2. **Python Backend**: A multi-agent system with the following components:
   - Retriever Agent: Processes documents and handles vector database operations
   - Generator Agent: Creates natural language responses using Mistral AI
   - Visualization Agent: Generates charts and graphs based on queries
   - Orchestrator Agent: Coordinates the other agents to process user queries

## Setup Instructions

### Frontend Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:8080

### Backend Setup

1. **Create a Python Virtual Environment**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows, use 'env\Scripts\activate'
   ```

2. **Install Backend Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Mistral API Key
   MISTRAL_API_KEY=your_mistral_api_key

   # Pinecone API Key and Index
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_pinecone_index_name
   PINECONE_ENVIRONMENT=your_pinecone_environment

   # Hugging Face Access Token
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   HF_TOKEN=your_huggingface_token
   ```

4. **Process Documents**:
   ```bash
   cd backend
   python main.py --process-docs
   ```

5. **Start the Backend Server**:
   ```bash
   python main.py --start-server
   ```

The backend will run on http://localhost:8000

### Connect Frontend to Backend

To use the real backend API instead of simulated data, update `src/config.ts`:
```typescript
export const USE_REAL_API = true;
```

## Usage

1. Visit the web application at http://localhost:8080
2. Use the search bar to ask questions about Sri Lanka's energy sector
3. View detailed answers, visualizations, and source information
4. Explore different sections of the application for various insights

## Troubleshooting

### Backend Issues

- **PyMuPDF Installation Problems**: If you encounter issues installing PyMuPDF, try using alternative PDF processing libraries like `pypdf` or `pdfminer.six` which are included in the requirements.txt file
- **API Connection Issues**: Ensure that both frontend and backend servers are running and that `USE_REAL_API` is set correctly in `src/config.ts`
- **Vector Database Errors**: Verify that your Pinecone credentials are correct and that you've created an index with the specified name

### Frontend Issues

- **Development Mode**: In development mode, the frontend uses simulated data by default. Change `USE_REAL_API` to `true` in `src/config.ts` to use the real backend
- **CORS Issues**: If you encounter CORS issues, ensure the backend CORS settings are properly configured in `backend/app.py`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
