import type { Level } from "./types";

// ============================================================
// Level 10 — Specialization (post-graduation career tracks)
// ============================================================
export const SPECIALIZATION_LEVELS: Level[] = [
  {
    title: "Specialization",
    subtitle: "Choose Your Path",
    description:
      "Graduate and go deep: pick a career track — Web, Mobile, AI, or Cloud & DevOps — and master the tools each field actually uses.",
    color: "#0ea5e9",
    resources: [
      { title: "Roadmap.sh — Developer Roadmaps", url: "https://roadmap.sh/", type: "guide" },
      { title: "React Native Docs", url: "https://reactnative.dev/docs/getting-started", type: "docs" },
      { title: "Flutter — Get Started", url: "https://flutter.dev/", type: "docs" },
      { title: "Docker Docs — Get Started", url: "https://docs.docker.com/get-started/", type: "docs" },
      { title: "Python.org — Getting Started", url: "https://www.python.org/about/gettingstarted/", type: "guide" },
    ],
    lessons: [
      {
        title: "Choosing Your Specialization",
        description: "Pick the track that fits your goals — and learn how each one maps to real jobs",
        content: `# Choosing Your Specialization

You've graduated the core program. Now choose where to go deep. Each track leads to real, in-demand roles:

## The Four Tracks

- **Web Engineering** — React, TypeScript, APIs, Next.js. The biggest job market.
- **Mobile Development** — React Native or Flutter. One codebase, iOS + Android.
- **AI & Data** — Python, LLM APIs, machine learning. The fastest-growing field.
- **Cloud & DevOps** — Docker, CI/CD, AWS/Azure. Every team needs one.

## How to Choose

1. **Follow curiosity** — pick the track you'd build a side project in for fun.
2. **Check demand** — look at job boards for your area; pick a track with openings.
3. **Try before committing** — spend 1-2 days on each track's starter tutorial.

## The Plan

Pick ONE track, complete its resources in this level, and build 3 small projects to prove it.

## Key Concepts

- **Specialize** — depth beats breadth for landing a first role
- **Tracks** — Web, Mobile, AI & Data, Cloud & DevOps
- **Prove it** — projects > certificates in interviews`,
        taskDescription:
          "Write a function 'recommendTrack(prefersDesign, likesData, likesServers)' that returns 'Web' if prefersDesign, 'AI' if likesData, 'Cloud' if likesServers, else 'Mobile'.",
        starterCode: `// Write recommendTrack(prefersDesign, likesData, likesServers)
// prefersDesign → "Web", likesData → "AI", likesServers → "Cloud", else "Mobile"

`,
        solutionCode: `function recommendTrack(prefersDesign, likesData, likesServers) {
  if (prefersDesign) return "Web";
  if (likesData) return "AI";
  if (likesServers) return "Cloud";
  return "Mobile";
}`,
        quizQuestions: [
          {
            question: "Which track has the largest job market?",
            options: [
              "Web Engineering",
              "Rust Compiler Development",
              "Fax Machine Repair",
              "Punch Card Programming",
            ],
            correctIndex: 0,
          },
          {
            question: "What's the fastest-growing specialization?",
            options: ["CSS Grid Layouts", "AI & Data", "Windows XP Support", "Assembly Writing"],
            correctIndex: 1,
          },
          {
            question: "What proves your specialization best in interviews?",
            options: ["Projects", "Buzzwords", "Number of tabs open", "Certificates only"],
            correctIndex: 0,
          },
        ],
      },
      {
        title: "Web Engineering Track",
        description: "Go deep on React, TypeScript, and modern web APIs",
        content: `# Web Engineering Track

The web is where most developers work. Master the modern stack:

## The Core Stack

- **TypeScript** — typed JavaScript; catches bugs before users do
- **React** — component-based UIs (you know the basics; now go deep)
- **Next.js** — React with routing, SSR, and APIs built in
- **Tailwind CSS** — utility-first styling (industry favorite)

## Deep Dive Topics

\`\`\`tsx
// Typed props — the React + TS bread and butter
type ButtonProps = { label: string; onClick: () => void; }

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

- **State management** — useReducer, Context, or Zustand
- **Data fetching** — SWR or TanStack Query; cache and revalidate
- **APIs** — build REST or tRPC backends with Next.js route handlers
- **Performance** — code splitting, lazy loading, memoization

## Build These

1. A portfolio site with a blog (Next.js + Tailwind)
2. A full-stack CRUD app with auth (Next.js + Supabase)
3. A real-time dashboard (WebSockets or polling)

## Key Concepts

- **TypeScript** — types first
- **Next.js** — the full-stack React framework
- **Ship 3 projects** — deploy each one to Vercel

Use roadmap.sh → Frontend for the complete path.`,
        taskDescription:
          "Write a TypeScript function 'formatUser(user)' that takes { name: string, age?: number } and returns the name, plus ' (age)' if age exists. Use default {}.",
        starterCode: `// Write formatUser(user: { name: string; age?: number })
// → name, plus " (age)" if age is provided

`,
        solutionCode: `function formatUser(user: { name: string; age?: number }) {
  return user.age !== undefined ? user.name + " (" + user.age + ")" : user.name;
}`,
        quizQuestions: [
          {
            question: "Which language adds types to JavaScript?",
            options: ["CoffeeScript", "TypeScript", "Python", "HTML"],
            correctIndex: 1,
          },
          {
            question: "What does Next.js add on top of React?",
            options: ["Nothing", "Routing, SSR, and API routes", "Only styling", "A database"],
            correctIndex: 1,
          },
          {
            question: "Where should you deploy a web specialization project?",
            options: ["Vercel or Netlify", "A USB drive", "A text file", "Nowhere"],
            correctIndex: 0,
          },
        ],
      },
      {
        title: "Mobile & AI Track",
        description: "Ship mobile apps and add AI with LLM APIs",
        content: `# Mobile & AI Track

Two of the most exciting specializations — and they pair perfectly.

## Mobile: React Native / Flutter

One codebase, two platforms:

\`\`\`jsx
// React Native — write once, run on iOS + Android
import { Text, View } from "react-native";

function App() {
  return <View><Text>Hello, phone!</Text></View>;
}
\`\`\`

- **Expo** — the easiest way to start RN apps and test on your own phone
- **Flutter** — Dart-based; gorgeous UI out of the box
- Test on real devices with Expo Go or an emulator

## AI: LLM APIs

Adding AI to any app is now an API call:

\`\`\`js
// Every major LLM follows this pattern
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  },
  body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Hello!" }] }),
});
\`\`\`

- **Prompts** — the new programming language
- **RAG** — retrieve your docs, then answer with the LLM
- **Python** — the AI ecosystem's home (pandas, scikit-learn)

## Build These

1. A mobile habit tracker (React Native + Expo)
2. An AI chat app that answers from your notes (RAG)
3. A Python script that processes a CSV with pandas

## Key Concepts

- **Expo** — zero-setup mobile dev
- **LLM APIs** — AI features are HTTP calls
- **Python** — the AI language`,
        taskDescription:
          "Write a function 'buildPrompt(userQuestion, context)' that returns a string: 'Answer using this context: ' + context + '\\nQuestion: ' + userQuestion.",
        starterCode: `// Write buildPrompt(userQuestion, context)
// → "Answer using this context: " + context + "\\nQuestion: " + userQuestion

`,
        solutionCode: `function buildPrompt(userQuestion, context) {
  return "Answer using this context: " + context + "\\nQuestion: " + userQuestion;
}`,
        quizQuestions: [
          {
            question: "What's the easiest way to start a React Native app?",
            options: ["Expo", "A USB cable", "Xcode only", "Android Studio only"],
            correctIndex: 0,
          },
          {
            question: "Adding AI to an app today is mostly…",
            options: ["An API call to an LLM", "Training your own model", "Buying GPUs", "Writing assembly"],
            correctIndex: 0,
          },
          {
            question: "Which language dominates the AI ecosystem?",
            options: ["Python", "COBOL", "CSS", "SQL only"],
            correctIndex: 0,
          },
        ],
      },
      {
        title: "Cloud & DevOps Track",
        description: "Docker, CI/CD, and the infrastructure every team runs on",
        content: `# Cloud & DevOps Track

Someone has to run the servers. That someone is you.

## Docker

Package your app so it runs anywhere:

\`\`\`dockerfile
FROM node:20
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]
\`\`\`

Build and run: \`docker build -t myapp . && docker run -p 3000:3000 myapp\`

## CI/CD

Automate tests and deploys with pipelines:

- **CI** — run tests on every push (GitHub Actions)
- **CD** — auto-deploy when tests pass
- **Infrastructure as Code** — define servers in files (Terraform)

## The Cloud

- **AWS / Azure / GCP** — free tiers let you learn for $0
- **Serverless** — functions that scale to zero (Supabase Edge Functions!)
- **Observability** — logs, metrics, and alerts

## Build These

1. Dockerize one of your CodeSchool projects
2. Add a GitHub Action that runs its tests
3. Deploy a serverless function (try Supabase functions)

## Key Concepts

- **Docker** — package once, run anywhere
- **CI/CD** — test and ship automatically
- **Serverless** — scale to zero and save money`,
        taskDescription:
          "Write a function 'dockerTag(name, version)' that returns name + ':' + version (e.g. dockerTag('myapp', '1.0') → 'myapp:1.0').",
        starterCode: `// Write dockerTag(name, version)
// → name + ":" + version

`,
        solutionCode: `function dockerTag(name, version) {
  return name + ":" + version;
}`,
        quizQuestions: [
          {
            question: "What does Docker solve?",
            options: [
              "Making coffee",
              "'It works on my machine' — packaging apps consistently",
              "Styling websites",
              "Writing SQL",
            ],
            correctIndex: 1,
          },
          {
            question: "What does CI do?",
            options: ["Runs tests automatically on every push", "Deletes old code", "Sends emails", "Designs logos"],
            correctIndex: 0,
          },
          {
            question: "How can you learn cloud for free?",
            options: ["Free tiers from AWS/Azure/GCP", "Buying a server rack", "There's no way", "Only paid courses"],
            correctIndex: 0,
          },
        ],
      },
    ],
    exam: {
      title: "Specialization Exam",
      description: "Prove you've chosen a track and know how to go deep in it.",
      questions: [
        {
          type: "multiple-choice",
          question: "Which is the best way to choose a specialization?",
          options: [
            "Follow curiosity + check job demand",
            "Pick the hardest-sounding name",
            "Let a friend choose",
            "Skip it entirely",
          ],
          correctIndex: 0,
        },
        {
          type: "multiple-choice",
          question: "What does TypeScript add to JavaScript?",
          options: ["Types that catch bugs early", "Slower websites", "New colors", "Nothing"],
          correctIndex: 0,
        },
        {
          type: "multiple-choice",
          question: "React Native lets you…",
          options: ["Build iOS + Android from one codebase", "Only build iOS apps", "Only build Android apps", "Build desktop apps only"],
          correctIndex: 0,
        },
        {
          type: "multiple-choice",
          question: "What is Docker?",
          options: ["A packaging tool so apps run anywhere", "A programming language", "A database", "A CSS framework"],
          correctIndex: 0,
        },
        {
          type: "coding" as const,
          question:
            "Write a function 'trackRecommendation(web, mobile, ai, cloud)' that returns the name of the track with the highest true value (default to 'Web').",
          testCases: [{ input: "trackRecommendation(false, true, false, false)", expected: "Mobile" }],
        },
      ],
    },
  },
];
