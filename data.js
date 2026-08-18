// Comprehensive mock dataset of educational tech reels, AI analysis, quizzes, and user profile templates

const REELS_DATA = [
  {
    id: "reel-1",
    title: "How Game Engines Use Math & Shader Code for Lighting",
    creator: "TechMatrix AI",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    category: "Gaming",
    tags: ["gaming", "coding", "math", "graphics"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-code-array-on-a-computer-screen-27318-large.mp4",
    poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    likes: 12450,
    comments: 342,
    shares: 890,
    duration: "0:45",
    difficulty: "Intermediate",
    aiMatchScore: 98,
    aiReasoning: "Matched because of your high interest in Gaming Physics & C++ Graphics Programming.",
    summary: "Explains how ray tracing and fragment shaders compute vector dot products to simulate real-time dynamic light reflection in 3D video games.",
    simpleAnalogy: "Imagine shining a flashlight at a flat wall vs a tilted slope: when perpendicular (90°), it gets full light; when tilted, the light spreads out and dims!",
    eli5Summary: "3D lighting works just like flashlights in real life. Shader code measures how straight a light shines on an object to set its brightness.",
    keywordsGlossary: [
      { term: "Shader", simpleDef: "A mini GPU program that calculates color and light for pixels on your screen." },
      { term: "Dot Product", simpleDef: "A quick math formula that measures how much two arrows (vectors) point in the same direction." },
      { term: "Ray Tracing", simpleDef: "Tracing virtual light rays from your camera to bounce off game objects." }
    ],
    codeSnippet: `// HLSL Fragment Shader - Diffuse Lighting
float3 ComputeLighting(float3 N, float3 L, float3 lightColor) {
    float NdotL = max(0.0, dot(N, L));
    return lightColor * NdotL;
}`,
    keyTakeaways: [
      "Vector Dot Product (N • L) determines surface brightness based on light angle.",
      "Fragment shaders run directly on the GPU millions of times per frame.",
      "Ray tracing projects light paths backwards from camera to scene objects."
    ],
    quiz: {
      question: "Which vector operation is used in shaders to determine angle of light hit?",
      options: ["Cross Product", "Dot Product", "Matrix Addition", "Scalar Multiplication"],
      correct: 1,
      explanation: "The Dot Product (N • L) yields the cosine of the angle between surface normal and light direction!"
    },
    recommendedCourses: [
      { name: "3D Shader Programming in WebGL", platform: "Interactive Lab", duration: "2h 30m" },
      { name: "Game Physics Math 101", platform: "EduTech Code", duration: "1h 45m" }
    ]
  },
  {
    id: "reel-2",
    title: "Build Your First Neural Network in 60 Seconds with PyTorch",
    creator: "AI Academy",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    category: "AI",
    tags: ["Ai", "coding", "python", "programming"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-working-overtime-in-the-office-22874-large.mp4",
    poster: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    likes: 28900,
    comments: 1205,
    shares: 4320,
    duration: "1:00",
    difficulty: "Beginner",
    aiMatchScore: 95,
    aiReasoning: "Matches your top goal: Master Artificial Intelligence & Python Scripting.",
    summary: "Walkthrough of defining a linear layer feedforward neural network, computing loss with MSELoss, and performing backpropagation with Adam optimizer.",
    simpleAnalogy: "Like a student practicing math problems: after each guess, the teacher gives feedback (Loss), and the student adjusts their thinking (Weights) to get better next time!",
    eli5Summary: "Neural networks learn by making guesses, checking how wrong they were, and making tiny adjustments until they get it right.",
    keywordsGlossary: [
      { term: "Neural Network", simpleDef: "A computer program inspired by the human brain that learns patterns from examples." },
      { term: "Loss", simpleDef: "A score showing how wrong the AI's guess was (lower score = smarter AI)." },
      { term: "Backpropagation", simpleDef: "The step where AI rewinds backwards through its work to fix its mistakes." }
    ],
    codeSnippet: `import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 1)
        
    def forward(self, x):
        return torch.sigmoid(self.fc(x))`,
    keyTakeaways: [
      "PyTorch `nn.Module` is the base class for neural network models.",
      "Backpropagation updates weights automatically via autograd engines.",
      "Sigmoid activation compresses outputs into probability range [0, 1]."
    ],
    quiz: {
      question: "What function triggers gradient calculation in PyTorch?",
      options: ["loss.backward()", "model.forward()", "optimizer.step()", "torch.gradient()"],
      correct: 0,
      explanation: "`loss.backward()` computes gradients of all model parameters with respect to loss."
    },
    recommendedCourses: [
      { name: "Deep Learning Essentials with PyTorch", platform: "LearnAI Hub", duration: "4h 15m" }
    ]
  },
  {
    id: "reel-3",
    title: "Clean Code Hacks: Avoid Nested If Statements (Guard Clauses)",
    creator: "CodeWithSam",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    category: "Coding",
    tags: ["coding", "programming", "clean code", "webdev"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-40728-large.mp4",
    poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    likes: 18320,
    comments: 490,
    shares: 1450,
    duration: "0:50",
    difficulty: "Beginner",
    aiMatchScore: 92,
    aiReasoning: "Great fit to upgrade your programming style and software architecture fundamentals.",
    summary: "Demonstrates how Early Exit / Guard Clause refactoring improves code readability and reduces cognitive complexity in functions.",
    simpleAnalogy: "Like a bouncer at a club entrance: instead of making everyone walk through 5 security doors, the bouncer turns invalid people away at the front door instantly!",
    eli5Summary: "Check for errors right away at the top of your function and exit early. This stops your code from looking like a messy mountain of nested IFs.",
    keywordsGlossary: [
      { term: "Guard Clause", simpleDef: "A quick check at the start of a function that stops execution early if something is wrong." },
      { term: "Nested IFs", simpleDef: "Putting IF statements inside other IF statements, creating hard-to-read code." },
      { term: "Refactoring", simpleDef: "Rewriting existing code to make it cleaner and easier to read without changing what it does." }
    ],
    codeSnippet: `// BAD: Arrow Anti-Pattern
function processOrder(user, order) {
  if (user) {
    if (user.isActive) {
      if (order.items.length > 0) {
        return execute(order);
      }
    }
  }
}

// GOOD: Guard Clauses
function processOrder(user, order) {
  if (!user || !user.isActive) return null;
  if (!order || order.items.length === 0) return null;
  
  return execute(order);
}`,
    keyTakeaways: [
      "Return early when preconditions fail to keep happy path unindented.",
      "Reduces code cyclomatic complexity.",
      "Improves code reviewability and prevents nested arrow anti-patterns."
    ],
    quiz: {
      question: "What is the main benefit of using Guard Clauses?",
      options: ["Faster runtime speed always", "Flattened code structure & readability", "Automatic null pointer catch", "Reduced memory allocation"],
      correct: 1,
      explanation: "Guard clauses flatten nested logic, making code significantly easier to read and maintain."
    },
    recommendedCourses: [
      { name: "Refactoring & Architecture Principles", platform: "CodeCraft", duration: "1h 30m" }
    ]
  },
  {
    id: "reel-4",
    title: "How Procedural Generation Creates Infinite Game Worlds (Perlin Noise)",
    creator: "IndieDev Guild",
    creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    category: "Gaming",
    tags: ["gaming", "coding", "algorithms", "Ai"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-code-41539-large.mp4",
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    likes: 31050,
    comments: 920,
    shares: 3100,
    duration: "0:58",
    difficulty: "Advanced",
    aiMatchScore: 97,
    aiReasoning: "Direct match for Gaming + Procedural Algorithmic design interest.",
    summary: "Visualizing how Minecraft and No Man's Sky generate continuous smooth terrain, biomes, and caves using 2D/3D Perlin Noise frequency maps.",
    simpleAnalogy: "Like drawing smooth rolling hills with a soft pencil instead of scattering random dots all over the paper!",
    eli5Summary: "Procedural generation uses smart math formulas to craft giant, endless game worlds automatically so developers don't have to draw every block.",
    keywordsGlossary: [
      { term: "Procedural Generation", simpleDef: "Creating game content automatically using computer algorithms instead of manually building it." },
      { term: "Perlin Noise", simpleDef: "A mathematical formula that creates smooth, natural-looking random curves for terrain." },
      { term: "Seed", simpleDef: "A starting secret code string that allows a game to regenerate the exact same infinite world anytime." }
    ],
    codeSnippet: `// Generating Elevation with Multi-Octave Noise
float elevation = 0;
float frequency = 0.01;
float amplitude = 1.0;

for(int i = 0; i < octaves; i++) {
    elevation += Mathf.PerlinNoise(x * frequency, y * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
}`,
    keyTakeaways: [
      "Perlin Noise produces pseudo-random gradients that look natural.",
      "Combining multiple noise octaves adds mountain peaks & fine surface detail.",
      "Seeds allow deterministic recreation of infinite worlds."
    ],
    quiz: {
      question: "Why is Perlin Noise preferred over pure random numbers in terrain generation?",
      options: ["It takes zero CPU time", "It produces smooth continuous transitions", "It uses less memory", "It creates perfect cubes"],
      correct: 1,
      explanation: "Perlin Noise creates smooth continuous gradients, preventing harsh erratic spikes in terrain."
    },
    recommendedCourses: [
      { name: "Procedural World Generation Masterclass", platform: "GameDev Academy", duration: "3h 10m" }
    ]
  },
  {
    id: "reel-5",
    title: "AI Agents Explained: LLM Function Calling & Tools",
    creator: "Agentic AI Labs",
    creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    category: "AI",
    tags: ["Ai", "programming", "coding", "agentic"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stream-of-binary-code-and-data-in-a-futuristic-tunnel-41544-large.mp4",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    likes: 42100,
    comments: 1540,
    shares: 6200,
    duration: "1:00",
    difficulty: "Intermediate",
    aiMatchScore: 99,
    aiReasoning: "Matches your profile tag: AI & Modern Autonomous Software Agents.",
    summary: "Learn how modern AI models move beyond chat by emitting structured JSON to execute real Python code, query databases, and automate workflows.",
    simpleAnalogy: "Like giving a smart assistant a smartphone: instead of just talking to you, the AI can open the calculator, book a hotel, or send emails for you!",
    eli5Summary: "AI agents don't just chat—they connect to external software tools to perform real work like searching the web or running computer scripts.",
    keywordsGlossary: [
      { term: "AI Agent", simpleDef: "An intelligent system that uses AI to make decisions and take actions using external software tools." },
      { term: "Function Calling", simpleDef: "When an AI outputs structured data telling a computer program which tool to trigger." },
      { term: "LLM", simpleDef: "Large Language Model—the core AI brain (like Gemini or GPT) trained on text data." }
    ],

    codeSnippet: `// Agent Tool Declaration
const weatherTool = {
  name: "get_weather",
  description: "Get real-time weather info",
  parameters: {
    type: "object",
    properties: { location: { type: "string" } }
  }
};`,
    keyTakeaways: [
      "AI Agents pair LLM reasoning with real API execution.",
      "Structured output (JSON schema) ensures reliable function invocation.",
      "ReAct loop: Reason -> Act (Tool Call) -> Observe -> Final Answer."
    ],
    quiz: {
      question: "What enables an AI agent to query live external data?",
      options: ["Model fine-tuning only", "Function / Tool Calling APIs", "Increasing temperature parameter", "Prompt repetition"],
      correct: 1,
      explanation: "Function/Tool Calling allows the model to output parameters that run live external APIs."
    },
  {
    id: "reel-6",
    title: "Electric Vehicle (EV) Battery Management Systems & Physics",
    creator: "EV Tech Lab",
    creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    category: "EV Tech",
    tags: ["Cars", "EV Tech", "engineering", "coding"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-code-41539-large.mp4",
    poster: "https://images.unsplash.com/photo-1558441719-6745080a4289?w=800&auto=format&fit=crop&q=80",
    likes: 19800,
    comments: 512,
    shares: 1240,
    duration: "0:55",
    difficulty: "Intermediate",
    aiMatchScore: 96,
    aiReasoning: "AI Bot Mapping: Detected interest in 'Cars' -> Converted to 'EV Tech & Battery Microcontroller Code'.",
    summary: "How modern electric cars monitor cell voltage, temperature, and regenerative braking power using C embedded code.",
    simpleAnalogy: "Like a smart smartphone battery charger that balances 7,000 tiny battery cells simultaneously so your electric car runs safely for miles!",
    eli5Summary: "Electric cars use tiny computers to make sure all their battery cells stay cool, safe, and charged evenly.",
    keywordsGlossary: [
      { term: "BMS", simpleDef: "Battery Management System—the brain that protects electric car batteries." },
      { term: "Regenerative Braking", simpleDef: "Turning your car's stopping energy back into electricity to recharge the battery." }
    ],
    codeSnippet: `// EV Battery Monitoring Loop
float readCellVoltage(int cellId) {
    float voltage = analogRead(cellId) * (5.0 / 1023.0);
    if (voltage > 4.25) triggerOverchargeProtection();
    return voltage;
}`,
    keyTakeaways: [
      "BMS microcontrollers monitor thousands of Lithium-Ion cells in real time.",
      "Regenerative braking reclaims Kinetic Energy back into electric potential."
    ],
    quiz: {
      question: "What is the primary role of an EV Battery Management System (BMS)?",
      options: ["Paint car body", "Cell voltage balancing & thermal safety", "Play car music", "Wipe windshield"],
      correct: 1,
      explanation: "The BMS continuously balances cell voltages and prevents dangerous overheating!"
    },
    recommendedCourses: [
      { name: "Embedded C Systems for Electric Vehicles", platform: "AutoTech Edu", duration: "3h 45m" }
    ]
  }
];

const AI_BOT_CONVERSIONS = [
  { rawInterest: "Gaming", convertedTech: "Game Dev & Physics Shader Reels", icon: "fa-gamepad" },
  { rawInterest: "Cars / Automotive", convertedTech: "EV Tech & Autonomous Microcontroller Reels", icon: "fa-car" },
  { rawInterest: "AI / ChatGPT", convertedTech: "LLM Function Calling & PyTorch Agent Reels", icon: "fa-brain" },
  { rawInterest: "Social Media / Web", convertedTech: "Full-Stack Web Dev & Architecture Reels", icon: "fa-globe" },
  { rawInterest: "Cyber Security", convertedTech: "Ethical Hacking & Network Defense Reels", icon: "fa-shield-halved" }
];

const INITIAL_USER = {
  name: "Alex Dev",
  email: "alex.student@techlearn.edu",
  isLoggedIn: false, // Default: Must login first!
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  grade: "Undergraduate - CS Major",
  weeklyGoalHours: 5,
  completedHours: 3.4,
  watchTimeMinutes: 204,
  streakDays: 6,
  points: 1420,
  level: "Level 4 - Code Explorer",
  learningScore: 92,
  rawInterests: ["Gaming", "Cars", "AI", "Programming"],
  detectedAiInterests: [
    { topic: "Game Dev & Physics Shaders", source: "Gaming", confidence: 98 },
    { topic: "EV Tech & Embedded Battery C Code", source: "Cars", confidence: 96 },
    { topic: "Autonomous AI Agents & PyTorch", source: "AI", confidence: 95 }
  ],
  recommendedCareers: [
    { title: "Game Engine Programmer", match: 96, avgSalary: "$125,000/yr" },
    { title: "EV Software Firmware Engineer", match: 94, avgSalary: "$135,000/yr" },
    { title: "AI Agent Systems Architect", match: 98, avgSalary: "$150,000/yr" }
  ],
  likedReelIds: ["reel-1", "reel-2", "reel-5"],
  dislikedReelIds: [],
  savedNotebook: [
    {
      reelId: "reel-1",
      title: "HLSL Shader Lighting Equation",
      date: "2026-08-15",
      snippet: "NdotL = max(0.0, dot(N, L));",
      note: "Used for diffuse shading in game engines."
    },
    {
      reelId: "reel-3",
      title: "Guard Clause Pattern",
      date: "2026-08-17",
      snippet: "if (!user || !user.isActive) return null;",
      note: "Flattens nested ifs for readable code."
    }
  ],
  skillLevels: {
    "AI & PyTorch": 78,
    "Game Dev & Shaders": 65,
    "EV Tech & Embedded C": 82,
    "Python & Clean Code": 85,
    "Web Engineering": 60
  }
};
