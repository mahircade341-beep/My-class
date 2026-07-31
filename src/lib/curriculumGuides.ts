import type { DeviceId, Resource } from "./types";
import { getDeviceById } from "./curriculum";

// ============================================================
// Extended per-level device guides for levels 3-10.
//
// The base guides in curriculum.ts (DEVICES[].setupSteps /
// setupResources) cover levels 0-2. This module extends them
// so every level of the 11-level curriculum has device-specific
// setup steps and free tutorials. Index = levelIdx - 3.
// ============================================================

export interface GuideBlock {
  title: string;
  steps: string[];
}

const EXTENDED_SETUP_STEPS: Record<DeviceId, GuideBlock[]> = {
  mac: [
    {
      title: "Advanced JS — Node & the REPL",
      steps: [
        "Open Terminal (⌘ + Space, type 'Terminal') and run `node` to launch the Node REPL — perfect for testing promises and async code instantly.",
        "Install nvm with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`, then `nvm install node` to get the latest Node.",
        "Save your module practice as a file and run it with `node yourfile.js` from Terminal.",
      ],
    },
    {
      title: "DSA — Practice Setup",
      steps: [
        "Use the built-in sandbox for quick Big O experiments — no installs needed.",
        "For offline practice, create a `practice/` folder and run your solutions with `node solution.js`.",
        "Start a LeetCode streak — the site works great in Safari or Chrome on a Mac.",
      ],
    },
    {
      title: "Frontend — Browser DevTools",
      steps: [
        "Press ⌘ + Option + I to open DevTools — Elements, Console, and Network are your main tools.",
        "Install the VS Code 'Live Server' extension to preview HTML/CSS/JS instantly.",
        "Create React apps with `npx create-vite@latest my-app -- --template react`, then `cd my-app && npm run dev`.",
      ],
    },
    {
      title: "Backend — Server Stack",
      steps: [
        "With Node installed, run `npm init -y` and `npm install express` to scaffold a server project.",
        "Start your server with `node server.js` and test endpoints with `curl localhost:3000/hello`.",
        "For PostgreSQL locally, `brew install postgresql` — or use Supabase's free cloud database from the browser.",
      ],
    },
    {
      title: "Software Eng — Git & GitHub",
      steps: [
        "Install the GitHub CLI with `brew install gh`, then run `gh auth login` to connect your account.",
        "Create SSH keys with `ssh-keygen -t ed25519 -C \"you@example.com\"` and add the .pub file to GitHub.",
        "Practice a full PR flow: `git checkout -b feature`, commit, `gh pr create`.",
      ],
    },
    {
      title: "System Design — Diagram Tools",
      steps: [
        "Sketch architectures with Excalidraw (excalidraw.com) or draw.io — both work in the browser.",
        "Install Redis locally with `brew install redis && brew services start redis` to try caching for real.",
        "Read the System Design Primer on GitHub and sketch each pattern by hand.",
      ],
    },
    {
      title: "Capstone — Ship It",
      steps: [
        "Deploy your capstone free with Vercel (vercel.com) or GitHub Pages (pages.github.com).",
        "Create the repo with `gh repo create my-capstone --public --push` from Terminal.",
        "Write a README with a screenshot, live link, and 'how to run' — then share it!",
      ],
    },
    {
      title: "Specialization — Track Tools",
      steps: [
        "Web: master React + TypeScript with the official docs and deploy with Vercel.",
        "Mobile: follow the React Native or Flutter docs — both run great on a Mac.",
        "AI: install Python via `brew install python` and try the official getting-started guide; Cloud: Docker Desktop from docker.com.",
      ],
    },
  ],
  windows: [
    {
      title: "Advanced JS — Node & the REPL",
      steps: [
        "Open PowerShell (search 'PowerShell' in Start) and run `node` to launch the Node REPL for instant async experiments.",
        "Install Node LTS from nodejs.org (the .msi installer), then verify with `node --version`.",
        "Save your module practice as a file and run it with `node yourfile.js` from PowerShell.",
      ],
    },
    {
      title: "DSA — Practice Setup",
      steps: [
        "Use the built-in sandbox for quick Big O experiments — no installs needed.",
        "For offline practice, create a `practice/` folder and run your solutions with `node solution.js`.",
        "Start a LeetCode streak — the site works great in Edge or Chrome on Windows.",
      ],
    },
    {
      title: "Frontend — Browser DevTools",
      steps: [
        "Press F12 to open DevTools — Elements, Console, and Network are your main tools.",
        "Install the VS Code 'Live Server' extension to preview HTML/CSS/JS instantly.",
        "Create React apps with `npx create-vite@latest my-app -- --template react`, then `cd my-app && npm run dev`.",
      ],
    },
    {
      title: "Backend — Server Stack",
      steps: [
        "With Node installed, run `npm init -y` and `npm install express` to scaffold a server project.",
        "Start your server with `node server.js` and test endpoints with `curl localhost:3000/hello`.",
        "For a real DB, use Supabase's free cloud database from the browser, or install PostgreSQL inside WSL.",
      ],
    },
    {
      title: "Software Eng — Git & GitHub",
      steps: [
        "Install Git for Windows from git-scm.com and the GitHub CLI with `winget install GitHub.cli`.",
        "Run `gh auth login` to connect, and create SSH keys with `ssh-keygen -t ed25519 -C \"you@example.com\"`.",
        "Practice a full PR flow: `git checkout -b feature`, commit, `gh pr create`.",
      ],
    },
    {
      title: "System Design — Diagram Tools",
      steps: [
        "Sketch architectures with Excalidraw (excalidraw.com) or draw.io — both work in the browser.",
        "Install Redis inside WSL with `sudo apt install redis-server` and try caching for real.",
        "Read the System Design Primer on GitHub and sketch each pattern by hand.",
      ],
    },
    {
      title: "Capstone — Ship It",
      steps: [
        "Deploy your capstone free with Vercel (vercel.com) or GitHub Pages (pages.github.com).",
        "Create the repo with `gh repo create my-capstone --public --push` from PowerShell.",
        "Write a README with a screenshot, live link, and 'how to run' — then share it!",
      ],
    },
    {
      title: "Specialization — Track Tools",
      steps: [
        "Web: master React + TypeScript with the official docs and deploy with Vercel.",
        "Mobile: follow the React Native or Flutter docs — Android Studio on Windows works great.",
        "AI: install Python from python.org and try the official getting-started guide; Cloud: Docker Desktop from docker.com.",
      ],
    },
  ],
  android: [
    {
      title: "Advanced JS — Node in Termux",
      steps: [
        "In Termux run `pkg install nodejs`, then type `node` for the REPL — test promises right on your phone.",
        "Save practice files in Acode or the Termux editor and run them with `node yourfile.js`.",
        "Use split-screen: Acode on top, Termux below, to edit and run side by side.",
      ],
    },
    {
      title: "DSA — Practice Setup",
      steps: [
        "The built-in sandbox is your best friend — practice Big O and algorithms right here.",
        "In Termux, test snippets instantly: `node -e 'console.log(1+1)'`.",
        "Do a daily LeetCode problem in the mobile browser — consistency beats intensity.",
      ],
    },
    {
      title: "Frontend — Browser Tools",
      steps: [
        "You can't run local servers on a phone, so use browser-based tools: freeCodeCamp, CodePen, or MDN's live examples.",
        "Chrome for Android lets you view source and test JS via the address bar's 'View: Desktop site' trick.",
        "Write and preview HTML/CSS/JS snippets in the sandbox here on CodeSchool — it runs in your browser.",
      ],
    },
    {
      title: "Backend — Node in Termux",
      steps: [
        "`pkg install nodejs` in Termux, then `npm init -y && npm install express` to build a real server on your phone.",
        "Run it with `node server.js` and test with `curl localhost:3000/hello` inside Termux.",
        "Use Supabase's free cloud database from the mobile browser — no local Postgres needed.",
      ],
    },
    {
      title: "Software Eng — Git on Android",
      steps: [
        "In Termux run `pkg install git` and set your identity: `git config --global user.name \"You\"` and `user.email`.",
        "Use the GitHub mobile app to review PRs and view your repos anywhere.",
        "Practice the full flow in Termux: clone, branch, commit, `git push`.",
      ],
    },
    {
      title: "System Design — Diagram Tools",
      steps: [
        "Sketch architectures in Excalidraw (excalidraw.com) — it works in the mobile browser.",
        "Read the System Design Primer and the Google SRE book on your phone.",
        "You can't run Redis on Android easily — learn the concepts from the docs and MDN's HTTP caching guide.",
      ],
    },
    {
      title: "Capstone — Ship It",
      steps: [
        "Deploy free with Vercel or GitHub Pages — both dashboards work in the mobile browser.",
        "Create your repo with the GitHub mobile app, then push from Termux with `git push`.",
        "Write the README on your phone (GitHub's editor works), then share the live link!",
      ],
    },
    {
      title: "Specialization — Track Tools",
      steps: [
        "Web: master React + TypeScript with official docs and deploy with Vercel from your phone.",
        "Mobile: this is your home turf — install Expo Go and follow the React Native docs to test apps on THIS device.",
        "AI: install Python with `pkg install python` in Termux and try the official getting-started guide.",
      ],
    },
  ],
  linux: [
    {
      title: "Advanced JS — Node & the REPL",
      steps: [
        "Install Node with `sudo apt install nodejs npm` (Debian/Ubuntu) or your distro's package manager.",
        "Run `node` in your terminal for the REPL — test promises and async code instantly.",
        "Save your module practice as a file and run it with `node yourfile.js`.",
      ],
    },
    {
      title: "DSA — Practice Setup",
      steps: [
        "Use the built-in sandbox for quick Big O experiments — no installs needed.",
        "For offline practice, create a `practice/` folder and run your solutions with `node solution.js`.",
        "Start a LeetCode streak — the site works great in Firefox or Chrome on Linux.",
      ],
    },
    {
      title: "Frontend — Browser DevTools",
      steps: [
        "Press Ctrl + Shift + I to open DevTools — Elements, Console, and Network are your main tools.",
        "Install the VS Code 'Live Server' extension to preview HTML/CSS/JS instantly.",
        "Create React apps with `npx create-vite@latest my-app -- --template react`, then `cd my-app && npm run dev`.",
      ],
    },
    {
      title: "Backend — Server Stack",
      steps: [
        "With Node installed, run `npm init -y` and `npm install express` to scaffold a server project.",
        "Start your server with `node server.js` and test endpoints with `curl localhost:3000/hello`.",
        "Install PostgreSQL with `sudo apt install postgresql` — or use Supabase's free cloud database.",
      ],
    },
    {
      title: "Software Eng — Git & GitHub",
      steps: [
        "Install Git and the GitHub CLI: `sudo apt install git gh`.",
        "Run `gh auth login` to connect, and create SSH keys with `ssh-keygen -t ed25519 -C \"you@example.com\"`.",
        "Practice a full PR flow: `git checkout -b feature`, commit, `gh pr create`.",
      ],
    },
    {
      title: "System Design — Diagram Tools",
      steps: [
        "Sketch architectures with Excalidraw (excalidraw.com) or draw.io — both work in the browser.",
        "Install Redis with `sudo apt install redis-server` and try caching for real.",
        "Read the System Design Primer on GitHub and sketch each pattern by hand.",
      ],
    },
    {
      title: "Capstone — Ship It",
      steps: [
        "Deploy your capstone free with Vercel (vercel.com) or GitHub Pages (pages.github.com).",
        "Create the repo with `gh repo create my-capstone --public --push` from your terminal.",
        "Write a README with a screenshot, live link, and 'how to run' — then share it!",
      ],
    },
    {
      title: "Specialization — Track Tools",
      steps: [
        "Web: master React + TypeScript with the official docs and deploy with Vercel.",
        "Mobile: follow the React Native or Flutter docs — Linux handles Android tooling well.",
        "AI: install Python with `sudo apt install python3` and try the official getting-started guide; Cloud: `sudo apt install docker.io`.",
      ],
    },
  ],
};

const EXTENDED_SETUP_RESOURCES: Record<DeviceId, Resource[][]> = {
  mac: [
    [
      { title: "Node.js Learning (official)", url: "https://nodejs.org/en/learn", type: "docs" },
      { title: "javascript.info: Async/await", url: "https://javascript.info/async-await", type: "tutorial" },
    ],
    [
      { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
      { title: "GeeksforGeeks: Data Structures", url: "https://www.geeksforgeeks.org/data-structures/", type: "course" },
    ],
    [
      { title: "MDN: Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "docs" },
      { title: "React Docs", url: "https://react.dev/learn", type: "docs" },
    ],
    [
      { title: "Express Docs", url: "https://expressjs.com/", type: "docs" },
      { title: "Supabase Docs", url: "https://supabase.com/docs", type: "docs" },
    ],
    [
      { title: "Git Docs", url: "https://git-scm.com/doc", type: "docs" },
      { title: "GitHub CLI", url: "https://cli.github.com/", type: "tool" },
      { title: "GitHub Actions", url: "https://docs.github.com/en/actions", type: "docs" },
    ],
    [
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "repo" },
      { title: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/", type: "book" },
      { title: "Excalidraw", url: "https://excalidraw.com/", type: "tool" },
    ],
    [
      { title: "GitHub Pages — Free Hosting", url: "https://pages.github.com/", type: "guide" },
      { title: "Vercel", url: "https://vercel.com/", type: "tool" },
    ],
    [
      { title: "Roadmap.sh — Developer Roadmaps", url: "https://roadmap.sh/", type: "guide" },
      { title: "React Native Docs", url: "https://reactnative.dev/docs/getting-started", type: "docs" },
      { title: "Docker Docs", url: "https://docs.docker.com/get-started/", type: "docs" },
    ],
  ],
  windows: [
    [
      { title: "Node.js Learning (official)", url: "https://nodejs.org/en/learn", type: "docs" },
      { title: "javascript.info: Async/await", url: "https://javascript.info/async-await", type: "tutorial" },
    ],
    [
      { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
      { title: "GeeksforGeeks: Data Structures", url: "https://www.geeksforgeeks.org/data-structures/", type: "course" },
    ],
    [
      { title: "MDN: Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "docs" },
      { title: "React Docs", url: "https://react.dev/learn", type: "docs" },
    ],
    [
      { title: "Express Docs", url: "https://expressjs.com/", type: "docs" },
      { title: "Supabase Docs", url: "https://supabase.com/docs", type: "docs" },
    ],
    [
      { title: "Git for Windows", url: "https://git-scm.com/download/win", type: "download" },
      { title: "GitHub CLI", url: "https://cli.github.com/", type: "tool" },
      { title: "GitHub Actions", url: "https://docs.github.com/en/actions", type: "docs" },
    ],
    [
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "repo" },
      { title: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/", type: "book" },
      { title: "Excalidraw", url: "https://excalidraw.com/", type: "tool" },
    ],
    [
      { title: "GitHub Pages — Free Hosting", url: "https://pages.github.com/", type: "guide" },
      { title: "Vercel", url: "https://vercel.com/", type: "tool" },
    ],
    [
      { title: "Roadmap.sh — Developer Roadmaps", url: "https://roadmap.sh/", type: "guide" },
      { title: "React Native Docs", url: "https://reactnative.dev/docs/getting-started", type: "docs" },
      { title: "Docker Docs", url: "https://docs.docker.com/get-started/", type: "docs" },
    ],
  ],
  android: [
    [
      { title: "Node.js Learning (official)", url: "https://nodejs.org/en/learn", type: "docs" },
      { title: "javascript.info: Async/await", url: "https://javascript.info/async-await", type: "tutorial" },
    ],
    [
      { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
      { title: "GeeksforGeeks: Data Structures", url: "https://www.geeksforgeeks.org/data-structures/", type: "course" },
    ],
    [
      { title: "freeCodeCamp: Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course" },
      { title: "CodePen", url: "https://codepen.io/", type: "tool" },
    ],
    [
      { title: "Express Docs", url: "https://expressjs.com/", type: "docs" },
      { title: "Supabase Docs", url: "https://supabase.com/docs", type: "docs" },
    ],
    [
      { title: "Git Docs", url: "https://git-scm.com/doc", type: "docs" },
      { title: "GitHub Mobile App", url: "https://github.com/mobile", type: "tool" },
      { title: "Termux Wiki", url: "https://wiki.termux.com/wiki/Main_Page", type: "wiki" },
    ],
    [
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "repo" },
      { title: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/", type: "book" },
      { title: "Excalidraw", url: "https://excalidraw.com/", type: "tool" },
    ],
    [
      { title: "GitHub Pages — Free Hosting", url: "https://pages.github.com/", type: "guide" },
      { title: "Vercel", url: "https://vercel.com/", type: "tool" },
    ],
    [
      { title: "Roadmap.sh — Developer Roadmaps", url: "https://roadmap.sh/", type: "guide" },
      { title: "Expo Go — test apps on your phone", url: "https://expo.dev/go", type: "tool" },
      { title: "Termux Wiki: Python", url: "https://wiki.termux.com/wiki/Python", type: "wiki" },
    ],
  ],
  linux: [
    [
      { title: "Node.js Learning (official)", url: "https://nodejs.org/en/learn", type: "docs" },
      { title: "javascript.info: Async/await", url: "https://javascript.info/async-await", type: "tutorial" },
    ],
    [
      { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
      { title: "GeeksforGeeks: Data Structures", url: "https://www.geeksforgeeks.org/data-structures/", type: "course" },
    ],
    [
      { title: "MDN: Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "docs" },
      { title: "React Docs", url: "https://react.dev/learn", type: "docs" },
    ],
    [
      { title: "Express Docs", url: "https://expressjs.com/", type: "docs" },
      { title: "Supabase Docs", url: "https://supabase.com/docs", type: "docs" },
    ],
    [
      { title: "Git Docs", url: "https://git-scm.com/doc", type: "docs" },
      { title: "GitHub CLI", url: "https://cli.github.com/", type: "tool" },
      { title: "GitHub Actions", url: "https://docs.github.com/en/actions", type: "docs" },
    ],
    [
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "repo" },
      { title: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/", type: "book" },
      { title: "Excalidraw", url: "https://excalidraw.com/", type: "tool" },
    ],
    [
      { title: "GitHub Pages — Free Hosting", url: "https://pages.github.com/", type: "guide" },
      { title: "Vercel", url: "https://vercel.com/", type: "tool" },
    ],
    [
      { title: "Roadmap.sh — Developer Roadmaps", url: "https://roadmap.sh/", type: "guide" },
      { title: "React Native Docs", url: "https://reactnative.dev/docs/getting-started", type: "docs" },
      { title: "Docker Docs", url: "https://docs.docker.com/get-started/", type: "docs" },
    ],
  ],
};

/**
 * Device-specific setup steps for a given level.
 * Levels 0-2 come from the base guides; levels 3-10 from the extended guides.
 */
export function getDeviceSetup(
  deviceId: DeviceId | null | undefined,
  levelIdx: number
): GuideBlock | undefined {
  const guide = getDeviceById(deviceId);
  if (!guide) return undefined;
  if (levelIdx < guide.setupSteps.length) return guide.setupSteps[levelIdx];
  const extended = EXTENDED_SETUP_STEPS[guide.id];
  const idx = levelIdx - guide.setupSteps.length;
  if (extended && idx >= 0 && idx < extended.length) return extended[idx];
  return extended?.[extended.length - 1];
}

/**
 * Device-specific free tutorials for a given level.
 * Levels 0-2 come from the base guides; levels 3-10 from the extended guides.
 */
export function getDeviceResources(
  deviceId: DeviceId | null | undefined,
  levelIdx: number
): Resource[] {
  const guide = getDeviceById(deviceId);
  if (!guide) return [];
  if (levelIdx < guide.setupResources.length) {
    return guide.setupResources[levelIdx] ?? [];
  }
  const extended = EXTENDED_SETUP_RESOURCES[guide.id];
  const idx = levelIdx - guide.setupResources.length;
  if (extended && idx >= 0 && idx < extended.length) return extended[idx] ?? [];
  return extended?.[extended.length - 1] ?? [];
}

// ============================================================
// Extended lesson-level device tips for levels 3-10.
// Keyed by `${levelIdx}-${lessonIdx}` like the base tips.
// ============================================================
export const EXTENDED_LESSON_TIPS: Record<
  string,
  Partial<Record<DeviceId, string>>
> = {
  // Level 3 — Advanced JavaScript
  "3-0": {
    mac: "On a Mac, open Terminal and run `node` — try the arrow function examples in the REPL.",
    windows: "On Windows, open PowerShell and run `node` — try the arrow function examples in the REPL.",
    linux: "On Linux, run `node` in your terminal — try the arrow function examples in the REPL.",
    android: "In Termux, run `node` after `pkg install nodejs` — try the arrow function examples on your phone.",
  },
  "3-2": {
    mac: "Test async code with `node -e 'console.log(await Promise.resolve(\"hi\"))'` in Terminal.",
    android: "In Termux, test promises with `node -e` — async code runs great on a phone's Node.",
  },
  // Level 4 — Data Structures & Algorithms
  "4-0": {
    android: "Practice Big O in the built-in sandbox — it runs instantly on your phone.",
  },
  "4-1": {
    mac: "Test string methods fast: `node -e 'console.log(\"hello\".split(\"\").reverse())'`.",
    windows: "Test string methods fast in PowerShell: `node -e 'console.log(\"hello\".split(\"\").reverse())'`.",
    linux: "Test string methods fast: `node -e 'console.log(\"hello\".split(\"\").reverse())'`.",
  },
  // Level 5 — Frontend Engineering
  "5-0": {
    mac: "Open DevTools with ⌘ + Option + I to inspect your HTML and CSS live.",
    windows: "Open DevTools with F12 to inspect your HTML and CSS live.",
    linux: "Open DevTools with Ctrl + Shift + I to inspect your HTML and CSS live.",
  },
  "5-1": {
    android: "Use the sandbox to experiment with DOM-like logic — document isn't available on a phone, but the concepts transfer.",
  },
  // Level 6 — Backend Engineering
  "6-0": {
    mac: "Create a folder, add a hello.js, and run `node hello.js` — Node is waiting on your Mac.",
    windows: "Create a folder, add a hello.js, and run `node hello.js` in PowerShell.",
    linux: "Create a folder, add a hello.js, and run `node hello.js` in your terminal.",
    android: "In Termux run `pkg install nodejs` first, then `node hello.js` — real Node on your phone.",
  },
  "6-2": {
    android: "You can't run Postgres on Android easily — use Supabase's free cloud database from the browser.",
  },
  // Level 7 — Software Engineering
  "7-0": {
    mac: "Generate an SSH key with `ssh-keygen -t ed25519 -C \"you@example.com\"` and add it to GitHub.",
    windows: "Install Git for Windows, then `winget install GitHub.cli` for `gh auth login`.",
    linux: "Run `sudo apt install git gh`, then `gh auth login` to connect your account.",
    android: "In Termux run `pkg install git` and set `git config --global user.name \"You\"`.",
  },
  // Level 8 — System Design & Architecture
  "8-0": {
    mac: "Sketch your first system diagram in Excalidraw before writing any code.",
    android: "Sketch system diagrams with Excalidraw in your mobile browser — perfect on a phone.",
  },
  "8-1": {
    windows: "Run Redis inside WSL with `sudo apt install redis-server` to practice caching locally.",
    linux: "Run `sudo apt install redis-server` to practice caching locally.",
  },
  // Level 9 — Capstone: Build & Ship
  "9-0": {
    android: "Plan your capstone in the GitHub mobile app — create issues for each milestone.",
  },
  "9-1": {
    mac: "Create your capstone repo with `gh repo create my-capstone --public --push`.",
    windows: "Create your capstone repo with `gh repo create my-capstone --public --push`.",
    linux: "Create your capstone repo with `gh repo create my-capstone --public --push`.",
  },
  // Level 10 — Specialization
  "10-0": {
    android: "For the Mobile track, install Expo Go from the Play Store — you can test React Native apps on THIS device.",
    mac: "For the Mobile track, install Xcode or just follow React Native docs with Expo Go on your phone.",
    windows: "For the Mobile track, Android Studio works great on Windows — or test with Expo Go on your phone.",
    linux: "For the Mobile track, Linux handles Android tooling well — or test with Expo Go on your phone.",
  },
};
