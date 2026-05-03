export const phase7 = [
    {
        day: 91,
        phase: 7,
        duration: '3.5h',
        title: 'Builder Trial I — Diagnosing RAG Systems',
        objectives: [
            'Understand the difference between retrieval failure and generation failure',
            'Learn how to systematically debug RAG pipelines',
            'Measure retrieval quality using similarity and ranking',
            'Build intuition for why “working systems” still give wrong answers',
        ],
        content: [
            {
                type: 'heading',
                content: 'The Illusion of “Working” Systems',
            },
            {
                type: 'text',
                content: `<p>A RAG system can return answers that look correct, sound fluent, and are completely wrong.</p>
<p>This is dangerous because it <strong>feels like it works</strong>.</p>
<p>Your job as a builder is not to make systems run. It is to make them <strong>reliable under uncertainty</strong>.</p>`,
            },

            {
                type: 'heading',
                content: 'Where RAG Actually Fails',
            },
            {
                type: 'text',
                content: `<p>Every incorrect RAG answer comes from one of two places:</p>
<ul>
<li><strong>Retrieval failure</strong> — wrong or irrelevant documents selected</li>
<li><strong>Generation failure</strong> — correct documents, but model ignores or misuses them</li>
</ul>
<p>If you don’t distinguish these, you cannot fix the system.</p>`,
            },

            {
                type: 'heading',
                content: 'Baseline RAG Pipeline',
            },
            {
                type: 'code',
                title: 'Minimal RAG Implementation',
                filename: 'rag_baseline.py',
                content: `def retrieve(query, vector_db, k=5):
    return vector_db.search(query, top_k=k)

def build_prompt(query, docs):
    return f"""
Answer the question using the context.

Context:
{docs}

Question:
{query}
"""

def generate_answer(query):
    docs = retrieve(query, vector_db)
    prompt = build_prompt(query, docs)
    return llm(prompt)
`,
            },

            {
                type: 'note',
                content: 'This is what most tutorials teach. It works — until it doesn’t.',
            },

            {
                type: 'heading',
                content: 'Step 1 — Inspect Retrieval Quality',
            },
            {
                type: 'text',
                content: `<p>Before touching prompts, inspect what your system is retrieving.</p>
<p>If retrieval is wrong, nothing else matters.</p>`,
            },

            {
                type: 'code',
                title: 'Debug Retrieval Output',
                filename: 'inspect_retrieval.py',
                content: `docs = retrieve("What is vector database?", vector_db)

for i, d in enumerate(docs):
    print(f"[{i}] {d[:200]}\\n")`,
            },

            {
                type: 'tip',
                content: `<strong>Rule:</strong> Never trust a RAG system without inspecting retrieved chunks.`,
            },

            {
                type: 'heading',
                content: 'Step 2 — Measure Similarity Properly',
            },
            {
                type: 'code',
                title: 'Cosine Similarity Check',
                filename: 'similarity_debug.py',
                content: `import numpy as np

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

query_emb = embed(query)
doc_embs = [embed(d) for d in docs]

scores = [cosine(query_emb, d) for d in doc_embs]

for i, s in enumerate(scores):
    print(f"Doc {i}: similarity = {s:.3f}")`,
            },

            {
                type: 'note',
                content: 'High similarity does not guarantee relevance — but low similarity almost guarantees irrelevance.',
            },

            {
                type: 'heading',
                content: 'Step 3 — Identify Failure Type',
            },
            {
                type: 'text',
                content: `<p>Use this decision framework:</p>
<ul>
<li>If retrieved docs are irrelevant → fix retrieval</li>
<li>If docs are correct but answer is wrong → fix prompt</li>
</ul>`,
            },

            {
                type: 'heading',
                content: 'Improved Prompt (Grounded Generation)',
            },
            {
                type: 'code',
                title: 'Grounded Prompt',
                filename: 'grounded_prompt.py',
                content: `def build_prompt(query, docs):
    return f"""
Answer ONLY from the context below.

If the answer is not present, say:
"I don't know based on the provided context."

Context:
{docs}

Question:
{query}
"""`,
            },
        ],

        exercises: [
            {
                title: 'Diagnose the Failure',
                description: 'You are given a query and retrieved documents. Identify whether the failure is retrieval or generation.',
                starterCode: `query = "What is attention in transformers?"

docs = [
  "Transformers use convolutional layers...",
  "Attention allows models to focus on relevant tokens...",
  "Reinforcement learning is trial and error..."
]

# TODO:
# 1. Identify which docs are relevant
# 2. Decide if retrieval is correct
# 3. Suggest fix`,
                hint: 'Only one document is actually relevant.',
                solution: `# Relevant doc:
# "Attention allows models..."

# Failure:
# Retrieval includes irrelevant docs → retrieval issue

# Fix:
# Reduce top_k or improve embedding quality`,
            },

            {
                title: 'Improve Retrieval Ranking',
                description: 'Sort documents based on similarity and keep top 2 only.',
                starterCode: `# Given embeddings:
scores = [0.2, 0.91, 0.1]

docs = ["doc1", "doc2", "doc3"]

# TODO: sort and keep top 2`,
                hint: 'Use sorted with key=lambda',
                solution: `ranked = sorted(zip(scores, docs), reverse=True)
top_docs = [d for _, d in ranked[:2]]`,
            },
        ],

        quiz: [
            {
                question: 'What is the first step in debugging a RAG system?',
                options: [
                    'Change the prompt',
                    'Inspect retrieved documents',
                    'Increase model size',
                    'Add more data',
                ],
                correct: 1,
                explanation: 'Without verifying retrieval, all other fixes are blind.',
            },
            {
                question: 'If documents are correct but answer is wrong, what is the issue?',
                options: [
                    'Embedding failure',
                    'Retrieval failure',
                    'Generation failure',
                    'Token limit',
                ],
                correct: 2,
                explanation: 'Correct context but wrong answer means the model is not using context properly.',
            },
        ],
    },

    {
        day: 92,
        phase: 7,
        duration: '4h',
        title: 'Builder Trial II — Designing Reliable AI Systems',
        objectives: [
            'Understand how failures propagate through AI systems',
            'Differentiate between transient, partial, and silent failures',
            'Design retry, fallback, and validation layers correctly',
            'Build systems that fail safely instead of failing silently',
        ],

        content: [
            {
                type: 'heading',
                content: 'Why Reliability is Hard in AI Systems',
            },
            {
                type: 'text',
                content: `<p>Traditional systems fail loudly (errors, crashes).</p>
<p>AI systems often fail <strong>silently</strong> — they return plausible but wrong outputs.</p>

<p>This creates a dangerous situation:</p>
<ul>
<li>The system appears to work</li>
<li>No error is thrown</li>
<li>The output is incorrect</li>
</ul>

<p>As a builder, your responsibility is not just handling crashes.</p>
<p>Your responsibility is handling <strong>incorrect success</strong>.</p>`,
            },

            {
                type: 'heading',
                content: 'Failure Types in AI Systems',
            },
            {
                type: 'text',
                content: `<p>Every failure falls into one of these categories:</p>

<ul>
<li><strong>Hard Failure</strong> — API crashes, exceptions</li>
<li><strong>Soft Failure</strong> — degraded output (low quality)</li>
<li><strong>Silent Failure</strong> — confident but wrong answer</li>
</ul>

<p>Silent failures are the most dangerous.</p>`,
            },

            {
                type: 'heading',
                content: 'Naive System (Fails Silently)',
            },
            {
                type: 'code',
                title: 'Naive Pipeline',
                filename: 'naive_system.py',
                content: `def answer(query):
    docs = retrieve(query)
    return llm(f"Answer: {query}\\nContext: {docs}")`,
            },

            {
                type: 'note',
                content: 'This system never throws errors. That is exactly the problem.',
            },

            {
                type: 'heading',
                content: 'Failure Propagation',
            },
            {
                type: 'text',
                content: `<p>If retrieval is wrong → generation is wrong.</p>
<p>If generation is wrong → user trusts wrong output.</p>

<p>Failures compound silently across layers.</p>`,
            },

            {
                type: 'heading',
                content: 'Step 1 — Validate Retrieval Before Generation',
            },
            {
                type: 'code',
                title: 'Retrieval Validation',
                filename: 'validate_retrieval.py',
                content: `def is_retrieval_valid(docs):
    return len(docs) > 0 and all(len(d.strip()) > 20 for d in docs)`,
            },

            {
                type: 'text',
                content: `<p>Never pass garbage into your model.</p>`,
            },

            {
                type: 'heading',
                content: 'Step 2 — Add Confidence Constraints',
            },
            {
                type: 'code',
                title: 'Controlled Prompt',
                filename: 'controlled_prompt.py',
                content: `def build_prompt(query, docs):
    return f"""
Answer ONLY using the context below.

If the answer is uncertain or not present, say:
"I am not confident in the answer."

Context:
{docs}

Question:
{query}
"""`,
            },

            {
                type: 'note',
                content: 'You are not improving intelligence. You are constraining behavior.',
            },

            {
                type: 'heading',
                content: 'Step 3 — Introduce Guard Layer',
            },
            {
                type: 'code',
                title: 'Guarded System',
                filename: 'guarded_system.py',
                content: `def answer(query):
    docs = retrieve(query)

    if not is_retrieval_valid(docs):
        return "No reliable information found."

    response = llm(build_prompt(query, docs))

    if "not confident" in response.lower():
        return "The system cannot reliably answer this question."

    return response`,
            },

            {
                type: 'tip',
                content: '<strong>Good systems don’t try to answer everything. They refuse when necessary.</strong>',
            },

            {
                type: 'heading',
                content: 'Step 4 — Handling Transient Failures (Properly)',
            },
            {
                type: 'code',
                title: 'Retry with Backoff',
                filename: 'retry.py',
                content: `import time

def safe_llm(prompt, retries=3):
    delay = 1
    for i in range(retries):
        try:
            return llm(prompt)
        except Exception:
            time.sleep(delay)
            delay *= 2
    return "Temporary failure. Please retry."`,
            },

            {
                type: 'note',
                content: 'Retries solve transient failures — not logical ones.',
            },

            {
                type: 'heading',
                content: 'Mental Model — Reliability Stack',
            },
            {
                type: 'text',
                content: `<p>Think of your system as layers:</p>

<ul>
<li>Retrieval → must be relevant</li>
<li>Prompt → must constrain</li>
<li>Generation → must follow context</li>
<li>Guard → must verify output</li>
</ul>

<p>If any layer is weak, the system becomes unreliable.</p>`,
            },
        ],

        exercises: [
            {
                title: 'Detect Silent Failure',
                description: 'Given a system output, determine if it is a silent failure and suggest a fix.',
                starterCode: `query = "What is gradient descent?"

docs = ["Neural networks use activation functions", "Optimization involves minimizing loss"]

response = "Gradient descent is a function that activates neurons." 

# TODO:
# 1. Is this failure silent, soft, or hard?
# 2. What caused it?
# 3. How would you fix it?`,
                hint: 'Check if context actually supports answer',
                solution: `# Type: Silent failure
# Cause: Retrieval mismatch (docs irrelevant)
# Fix: Improve retrieval + validate docs before generation`,
            },

            {
                title: 'Build a Guard Layer',
                description: 'Modify system to reject uncertain answers.',
                starterCode: `def answer(query):
    docs = retrieve(query)
    response = llm(query)
    return response`,
                hint: 'Add validation + prompt constraints',
                solution: `def answer(query):
    docs = retrieve(query)

    if not docs:
        return "No reliable info."

    response = llm(build_prompt(query, docs))

    if "not confident" in response.lower():
        return "Cannot answer reliably."

    return response`,
            },
        ],

        quiz: [
            {
                question: 'What is a silent failure?',
                options: [
                    'System crash',
                    'Slow response',
                    'Confident but incorrect output',
                    'API timeout',
                ],
                correct: 2,
                explanation: 'Silent failures are the most dangerous because they appear correct.',
            },
            {
                question: 'What is the purpose of a guard layer?',
                options: [
                    'Speed up system',
                    'Reduce cost',
                    'Validate output before returning',
                    'Improve UI',
                ],
                correct: 2,
                explanation: 'Guard layers prevent incorrect outputs from reaching users.',
            },
        ],
    },

    {
        day: 93,
        phase: 7,
        duration: '4h',
        title: 'Builder Trial III — Handling Ambiguity & User Intent',
        objectives: [
            'Understand how ambiguity breaks AI systems',
            'Differentiate between unclear, underspecified, and conflicting queries',
            'Design clarification loops instead of guessing',
            'Build systems that ask before acting',
        ],

        content: [
            {
                type: 'heading',
                content: 'The Real Problem: Users Are Not Precise',
            },
            {
                type: 'text',
                content: `<p>Most users do not ask clear questions.</p>

<p>They say things like:</p>
<ul>
<li>"Explain this"</li>
<li>"Fix my code"</li>
<li>"Make it better"</li>
</ul>

<p>These are not queries. These are <strong>ambiguous intentions</strong>.</p>

<p>And yet, most AI systems respond immediately — by guessing.</p>`,
            },

            {
                type: 'heading',
                content: 'Types of Ambiguity',
            },
            {
                type: 'text',
                content: `<ul>
<li><strong>Underspecified</strong> — missing key details</li>
<li><strong>Overloaded</strong> — multiple possible meanings</li>
<li><strong>Contradictory</strong> — conflicting constraints</li>
</ul>

<p>If you don’t classify ambiguity, you cannot resolve it.</p>`,
            },

            {
                type: 'heading',
                content: 'Naive System (Always Answers)',
            },
            {
                type: 'code',
                title: 'Blind Response System',
                filename: 'naive_intent.py',
                content: `def respond(query):
    return llm(query)`,
            },

            {
                type: 'note',
                content: 'This system assumes every query is valid and complete. That assumption is false.',
            },

            {
                type: 'heading',
                content: 'Example Failure',
            },
            {
                type: 'code',
                title: 'Ambiguous Query',
                filename: 'ambiguous_case.py',
                content: `query = "Improve this model"`,
            },
            {
                type: 'text',
                content: `<p>What does "improve" mean?</p>
<ul>
<li>Accuracy?</li>
<li>Speed?</li>
<li>Interpretability?</li>
</ul>

<p>The system does not know. Yet it answers anyway.</p>`,
            },

            {
                type: 'heading',
                content: 'Step 1 — Detect Ambiguity',
            },
            {
                type: 'code',
                title: 'Simple Heuristic',
                filename: 'detect_ambiguity.py',
                content: `def is_ambiguous(query):
    vague_terms = ["this", "that", "it", "improve", "fix"]
    return any(term in query.lower() for term in vague_terms)`,
            },

            {
                type: 'text',
                content: `<p>This is not perfect — but it introduces a critical idea:</p>
<p><strong>Not every query should be answered immediately.</strong></p>`,
            },

            {
                type: 'heading',
                content: 'Step 2 — Clarification Loop',
            },
            {
                type: 'code',
                title: 'Ask Before Acting',
                filename: 'clarify.py',
                content: `def handle_query(query):
    if is_ambiguous(query):
        return "Can you clarify what you mean by this request?"

    return llm(query)`,
            },

            {
                type: 'tip',
                content: '<strong>Correct systems ask questions. Weak systems guess.</strong>',
            },

            {
                type: 'heading',
                content: 'Step 3 — Structured Clarification',
            },
            {
                type: 'code',
                title: 'Multi-Option Clarification',
                filename: 'structured_clarify.py',
                content: `def clarify(query):
    return f"""
Your request is unclear.

Did you mean:
1. Improve accuracy
2. Improve performance
3. Improve readability

Please select one.
"""`,
            },

            {
                type: 'heading',
                content: 'Mental Model — Intent Resolution',
            },
            {
                type: 'text',
                content: `<p>Every system must decide:</p>

<ul>
<li>Do I understand the request?</li>
<li>If not → ask</li>
<li>If yes → act</li>
</ul>

<p>This is not optional. This is core system design.</p>`,
            },

            {
                type: 'note',
                content: 'Most failures are not technical. They are failures of interpretation.',
            },
        ],

        exercises: [
            {
                title: 'Classify Ambiguity',
                description: 'Identify type of ambiguity in queries.',
                starterCode: `queries = [
  "Fix this",
  "Make the model faster but also more accurate",
  "Explain transformers"
]

# TODO:
# classify each as underspecified, overloaded, or clear`,
                hint: 'Look for missing info vs multiple meanings',
                solution: `# "Fix this" → underspecified
# "Make faster but more accurate" → contradictory
# "Explain transformers" → clear`,
            },

            {
                title: 'Implement Clarification System',
                description: 'Modify system to ask questions instead of guessing.',
                starterCode: `def respond(query):
    return llm(query)`,
                hint: 'Add ambiguity check',
                solution: `def respond(query):
    if is_ambiguous(query):
        return "Please clarify your request."
    return llm(query)`,
            },
        ],

        quiz: [
            {
                question: 'What is the correct response to an ambiguous query?',
                options: [
                    'Answer immediately',
                    'Ignore query',
                    'Ask for clarification',
                    'Return error',
                ],
                correct: 2,
                explanation: 'Clarification prevents incorrect assumptions.',
            },
            {
                question: 'What is an underspecified query?',
                options: [
                    'Too long',
                    'Missing critical details',
                    'Contains errors',
                    'Uses wrong syntax',
                ],
                correct: 1,
                explanation: 'Underspecified queries lack required information.',
            },
        ],
    },

    {
        day: 94,
        phase: 7,
        duration: '4h',
        title: 'Builder Trial IV — Cost as a System Constraint',
        objectives: [
            'Understand cost as a first-class design constraint',
            'Identify hidden inefficiencies in AI pipelines',
            'Design systems that balance quality vs cost',
            'Make architectural decisions under resource limits',
        ],

        content: [
            {
                type: 'heading',
                content: 'The Misconception About Cost',
            },
            {
                type: 'text',
                content: `<p>Most developers think cost is an optimization problem.</p>

<p>It is not.</p>

<p>Cost is a <strong>system constraint</strong>.</p>

<p>If your system cannot operate within cost limits, it is not viable — no matter how well it works.</p>`,
            },

            {
                type: 'heading',
                content: 'Where Cost Actually Comes From',
            },
            {
                type: 'text',
                content: `<p>Cost in AI systems comes primarily from:</p>

<ul>
<li>Number of API calls</li>
<li>Token usage per call</li>
<li>Redundant computation</li>
<li>Unnecessary context size</li>
</ul>

<p>Most inefficiencies are not obvious.</p>`,
            },

            {
                type: 'heading',
                content: 'Naive System (Hidden Cost Explosion)',
            },
            {
                type: 'code',
                title: 'Inefficient Pipeline',
                filename: 'inefficient.py',
                content: `def answer(query):
    docs = retrieve(query)

    results = []
    for doc in docs:
        results.append(llm(f"Analyze: {doc}"))

    return llm(f"Combine: {results}")`,
            },

            {
                type: 'note',
                content: 'This system works — but cost scales with number of documents.',
            },

            {
                type: 'heading',
                content: 'Problem Analysis',
            },
            {
                type: 'text',
                content: `<p>If you retrieve 5 documents:</p>

<ul>
<li>5 LLM calls (per doc)</li>
<li>+ 1 aggregation call</li>
<li>= 6 total calls</li>
</ul>

<p>This is not linear inefficiency — it is <strong>multiplicative cost growth</strong>.</p>`,
            },

            {
                type: 'heading',
                content: 'Step 1 — Collapse Computation',
            },
            {
                type: 'code',
                title: 'Single Call Strategy',
                filename: 'optimized.py',
                content: `def answer(query):
    docs = retrieve(query)

    combined = "\\n".join(docs)

    return llm(f"""
Answer the question using the following context:

{combined}

Question: {query}
""")`,
            },

            {
                type: 'text',
                content: `<p>Same logic. One call instead of six.</p>`,
            },

            {
                type: 'heading',
                content: 'Step 2 — Context is Not Free',
            },
            {
                type: 'text',
                content: `<p>More context ≠ better answers.</p>

<p>More context =</p>
<ul>
<li>Higher cost</li>
<li>Lower signal-to-noise ratio</li>
</ul>

<p>You are not feeding knowledge. You are shaping attention.</p>`,
            },

            {
                type: 'code',
                title: 'Top-K Reduction',
                filename: 'topk.py',
                content: `docs = retrieve(query, k=3)  # instead of 10`,
            },

            {
                type: 'heading',
                content: 'Step 3 — Introduce Caching',
            },
            {
                type: 'code',
                title: 'Caching Layer',
                filename: 'cache.py',
                content: `cache = {}

def answer(query):
    if query in cache:
        return cache[query]

    result = llm(query)
    cache[query] = result
    return result`,
            },

            {
                type: 'note',
                content: 'Many systems recompute identical queries. This is wasted cost.',
            },

            {
                type: 'heading',
                content: 'Step 4 — Cost vs Quality Tradeoff',
            },
            {
                type: 'text',
                content: `<p>Every system must choose:</p>

<ul>
<li>More context → higher accuracy, higher cost</li>
<li>Less context → cheaper, risk of missing info</li>
</ul>

<p>There is no perfect point. Only tradeoffs.</p>`,
            },

            {
                type: 'heading',
                content: 'Mental Model — Cost Layers',
            },
            {
                type: 'text',
                content: `<p>Think in layers:</p>

<ul>
<li>Retrieval cost</li>
<li>Prompt size cost</li>
<li>Generation cost</li>
</ul>

<p>Optimize at the system level — not just the function level.</p>`,
            },

            {
                type: 'tip',
                content: '<strong>Good systems minimize unnecessary thinking.</strong>',
            },
        ],

        exercises: [
            {
                title: 'Identify Cost Explosion',
                description: 'Analyze system and identify inefficiencies.',
                starterCode: `def pipeline(query):
    docs = retrieve(query, k=10)

    results = []
    for d in docs:
        results.append(llm(d))

    return llm(results)`,
                hint: 'Count number of calls',
                solution: `# 10 calls + 1 aggregation = 11 calls
# Fix: combine docs into one prompt`,
            },

            {
                title: 'Design Efficient Pipeline',
                description: 'Rewrite system to minimize cost while maintaining accuracy.',
                starterCode: `def pipeline(query):
    pass`,
                hint: 'Reduce calls + optimize context',
                solution: `def pipeline(query):
    docs = retrieve(query, k=3)
    combined = "\\n".join(docs)
    return llm(combined)`,
            },

            {
                title: 'Tradeoff Decision',
                description: 'Choose between two systems and justify decision.',
                starterCode: `System A:
- 1 call
- k=2 docs
- lower accuracy

System B:
- 5 calls
- k=5 docs
- higher accuracy

# Which do you choose and why?`,
                hint: 'Think about use-case',
                solution: `# Depends:
# If cost-critical → A
# If accuracy-critical → B`,
            },
        ],

        quiz: [
            {
                question: 'What is the biggest hidden cost driver?',
                options: [
                    'UI design',
                    'Repeated LLM calls',
                    'CSS',
                    'Database size',
                ],
                correct: 1,
                explanation: 'Repeated calls multiply cost rapidly.',
            },
            {
                question: 'What is the correct mindset for cost?',
                options: [
                    'Optimize later',
                    'Ignore it',
                    'Treat it as system constraint',
                    'Only reduce tokens',
                ],
                correct: 2,
                explanation: 'Cost defines system viability.',
            },
        ],
    },

    {
        day: 95,
        phase: 7,
        duration: '5h',
        title: 'Final Builder Trial — Design Under Constraints',
        objectives: [
            'Integrate retrieval, reasoning, and control into a single system',
            'Make architectural decisions under ambiguity, failure, and cost constraints',
            'Design systems that are reliable, interpretable, and usable',
            'Evaluate your own system critically instead of assuming correctness',
        ],

        content: [
            {
                type: 'heading',
                content: 'You Are No Longer Following Instructions',
            },
            {
                type: 'text',
                content: `<p>Until now, you were guided.</p>

<p>Now, you are responsible.</p>

<p>No step-by-step instructions will be given.</p>
<p>No “correct solution” exists.</p>

<p>This is how real systems are built.</p>`,
            },

            {
                type: 'heading',
                content: 'The Problem',
            },
            {
                type: 'text',
                content: `<p>You must design a system that answers questions using external knowledge.</p>

<p>But your system must satisfy all of the following:</p>

<ul>
<li>Answers must be grounded in retrieved context (no hallucination)</li>
<li>System must handle ambiguous queries</li>
<li>System must fail safely when uncertain</li>
<li>System must minimize unnecessary cost</li>
<li>Outputs must be understandable by non-technical users</li>
</ul>

<p>This is not one problem. This is multiple competing constraints.</p>`,
            },

            {
                type: 'heading',
                content: 'System Requirements (Non-Negotiable)',
            },
            {
                type: 'text',
                content: `<ul>
<li><strong>Retrieval Layer</strong> — select relevant information</li>
<li><strong>Control Layer</strong> — decide whether to answer or ask</li>
<li><strong>Generation Layer</strong> — produce grounded output</li>
<li><strong>Guard Layer</strong> — validate response before returning</li>
</ul>

<p>If any layer is missing, the system is incomplete.</p>`,
            },

            {
                type: 'heading',
                content: 'Suggested System Structure',
            },
            {
                type: 'code',
                title: 'System Skeleton',
                filename: 'system_design.py',
                content: `def system(query):
    # 1. Handle ambiguity
    if is_ambiguous(query):
        return clarify(query)

    # 2. Retrieve knowledge
    docs = retrieve(query)

    # 3. Validate retrieval
    if not is_retrieval_valid(docs):
        return "No reliable information found."

    # 4. Generate answer
    response = llm(build_prompt(query, docs))

    # 5. Guard output
    if is_unreliable(response):
        return "I cannot answer this reliably."

    return response`,
            },

            {
                type: 'note',
                content: 'This is not a solution. It is a structure. Your decisions define the system.',
            },

            {
                type: 'heading',
                content: 'Evaluation Criteria',
            },
            {
                type: 'text',
                content: `<p>Your system will be evaluated on:</p>

<ul>
<li><strong>Correctness</strong> — does it answer accurately?</li>
<li><strong>Reliability</strong> — does it fail safely?</li>
<li><strong>Clarity</strong> — can a user understand it?</li>
<li><strong>Efficiency</strong> — does it avoid unnecessary cost?</li>
</ul>

<p>A system that works once is not a good system.</p>`,
            },

            {
                type: 'heading',
                content: 'Test Cases (You Must Pass)',
            },
            {
                type: 'code',
                title: 'System Tests',
                filename: 'tests.py',
                content: `queries = [
    "Explain attention mechanism",
    "Improve this model",
    "What is the capital of Mars?",
    "Summarize my document"
]

# Evaluate:
# 1. Does system clarify ambiguity?
# 2. Does it avoid hallucination?
# 3. Does it fail gracefully?
# 4. Does it stay efficient?`,
            },

            {
                type: 'tip',
                content: '<strong>If your system answers everything, it is wrong.</strong>',
            },

            {
                type: 'heading',
                content: 'Mental Model — System Responsibility',
            },
            {
                type: 'text',
                content: `<p>You are not building a function.</p>

<p>You are building a decision system.</p>

<ul>
<li>When to answer</li>
<li>When to ask</li>
<li>When to refuse</li>
</ul>

<p>This is what separates builders from coders.</p>`,
            },
        ],

        exercises: [
            {
                title: 'Design Your System',
                description: 'Implement a complete system satisfying all constraints.',
                starterCode: `# Your implementation here`,
                hint: 'Think in layers: ambiguity → retrieval → generation → guard',
                solution: `// No solution provided. This is your final capability test.`,
            },

            {
                title: 'Failure Analysis',
                description: 'Run your system on edge cases and identify weaknesses.',
                starterCode: `# Test your system with:
queries = [
  "Fix this",
  "What is gravity?",
  "Explain everything about AI",
]

# Analyze failures`,
                hint: 'Look for ambiguity, hallucination, and overconfidence',
                solution: `// No fixed solution — evaluation depends on your system`,
            },

            {
                title: 'Cost vs Accuracy Decision',
                description: 'Adjust your system to reduce cost while maintaining acceptable accuracy.',
                starterCode: `# Modify retrieval and prompt size`,
                hint: 'Reduce k, optimize context',
                solution: `// Tradeoff-based — no single answer`,
            },
        ],

        quiz: [
            {
                question: 'What defines a complete AI system?',
                options: [
                    'Uses latest model',
                    'Has many features',
                    'Handles ambiguity, failure, and constraints',
                    'Runs fast',
                ],
                correct: 2,
                explanation: 'A real system must handle uncertainty and constraints.',
            },
            {
                question: 'When should a system refuse to answer?',
                options: [
                    'Never',
                    'When uncertain or lacking context',
                    'Only when API fails',
                    'When user asks too much',
                ],
                correct: 1,
                explanation: 'Refusal is part of reliability.',
            },
        ],
    },
];