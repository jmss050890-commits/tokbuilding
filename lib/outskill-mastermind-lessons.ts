/**
 * OutSkill Generative AI Mastermind Lessons for A1 Agent
 * 
 * A comprehensive knowledge base of bite-sized, memorable lessons organized by:
 * - Session (1 or 2)
 * - Topic (AI Foundations, Prompt Engineering, Custom GPTs, Vibe Coding, etc.)
 * - Difficulty (Foundational/Intermediate/Advanced)
 * 
 * Each lesson includes: concept, real example, actionable takeaway, and teaching tips
 */

export interface MastermindLesson {
  id: string;
  title: string;
  session: 1 | 2;
  topic: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  description: string;
  
  // The 4-part teaching structure: concept + example + takeaway + action
  conceptExplanation: string;
  realWorldExample: string;
  quickTakeaway: string;
  actionableStep: string;
  
  // For context in conversation
  relatedTopics: string[];
  triggerKeywords: string[];
}

export interface MastermindTopic {
  topic: string;
  session: 1 | 2;
  lessons: MastermindLesson[];
}

/**
 * SESSION 1: GENERATIVE AI FOUNDATIONS & ADVANCED PROMPTING
 * Focus: Understanding AI, becoming an AI Generalist, mastering prompt engineering
 */

const SESSION_1_LESSONS: MastermindLesson[] = [
  {
    id: "s1-ai-revolution",
    title: "The AI Revolution: Generative vs Agentic AI",
    session: 1,
    topic: "AI Foundations",
    difficulty: "Foundational",
    description:
      "Understanding two forms of AI that are reshaping work: Generative AI (creates content) and Agentic AI (executes tasks autonomously).",
    conceptExplanation: `There are two powerful waves of AI transforming work:

**Generative AI** is the creative engine. It focuses on generating original content—text, code, images, analysis. Think of it as your brainstorming partner and content co-creator. Tools like ChatGPT, Claude, and Gemini are Generative AI.

**Agentic AI** is the executor. It's the next evolution where AI systems understand a goal, devise a plan, and autonomously execute tasks. Agentic AI moves from "answering questions" to "getting things done." It's your intelligent assistant that takes action.`,
    realWorldExample: `Example of Generative AI: You ask ChatGPT "Write a product launch email" → AI generates the content for you.

Example of Agentic AI: You tell an AI agent "Schedule my week's meetings, prepare agendas, and send reminders" → The AI logs into your calendar, checks availability, creates docs, and sends emails—all automatically.`,
    quickTakeaway:
      "Generative AI creates. Agentic AI does. Both are reshaping careers. Winners will be those who leverage both as partners.",
    actionableStep:
      "This week, identify one task you do repeatedly that takes 20+ minutes. Ask ChatGPT to show you how Generative AI could handle 80% of it.",
    relatedTopics: ["AI Generalist", "Agentic Workflows", "Prompt Engineering"],
    triggerKeywords: [
      "AI future",
      "how AI works",
      "what is AI",
      "AI replacing",
      "AI trends",
    ],
  },

  {
    id: "s1-ai-generalist",
    title: "The AI Generalist: Your Role in Tomorrow's Work",
    session: 1,
    topic: "Career & Mindset",
    difficulty: "Foundational",
    description:
      "The future demands AI Generalists, not specialists. Learn what makes an AI Generalist and how to become one.",
    conceptExplanation: `An **AI Generalist** is a full-stack problem solver. They're not deep specialists in one domain. Instead, they possess:

1. **Broad AI Model Knowledge** — Understanding which AI tool is best for each task
2. **Strategic Application** — Picking the right model for maximum efficiency
3. **Solution-Oriented Mindset** — Relentless focus on building real, measurable results
4. **Cross-Disciplinary Expertise** — Working across Data, Tech, Product, Design, Marketing, Management

The narrative isn't "AI replaces humans." It's "humans + AI = amplified intelligence." The AI Generalist is the bridge between AI's potential and real-world value.`,
    realWorldExample: `A marketing specialist (old paradigm) writes emails by hand for hours.

An AI Generalist uses ChatGPT to brainstorm angles, Claude to refine copy, then Gemini to optimize for audience. Same result, 10x faster. That's the shift.`,
    quickTakeaway:
      "Specialization is shrinking. Flexibility and AI literacy are expanding. Start broad, go deep only where it matters.",
    actionableStep:
      "Write down 3 problems in your work. For each, identify a different AI tool that could solve it. Try one this week.",
    relatedTopics: ["AI Revolution", "Prompt Engineering", "5 Levels Framework"],
    triggerKeywords: [
      "career",
      "future of work",
      "AI jobs",
      "learn AI",
      "skill building",
    ],
  },

  {
    id: "s1-magic-prompt-formula",
    title: "The Magic Prompt Formula: RTID (Role, Task, Instruction, Data)",
    session: 1,
    topic: "Prompt Engineering",
    difficulty: "Foundational",
    description:
      "Master the 4-part structure that consistently produces high-quality, relevant AI outputs.",
    conceptExplanation: `High-quality AI output comes from structured input. Use the **Magic Prompt Formula**:

1. **Role** — Define the AI's persona and expertise
   Example: "You are a seasoned B2B SaaS marketing strategist."
   
2. **Task** — State your objective clearly
   Example: "Develop a 3-month content marketing plan."
   
3. **Instruction** — Provide detailed constraints and guidelines
   Example: "Focus on LinkedIn, aim for 50+ engagement, include 5 case studies."
   
4. **Data** — Supply necessary context
   Example: "Our product costs $5K. Target audience is CFOs aged 35-50."

This simple structure dramatically improves output quality and relevance.`,
    realWorldExample: `❌ Weak prompt: "Write an email"

✅ Strong prompt (using RTID):
**Role:** "You are a conversion expert who's written for Ogilvy and understands B2B psychology."
**Task:** "Write a launch email for a new AI tool targeting marketing teams."
**Instruction:** "Keep it under 200 words, use 1 data point, include 1 customer testimonial, end with a link to a free demo."
**Data:** "Our tool saves 10 hours/week. 92% of beta users recommended it. Free tier available."`,
    quickTakeaway:
      "Structure beats length. A 100-word RTID prompt beats a 500-word rambling one every time.",
    actionableStep:
      "Pick a prompt you use regularly. Rewrite it using RTID format. Test it against your old version.",
    relatedTopics: [
      "Advanced Prompting Techniques",
      "Markdown Prompting",
      "Custom GPTs",
    ],
    triggerKeywords: [
      "prompt",
      "AI output",
      "better results",
      "content",
      "writing",
      "how to ask AI",
    ],
  },

  {
    id: "s1-advanced-prompting",
    title: "Advanced Prompting: CoT, Few-Shot, Zero-Shot, Self-Refine",
    session: 1,
    topic: "Prompt Engineering",
    difficulty: "Intermediate",
    description:
      "Level up from basic prompts to advanced techniques that unlock AI's reasoning power.",
    conceptExplanation: `Beyond RTID, there are four advanced techniques:

1. **Zero-Shot Prompting** — Direct request, no examples
   AI solves the problem using only its training. Fast, but less control.
   
2. **Few-Shot Prompting** — 2-3 input/output examples included
   You show the AI the pattern you want. Best for consistency.
   
3. **Chain-of-Thought (CoT)** — "Think step-by-step"
   Ask the AI to show its reasoning. Huge for math, logic, code.
   
4. **Self-Refine** — Ask the model to improve its own output
   "Review your answer against [criteria]. Rewrite."
   Surprisingly effective for polishing quality.`,
    realWorldExample: `**Zero-Shot:** "What's the profit margin on a $100 product that costs $30 to make?"
AI: "70%."

**Few-Shot:** You provide 3 examples of product/cost/margin, then ask the same question.
AI: "70%. Assuming standard SaaS cost structure..."

**Chain-of-Thought:** "What's the profit margin? Show me your math step-by-step."
AI: "Step 1: Revenue = $100. Step 2: COGS = $30. Step 3: Gross profit = $70. Step 4: Margin = 70/100 = 70%."

**Self-Refine:** (AI gives first answer) "That's too corporate. Rewrite in a fun, conversational tone."
AI: (Rewritten version)`,
    quickTakeaway:
      "CoT is magic for reasoning. Few-Shot is magic for consistency. Use them strategically, not everywhere.",
    actionableStep:
      "Next time you ask AI something complex, add 'Show me your step-by-step reasoning.' Notice the difference.",
    relatedTopics: [
      "Magic Prompt Formula",
      "Markdown Prompting",
      "Model Experimentation",
    ],
    triggerKeywords: [
      "reasoning",
      "logic",
      "complex problem",
      "math",
      "consistency",
      "better output",
    ],
  },

  {
    id: "s1-markdown-prompting",
    title: "Markdown Prompting: Professional-Grade AI Task Orchestration",
    session: 1,
    topic: "Prompt Engineering",
    difficulty: "Intermediate",
    description:
      "A structured framework for building sophisticated AI agents that mimic human expertise.",
    conceptExplanation: `**Markdown Prompting** is like delegating work to a human expert. It uses markdown formatting (shown below as # headings) to emphasize priority:

**# Role**
You are an expert [domain] with [specific expertise].

**# Objective**
Your goal is to [clear outcome].

**# Context**
Background: [why this matters], [industry reality], [success metrics].

**# Instructions**
Step 1: [action]
Step 2: [action]
Step 3: [action]

**# Notes**
- Important constraint
- Quality standard
- Format requirement

The markdown headings signal **importance** to the AI. The structure forces **clarity** in your own thinking.`,
    realWorldExample: `**Weak:** "Help me with an email"

**Strong (Markdown Prompting):**

**# Role**
You are a conversion copywriter for SaaS companies, specializing in B2B cold email.

**# Objective**
Write a personalized cold email that gets a meeting.

**# Context**
- Recipient: CFO at mid-market software company
- Our product: Saves 15 hours/month on financial reporting
- Success metric: 12%+ reply rate

**# Instructions**
1. Research the company's recent news
2. Mention something specific about their work
3. Lead with value, not features
4. Keep to 100 words max
5. Include 1 social proof point
6. End with low-friction CTA

**# Notes**
- No hype language
- Authentic tone
- Avoid AI-speak`,
    quickTakeaway:
      "Markdown Prompting turns vague requests into precise instructions. It's the language of professional AI agents.",
    actionableStep:
      "Take a complex prompt you've written. Reformat it into Markdown Prompting style. Watch the results improve.",
    relatedTopics: [
      "Custom GPTs",
      "Building AI Agents",
      "Vibe Coding",
      "Magic Prompt Formula",
    ],
    triggerKeywords: [
      "agent",
      "system prompt",
      "custom GPT",
      "automation",
      "workflow",
      "structured",
    ],
  },

  {
    id: "s1-ai-models-landscape",
    title: "AI Models Landscape: ChatGPT, Claude, Gemini, Grok, LLaMA",
    session: 1,
    topic: "AI Toolkit & Models",
    difficulty: "Foundational",
    description:
      "Understand the major AI models and which to use for different tasks.",
    conceptExplanation: `**The Big Players:**

- **OpenAI (GPT-5)** — Balanced, reliable, best for general tasks. Market leader.
- **Anthropic (Claude 3 Sonnet)** — Strong reasoning, excellent for analysis. Best for nuanced thinking.
- **Google (Gemini 2.5 Pro)** — Multimodal (text, image, code). Great for creative work.
- **xAI (Grok)** — Real-time info, witty. Good for current events and humor.
- **Meta (LLaMA 3)** — Open-source, privacy-focused. Run locally or via OpenRouter.

**Reasoning Models (for complex logic):**
- OpenAI o3-mini
- Google Gemini Advanced
- Anthropic Claude 3.5 Sonnet (with Extended Thinking)
- DeepSeek (open-source, excellent reasoning)`,
    realWorldExample: `**Writing a blog post** → Gemini (multimodal, creative)
**Analyzing financial data** → Claude (reasoning, nuance)
**Generating code** → ChatGPT (reliability, ecosystem)
**Real-time market news** → Grok (current info)
**Privacy-critical work** → LLaMA (local, no servers)`,
    quickTakeaway:
      "No single model is 'best.' Match the model to the task. GPT for speed, Claude for depth, Gemini for creativity.",
    actionableStep:
      "Pick 3 tasks you do weekly. Use a different model for each. Compare quality and speed. Note your preferred match.",
    relatedTopics: ["Model Experimentation", "OpenRouter", "5 Levels Framework"],
    triggerKeywords: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "model",
      "which AI",
      "compare",
      "best AI",
    ],
  },

  {
    id: "s1-llm-mechanics",
    title: "How LLMs Work: Tokenization, Embeddings, Transformers, Prediction",
    session: 1,
    topic: "AI Foundations",
    difficulty: "Intermediate",
    description:
      "Demystify the mechanics of Large Language Models so you understand what you're working with.",
    conceptExplanation: `LLMs work in 5 steps:

1. **Tokenization** — Your prompt is broken into small units (tokens). "Hello world" = ["Hello", " ", "world"].

2. **Embeddings** — Each token becomes a number representing its meaning. (This is how the AI 'understands' context.)

3. **Self-Attention (Transformer)** — The model identifies which parts of your prompt matter most. It prioritizes relevant context.

4. **Prediction** — Using patterns from billions of training examples, the model predicts the most likely next token.

5. **Response Generation** — It strings predictions together, token by token, into a complete response.

**Key insight:** The model isn't "thinking" like a human. It's doing sophisticated probability math. Understanding this makes you a better prompter.`,
    realWorldExample: `You ask: "What's the capital of France?"

1. **Tokenization:** ["What", "'s", "the", "capital", "of", "France", "?"]
2. **Embeddings:** Each word → meaning vector
3. **Attention:** Model realizes "France" is the key context, deprioritizes everything else
4. **Prediction:** Given the pattern, most likely next word is "Paris"
5. **Generation:** "Paris" appears in your response`,
    quickTakeaway:
      "LLMs predict 'most likely next word' billions of times. Understanding this is why you get better at prompting.",
    actionableStep:
      "Ask ChatGPT: 'Explain [topic] like I'm 8 years old.' Watch it adjust probability toward simpler language.",
    relatedTopics: ["Prompt Engineering", "Model Behavior", "AI Foundations"],
    triggerKeywords: [
      "how AI works",
      "LLM mechanics",
      "transformer",
      "how does it work",
      "understanding AI",
    ],
  },

  {
    id: "s1-5-levels-framework",
    title: "The 5 Levels to AI Generalist Mastery: Your Roadmap",
    session: 1,
    topic: "Learning Path & Growth",
    difficulty: "Foundational",
    description:
      "A complete roadmap to transform from AI user to AI builder to product creator.",
    conceptExplanation: `The **5 Levels** form a progression from beginner to visionary:

**Level 1: Foundations & Advanced Prompting**
Master RTID, chain-of-thought, experiment with models. Build your prompt library.

**Level 2: Workflow Architect**
Design sophisticated prompting systems. Chain tools together. Introduce automation.

**Level 3: Creator's Playground**
Master multimodal AI (images, video, audio). Build creative content engines.

**Level 4: Agentic AI Builder**
Build autonomous AI agents. Deploy voice agents. Create intelligent workflows.

**Level 5: Vibe Coder**
Build full-stack products without code. Solve real business problems. Ship applications.

Each level builds on the previous. No shortcuts. Master Level 1 before moving to Level 2.`,
    realWorldExample: `📍 **Level 1:** You master ChatGPT and write better prompts. You save 5 hours/week.

📍 **Level 2:** You chain ChatGPT → Gemini → Notion automations. You save 15 hours/week.

📍 **Level 3:** You generate 100 custom images monthly using Midjourney. You're a content machine.

📍 **Level 4:** You deploy a voice AI agent handling customer support 24/7. You're operational.

📍 **Level 5:** You build a full AI product (Vibe Coding) and launch it. You're a founder.`,
    quickTakeaway:
      "Don't skip levels. Level 1 mastery takes 2-4 weeks. Each level multiplies your leverage.",
    actionableStep:
      "Assess yourself: Which level are you at? Commit to mastering your current level before advancing.",
    relatedTopics: [
      "Prompt Engineering",
      "Custom GPTs",
      "Agentic Workflows",
      "Vibe Coding",
    ],
    triggerKeywords: [
      "learn AI",
      "level up",
      "roadmap",
      "path",
      "progress",
      "AI journey",
    ],
  },
];

/**
 * SESSION 2: BUILDING AI PRODUCTS - CUSTOM GPTs, AGENTS, VIBE CODING
 * Focus: From user to builder. Creating reusable AI tools and full products.
 */

const SESSION_2_LESSONS: MastermindLesson[] = [
  {
    id: "s2-custom-gpts",
    title: "Custom GPTs: Build AI Micro-Apps Without Code",
    session: 2,
    topic: "Building AI Applications",
    difficulty: "Intermediate",
    description:
      "Learn to create reusable AI tools (GPTs) that automate specific tasks or workflows.",
    conceptExplanation: `A **Custom GPT** is a specialized version of ChatGPT built for a specific purpose. It's a micro-app that encodes your instructions so you don't have to repeat complex prompts.

**How it works:**
1. Define a goal (e.g., "Generate viral tweet ideas")
2. Write instructions in the GPT Builder
3. Test and refine iteratively
4. Share it (public, private, or team-only)

**What you get:**
- A reusable tool you build once and use forever
- No need to remember complex instructions
- Consistency across uses
- Ability to share with team or public

**Example GPTs:** Tweet generator, email rewriter, code debugger, image prompt engineer, LinkedIn strategist`,
    realWorldExample: `**The XPOST Generator Example from Session:**

1. Goal: Generate 10 tweet ideas with virality scores
2. Instructions: 
   - "Role: Viral content strategist"
   - "Generate 10 tweets on [topic]"
   - "Rate each 1-10 for virality"
   - "Format as table"
3. First iteration: Generated 1 tweet (too narrow)
4. Refined: Tweaked instructions → 10 tweets ✓
5. Further refined: Added ratings table ✓
6. Final: "XPOST Generator" ready for daily use

Now, instead of writing the same 50-word prompt daily, you just type the topic.`,
    quickTakeaway:
      "A Custom GPT is a complex prompt converted into a tool. Build it once, use it 1,000 times.",
    actionableStep:
      "Identify one prompt you write repeatedly (take >3 min). Convert it into a Custom GPT using the ChatGPT Builder.",
    relatedTopics: [
      "Markdown Prompting",
      "Gemini Gems",
      "Content DNA",
      "Agentic Workflows",
    ],
    triggerKeywords: [
      "custom GPT",
      "build tool",
      "automation",
      "repetitive",
      "reusable",
      "micro-app",
    ],
  },

  {
    id: "s2-gemini-gems",
    title: "Gemini Gems: Free Alternative to Custom GPTs",
    session: 2,
    topic: "Building AI Applications",
    difficulty: "Intermediate",
    description:
      "Build custom AI tools in Google's Gemini Platform. Free, with Google Sheets integration.",
    conceptExplanation: `**Gemini Gems** are Google's answer to Custom GPTs. They're completely free and have one killer feature: direct integration with Google Sheets.

**Key differences from Custom GPTs:**
- 100% free (no ChatGPT subscription needed)
- Seamlessly exports to Google Sheets
- Same instruction-based format
- Perfect for data work and collaborative teams

**Best for:**
- Marketing teams (limited budget)
- Data analysis workflows
- Content teams needing spreadsheet integration
- Anyone already in Google Workspace`,
    realWorldExample: `**Viral Email Gem:**

You create a Gem with instructions:
- Role: "Expert email copywriter"
- Task: "Generate 5 subject lines for [industry]"
- Output: "Export directly to Google Sheet with ratings"

Now your team can:
1. Open the Gem
2. Type "SaaS product launch"
3. Get 5 subject lines instantly in Sheet
4. Comment and iterate together`,
    quickTakeaway:
      "No budget? No problem. Gemini Gems do 95% of what Custom GPTs do, free.",
    actionableStep:
      "If you use Google Workspace, try building a Gem. If not, access Gemini.google.com today.",
    relatedTopics: [
      "Custom GPTs",
      "Markdown Prompting",
      "Content DNA",
      "Data Analysis",
    ],
    triggerKeywords: [
      "Gemini",
      "free",
      "Google Sheets",
      "collaboration",
      "budget",
      "Gems",
    ],
  },

  {
    id: "s2-content-dna",
    title: "Content DNA: Clone Your Writing Style With AI",
    session: 2,
    topic: "Content & Voice",
    difficulty: "Advanced",
    description:
      "Build an AI that writes exactly like you by analyzing your unique patterns and voice.",
    conceptExplanation: `**Content DNA** is the unique fingerprint of your writing—tone, word choice, structure, pace, storytelling style.

**The 3-Step Process:**

1. **Content DNA Analysis** — Feed the AI 10+ samples of your best work
   AI writes a detailed report on: tone, vocabulary, sentence structure, patterns, hidden rules
   *Pro trick:* Tell the AI "Competitor X gave a weaker analysis—go deeper"
   
2. **Master Prompt Creation** — Convert the analysis into comprehensive instructions
   AI acts as prompt engineer, formats into Markdown Prompting style
   
3. **Custom Agent Build** — Paste master prompt into Custom GPT or Gem
   Now any model can write in your exact voice on any topic

**Why this works:** You're teaching the AI the rules of your style, not just showing examples.`,
    realWorldExample: `**Your Content DNA Analysis reveals:**
- Sentence avg 12 words (concise, punchy)
- Opens with contrarian takes
- Uses short paragraphs (breathing room)
- Ends with actionable challenge
- Voice: helpful, conversational, zero corporate-speak

Your Master Prompt then teaches AI: "Start with an unexpected angle → support with data → end with 'try this this week.'"

Result: New posts in your voice, zero editing needed.`,
    quickTakeaway:
      "Your unique voice is teachable. Once documented, you can scale your output 10x without sounding like a bot.",
    actionableStep:
      "Pick 5 of your best posts/emails. Ask Claude: 'Analyze the content DNA, then write a master prompt for this style.'",
    relatedTopics: [
      "Custom GPTs",
      "Markdown Prompting",
      "Content Creation",
      "Writing Style",
    ],
    triggerKeywords: [
      "writing style",
      "voice",
      "clone",
      "consistency",
      "content",
      "authenticity",
    ],
  },

  {
    id: "s2-mcp-online-agents",
    title: "Model Context Protocol (MCP): Web Integration & Autonomous Agents",
    session: 2,
    topic: "Agentic AI",
    difficulty: "Advanced",
    description:
      "Connect AI to live web services and tools using MCP. Enable AI to take real actions.",
    conceptExplanation: `**Model Context Protocol (MCP)** is groundbreaking. It's the bridge between AI and the real world.

Normally: You chat with AI, it gives advice.
With MCP: You tell AI to do something, and it does it.

**MCP enables:**
- AI accessing live web data (Instagram, Twitter, news, etc.)
- AI scraping and analyzing websites
- AI managing files and folders
- AI integrating with services (Slack, Notion, Sheets)
- AI taking actions on your behalf

**The shift:** From "AI as advisor" to "AI as agent."

Example online integration:
"AI, analyze the top 5 performing posts on [Instagram account], extract the scripts, rewrite them in my voice."
→ AI visits Instagram, scrapes data, analyzes, rewrites. Done.`,
    realWorldExample: `**Live Example from Session (Appify integration):**
Prompt: "Go to Instagram profile X. Find top-performing content. Transcribe scripts. Rewrite in style Y. Output as doc."

Without MCP: Manual work = 8 hours
With MCP: AI does it autonomously = 10 minutes

**Another example (file management):**
Prompt: "Scan my Downloads folder. Identify files I haven't touched in 6 months. Show which ones I can safely delete to save space."
→ AI has filesystem access, performs the analysis.`,
    quickTakeaway:
      "MCP is the future. It's what turns AI from 'chat buddy' into 'operational engine.'",
    actionableStep:
      "Explore OpenRouter.ai and look for MCP-enabled tools. Pick one real task you want automated.",
    relatedTopics: [
      "Agentic Workflows",
      "Voice Agents",
      "Jerry Agent Example",
      "Process Optimization",
    ],
    triggerKeywords: [
      "automations",
      "agent",
      "actions",
      "web scraping",
      "integration",
      "autonomous",
      "MCP",
    ],
  },

  {
    id: "s2-voice-agents",
    title: "Voice Agents: AI That Calls, Listens, Responds (VAPI & Beyond)",
    session: 2,
    topic: "Agentic AI",
    difficulty: "Advanced",
    description:
      "Build AI agents that make phone calls, understand context, and handle conversations autonomously.",
    conceptExplanation: `**Voice Agents** are AI systems that can:
- Make outbound calls
- Understand spoken context
- Respond conversationally
- Handle objections
- Complete tasks (book appointments, confirm details, etc.)

Powered by **VAPI** and similar platforms that combine:
- Speech-to-text (transcribe speech → text)
- LLM reasoning (understand & respond)
- Text-to-speech (speak back)

**Use cases:**
- Customer support automation
- Sales outreach (calling prospects)
- Appointment scheduling
- Surveys and feedback collection
- Follow-up calls`,
    realWorldExample: `**Voice Agent Workflow:**

1. AI calls a prospect: "Hi, this is an AI calling from Company X."
2. Prospect: "Uh, what is this?"
3. AI understands context, doesn't get defensive: "I'm calling to tell you about a new service. Got 30 seconds?"
4. Real conversation unfolds (AI handles objections, gathers info)
5. Call ends: AI knows if they're interested, schedules follow-up

All automated. All recorded. All integrated back to your CRM.`,
    quickTakeaway:
      "Voice agents don't replace humans. They handle 80% of calls, humans take the 20% that need real skill.",
    actionableStep:
      "Visit VAPI.com or similar. Design 1 voice agent workflow for your business. Test it.",
    relatedTopics: [
      "MCP Integration",
      "Agentic Workflows",
      "Process Automation",
      "Scale Operations",
    ],
    triggerKeywords: [
      "phone",
      "voice",
      "calling",
      "support",
      "outreach",
      "VAPI",
      "autonomous",
    ],
  },

  {
    id: "s2-vibe-coding",
    title: "Vibe Coding 101: Build Full-Stack Apps Without Writing Code",
    session: 2,
    topic: "Building Products",
    difficulty: "Advanced",
    description:
      "Learn to build complete web applications by talking to AI. No coding experience needed.",
    conceptExplanation: `**Vibe Coding** = describing apps in natural language, letting AI write the code.

**Key mindset shifts:**
1. You're not learning to code—you're learning to communicate clearly
2. Iteration is normal. Errors are features (you copy them back, AI fixes)
3. Small slices beat big uploads (build → test → refine, repeat)
4. Checkpoints save lives (save working versions, roll back if stuck)

**The workflow:**
1. Write a PRD (Product Requirements Document, or just describe the app)
2. Optimize the PRD using AI prompt engineering
3. Paste into Bolt.new or similar platform
4. AI scaffolds the project structure
5. Test and iterate with small, targeted changes
6. Deploy when ready

**Core principle:** You describe features. AI writes code. You test. Repeat until done.`,
    realWorldExample: `**Building a Project Management App:**

Your description:
"Build a Kanban board app where users can:
- Create boards and columns
- Drag tasks between columns
- Assign tasks to team members
- Click 'Generate Tasks' and get AI to create a smart checklist from a prompt"

Vibe Coder workflow:
1. AI scaffolds: Project structure, database schema, UI layout
2. You test: 'Drag doesn't work, fix it'
3. AI fixes with minimal change
4. New feature: 'Add task priority colors'
5. AI adds with CSS and logic
6. 1 week: Full working app, zero lines of code you wrote`,
    quickTakeaway:
      "Vibe Coding is the future of software. You think in features, AI handles implementation. Democratizes building.",
    actionableStep:
      "Pick a simple app idea (task list, habit tracker, expense tracker). Describe it to Bolt.new. See what happens.",
    relatedTopics: [
      "Markdown Prompting",
      "Build Process",
      "Deployment",
      "Monetization",
    ],
    triggerKeywords: [
      "build app",
      "no code",
      "Bolt",
      "Vibe Coding",
      "product",
      "full stack",
      "startup idea",
    ],
  },

  {
    id: "s2-vibe-coding-prd",
    title: "PRD → Optimized Prompt: The 3-Stage Vibe Coding Process",
    session: 2,
    topic: "Building Products",
    difficulty: "Advanced",
    description:
      "Master the structured thinking process behind vibe coding: Raw ask → PRD → Platform-optimized prompt.",
    conceptExplanation: `**Stage 1: Raw Ask**
Just write what you want naturally. No structure yet.
"Build me a project-management app with Kanban boards."

**Stage 2: Turn It Into a PRD**
Feed your raw ask to a reasoning model (Claude/GPT). Request:
"Write a detailed Project Requirements Document with:
- Pages and user flows
- Data entities and relationships
- CRUD operations
- Error states and edge cases
- Acceptance tests"

AI now has clarity on the full scope.

**Stage 3: Platform-Optimized Prompt**
Take Bolt.new's best-practice prompting guidelines, paste them + your PRD + request:
"Rewrite my PRD into a single Bolt-optimized prompt that includes:
- Tech stack decision
- File structure
- Database schema with sample data
- All components and routes
- Auth flow
- Error handling patterns"

Now you have a single, tight prompt that generates the entire project in one AI call.

**Why this works:** Better structure → fewer iterations → faster shipping.`,
    realWorldExample: `**Stage 1 (Raw):**
"I want an app to track my team's tasks."

**Stage 2 (PRD Output includes):**
- Feature: Create boards, add columns, drag tasks
- Entities: User, Board, Column, Task, with relationships
- CRUD: All operations mapped
- Pages: /login, /boards, /board/:id, /task/:id
- Auth: Email signup, session persistence

**Stage 3 (Bolt Prompt includes—e.g.):**
"Use Next.js + Supabase + Tailwind. Project structure:
- /app/page.tsx (landing)
- /app/boards/page.tsx (dashboard)
- /app/api/tasks (API routes)
- Schema: users → boards → columns → tasks
- Auth: Clerk for login management
- Add this sample data seed...
[Full prompt is 500 words, crystal clear, and ready to paste]"`,
    quickTakeaway:
      "Decompose your thinking. One AI for planning, another for building. Tight prompts beat rambling.",
    actionableStep:
      "Write a raw app idea. Feed it to Claude with the PRD template. Then optimize the output for Bolt.",
    relatedTopics: ["Vibe Coding", "Markdown Prompting", "Bolt Platform"],
    triggerKeywords: [
      "PRD",
      "requirements",
      "planning",
      "app design",
      "structure",
      "prompt optimization",
    ],
  },

  {
    id: "s2-restaurant-analogy",
    title: "The Restaurant Analogy: Understanding Full-Stack Architecture",
    session: 2,
    topic: "Concepts & Mental Models",
    difficulty: "Intermediate",
    description:
      "Understand backend, frontend, database, API, auth, and hosting through a restaurant metaphor.",
    conceptExplanation: `The **Restaurant Analogy** makes complex tech intuitive:

🍽️ **Frontend = Dining Area**
What users see and interact with. Buttons, forms, pages, animations.

🧑‍🍳 **Backend = Kitchen**
Where work happens invisibly. Business logic, calculations, processing.

🥘 **Database = Pantry**
Storage for ingredients (data). Users, tasks, orders, history.

🚴 **API = Waiter**
Carries requests from dining area to kitchen/pantry, brings results back.

🚪 **Authentication = Host Stand**
Checks reservations (login), issues room keys (access tokens).

👨‍💼 **Server = Restaurant Manager**
Oversees operations, schedules, workflow coordination.

🏢 **Hosting = The Building**
The physical place. Servers live here. Open 24/7 to the public.

⚡ **Edge Functions = Service Desks**
Small, fast stations throughout for localized help (faster than main desk).`,
    realWorldExample: `You're ordering from a restaurant app:

**Frontend:** You see menu (app interface)
**API:** Your "add to cart" sends a request (waiter takes order)
**Backend:** Kitchen validates the order (checks inventory)
**Database:** Pantry records what you ordered (logs to system)
**Authentication:** Host confirms you're a registered user (checks reservation)
**Server:** Manager ensures order flows correctly
**Hosting:** The whole operation runs on the "restaurant building"`,
    quickTakeaway:
      "Think in analogies. Full-stack architecture is: Interface (user sees) → Logic (system processes) → Storage (data persists).",
    actionableStep:
      "Explain this analogy to someone non-technical. If they 'get it,' you deeply understand it too.",
    relatedTopics: ["Vibe Coding", "Backend/Frontend", "APIs", "Web Architecture"],
    triggerKeywords: [
      "how apps work",
      "architecture",
      "backend",
      "frontend",
      "full stack",
      "database",
      "API",
    ],
  },

  {
    id: "s2-deployment-domains",
    title: "Deploy & Go Live: Publishing Your App With Custom Domains",
    session: 2,
    topic: "Operations & Launch",
    difficulty: "Intermediate",
    description:
      "Go from localhost to live: deployment, DNS, custom domains, SSL, public internet.",
    conceptExplanation: `**Deployment** = Making your app accessible to everyone on the internet.

**The flow:**

1. **Platform Deploy** — Click "publish" in Bolt/Vercel
   Gets you a public URL (e.g., my-app-abc123.bolt.host)
   
2. **Custom Domain**
   Buy from registrar (Namecheap, GoDaddy, etc.)
   Update DNS records (A/CNAME) to point to your hosting
   Wait for propagation (15 min to 48 hours)
   
3. **SSL Certificate** — Auto-provisioned
   HTTPS enabled. Green lock. Secure.
   
4. **Test in Production** — Use custom domain live
   Sign up, auth, test all features
   Users can access it

**Timeline:** 30 min (if you have a domain) to a few hours (waiting for DNS)`,
    realWorldExample: `**Real deployment:**

1. Click "Publish" in Bolt → get special-app-123.bolt.host
2. Buy domain at Namecheap: myapp.com
3. In Namecheap DNS: Point myapp.com → Bolt's servers (one CNAME change)
4. Wait 30 min
5. Visit myapp.com → Your app loads ✓
6. Green lock in browser ✓
7. Share with friends: "Check out myapp.com" ✓`,
    quickTakeaway:
      "Deployment is simpler than onboarding to yet another SaaS. An afternoon of work, then you're public.",
    actionableStep:
      "If you've built an app, get one cheap domain ($12/year) and follow these steps today.",
    relatedTopics: ["Vibe Coding", "Going Live", "Monetization", "Launch Strategy"],
    triggerKeywords: [
      "deploy",
      "launch",
      "live",
      "domain",
      "DNS",
      "hosting",
      "public",
      "production",
    ],
  },

  {
    id: "s2-monetization-quick",
    title: "Monetization 101: From MVP to Revenue (Stripe, Pricing, Distribution)",
    session: 2,
    topic: "Business & Growth",
    difficulty: "Intermediate",
    description:
      "Turn your app into a business. Pricing strategy, payment processing, and distribution.",
    conceptExplanation: `**The monetization arc:**

1. **Problem** → Build MVP → Ship to real users
2. **Feedback** → Iterate → Build something people want
3. **Pricing** → Choose model (subscription, one-time, freemium)
4. **Payment Processing** → Stripe integration (5 lines of code in Vibe Coding)
5. **Distribution** → Tell people it exists
6. **Revenue** → Repeat & improve

**Pricing models:**
- **Freemium:** Free tier + premium features
- **Subscription:** Monthly recurring
- **One-time:** Pay once, own forever
- **Hybrid:** Free trial, then subscription

**The rule:** Price so good people feel silly saying no.`,
    realWorldExample: `**Real example from session:**

Problem: Creating AI image prompts is hard
MVP: Simple form → generates 5 prompts → no payment
v1.1: Add premium tier (20 variants with styles)
Pricing: $9/month
Distribution: Post on Reddit, Twitter, ProductHunt
Result: 50 users, $450/month revenue in month 1

Lesson: Ship simple. Price fairly. Tell people.`,
    quickTakeaway:
      "Monetization doesn't require complexity. Pick a model, integrate Stripe, start charging.",
    actionableStep:
      "If you ship an MVP this month, think: Who'd pay for this? How much? Validate with 5 people.",
    relatedTopics: [
      "Vibe Coding",
      "Launch Strategy",
      "Business Model",
      "Growth",
    ],
    triggerKeywords: [
      "pricing",
      "monetize",
      "revenue",
      "business model",
      "paying users",
      "Stripe",
    ],
  },
];

/**
 * Combine all lessons into a library
 */
export const MASTERMIND_LESSONS = {
  session1: SESSION_1_LESSONS,
  session2: SESSION_2_LESSONS,
  all: [...SESSION_1_LESSONS, ...SESSION_2_LESSONS],
};

/**
 * Detection System: Recognize when to suggest lessons
 */
export function detectMastermindLessonTrigger(
  userMessage: string
): { triggered: boolean; suggestedLessonIds: string[] } {
  const lowerMessage = userMessage.toLowerCase();

  // Keywords grouped by lesson
  const lessonTriggerMap: Record<string, string[]> = {
    "s1-ai-revolution": ["AI future", "how AI works", "AI revolution", "agentic"],
    "s1-ai-generalist": ["career", "future of work", "skill", "learn AI"],
    "s1-magic-prompt-formula": ["prompt", "ask AI", "better results", "how to"],
    "s1-advanced-prompting": ["reasoning", "complex", "step by step", "logic"],
    "s1-markdown-prompting": [
      "system prompt",
      "agent",
      "structured",
      "custom GPT",
    ],
    "s1-ai-models-landscape": [
      "ChatGPT",
      "Claude",
      "Gemini",
      "which AI",
      "compare",
    ],
    "s2-custom-gpts": ["custom GPT", "build tool", "automation", "reusable"],
    "s2-gemini-gems": ["Gemini Gems", "free", "Google Sheets"],
    "s2-content-dna": ["writing style", "voice", "consistency", "authentic"],
    "s2-mcp-online-agents": [
      "automation",
      "agent",
      "web scraping",
      "autonomous",
    ],
    "s2-voice-agents": [
      "phone",
      "voice",
      "calling",
      "VAPI",
      "autonomous",
    ],
    "s2-vibe-coding": [
      "build app",
      "no code",
      "Bolt",
      "full stack",
      "startup",
    ],
    "s2-vibe-coding-prd": ["PRD", "requirements", "planning", "structure"],
    "s2-restaurant-analogy": ["how apps work", "architecture", "full stack"],
    "s2-deployment-domains": [
      "deploy",
      "launch",
      "live",
      "domain",
      "public",
    ],
    "s2-monetization-quick": [
      "pricing",
      "monetize",
      "revenue",
      "business model",
    ],
  };

  const suggestedLessonIds: string[] = [];

  // Check for trigger keywords
  for (const [lessonId, keywords] of Object.entries(lessonTriggerMap)) {
    if (keywords.some((kw) => lowerMessage.includes(kw))) {
      suggestedLessonIds.push(lessonId);
    }
  }

  // Also check explicit lesson requests
  const explicitPatterns = [
    /tell me about|explain|teach me|what is|how do I|what's/i,
  ];
  const isExplicitLessonRequest = explicitPatterns.some((p) =>
    p.test(userMessage)
  );

  return {
    triggered: suggestedLessonIds.length > 0 || isExplicitLessonRequest,
    suggestedLessonIds: [...new Set(suggestedLessonIds)],
  };
}

/**
 * Find lessons by various criteria
 */
export function findLessonById(id: string): MastermindLesson | undefined {
  return MASTERMIND_LESSONS.all.find((lesson) => lesson.id === id);
}

export function findLessonsByTopic(topic: string): MastermindLesson[] {
  return MASTERMIND_LESSONS.all.filter(
    (lesson) => lesson.topic.toLowerCase() === topic.toLowerCase()
  );
}

export function findLessonsBySession(session: 1 | 2): MastermindLesson[] {
  return MASTERMIND_LESSONS.all.filter((lesson) => lesson.session === session);
}

export function getAvailableLessonsSummary(): string {
  const s1Lessons = findLessonsBySession(1);
  const s2Lessons = findLessonsBySession(2);

  return `
📚 **OutSkill Mastermind Lesson Library**

**Session 1: AI Foundations & Prompt Engineering** (${s1Lessons.length} lessons)
${s1Lessons.map((l) => `- ${l.title}`).join("\n")}

**Session 2: Building AI Products** (${s2Lessons.length} lessons)
${s2Lessons.map((l) => `- ${l.title}`).join("\n")}

💡 Ask me about any topic. I'll teach you in bite-sized, memorable pieces.
Try: "Teach me about custom GPTs" or "What's prompt engineering?"
`;
}

/**
 * Format a lesson for teaching (4-part structure)
 */
export function formatLessonTeaching(lesson: MastermindLesson): string {
  return `
🎯 **${lesson.title}** (Session ${lesson.session} • ${lesson.difficulty})

📖 **The Concept:**
${lesson.conceptExplanation}

💼 **Real-World Example:**
${lesson.realWorldExample}

⚡ **The Quick Takeaway:**
${lesson.quickTakeaway}

🚀 **Your Action This Week:**
${lesson.actionableStep}

---
Related topics: ${lesson.relatedTopics.join(", ")}
`;
}
