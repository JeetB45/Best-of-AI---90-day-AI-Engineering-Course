import { phase1 } from './phase1'
import { phase2 } from './phase2'
import { phase3 } from './phase3'
import { phase4 } from './phase4'
import { phase5 } from './phase5'
import { phase6 } from './phase6'
import { phase7 } from './phase7'

export const phases = [
  {
    id: 1,
    title: 'Python & Math Foundations',
    shortTitle: 'Phase 1: Foundations',
    days: 'Days 1–15',
    description: 'Master Python fundamentals, NumPy, Pandas, and the math behind machine learning. Build your first data analysis project.',
    tools: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
    project: 'Exploratory Data Analysis (EDA) on a real dataset',
  },
  {
    id: 2,
    title: 'Core ML & Deep Learning',
    shortTitle: 'Phase 2: ML & Deep Learning',
    days: 'Days 16–30',
    description: 'Understand gradient descent, neural networks, and backpropagation from scratch. Build and train real models.',
    tools: ['Scikit-Learn', 'PyTorch', 'Matplotlib'],
    project: 'Custom neural network for image classification',
  },
  {
    id: 3,
    title: 'GenAI & LLM Basics',
    shortTitle: 'Phase 3: GenAI & LLMs',
    days: 'Days 31–45',
    description: 'Understand transformers, attention mechanisms, and prompt engineering. Connect to real AI APIs.',
    tools: ['HuggingFace', 'Gemini API', 'OpenAI API', 'Transformers'],
    project: 'CLI Chatbot with memory using Gemini API',
  },
  {
    id: 4,
    title: 'RAG & Vector Databases',
    shortTitle: 'Phase 4: RAG Systems',
    days: 'Days 46–60',
    description: 'Build retrieval-augmented generation systems. Learn embeddings, vector search, and document Q&A.',
    tools: ['ChromaDB', 'Sentence Transformers', 'Gemini API', 'FAISS'],
    project: 'Chat-with-your-PDF document Q&A system',
  },
  {
    id: 5,
    title: 'Agentic AI & Orchestration',
    shortTitle: 'Phase 5: Agentic AI',
    days: 'Days 61–75',
    description: 'Build autonomous AI agents that can reason, use tools, and complete complex multi-step tasks.',
    tools: ['LangChain', 'LangGraph', 'Gemini API', 'Tool Calling'],
    project: 'Autonomous research agent (web search + report writing)',
  },
  {
    id: 6,
    title: 'MLOps & Production',
    shortTitle: 'Phase 6: Production',
    days: 'Days 76–90',
    description: 'Deploy your AI systems to production. Build APIs, containerize with Docker, and create web interfaces.',
    tools: ['FastAPI', 'Docker', 'Streamlit', 'GCP Cloud Run'],
    project: 'Deploy your agentic system as a live web app on GCP',
  },
]

export const baseCurriculum = [
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  ...phase5,
  ...phase6,
]

export const phase7Data = phase7
