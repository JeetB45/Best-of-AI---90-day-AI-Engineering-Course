# 🤖 90-Day Modern AI Engineering

> An open-source, interactive learning platform for mastering AI engineering from Python fundamentals to production-ready agentic systems.

Live preview -> (https://platform-iota-eight.vercel.app/)

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## What Is This?

**90-Day Modern AI Engineering** is a free, self-paced curriculum that takes you from Python basics to building and deploying production-grade AI systems — with interactive code editors, quizzes, and hands-on exercises built directly into the browser.

No paid subscriptions. No scattered YouTube playlists. One structured path, 90 days, zero fluff.

---

## Features

- **Interactive Python editor** — run code in-browser via Pyodide (no setup required)
- **Structured lesson flow** — Lesson → Practice → Quiz → Mark Complete
- **Progress tracking** — persistent completion state across sessions
- **6 learning phases** — from NumPy to LangGraph to Docker
- **90 daily lessons** — each with objectives, content blocks, exercises, and quizzes
- **Fully static** — deploys to GitHub Pages, Vercel, or any CDN with zero backend

---

## Curriculum

<details>
<summary><strong>Phase 1: Python & Math Foundations (Days 1–15)</strong></summary>

Build the bedrock. Python syntax, data structures, NumPy, Pandas, and the linear algebra and calculus intuitions that underpin every ML model.

- Days 1–3: Python fundamentals, functions, OOP
- Days 4–6: NumPy arrays, broadcasting, linear algebra
- Days 7–9: Pandas — DataFrames, cleaning, groupby
- Days 10–12: Statistics, probability, calculus intuition
- Days 13–15: Matplotlib, Seaborn, EDA project

**Capstone:** Exploratory Data Analysis script on a real dataset

</details>

<details>
<summary><strong>Phase 2: Core ML & Deep Learning (Days 16–30)</strong></summary>

From gradient descent to backpropagation. Scikit-learn pipelines and your first neural network built from scratch in PyTorch.

- Days 16–18: Supervised learning, train/test splits, evaluation
- Days 19–21: Scikit-learn — regression, classification, pipelines
- Days 22–24: Gradient descent from scratch, loss surfaces
- Days 25–27: Neural networks with PyTorch
- Days 28–30: CNNs, overfitting, regularisation

**Capstone:** Custom neural network for image classification

</details>

<details>
<summary><strong>Phase 3: GenAI & LLM Basics (Days 31–45)</strong></summary>

Transformers, attention, prompt engineering, and wiring up real LLM APIs (OpenAI, Anthropic, Gemini).

- Days 31–33: Attention mechanism, Transformer architecture
- Days 34–36: Tokenisation, embeddings, HuggingFace Hub
- Days 37–39: Prompt engineering, few-shot, chain-of-thought
- Days 40–42: OpenAI / Anthropic / Gemini API integration
- Days 43–45: Memory patterns, conversation history

**Capstone:** CLI chatbot with multi-turn memory

</details>

<details>
<summary><strong>Phase 4: RAG & Vector Databases (Days 46–60)</strong></summary>

Retrieval-Augmented Generation end-to-end — chunking strategies, embedding models, vector stores, and reranking.

- Days 46–48: Embeddings deep dive, cosine similarity
- Days 49–51: Document chunking strategies
- Days 52–54: ChromaDB and Pinecone integration
- Days 55–57: Full RAG pipeline construction
- Days 58–60: Reranking, hybrid search, evaluation

**Capstone:** Chat-with-your-PDF document Q&A system

</details>

<details>
<summary><strong>Phase 5: Agentic AI & Orchestration (Days 61–75)</strong></summary>

ReAct loops, tool calling, stateful graphs with LangGraph, and multi-agent systems that can plan and act autonomously.

- Days 61–63: ReAct prompting, agent loop from scratch
- Days 64–66: LangChain tools, chains, and agents
- Days 67–69: LangGraph — stateful graphs, interrupts
- Days 70–72: Multi-agent architectures, supervisor patterns
- Days 73–75: Memory, persistence, agent evaluation

**Capstone:** Autonomous research agent with web browsing and report writing

</details>

<details>
<summary><strong>Phase 6: MLOps & Production (Days 76–90)</strong></summary>

Ship it. FastAPI, Docker, async job patterns, structured logging, CI/CD with GitHub Actions, and Cloud Run deployment.

- Days 76–78: FastAPI fundamentals, async, dependency injection
- Days 79–81: Docker, multi-stage builds, container security
- Days 82–84: Structured logging, metrics, OpenTelemetry tracing
- Days 85–87: CI/CD with GitHub Actions, GCP Cloud Run
- Days 88–90: Production hardening, rate limiting, prompt injection defence

**Capstone:** Deploy your agentic system to a live web interface with full observability

</details>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Code editor | Monaco Editor (`@monaco-editor/react`) |
| In-browser Python | Pyodide (loaded on demand) |
| Icons | Lucide React |
| Deployment | Static — GitHub Pages / Vercel / Cloudflare Pages |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Run locally

```bash

git clone https://github.com/YOUR_USERNAME/90-day-ai-engineering.git
cd 90-day-ai-engineering/platform
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
# output is in platform/dist/
```

## Lesson Data Format

Each day is a JavaScript object:

```js
{
  day: 1,
  phase: 1,
  title: 'Python Foundations',
  duration: '45 min',
  objectives: ['Understand Python data types'],
  content: [
    { type: 'heading',  content: 'Why Python?' },
    { type: 'text',     content: '<p>Python is the lingua franca of AI...</p>' },
    { type: 'code',     filename: 'hello.py', content: 'print("Hello, AI!")', expectedOutput: 'Hello, AI!' },
    { type: 'note',     content: 'Python 3.10+ is recommended.' },
    { type: 'tip',      content: 'Use f-strings for readable formatting.' },
    { type: 'warning',  content: 'Avoid mutable default arguments.' },
  ],
  exercises: [
    {
      title: 'FizzBuzz',
      description: 'Print numbers 1-20...',
      starterCode: 'for i in range(1, 21):\n    pass',
      expectedOutput: '1\n2\nFizz\n...',
      hint: 'Use the modulo operator %.',
      solution: '...',
    },
  ],
  quiz: [
    {
      question: 'Which operator checks remainder in Python?',
      options: ['/', '//', '%', '**'],
      correct: 2,
      explanation: 'The modulo operator % returns the remainder of division.',
    },
  ],
}
```

---

## Contributing

Contributions are welcome! The most impactful areas:

- **Curriculum content** — fixing typos, improving explanations, richer exercises
- **New lessons** — fill in any days with placeholder content
- **Platform features** — dark/light mode, mobile layout, search, bookmarks
- **Bug fixes** — open an issue or submit a PR directly

### How to contribute

1. Fork the repo
2. Create a branch: `git checkout -b feat/day-42-improvements`
3. Make your changes
4. Open a pull request with a clear description

Please keep PRs focused — one lesson or one feature at a time.

---

## Security

This platform is fully client-side. No user data or API keys are ever sent to a server.

- API keys used in exercises stay in your browser session only
- No analytics, no tracking, no accounts required
- Progress is stored in `localStorage` on your own device

---

## Deployment Options

| Option | Notes |
|---|---|
| GitHub Pages | Push `dist/` to `gh-pages` branch |
| Vercel | Connect repo, set root to `platform/`, framework to Vite |
| Cloudflare Pages | Build command `npm run build`, output directory `dist` |
| Self-hosted | Serve `dist/` from nginx, Caddy, S3+CloudFront, or any static host |

---

## Roadmap

- [ ] Jupyter notebook export for each lesson
- [ ] User accounts + cloud progress sync (opt-in)
- [ ] Community discussion threads per lesson
- [ ] Certificate of completion (PDF)
- [ ] Mobile-optimised code editor
- [ ] Translated versions (Spanish, Hindi, Mandarin)

---

## License

MIT — see [LICENSE](LICENSE) for details. Free to use, fork, and build on.

---

## Acknowledgements

Built for everyone who tried to learn AI engineering and got lost in the noise. Special thanks to the open-source communities behind React, Vite, Monaco Editor, Pyodide, and Tailwind CSS.

---

*If this helped you, star the repo — it helps others find it.* ⭐
