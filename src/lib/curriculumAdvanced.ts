import type { Level } from "./types";
import { CURRICULUM as BASE_CURRICULUM } from "./curriculum";
import { getDeviceSetup, getDeviceResources } from "./curriculumGuides";

// Re-export the shared device helpers so pages can import everything
// from this module (the full curriculum) in one place.
export { DEVICES, detectDevice, getLessonDeviceTip, getDeviceById } from "./curriculum";
export type { DeviceGuide } from "./curriculum";
export { getDeviceSetup, getDeviceResources };

export const ADVANCED_LEVELS: Level[] = [
  {
    title: "Frontend Engineering",
    subtitle: "Build for the Web",
    description: "Create real interfaces: HTML structure, CSS styling, the DOM, and React — turn code into websites people actually use.",
    color: "#06b6d4",
    resources: [
      { title: "MDN: HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "docs" },
      { title: "MDN: CSS Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics", type: "article" },
      { title: "freeCodeCamp: Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course" },
      { title: "React Docs", url: "https://react.dev/learn", type: "docs" },
    ],
    lessons: [
      {
        title: "HTML & CSS Fundamentals",
        description: "Structure pages with HTML and style them with CSS",
        content: `# HTML & CSS Fundamentals\n\nEvery website is **HTML** (structure) + **CSS** (style) + **JavaScript** (behavior).\n\n## HTML — Structure\n\n\`\`\`html\n<h1>My Portfolio</h1>\n<p>Welcome to my site.</p>\n<a href=\"https://example.com\">Visit me</a>\n<img src=\"photo.jpg\" alt=\"My photo\" />\n\`\`\`\n\n- **Tags** — \`<h1>\`, \`<p>\`, \`<a>\`, \`<img>\`\n- **Attributes** — \`href\`, \`src\`, \`alt\`, \`class\`\n- **Nesting** — elements contain elements\n\n## CSS — Style\n\n\`\`\`css\nh1 {\n  color: #6366f1;\n  font-size: 2rem;\n}\n\n.card {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n}\n\`\`\`\n\n- **Selectors** — tag (\`h1\`), class (\`.card\`), id (\`#header\`)\n- **Properties** — color, font-size, padding, border\n- **Cascade** — later rules override earlier ones\n\n## The Box Model\n\nEvery element is a box: **content** → **padding** → **border** → **margin**.\n\n## Key Concepts\n\n- **HTML** — semantic structure with tags\n- **CSS** — styling with selectors and properties\n- **Box model** — content, padding, border, margin`,
        taskDescription: "Write an HTML snippet with an h1 titled 'Hello, World!', a paragraph, and a button. Then a CSS rule that makes the h1 color #6366f1.",
        starterCode: `<!-- Write HTML: h1 "Hello, World!", a <p>, and a <button> -->\n<!-- Then CSS to make the h1 color #6366f1 -->\n\n`,
        solutionCode: `<h1>Hello, World!</h1>\n<p>This is my first page.</p>\n<button>Click me</button>\n\n<style>\n  h1 { color: #6366f1; }\n</style>`,
        quizQuestions: [
          {
            question: "Which tag creates a link?",
            options: ["<img>", "<a>", "<link>", "<href>"],
            correctIndex: 1
          },
          {
            question: "What does CSS stand for?",
            options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Color Style Sheets"],
            correctIndex: 1
          },
          {
            question: "In the box model, what's outside the border?",
            options: ["Content", "Padding", "Margin", "Outline"],
            correctIndex: 2
          },
        ],
      },
      {
        title: "The DOM & Events",
        description: "Manipulate the page dynamically with the Document Object Model",
        content: `# The DOM & Events\n\nThe **DOM** (Document Object Model) is the browser's live tree of your HTML — JavaScript can read and change it.\n\n## Selecting Elements\n\n\`\`\`javascript\ndocument.getElementById(\"title\");\ndocument.querySelector(\".card\");\ndocument.querySelectorAll(\"li\"); // NodeList\n\`\`\`\n\n## Changing the Page\n\n\`\`\`javascript\nconst title = document.getElementById(\"title\");\ntitle.textContent = \"New Title\";\ntitle.style.color = \"#6366f1\";\ntitle.classList.add(\"highlight\");\n\nconst newP = document.createElement(\"p\");\nnewP.textContent = \"Added dynamically!\";\ndocument.body.appendChild(newP);\n\`\`\`\n\n## Events\n\n\`\`\`javascript\nconst btn = document.querySelector(\"button\");\nbtn.addEventListener(\"click\", () => {\n  document.querySelector(\"#output\").textContent = \"Clicked!\";\n});\n\`\`\`\n\nCommon events: \`click\`, \`input\`, \`submit\`, \`keydown\`, \`load\`.\n\n## Key Concepts\n\n- **DOM** — live tree of the page\n- **querySelector** — pick elements by CSS selector\n- **addEventListener** — react to user actions`,
        taskDescription: "Write JavaScript that selects the element with id 'output', creates a button with text 'Click me', and logs 'Hello DOM!' to the console when clicked.",
        starterCode: `// Select #output, create a <button> "Click me"\n// On click, console.log("Hello DOM!")\n\n`,
        solutionCode: `const output = document.getElementById("output");\nconst btn = document.createElement("button");\nbtn.textContent = "Click me";\nbtn.addEventListener("click", () => console.log("Hello DOM!"));\ndocument.body.appendChild(btn);`,
        quizQuestions: [
          {
            question: "Which method selects by id?",
            options: ["querySelectorAll", "getElementById", "getElementsByClass", "document.id"],
            correctIndex: 1
          },
          {
            question: "What does addEventListener do?",
            options: ["Creates HTML", "Runs code when an event fires", "Styles an element", "Fetches data"],
            correctIndex: 1
          },
          {
            question: "Which event fires when a user clicks?",
            options: ["input", "load", "click", "hover"],
            correctIndex: 2
          },
        ],
      },
      {
        title: "Fetching Data & Web APIs",
        description: "Talk to servers and render dynamic data",
        content: `# Fetching Data & Web APIs\n\nModern apps are data-driven. The browser talks to servers over HTTP using **fetch** and **APIs**.\n\n## GET — Read data\n\n\`\`\`javascript\nasync function loadUsers() {\n  const res = await fetch(\"https://api.example.com/users\");\n  const users = await res.json();\n  console.log(users);\n}\n\`\`\`\n\n## POST — Send data\n\n\`\`\`javascript\nasync function createUser(name) {\n  const res = await fetch(\"/api/users\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ name }),\n  });\n  return await res.json();\n}\n\`\`\`\n\n## Rendering Data\n\n\`\`\`javascript\nconst list = document.querySelector(\"#user-list\");\nusers.forEach((user) => {\n  const li = document.createElement(\"li\");\n  li.textContent = user.name;\n  list.appendChild(li);\n});\n\`\`\`\n\n## HTTP Methods\n\n- **GET** — read\n- **POST** — create\n- **PUT/PATCH** — update\n- **DELETE** — remove\n\n## Key Concepts\n\n- **API** — server endpoints your app talks to\n- **fetch** — built-in HTTP client (returns a promise)\n- **JSON** — the data format APIs use`,
        taskDescription: "Write an async function 'fetchUsers' that simulates fetching a list: use a promise resolving to [{ name: 'Ada' }, { name: 'Grace' }] and log each user's name.",
        starterCode: `// Write async fetchUsers()\n// Simulate a fetch resolving to [{name:\"Ada\"},{name:\"Grace\"}]\n// Log each user's name\n\n`,
        solutionCode: `async function fetchUsers() {\n  const users = await Promise.resolve([\n    { name: \"Ada\" },\n    { name: \"Grace\" },\n  ]);\n  users.forEach((u) => console.log(u.name));\n}`,
        quizQuestions: [
          {
            question: "Which method reads data from an API?",
            options: ["POST", "GET", "DELETE", "PUT"],
            correctIndex: 1
          },
          {
            question: "What does res.json() do?",
            options: ["Converts the response body to a JS object", "Converts to HTML", "Logs the response", "Sends a request"],
            correctIndex: 0
          },
          {
            question: "What format do APIs typically use?",
            options: ["CSV", "JSON", "SQL", "HTML"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Intro to React",
        description: "Build component-based UIs — the industry standard",
        content: `# Intro to React\n\nReact builds UIs from **components** — reusable functions that return what the user sees. It powers most modern web apps.\n\n## A Component\n\n\`\`\`jsx\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n// Usage: <Greeting name=\"Ada\" />\n\`\`\`\n\n- Props are inputs (like function arguments)\n- The UI **re-renders** when state or props change\n\n## State — Data That Changes\n\n\`\`\`jsx\nimport { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n\`\`\`\n\n## Why Components?\n\n- **Reusable** — write once, use anywhere\n- **Composable** — big UIs built from small pieces\n- **Declarative** — describe the UI, React updates the DOM\n\n## Key Concepts\n\n- **Component** — a function returning JSX\n- **Props** — inputs passed to components\n- **State** — data that triggers re-renders\n- **JSX** — HTML-like syntax in JavaScript`,
        taskDescription: "Write a React component 'Welcome' that takes a prop called 'name' and renders an h1 that says 'Welcome, NAME!'.",
        starterCode: `// Write a React component Welcome({ name })\n// Render <h1>Welcome, {name}!</h1>\n\n`,
        solutionCode: `function Welcome({ name }) {\n  return <h1>Welcome, {name}!</h1>;\n}`,
        quizQuestions: [
          {
            question: "What are props in React?",
            options: ["Global variables", "Inputs passed to a component", "CSS classes", "API calls"],
            correctIndex: 1
          },
          {
            question: "What does useState return?",
            options: ["A single value", "An array [value, setter]", "An object", "A promise"],
            correctIndex: 1
          },
          {
            question: "What is JSX?",
            options: ["A database query", "HTML-like syntax inside JavaScript", "A CSS preprocessor", "A testing tool"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "Frontend Engineering Exam",
      description: "Build and manipulate the web: structure, DOM, APIs, and components.",
      questions: [
        {
          type: "multiple-choice",
          question: "Which HTML tag is for a top-level heading?",
          options: ["<head>", "<h1>", "<heading>", "<title>"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "How do you select an element with id=\"app\"?",
          options: ["document.getElementsByClass('app')", "document.getElementById('app')", "document.id('app')", "document.query('#app')"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "What HTTP method creates data?",
          options: ["GET", "POST", "DELETE", "PUT"],
          correctIndex: 1
        },
        {
          type: "coding" as const,
          question: "Write a function 'renderItem' that takes a string and returns an object { tag: 'li', text: string }.",
          testCases: [
            { input: "renderItem('Hello')", expected: "li: Hello" }
          ]
        },
        {
          type: "multiple-choice",
          question: "In React, what triggers a component to re-render?",
          options: ["Changing props or state", "Refreshing the page", "Writing comments", "Adding CSS"],
          correctIndex: 0
        },
      ]
    }
  },
  {
    title: "Backend Engineering",
    subtitle: "Servers, APIs & Databases",
    description: "Go server-side: Node.js, REST APIs with Express, databases with SQL, and the security fundamentals every backend needs.",
    color: "#10b981",
    resources: [
      { title: "Node.js Learn", url: "https://nodejs.org/en/learn", type: "docs" },
      { title: "Express Docs", url: "https://expressjs.com/", type: "docs" },
      { title: "freeCodeCamp: SQL Courses", url: "https://www.freecodecamp.org/news/learn-sql-free-relational-databases-courses-for-beginners/", type: "course" },
      { title: "MDN: HTTP Overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", type: "article" },
    ],
    lessons: [
      {
        title: "Node.js & npm",
        description: "Run JavaScript outside the browser with Node and share code with npm",
        content: `# Node.js & npm\n\n**Node.js** runs JavaScript outside the browser — on servers, CLIs, and tools. **npm** is its package manager with over a million free packages.\n\n## Your First Node Script\n\n\`\`\`javascript\n// hello.js\nconst greeting = \"Hello from Node!\";\nconsole.log(greeting);\n\`\`\`\n\nRun it: \`node hello.js\`\n\n## The Built-in Modules\n\n\`\`\`javascript\nconst fs = require(\"fs\");        // file system\nconst path = require(\"path\");    // paths\n\nfs.writeFileSync(\"notes.txt\", \"Learn Node!\");\nconsole.log(fs.readFileSync(\"notes.txt\", \"utf8\"));\n\`\`\`\n\n## npm — The Package Manager\n\n\`\`\`bash\nnpm init -y            # create package.json\nnpm install express    # add a package\nnpm install -D vitest  # dev dependency (testing)\n\`\`\`\n\n- **package.json** — your project's manifest (deps + scripts)\n- **node_modules** — installed packages\n- \`npm run <script>\` — run your scripts\n\n## Key Concepts\n\n- **Node.js** — server-side JavaScript runtime\n- **npm** — package manager and registry\n- **Modules** — \`require\`/\`import\` built-ins\n- **package.json** — manifest of dependencies`,
        taskDescription: "Write a Node script that creates a file called 'hello.txt' with the content 'Hello, Node!' using the fs module, then logs its contents.",
        starterCode: `// Use the fs module\n// Write "Hello, Node!" to hello.txt, then read it back and log it\n\n`,
        solutionCode: `const fs = require("fs");\nfs.writeFileSync("hello.txt", "Hello, Node!");\nconsole.log(fs.readFileSync("hello.txt", "utf8"));`,
        quizQuestions: [
          {
            question: "What is Node.js?",
            options: ["A CSS framework", "A runtime for JS outside the browser", "A database", "A React component"],
            correctIndex: 1
          },
          {
            question: "What does npm do?",
            options: ["Styles pages", "Manages JS packages and dependencies", "Runs the browser", "Compiles TypeScript"],
            correctIndex: 1
          },
          {
            question: "Where are installed packages stored?",
            options: ["src/", "node_modules/", "lib/", "packages/"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Building REST APIs with Express",
        description: "Create your own API endpoints with the most popular Node framework",
        content: `# Building REST APIs with Express\n\n**Express** is the most popular Node framework. In a few lines you have a working API.\n\n## Hello API\n\n\`\`\`javascript\nconst express = require(\"express\");\nconst app = express();\n\napp.use(express.json()); // parse JSON bodies\n\napp.get(\"/\", (req, res) => {\n  res.json({ message: \"Hello, API!\" });\n});\n\napp.listen(3000, () => console.log(\"Listening on :3000\"));\n\`\`\`\n\n## Routes — The CRUD Pattern\n\n\`\`\`javascript\nlet tasks = [{ id: 1, title: \"Learn Express\" }];\n\napp.get(\"/tasks\", (req, res) => res.json(tasks));        // read\napp.post(\"/tasks\", (req, res) => {                       // create\n  const task = { id: tasks.length + 1, ...req.body };\n  tasks.push(task);\n  res.status(201).json(task);\n});\napp.put(\"/tasks/:id\", (req, res) => {                    // update\n  const task = tasks.find((t) => t.id === Number(req.params.id));\n  Object.assign(task, req.body);\n  res.json(task);\n});\napp.delete(\"/tasks/:id\", (req, res) => {                 // delete\n  tasks = tasks.filter((t) => t.id !== Number(req.params.id));\n  res.status(204).end();\n});\n\`\`\`\n\n## REST Recap\n\n- **GET /tasks** — list\n- **POST /tasks** — create\n- **PUT /tasks/:id** — update\n- **DELETE /tasks/:id** — delete\n\n## Key Concepts\n\n- **Express** — minimal web framework for Node\n- **Route** — \`METHOD + path\` → handler\n- **req/res** — request and response objects\n- REST maps HTTP verbs to CRUD operations`,
        taskDescription: "Write an Express route: app.get('/hello') that responds with JSON { message: 'Hello from Express!' }.",
        starterCode: `// Require express, create the app\n// Add GET /hello → res.json({ message: "Hello from Express!" })\n\n`,
        solutionCode: `const express = require(\"express\");\nconst app = express();\napp.get(\"/hello\", (req, res) => {\n  res.json({ message: \"Hello from Express!\" });\n});\nmodule.exports = app;`,
        quizQuestions: [
          {
            question: "Which method creates a new resource in REST?",
            options: ["GET", "POST", "DELETE", "PATCH"],
            correctIndex: 1
          },
          {
            question: "What does res.json() do?",
            options: ["Sends a JSON response", "Parses a request", "Redirects the client", "Ends the connection"],
            correctIndex: 0
          },
          {
            question: "What is Express?",
            options: ["A database", "A Node web framework", "A CSS library", "A build tool"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Databases & SQL",
        description: "Store data forever and query it with SQL",
        content: `# Databases & SQL\n\nApps need durable storage. **SQL databases** (PostgreSQL, MySQL, SQLite) store data in tables you query with **SQL**.\n\n## Tables & Rows\n\n\`\`\`sql\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE\n);\n\`\`\`\n\n## CRUD in SQL\n\n\`\`\`sql\n-- Create\nINSERT INTO users (name, email) VALUES ('Ada', 'ada@example.com');\n\n-- Read\nSELECT * FROM users;\nSELECT name, email FROM users WHERE id = 1;\n\n-- Update\nUPDATE users SET name = 'Ada Lovelace' WHERE id = 1;\n\n-- Delete\nDELETE FROM users WHERE id = 1;\n\`\`\`\n\n## Relationships\n\nSplit data into tables and link with keys:\n\n\`\`\`sql\nCREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),\n  title TEXT NOT NULL\n);\n\nSELECT posts.title, users.name\nFROM posts\nJOIN users ON posts.user_id = users.id;\n\`\`\`\n\n- **Primary key** — unique id for each row\n- **Foreign key** — points to another table's row\n- **JOIN** — combine tables\n\n## Key Concepts\n\n- **Table** — rows and columns\n- **SQL** — the query language\n- **SELECT / INSERT / UPDATE / DELETE** — CRUD\n- **JOIN** — relate tables`,
        taskDescription: "Write a SQL query that selects the 'name' and 'email' columns from the 'students' table where the name is 'Ada'.",
        starterCode: `-- Write a SELECT for name and email from students where name = 'Ada'\n\n`,
        solutionCode: `SELECT name, email FROM students WHERE name = 'Ada';`,
        quizQuestions: [
          {
            question: "Which SQL statement reads data?",
            options: ["INSERT", "SELECT", "DELETE", "UPDATE"],
            correctIndex: 1
          },
          {
            question: "What links two tables together?",
            options: ["JOIN", "PRINT", "MERGE INTO one", "CONCAT"],
            correctIndex: 0
          },
          {
            question: "What is a primary key?",
            options: ["Any text column", "A unique identifier for each row", "A password", "An index file"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Auth & Security Basics",
        description: "Protect your users: hashing, tokens, and the fundamentals",
        content: `# Auth & Security Basics\n\nSecurity isn't optional. The basics every backend engineer must know:\n\n## Never Store Plain Passwords\n\nHash them — never reversible, always verified the same way:\n\n\`\`\`javascript\nconst bcrypt = require(\"bcrypt\");\nconst hash = await bcrypt.hash(password, 10);      // store this\nconst ok = await bcrypt.compare(password, hash);   // verify\n\`\`\`\n\n## Tokens Instead of Passwords\n\nAfter login, issue a signed token (like a JWT) the client sends on each request:\n\n\`\`\`javascript\n// Simplified idea\nconst token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: \"1h\" });\n\`\`\`\n\n## Threats to Know\n\n- **Injection** — never trust user input in SQL or eval (use parameterized queries)\n- **XSS** — escape output so scripts can't run\n- **Broken auth** — enforce strong auth everywhere\n- **Exposed secrets** — never ship API keys in the client\n\n## Key Concepts\n\n- **Hashing** — store hashes, not plaintext passwords\n- **Tokens** — stateless session replacement\n- **Parameterized queries** — prevent SQL injection\n- Never trust user input!`,
        taskDescription: "Write a function 'hashPassword' that simulates hashing: takes a password string and returns 'hash-' + password (in reality you'd use bcrypt).",
        starterCode: `// Write hashPassword(pw) → returns "hash-" + pw\n// (Real apps use bcrypt — this simulates the idea)\n\n`,
        solutionCode: `function hashPassword(password) {\n  return "hash-" + password;\n}`,
        quizQuestions: [
          {
            question: "How should passwords be stored?",
            options: ["Plain text", "Hashed with a strong algorithm", "Base64 encoded", "Encrypted with the same key everywhere"],
            correctIndex: 1
          },
          {
            question: "What prevents SQL injection?",
            options: ["Uppercase SQL", "Parameterized queries / prepared statements", "More indexes", "DELETE only"],
            correctIndex: 1
          },
          {
            question: "Where should API keys NEVER go?",
            options: ["The server", "The client / browser code", "Environment variables", "A secrets manager"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "Backend Engineering Exam",
      description: "Servers, APIs, databases, and security — prove your backend chops.",
      questions: [
        {
          type: "multiple-choice",
          question: "What runs JavaScript on the server?",
          options: ["React", "Node.js", "npm only", "Browsers only"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "Which HTTP verb maps to 'update' in REST?",
          options: ["GET", "POST", "PUT", "DELETE"],
          correctIndex: 2
        },
        {
          type: "multiple-choice",
          question: "Which SQL keyword combines tables?",
          options: ["MERGE", "JOIN", "LINK", "CONCAT"],
          correctIndex: 1
        },
        {
          type: "coding" as const,
          question: "Write a function 'respond' that takes a status and message and returns { status, message }.",
          testCases: [
            { input: "respond(200, 'ok')", expected: "200 ok" }
          ]
        },
        {
          type: "multiple-choice",
          question: "How do you prevent SQL injection?",
          options: ["Validate inputs AND use parameterized queries", "Using eval()", "Storing passwords in plain text", "Turning the server off"],
          correctIndex: 0
        },
      ]
    }
  },
  {
    title: "Software Engineering",
    subtitle: "Professional Practices",
    description: "Work like a professional engineer: version control with Git, automated testing, debugging, code review, and shipping with CI/CD.",
    color: "#ec4899",
    resources: [
      { title: "Git Docs", url: "https://git-scm.com/doc", type: "docs" },
      { title: "Pro Git Book", url: "https://git-scm.com/book/en/v2", type: "book" },
      { title: "Jest Docs", url: "https://jestjs.io/docs/getting-started", type: "docs" },
      { title: "GitHub Actions", url: "https://docs.github.com/en/actions", type: "docs" },
    ],
    lessons: [
      {
        title: "Git & Version Control",
        description: "Track every change, collaborate, and never lose work",
        content: `# Git & Version Control\n\n**Git** records snapshots (commits) of your code over time. It's the industry standard — every company uses it.\n\n## The Three States\n\n1. **Working directory** — your edits\n2. **Staging area** — files you've marked\n3. **Repository** — committed history\n\n\`\`\`bash\ngit init                    # start a repo\ngit add .                   # stage all changes\ngit commit -m \"Add feature\" # save a snapshot\ngit status                  # what changed?\ngit log --oneline           # history\n\`\`\`\n\n## Branching — Parallel Worlds\n\n\`\`\`bash\ngit checkout -b new-feature # create + switch\ngit checkout main           # switch back\ngit merge new-feature       # combine branches\n\`\`\`\n\nBranches let teams work without stepping on each other.\n\n## Remote Collaboration\n\n\`\`\`bash\ngit clone <url>      # copy a repo\ngit pull             # get latest\ngit push             # send commits\ngit remote -v        # show remotes\n\`\`\`\n\n## Key Concepts\n\n- **Commit** — a snapshot of your code\n- **Stage** — prepare files for a commit\n- **Branch** — independent line of work\n- **push/pull** — sync with a remote`,
        taskDescription: "Write the git commands in order that: stage all files, commit with message 'Add login feature', and push to the remote.",
        starterCode: `// Write 3 commands:\n// 1) stage all files\n// 2) commit with message "Add login feature"\n// 3) push to the remote\n\n`,
        solutionCode: `git add .\ngit commit -m "Add login feature"\ngit push`,
        quizQuestions: [
          {
            question: "What command saves a snapshot of staged changes?",
            options: ["git push", "git commit -m", "git status", "git init"],
            correctIndex: 1
          },
          {
            question: "What does git push do?",
            options: ["Downloads changes", "Uploads your commits to the remote", "Deletes the repo", "Shows history"],
            correctIndex: 1
          },
          {
            question: "Why use branches?",
            options: ["To delete code", "To work independently and merge later", "To speed up Git", "To hide code"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Testing & TDD",
        description: "Catch bugs automatically with unit tests",
        content: `# Testing & Test-Driven Development\n\nTests verify your code automatically. **TDD** — write the test first, then the code — keeps code honest.\n\n## A Unit Test (Jest-style)\n\n\`\`\`javascript\n// sum.js\nfunction sum(a, b) { return a + b; }\nmodule.exports = sum;\n\n// sum.test.js\nconst sum = require(\"./sum\");\n\ntest(\"adds 1 + 2 to equal 3\", () => {\n  expect(sum(1, 2)).toBe(3);\n});\n\`\`\`\n\nRun with: \`npx jest\`\n\n## Arrange-Act-Assert\n\n1. **Arrange** — set up inputs\n2. **Act** — call the function\n3. **Assert** — check the result\n\n\`\`\`javascript\ntest(\"greets a user\", () => {\n  const name = \"Ada\";                    // Arrange\n  const result = greet(name);            // Act\n  expect(result).toBe(\"Hello, Ada!\");    // Assert\n});\n\`\`\`\n\n## What to Test\n\n- Edge cases (empty, negative, zero)\n- Error paths\n- The behavior you *promised* — not implementation details\n\n## Key Concepts\n\n- **Unit test** — tests one function in isolation\n- **expect().toBe()** — assertion\n- **TDD** — test first, then implement\n- Tests = safety net for refactoring`,
        taskDescription: "Write a test (Jest style) for a function 'isEven' that expects isEven(4) toBe true and isEven(3) toBe false.",
        starterCode: `// Write two test() blocks for isEven\n// isEven(4) → true, isEven(3) → false\n\n`,
        solutionCode: `test("returns true for even numbers", () => {\n  expect(isEven(4)).toBe(true);\n});\ntest("returns false for odd numbers", () => {\n  expect(isEven(3)).toBe(false);\n});`,
        quizQuestions: [
          {
            question: "What does a unit test do?",
            options: ["Runs the whole app", "Tests one function in isolation", "Deploys the code", "Styles the UI"],
            correctIndex: 1
          },
          {
            question: "In Arrange-Act-Assert, what comes first?",
            options: ["Assert", "Act", "Arrange", "Refactor"],
            correctIndex: 2
          },
          {
            question: "What is TDD?",
            options: ["Testing after deleting", "Writing the test first, then the code", "Testing only in production", "A Git command"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Debugging & Code Review",
        description: "Find bugs systematically and review code like a senior engineer",
        content: `# Debugging & Code Review\n\nBugs are inevitable. Professionals find them with a **system**, not luck.\n\n## The Debugging Process\n\n1. **Reproduce** — find the smallest case that breaks\n2. **Isolate** — binary search the cause\n3. **Fix** — change one thing at a time\n4. **Verify** — confirm the fix and check for regressions\n\n## Tools\n\n\`\`\`javascript\nconsole.log(value);              // quick inspection\nconsole.table(items);            // tables for arrays\ndebugger;                        // breakpoint in devtools\n\`\`\`\n\n## Reading Errors\n\n- Read the **stack trace** — the real origin is usually near the bottom\n- Google the exact error message\n- Check your assumptions first (inputs, types, null)\n\n## Code Review Checklist\n\n- Does it do what it claims?\n- Are there edge cases or security issues?\n- Is it readable and tested?\n- Would you want to maintain it in 6 months?\n\n## Key Concepts\n\n- **Reproduce → Isolate → Fix → Verify**\n- **Stack trace** — the trail of calls that led to the error\n- Reviews catch bugs before users do`,
        taskDescription: "The function below has a bug — it returns undefined for empty arrays. Fix it to return 0 for an empty array and the max value otherwise.",
        starterCode: `// Bug: returns undefined for [] — fix it!\nfunction maxValue(arr) {\n  let max = arr[0];\n  for (const n of arr) {\n    if (n > max) max = n;\n  }\n  return max;\n}`,
        solutionCode: `function maxValue(arr) {\n  if (arr.length === 0) return 0;\n  let max = arr[0];\n  for (const n of arr) {\n    if (n > max) max = n;\n  }\n  return max;\n}`,
        quizQuestions: [
          {
            question: "What should you do first when debugging?",
            options: ["Rewrite the code", "Reproduce the bug in the smallest case", "Blame the framework", "Ship it"],
            correctIndex: 1
          },
          {
            question: "Where is the true origin of an error usually?",
            options: ["The top of the stack trace", "The bottom of the stack trace", "In the CSS", "At random"],
            correctIndex: 1
          },
          {
            question: "Which is a good review question?",
            options: ["Does it work AND is it maintainable?", "How many lines is it?", "Who wrote it?", "What font does it use?"],
            correctIndex: 0
          },
        ],
      },
      {
        title: "CI/CD & Deployment",
        description: "Automate testing and ship updates safely with pipelines",
        content: `# CI/CD & Deployment\n\n**CI/CD** automates the boring, error-prone parts: run tests on every change (CI) and ship automatically (CD).\n\n## Continuous Integration (CI)\n\nEvery push triggers a pipeline that checks the code:\n\n\`\`\`yaml\n# .github/workflows/ci.yml (GitHub Actions)\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npm test\n\`\`\`\n\n## The Pipeline\n\n1. **Lint** — check style rules\n2. **Test** — run unit/integration tests\n3. **Build** — compile the app\n4. **Deploy** — push to staging/production\n\n## Deployment Environments\n\n- **Staging** — test with real data before release\n- **Production** — what users see\n- **Rollback** — deploy previous version if something breaks\n\n## Key Concepts\n\n- **CI** — automatically test every change\n- **CD** — automatically ship passing code\n- **Pipeline** — lint → test → build → deploy\n- Automate everything you trust`,
        taskDescription: "Order the 4 stages of a deployment pipeline correctly as a comment: build, test, lint, deploy.",
        starterCode: `// Order the 4 pipeline stages correctly:\n// (build, test, lint, deploy)\n\n`,
        solutionCode: `// 1. lint  2. test  3. build  4. deploy`,
        quizQuestions: [
          {
            question: "What does CI do?",
            options: ["Manually checks code", "Automatically runs tests on every change", "Deletes old code", "Styles the UI"],
            correctIndex: 1
          },
          {
            question: "Which environment do users see?",
            options: ["Staging", "Production", "Local", "Test"],
            correctIndex: 1
          },
          {
            question: "What is a rollback?",
            options: ["Deploying a broken build on purpose", "Reverting to a previous working version", "A Git branch", "A database backup"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "Software Engineering Exam",
      description: "Version control, testing, debugging, and delivery — professional practices.",
      questions: [
        {
          type: "multiple-choice",
          question: "Which git command saves a snapshot?",
          options: ["git status", "git commit -m", "git init", "git log"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "In TDD, what comes first?",
          options: ["Implementation", "The test", "Deployment", "Refactoring"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "What runs automatically on every push in CI?",
          options: ["The pipeline (tests/build)", "The designer", "Manual QA", "Nothing"],
          correctIndex: 0
        },
        {
          type: "coding" as const,
          question: "Write a function 'isPalindrome' that returns true if a string reads the same forwards and backwards (e.g. 'racecar').",
          testCases: [
            { input: "isPalindrome('racecar')", expected: "true" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What's the first step of debugging?",
          options: ["Fix randomly", "Reproduce the bug", "Delete the code", "Deploy"],
          correctIndex: 1
        },
      ]
    }
  },
  {
    title: "System Design & Architecture",
    subtitle: "Design Systems at Scale",
    description: "Design systems that handle millions of users: caching, databases at scale, load balancing, and the trade-offs senior engineers make.",
    color: "#8b5cf6",
    resources: [
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "repo" },
      { title: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/", type: "book" },
      { title: "MDN: HTTP Caching", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching", type: "docs" },
      { title: "MongoDB: Databases Explained", url: "https://www.mongodb.com/docs/manual/introduction/", type: "docs" },
    ],
    lessons: [
      {
        title: "Thinking in Systems",
        description: "Requirements, scale estimation, and the CAP theorem",
        content: `# Thinking in Systems\n\nGreat engineers don't just write code — they **design systems** that survive real traffic, real failures, and real users.\n\n## Start With Requirements\n\n- **Functional** — what must it do? (\"shorten a URL\")\n- **Non-functional** — how well? (latency, uptime, security, cost)\n\nAsk: How many users? What does *peak* look like? What can break?\n\n## Estimate, Don't Guess\n\n\`\`\`javascript\n// Rough estimate: users × actions ÷ seconds = requests/second\nconst qps = (users * actionsPerUser) / secondsInHour;\n\`\`\`\n\nDesign for **2-10× your estimate** — success is the best predictor of load.\n\n## The CAP Theorem\n\nWhen a network partition happens, a distributed system must choose:\n\n- **C**onsistency — every read sees the latest write\n- **A**vailability — every request gets a (non-error) response\n- **P**artition tolerance — the system keeps working despite network failure\n\nYou get two out of three. Databases (\"CP\" like Postgres, or \"AP\" like Cassandra) encode this trade-off.\n\n## Key Concepts\n\n- **Functional vs non-functional requirements**\n- **CAP theorem** — consistency, availability, partition tolerance\n- **Trade-offs** — there is no free lunch in system design`,
        taskDescription: "Write a function 'requestsPerSecond(users, actionsPerHour)' that returns users × actionsPerHour ÷ 3600 (rounded up).",
        starterCode: `// Write requestsPerSecond(users, actionsPerHour)\n// → Math.ceil(users * actionsPerHour / 3600)\n\n`,
        solutionCode: `function requestsPerSecond(users, actionsPerHour) {\n  return Math.ceil((users * actionsPerHour) / 3600);\n}`,
        quizQuestions: [
          {
            question: "Which is a non-functional requirement?",
            options: ["Users can shorten a URL", "99.9% uptime and <200ms latency", "Users can log in", "Users can share links"],
            correctIndex: 1
          },
          {
            question: "According to CAP, during a network partition you must choose between…",
            options: ["Speed and cost", "Consistency and availability", "Security and scale", "Reads and writes"],
            correctIndex: 1
          },
          {
            question: "When estimating scale, you should design for…",
            options: ["Exactly today's users", "2-10x your estimate", "Half your estimate", "Whatever is cheapest"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Caching, CDNs & Load Balancing",
        description: "Speed up responses and spread traffic across servers",
        content: `# Caching, CDNs & Load Balancing\n\nThree of the most powerful tools in a system designer's toolbox.\n\n## Caching\n\nStore the result of an expensive operation so you never compute it twice:\n\n- **Browser cache** — the client keeps static assets\n- **CDN cache** — copies of content around the world\n- **Server cache** (Redis/Memcached) — in-memory results\n\n\`\`\`javascript\nconst cache = new Map();\nfunction getUsers() {\n  if (cache.has(\"users\")) return cache.get(\"users\");\n  const users = fetchUsersFromDb();   // slow!\n  cache.set(\"users\", users);        // next time: instant\n  return users;\n}\n\`\`\`\n\n## CDNs\n\nA **CDN** (Content Delivery Network) stores copies of your static files on servers worldwide — a user in Lagos downloads from a server in Lagos, not New York.\n\n## Load Balancers\n\nA **load balancer** sits in front of your servers and spreads incoming requests — round-robin, least-connections, or by region — so no single server gets crushed.\n\n## Key Concepts\n\n- **Cache** — store expensive results (mind invalidation!)\n- **CDN** — serve static content from edge servers near users\n- **Load balancer** — distribute traffic across many servers`,
        taskDescription: "Write a function 'roundRobin(servers, index)' that returns the server at index % servers.length (how a load balancer picks the next server).",
        starterCode: `// Write roundRobin(servers, index)\n// → servers[index % servers.length]\n\n`,
        solutionCode: `function roundRobin(servers, index) {\n  return servers[index % servers.length];\n}`,
        quizQuestions: [
          {
            question: "What does a CDN improve?",
            options: ["Database writes", "Latency for users worldwide", "Password security", "Code compilation"],
            correctIndex: 1
          },
          {
            question: "What's the classic problem with caches?",
            options: ["They use too much CPU", "Stale data — invalidation", "They can't store strings", "They only work in the browser"],
            correctIndex: 1
          },
          {
            question: "What does a load balancer do?",
            options: ["Distributes requests across servers", "Deletes old data", "Compiles code", "Encrypts traffic"],
            correctIndex: 0
          },
        ],
      },
      {
        title: "Databases at Scale",
        description: "Indexing, replication, sharding, and SQL vs NoSQL",
        content: `# Databases at Scale\n\nA single database can only take you so far. Scaling a database means clever storage tricks:\n\n## Indexing\n\nAn **index** is like a book's index — it lets the DB find rows without scanning everything.\n\n\`\`\`sql\nCREATE INDEX idx_users_email ON users (email);\n\`\`\`\n\nTrade-off: faster reads, slower writes.\n\n## Replication\n\nKeep **copies** of your data on multiple machines:\n\n- **Leader + replicas** — writes go to the leader, reads spread across replicas\n- **Failover** — if the leader dies, a replica takes over\n\n## Sharding\n\nSplit the data across many databases — e.g. users with id % 4 == 0 go to shard 0, etc. Each shard holds a slice.\n\n## SQL vs NoSQL\n\n- **SQL** (Postgres, MySQL) — structured tables, joins, strong consistency (CP)\n- **NoSQL** (MongoDB, Cassandra, DynamoDB) — flexible documents, horizontal scale, often AP\n\nPick based on your access patterns — there's no universal winner.\n\n## Key Concepts\n\n- **Index** — fast reads, slower writes\n- **Replicas** — copies for reads + failover\n- **Sharding** — horizontal partitioning of data\n- **SQL vs NoSQL** — structured vs flexible\n`,
        taskDescription: "Write a function 'shardFor(key, shardCount)' that returns key % shardCount — which shard owns this key.",
        starterCode: `// Write shardFor(key, shardCount)\n// → key % shardCount\n\n`,
        solutionCode: `function shardFor(key, shardCount) {\n  return key % shardCount;\n}`,
        quizQuestions: [
          {
            question: "What does a database index do?",
            options: ["Speeds up reads (at the cost of write speed)", "Deletes duplicates", "Encrypts rows", "Shrinks the database file"],
            correctIndex: 0
          },
          {
            question: "What is sharding?",
            options: ["Backing up the database daily", "Splitting data across multiple databases", "Compressing rows", "Converting SQL to NoSQL"],
            correctIndex: 1
          },
          {
            question: "In leader + replicas, where do writes go?",
            options: ["To every replica", "To the leader", "To the cache", "Nowhere — writes are disallowed"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Designing a Real System: URL Shortener",
        description: "A complete walkthrough of a real-world design problem",
        content: `# Designing a Real System: URL Shortener\n\nLet's design a **URL shortener** (like bit.ly) from scratch — the classic interview problem.\n\n## 1. Requirements\n\n- **Functional** — create short links, redirect to the original, count clicks\n- **Non-functional** — <100ms redirects, millions of links, high availability\n\n## 2. Core Idea\n\nA tiny unique id per long URL. Use **base62** (a-z, A-Z, 0-9) so ids stay short:\n\n\`\`\`javascript\nconst CHARS = \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\";\nfunction toBase62(num) {\n  let out = \"\";\n  while (num > 0) {\n    out = CHARS[num % 62] + out;\n    num = Math.floor(num / 62);\n  }\n  return out || \"a\";\n}\n\`\`\`\n\n## 3. API\n\n- \`POST /api/links\` { url } → { shortId }\n- \`GET /:shortId\` → 301 redirect to original\n- \`GET /api/links/:shortId/stats\` → click count\n\n## 4. Scaling It\n\n- **Cache** hot links in Redis — redirects hit memory, not the DB\n- **Shard** by shortId — spread links across databases\n- **Load balance** the API and redirect servers\n- **Analytics** — write click events to a queue, batch them\n\n## 5. Trade-offs to Discuss\n\n- 301 (permanent, cached by browsers) vs 302 (temporary, good for analytics)\n- Read-heavy workload → cache + replicas\n- What if two users submit the same URL? (hash it — return the same id)\n\n## Key Concepts\n\n- **Base62** — compact unique ids\n- **Cache + shard + load balance** — the scale playbook\n- **301 vs 302** — caching vs analytics\n- Always start from requirements, then sketch, then scale`,
        taskDescription: "Write a function 'toBase62(num)' that converts a number to a base62 id using CHARS = a-z, A-Z, 0-9 (short link ids).",
        starterCode: `// Write toBase62(num)\n// const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"\n\n`,
        solutionCode: `const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";\nfunction toBase62(num) {\n  let out = "";\n  while (num > 0) {\n    out = CHARS[num % 62] + out;\n    num = Math.floor(num / 62);\n  }\n  return out || "a";\n}`,
        quizQuestions: [
          {
            question: "Why base62 for short ids?",
            options: ["It's random", "Compact: letters + digits give many ids with few characters", "It encrypts the URL", "It's required by HTTP"],
            correctIndex: 1
          },
          {
            question: "Why cache hot links in Redis?",
            options: ["To save disk space", "So redirects skip the database entirely", "To make ids longer", "To prevent abuse"],
            correctIndex: 1
          },
          {
            question: "301 vs 302 — why choose 302?",
            options: ["It's faster", "Browsers don't cache it, so you can track clicks", "It's required for HTTPS", "It's the only valid code"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "System Design & Architecture Exam",
      description: "Prove you can design systems that scale — caching, sharding, and trade-offs.",
      questions: [
        {
          type: "multiple-choice",
          question: "What does CAP stand for?",
          options: ["Cache, API, Protocol", "Consistency, Availability, Partition tolerance", "Compute, Access, Performance", "Client, App, Pipeline"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "A CDN primarily…",
          options: ["Stores database backups", "Serves static content from edge servers near users", "Compiles JavaScript", "Authenticates users"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "Sharding means…",
          options: ["Encrypting the database", "Splitting data across multiple databases", "Deleting old records", "Indexing every column"],
          correctIndex: 1
        },
        {
          type: "coding" as const,
          question: "Write a function 'loadBalance(servers, requestNumber)' that returns servers[requestNumber % servers.length].",
          testCases: [
            { input: "loadBalance(['s1','s2','s3'], 4)", expected: "s2" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What's the biggest challenge with caching?",
          options: ["Memory is expensive", "Cache invalidation — stale data", "Caches can't store JSON", "Caches slow down reads"],
          correctIndex: 1
        },
      ]
    }
  },
  {
    title: "Capstone: Build & Ship",
    subtitle: "Your Final Project — Graduate",
    description: "The finale: plan, build, test, and launch a complete real project — then package it into a portfolio and career-ready story.",
    color: "#f59e0b",
    resources: [
      { title: "freeCodeCamp — Learn by Building", url: "https://www.freecodecamp.org/learn/", type: "course" },
      { title: "GitHub Pages — Free Hosting", url: "https://pages.github.com/", type: "guide" },
      { title: "Open Source Guide", url: "https://opensource.guide/how-to-contribute/", type: "guide" },
      { title: "Docker — Get Started", url: "https://docs.docker.com/get-started/", type: "docs" },
      { title: "12-Factor App", url: "https://12factor.net/", type: "docs" },
    ],
    lessons: [
      {
        title: "Choosing & Planning Your Capstone",
        description: "Pick a project you'll finish, and plan it like a product",
        content: `# Choosing & Planning Your Capstone\n\nThis is it — the project that proves everything you've learned. A great capstone is **small enough to finish, big enough to impress**.\n\n## Pick a Project You'll Actually Finish\n\nGood candidates: a habit tracker, a study flashcard app, a budget tool, a CLI game, a portfolio site with a blog.\n\n- **Solve a real problem** you have\n- **Use the stack you know** — don't learn three new tools mid-project\n- **Plan a v1** that fits in 2-4 weeks of steady work\n\n## Write a Mini PRD\n\n- **Problem** — one sentence\n- **Users** — who is it for?\n- **Core features** — 3-5 must-haves\n- **Out of scope** — what you're NOT building (v1)\n\n## Break It Into Milestones\n\n1. **Setup** — repo, project scaffold, hello-world running\n2. **Core loop** — the main feature works end-to-end\n3. **Polish** — errors handled, looks good, works on mobile\n4. **Ship** — deployed, documented, demo ready\n\n## Key Concepts\n\n- **Scope discipline** — small enough to finish\n- **Mini PRD** — problem, users, features, out-of-scope\n- **Milestones** — weekly, shippable chunks`,
        taskDescription: "Write a function 'milestones(totalTasks, perMilestone)' that returns the number of milestones: Math.ceil(totalTasks / perMilestone).",
        starterCode: `// Write milestones(totalTasks, perMilestone)\n// → Math.ceil(totalTasks / perMilestone)\n\n`,
        solutionCode: `function milestones(totalTasks, perMilestone) {\n  return Math.ceil(totalTasks / perMilestone);\n}`,
        quizQuestions: [
          {
            question: "What makes a good capstone project?",
            options: ["The biggest idea possible", "Small enough to finish, big enough to impress", "Uses 5 new frameworks", "No plan needed"],
            correctIndex: 1
          },
          {
            question: "What belongs in a mini PRD?",
            options: ["Problem, users, core features, out of scope", "Only the tech stack", "A full business plan", "Just a wireframe"],
            correctIndex: 0
          },
          {
            question: "Why break the project into milestones?",
            options: ["It's required by GitHub", "Each milestone is shippable and keeps you moving", "To add more meetings", "Milestones replace testing"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Building It: Repo, README & CI",
        description: "Professional repo hygiene: README, git flow, and automated checks",
        content: `# Building It: Repo, README & CI\n\nEmployers look at your GitHub before your resume. Make it look professional:\n\n## The README\n\nYour project's front door. Include:\n\n- **What** it is (one sentence + screenshot)\n- **Why** it exists\n- **How** to run it locally (install + start commands)\n- **Link** to the live demo\n\n## Professional Git Flow\n\n- \`main\` is always deployable\n- Work on feature branches: \`feature/streak-calendar\`\n- Commit often with clear messages\n- Open a **pull request**, review it, merge\n\n## Continuous Integration (CI)\n\nA GitHub Action that runs on every push:\n\n\`\`\`yaml\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n\`\`\`\n\nAdd a **status badge** to your README — it shows your code is tested.\n\n## Key Concepts\n\n- **README** — what, why, how, demo\n- **Feature branches + PRs** — professional collaboration\n- **CI** — automated tests on every push\n- **Badges** — proof your project is healthy`,
        taskDescription: "Write a function 'readmeSection(name, description, howToRun)' that returns '## ' + name + '\n' + description + '\nRun: ' + howToRun.",
        starterCode: `// Write readmeSection(name, description, howToRun)\n// → "## " + name + "\n" + description + "\nRun: " + howToRun\n\n`,
        solutionCode: `function readmeSection(name, description, howToRun) {\n  return "## " + name + "\n" + description + "\nRun: " + howToRun;\n}`,
        quizQuestions: [
          {
            question: "What belongs in a great README?",
            options: ["What, why, how to run, and a live link", "Only the license", "Your full resume", "Nothing — code speaks for itself"],
            correctIndex: 0
          },
          {
            question: "Where should you do your main feature work?",
            options: ["Directly on main", "On a feature branch, then merge via PR", "In a zip file", "On a teammate's branch"],
            correctIndex: 1
          },
          {
            question: "What does CI do?",
            options: [["Runs your tests automatically on every push", "Deletes old code", "Sends emails", "Designs the logo"], ["Runs your tests automatically on every push", "Deletes old code", "Sends emails", "Designs the logo"]][0],
            correctIndex: 0
          },
        ],
      },
      {
        title: "Testing, Deploying & Launching",
        description: "Ship it: tests, deployment, monitoring, and a launch checklist",
        content: `# Testing, Deploying & Launching\n\nA project isn't done until it's **live and used by someone other than you**.\n\n## Test the Important Stuff\n\n- **Unit tests** — the core logic (your functions)\n- **Integration test** — the main user flow works\n- **Manual pass** — the happy path + the obvious edge cases\n\nDon't chase 100% coverage — test what would embarrass you if it broke.\n\n## Deploy It (Free Options)\n\n- **Vercel / Netlify** — frontend + serverless functions\n- **GitHub Pages** — static sites (perfect for a portfolio)\n- **Supabase / Neon** — database + auth with generous free tiers\n\n## The Launch Checklist\n\n- [ ] Tests pass in CI\n- [ ] Deployed — live URL works from a private tab\n- [ ] README updated with the live link\n- [ ] Basic monitoring (error tracking or at least console logs)\n- [ ] Tell someone — friends, forums, communities\n\n## Key Concepts\n\n- **Tests** — protect your core logic\n- **Deploy** — free hosting makes shipping trivial\n- **Launch** — ship early, iterate with feedback\n- **Monitoring** — know when it breaks\n`,
        taskDescription: "Write a function 'launchStatus(deployed, tested)' that returns 'SHIPPED' if both are true, else 'IN PROGRESS'.",
        starterCode: `// Write launchStatus(deployed, tested)\n// both true → "SHIPPED", else "IN PROGRESS"\n\n`,
        solutionCode: `function launchStatus(deployed, tested) {\n  return deployed && tested ? "SHIPPED" : "IN PROGRESS";\n}`,
        quizQuestions: [
          {
            question: "Which free option hosts a static portfolio?",
            options: ["GitHub Pages", "A local folder", "A USB drive", "Printouts"],
            correctIndex: 0
          },
          {
            question: "When is a project 'done'?",
            options: ["When the code compiles", "When it's live and used by someone", "When you get tired", "When the repo is private"],
            correctIndex: 1
          },
          {
            question: "Why monitor after launch?",
            options: ["To make it slower", "To catch errors before users do", "To add features", "To delete the database"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Portfolio, Resume & Interviews",
        description: "Package your work into a career-ready story",
        content: `# Portfolio, Resume & Interviews\n\nYou've done the work. Now make sure the world sees it:\n\n## Your Portfolio\n\n- **3 projects** — your capstone front and center\n- Each with: live link, repo link, 2-3 line description, what you learned\n- Clean GitHub profile: pinned repos, good READMEs, activity\n\n## Resume Bullets That Land\n\nBad: \"Made a website.\"\nGood: \"Built a habit-tracker web app used by 40+ students with React and Supabase.\"\n\n- Use **action verbs**: built, designed, shipped, automated\n- **Quantify** when possible\n- One page, tailored to each role\n\n## Interview Prep\n\n- **STAR stories** — Situation, Task, Action, Result — for your projects\n- **System design basics** — you know them now! (CAP, caching, sharding)\n- **Practice out loud** — explain your capstone in 2 minutes\n- **Ask questions** — interviews are two-way\n\n## Key Concepts\n\n- **Portfolio** — 3 projects with links and lessons\n- **Quantified action verbs** — the resume formula\n- **STAR stories** — your project narrative\n- **Practice** — interviews are a skill like any other\n`,
        taskDescription: "Write a function 'resumeBullet(action, project, impact)' that returns action + ' ' + project + ' — ' + impact + '.'",
        starterCode: `// Write resumeBullet(action, project, impact)\n// → action + " " + project + " — " + impact + "."\n\n`,
        solutionCode: `function resumeBullet(action, project, impact) {\n  return action + " " + project + " — " + impact + ".";\n}`,
        quizQuestions: [
          {
            question: "What should your portfolio feature?",
            options: ["Every tutorial you've done", "3 strong projects with live links", "Only your resume", "Screenshots only"],
            correctIndex: 1
          },
          {
            question: "What makes a resume bullet strong?",
            options: ["Action verbs + quantified impact", "Long paragraphs", "All caps", "Buzzwords only"],
            correctIndex: 0
          },
          {
            question: "What does STAR stand for?",
            options: ["Speed, Time, Action, Result", "Situation, Task, Action, Result", "Steps, Tests, Answers, Reviews", "Stats, Tools, Apps, Repos"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "Graduation Exam",
      description: "The whole journey: plan, build, test, ship, and present. Pass this and you've graduated.",
      questions: [
        {
          type: "multiple-choice",
          question: "What makes a capstone project achievable?",
          options: ["The most ambitious idea", "Small enough to finish, planned in milestones", "No planning", "Only backend code"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "Where do professional features get developed?",
          options: ["Directly on main", "On feature branches merged via pull requests", "In production", "In chat messages"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "What does CI do on every push?",
          options: ["Runs tests automatically", "Deletes branches", "Sends push notifications", "Rewrites git history"],
          correctIndex: 0
        },
        {
          type: "coding" as const,
          question: "Write a function 'finalScore(completed, passed)' that returns 'GRADUATED' if both are true, otherwise 'KEEP GOING'.",
          testCases: [
            { input: "finalScore(true, true)", expected: "GRADUATED" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What should your portfolio feature?",
          options: ["3 strong projects with live links", "Your entire learning history", "Only your favorite game", "Nothing — resume is enough"],
          correctIndex: 0
        },
        {
          type: "multiple-choice",
          question: "What does STAR stand for?",
          options: ["Situation, Task, Action, Result", "Speed, Timing, Accuracy, Review", "Steps, Tests, Answers, Results", "Skills, Tools, Apps, Repos"],
          correctIndex: 0
        },
      ]
    }
  },
];

// The complete 10-level curriculum: base levels (Zero → DSA) + advanced levels.
export const CURRICULUM: Level[] = [...BASE_CURRICULUM, ...ADVANCED_LEVELS];
