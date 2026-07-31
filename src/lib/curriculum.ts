import type { Level, DeviceId, Resource } from "./types";

export const CURRICULUM: Level[] = [
  {
    title: "Zero",
    subtitle: "No Experience Needed",
    description: "Start your coding journey from absolute scratch. Learn what programming is, how computers think, and write your very first lines of code.",
    color: "#6366f1",
    resources: [
      { title: "What is Programming?", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E", type: "video" },
      { title: "freeCodeCamp: Learn to Code", url: "https://www.freecodecamp.org/", type: "course" },
      { title: "MDN: JavaScript Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics", type: "article" },
      { title: "CS50: Week 0", url: "https://cs50.harvard.edu/x/2025/weeks/0/", type: "course" },
    ],
    lessons: [
      {
        title: "What is Code?",
        description: "Understand what code is and how computers execute instructions",
        content: `# What is Code?

Code is a set of instructions that tell a computer what to do. Think of it like a recipe:

- **Ingredients** → Data (numbers, text, etc.)
- **Steps** → Instructions (add, subtract, compare, etc.)
- **Output** → Result (display something, save a file, etc.)

## How Computers Think

Computers are very fast but also very literal. They only understand exactly what you tell them — nothing more, nothing less.

### Binary Basics

At the lowest level, computers understand only two states: **0** (off) and **1** (on). Everything you see on a screen — text, images, videos, games — is built from billions of these tiny switches.

## Hello, World!

The first program every coder writes is "Hello, World!". It's a tradition! In JavaScript, it looks like this:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

\`console.log()\` is a command that prints whatever is inside the parentheses to the console (the output area).

## Key Concepts

- **Syntax**: The rules of a programming language (like grammar in English)
- **Statement**: A single instruction (like a sentence)
- **Program**: A collection of statements that work together`,
        taskDescription: "Write a program that prints 'Hello, World!' to the console.",
        starterCode: `// Write your code below this line
// Tip: Use console.log() to print text

`,
        solutionCode: `console.log("Hello, World!");`,
        quizQuestions: [
          {
            question: "What is code?",
            options: [
              "A set of instructions for a computer",
              "A type of food",
              "A secret language only hackers know",
              "A hardware component"
            ],
            correctIndex: 0
          },
          {
            question: "What does console.log() do?",
            options: [
              "It prints output to the console",
              "It logs into a website",
              "It creates a new file",
              "It turns off the computer"
            ],
            correctIndex: 0
          },
          {
            question: "What are the two states a computer understands at the lowest level?",
            options: [
              "Yes and No",
              "On and Off (1 and 0)",
              "True and False",
              "High and Low"
            ],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Variables & Data Types",
        description: "Store data in variables and understand different types of data",
        content: `# Variables & Data Types

Variables are like labeled boxes where you store information. Each box has:
- A **name** (the label)
- A **value** (what's inside)

## Declaring Variables

In JavaScript, you can create variables using \`let\`:

\`\`\`javascript
let name = "Alice";
let age = 25;
let isStudent = true;
\`\`\`

## Data Types

JavaScript has several basic data types:

### String (text)
\`\`\`javascript
let greeting = "Hello!";
let name = 'Alice';  // single quotes work too
\`\`\`

### Number
\`\`\`javascript
let count = 42;
let price = 19.99;
let negative = -5;
\`\`\`

### Boolean (true/false)
\`\`\`javascript
let isLoggedIn = true;
let isComplete = false;
\`\`\`

### null and undefined
\`\`\`javascript
let empty = null;        // intentionally empty
let notDefined;          // undefined (no value assigned)
\`\`\`

## Checking Types

Use \`typeof\` to check what type something is:

\`\`\`javascript
console.log(typeof "hello");  // "string"
console.log(typeof 42);       // "number"
console.log(typeof true);     // "boolean"
\`\`\``,
        taskDescription: "Create variables for your name (string), your age (number), and whether you like coding (boolean). Print each one.",
        starterCode: `// Create your variables here
// Example: let myName = "YourName";

// Print each variable
`,
        solutionCode: `let myName = "Alice";
let myAge = 25;
let likesCoding = true;

console.log("Name:", myName);
console.log("Age:", myAge);
console.log("Likes coding:", likesCoding);`,
        quizQuestions: [
          {
            question: "Which keyword is used to declare a variable in modern JavaScript?",
            options: ["var", "let", "variable", "create"],
            correctIndex: 1
          },
          {
            question: "What type of data is 'Hello World'?",
            options: ["Number", "Boolean", "String", "Object"],
            correctIndex: 2
          },
          {
            question: "What will typeof true return?",
            options: ["'true'", "'boolean'", "'string'", "'number'"],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Basic Operators",
        description: "Use operators to perform calculations and compare values",
        content: `# Basic Operators

Operators let you work with values to perform calculations, comparisons, and more.

## Arithmetic Operators

\`\`\`javascript
let sum = 5 + 3;        // Addition → 8
let difference = 10 - 4; // Subtraction → 6
let product = 3 * 4;     // Multiplication → 12
let quotient = 15 / 3;   // Division → 5
let remainder = 17 % 5;  // Modulo → 2 (remainder of division)
\`\`\`

## Comparison Operators

These return \`true\` or \`false\`:

\`\`\`javascript
console.log(5 === 5);   // true (strict equal)
console.log(5 !== 3);   // true (not equal)
console.log(10 > 5);    // true (greater than)
console.log(3 < 1);     // false (less than)
console.log(5 >= 5);    // true (greater than or equal)
\`\`\`

## String Concatenation

You can combine strings with \`+\`:

\`\`\`javascript
let first = "Hello";
let last = "World";
console.log(first + " " + last);  // "Hello World"
\`\`\`

## Combining Variables and Strings

\`\`\`javascript
let name = "Alex";
let age = 30;
console.log(name + " is " + age + " years old");
// "Alex is 30 years old"
\`\`\``,
        taskDescription: "Create two numbers, add them together, and print the result as 'The sum of X and Y is Z'.",
        starterCode: `// Create two number variables
let x = ;
let y = ;

// Calculate the sum

// Print the result
// Example: "The sum of 5 and 3 is 8"
`,
        solutionCode: `let x = 10;
let y = 7;
let sum = x + y;
console.log("The sum of " + x + " and " + y + " is " + sum);`,
        quizQuestions: [
          {
            question: "What does the % operator do?",
            options: ["Percent", "Division", "Modulo (remainder)", "Multiplication"],
            correctIndex: 2
          },
          {
            question: "What is the result of 10 > 15?",
            options: ["true", "false", "10", "Error"],
            correctIndex: 1
          },
          {
            question: "What does 'Hello' + ' ' + 'World' produce?",
            options: ["Hello World", "HelloWorld", "'Hello World'", "Hello+World"],
            correctIndex: 0
          }
        ]
      },
    ],
    exam: {
      title: "Zero Level Exam",
      description: "Test your understanding of the basics — variables, data types, operators, and printing output.",
      questions: [
        {
          type: "multiple-choice",
          question: "What does the following code print?\n\nconsole.log(2 + 3 * 4);",
          options: ["20", "14", "24", "9"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "Which data type is 'false'?",
          options: ["Boolean", "String", "Number", "Undefined"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "What is the result of 15 % 4?",
          options: ["3", "4", "11", "3.75"],
          correctIndex: 0
        },
        {
          type: "coding" as const,
          question: "Write code that creates a variable called 'message' with the value 'Hello, CodeSchool!' and prints it.",
          testCases: [
            { input: "", expected: "Hello, CodeSchool!" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What keyword declares a variable that can be reassigned?",
          options: ["const", "let", "var", "Both b and c"],
          correctIndex: 3
        },
      ]
    }
  },
  {
    title: "Beginner",
    subtitle: "Building Foundations",
    description: "Master the essential building blocks of programming — functions, conditionals, loops, and arrays.",
    color: "#22c55e",
    resources: [
      { title: "Functions in JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", type: "article" },
      { title: "freeCodeCamp: Functions", url: "https://www.freecodecamp.org/news/javascript-functions-for-beginners/", type: "article" },
      { title: "Loops Explained", url: "https://www.youtube.com/watch?v=s9wW2P2dUqY", type: "video" },
      { title: "Arrays in 5 Minutes", url: "https://www.youtube.com/watch?v=oigfaZ5ApsM", type: "video" },
    ],
    lessons: [
      {
        title: "Functions",
        description: "Write reusable blocks of code with functions",
        content: `# Functions

Functions are reusable blocks of code that perform a specific task. Think of them like a recipe — once you write it, you can use it again and again.

## Function Declaration

\`\`\`javascript
function greet() {
  console.log("Hello!");
}

// Call (invoke) the function
greet();  // "Hello!"
\`\`\`

## Parameters & Arguments

Functions can take input (parameters):

\`\`\`javascript
function greetPerson(name) {
  console.log("Hello, " + name + "!");
}

greetPerson("Alice");  // "Hello, Alice!"
greetPerson("Bob");    // "Hello, Bob!"
\`\`\`

## Return Values

Functions can give back a result using \`return\`:

\`\`\`javascript
function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result);  // 8
\`\`\`

Once a function hits \`return\`, it stops executing and gives the value back.

## Multiple Parameters

\`\`\`javascript
function calculateArea(width, height) {
  return width * height;
}

console.log(calculateArea(5, 10));  // 50
\`\`\`

## Why Use Functions?

- **Reusability**: Write once, use many times
- **Organization**: Break complex problems into smaller pieces
- **Readability**: Give meaningful names to blocks of code`,
        taskDescription: "Write a function called 'multiply' that takes two numbers as parameters and returns their product. Then call it with 4 and 6, and print the result.",
        starterCode: `// Define your function here


// Call the function and print the result

`,
        solutionCode: `function multiply(a, b) {
  return a * b;
}

let result = multiply(4, 6);
console.log(result);`,
        quizQuestions: [
          {
            question: "What keyword is used to return a value from a function?",
            options: ["send", "give", "return", "output"],
            correctIndex: 2
          },
          {
            question: "What is a parameter?",
            options: ["A function name", "An input to a function", "The output of a function", "A type of loop"],
            correctIndex: 1
          },
          {
            question: "What happens when a function hits the return statement?",
            options: ["It continues running", "It stops and gives back the value", "It restarts from the beginning", "It throws an error"],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Conditionals",
        description: "Make decisions in your code with if/else statements",
        content: `# Conditionals

Conditionals let your program make decisions based on conditions.

## If Statement

\`\`\`javascript
let age = 18;

if (age >= 18) {
  console.log("You are an adult");
}
\`\`\`

## If/Else

\`\`\`javascript
let temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside!");
} else {
  console.log("It's cool outside.");
}
\`\`\`

## Else If

\`\`\`javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
\`\`\`

## Logical Operators

Combine conditions with logical operators:

\`\`\`javascript
let age = 20;
let hasID = true;

// AND (&&) — both must be true
if (age >= 18 && hasID) {
  console.log("You can enter");
}

// OR (||) — at least one must be true
let isWeekend = true;
let isHoliday = false;
if (isWeekend || isHoliday) {
  console.log("No work today!");
}

// NOT (!) — reverses the condition
let isRaining = false;
if (!isRaining) {
  console.log("No umbrella needed");
}
\`\`\``,
        taskDescription: "Write a function called 'checkNumber' that takes a number and prints 'positive' if it's greater than 0, 'negative' if less than 0, and 'zero' if it's 0.",
        starterCode: `function checkNumber(num) {
  // Write your code here
  
}

// Test with different values
checkNumber(5);
checkNumber(-3);
checkNumber(0);
`,
        solutionCode: `function checkNumber(num) {
  if (num > 0) {
    console.log("positive");
  } else if (num < 0) {
    console.log("negative");
  } else {
    console.log("zero");
  }
}

checkNumber(5);
checkNumber(-3);
checkNumber(0);`,
        quizQuestions: [
          {
            question: "What does the && operator do?",
            options: ["Returns true if either condition is true", "Returns true if both conditions are true", "Always returns false", "Reverses a condition"],
            correctIndex: 1
          },
          {
            question: "What will this print?\nlet x = 10;\nif (x > 5) { console.log('big'); } else { console.log('small'); }",
            options: ["big", "small", "Error", "undefined"],
            correctIndex: 0
          },
          {
            question: "What does the ! operator do?",
            options: ["Makes a value positive", "Doubles a value", "Reverses a boolean value", "Checks for equality"],
            correctIndex: 2
          }
        ]
      },
      {
        title: "Loops",
        description: "Repeat actions using loops — save time and write cleaner code",
        content: `# Loops

Loops let you repeat code multiple times without writing it over and over.

## For Loop

The most common loop. It runs a specific number of times:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4
\`\`\`

The three parts of a for loop:
1. **Initialization**: \`let i = 0\` — start value
2. **Condition**: \`i < 5\` — run while true
3. **Increment**: \`i++\` — increase after each run

## While Loop

Runs while a condition is true:

\`\`\`javascript
let count = 0;
while (count < 3) {
  console.log("Count is: " + count);
  count++;
}
\`\`\`

## Looping Through Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// apple
// banana
// cherry
\`\`\`

## Break and Continue

- \`break\` — exits the loop immediately
- \`continue\` — skips to the next iteration

\`\`\`javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;    // stops at 5
  if (i === 2) continue; // skips 2
  console.log(i);
}
// 0, 1, 3, 4
\`\`\``,
        taskDescription: "Write a for loop that prints the numbers from 1 to 10. Then write a function called 'sumUpTo' that takes a number n and returns the sum of all numbers from 1 to n.",
        starterCode: `// Print numbers 1 to 10
for (let i = 1; i <= 10; i++) {
  
}

// Write the sumUpTo function
function sumUpTo(n) {
  
}

// Test it
console.log(sumUpTo(5)); // Should print 15
`,
        solutionCode: `// Print numbers 1 to 10
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Write the sumUpTo function
function sumUpTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Test it
console.log(sumUpTo(5));`,
        quizQuestions: [
          {
            question: "What will this loop print?\nfor (let i = 0; i < 3; i++) { console.log(i); }",
            options: ["0 1 2", "1 2 3", "0 1 2 3", "1 2"],
            correctIndex: 0
          },
          {
            question: "What does break do in a loop?",
            options: ["Skips one iteration", "Exits the loop immediately", "Restarts the loop", "Does nothing"],
            correctIndex: 1
          },
          {
            question: "What is the condition checked before each loop iteration?",
            options: ["Initialization", "The condition in the middle", "The increment", "The loop body"],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Arrays",
        description: "Store and work with lists of data using arrays",
        content: `# Arrays

Arrays are ordered lists that can hold multiple values in a single variable.

## Creating Arrays

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let fruits = ["apple", "banana", "cherry"];
let mixed = [1, "hello", true, null];
\`\`\`

## Accessing Elements

Array indices start at **0**:

\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]);  // "apple"
console.log(fruits[1]);  // "banana"
console.log(fruits[2]);  // "cherry"
console.log(fruits.length); // 3
\`\`\`

## Modifying Arrays

\`\`\`javascript
let colors = ["red", "blue", "green"];

colors[1] = "yellow";     // Change an element
console.log(colors);       // ["red", "yellow", "green"]

colors.push("purple");     // Add to the end
console.log(colors);       // ["red", "yellow", "green", "purple"]

let last = colors.pop();   // Remove from the end
console.log(last);         // "purple"
\`\`\`

## Useful Array Methods

\`\`\`javascript
let nums = [3, 1, 4, 1, 5];
nums.sort();              // [1, 1, 3, 4, 5]
nums.reverse();           // [5, 4, 3, 1, 1]
console.log(nums.indexOf(3));  // 2

// includes() checks if a value exists
console.log(nums.includes(4));  // true
\`\`\`

## Looping Through Arrays

\`\`\`javascript
let scores = [85, 92, 78, 95];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total += scores[i];
}

let average = total / scores.length;
console.log(average);  // 87.5
\`\`\``,
        taskDescription: "Create an array called 'scores' with the values [75, 88, 92, 65, 80]. Write code to calculate and print the average score (sum of all scores divided by the count).",
        starterCode: `let scores = [75, 88, 92, 65, 80];

// Calculate the sum


// Calculate the average


// Print the average

`,
        solutionCode: `let scores = [75, 88, 92, 65, 80];

let sum = 0;
for (let i = 0; i < scores.length; i++) {
  sum += scores[i];
}

let average = sum / scores.length;
console.log("Average score:", average);`,
        quizQuestions: [
          {
            question: "What is the index of the first element in an array?",
            options: ["1", "0", "-1", "It depends"],
            correctIndex: 1
          },
          {
            question: "What does fruits.length give you?",
            options: ["The last element", "The number of elements", "The first element", "The index of the last element"],
            correctIndex: 1
          },
          {
            question: "Which method adds an element to the end of an array?",
            options: ["push()", "pop()", "add()", "append()"],
            correctIndex: 0
          }
        ]
      },
    ],
    exam: {
      title: "Beginner Level Exam",
      description: "Prove you understand functions, conditionals, loops, and arrays.",
      questions: [
        {
          type: "multiple-choice",
          question: "What will this code log?\n\nfunction add(a, b) { return a + b; }\nlet result = add(2, 3);\nconsole.log(result);",
          options: ["5", "23", "undefined", "Error"],
          correctIndex: 0
        },
        {
          type: "multiple-choice",
          question: "What does this return?\n\nfunction isEven(num) {\n  return num % 2 === 0;\n}\nisEven(7);",
          options: ["true", "false", "undefined", "1"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "How many times does this loop run?\n\nfor (let i = 0; i < 5; i++) { ... }",
          options: ["4", "5", "6", "Infinite"],
          correctIndex: 1
        },
        {
          type: "coding" as const,
          question: "Write a function called 'findMax' that takes an array of numbers and returns the largest number in the array.",
          testCases: [
            { input: "findMax([1, 5, 3, 9, 2])", expected: "9" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What does arr.push(10) do?",
          options: ["Removes 10 from arr", "Adds 10 to the end of arr", "Adds 10 to the beginning of arr", "Sorts arr"],
          correctIndex: 1
        },
      ]
    }
  },
  {
    title: "Intermediate",
    subtitle: "Level Up Your Skills",
    description: "Dive into objects, scope, higher-order functions, and start thinking like a real developer.",
    color: "#f59e0b",
    resources: [
      { title: "JavaScript Objects", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics", type: "article" },
      { title: "Scope & Closures", url: "https://www.youtube.com/watch?v=yiEeiMN2Khs", type: "video" },
      { title: "Array Methods (map, filter, reduce)", url: "https://www.youtube.com/watch?v=HkWxvB1RqeU", type: "video" },
      { title: "freeCodeCamp: OOP", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "course" },
    ],
    lessons: [
      {
        title: "Objects",
        description: "Organize data with key-value pairs using objects",
        content: `# Objects

Objects let you group related data and functions together using key-value pairs.

## Creating Objects

\`\`\`javascript
let person = {
  name: "Alice",
  age: 25,
  isStudent: true,
  hobbies: ["reading", "coding", "hiking"]
};
\`\`\`

## Accessing Properties

\`\`\`javascript
console.log(person.name);     // "Alice"  (dot notation)
console.log(person["age"]);   // 25       (bracket notation)
\`\`\`

## Modifying Properties

\`\`\`javascript
person.age = 26;
person.location = "New York";  // Adds a new property
delete person.isStudent;       // Removes a property
\`\`\`

## Methods (Functions in Objects)

\`\`\`javascript
let calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(10, 4)); // 6
\`\`\`

## Nested Objects

\`\`\`javascript
let user = {
  name: "Bob",
  address: {
    street: "123 Main St",
    city: "Boston",
    zip: "02101"
  }
};

console.log(user.address.city);  // "Boston"
\`\`\`

## The this Keyword

Inside a method, \`this\` refers to the object itself:

\`\`\`javascript
let person = {
  name: "Alice",
  greet() {
    console.log("Hi, I'm " + this.name);
  }
};

person.greet();  // "Hi, I'm Alice"
\`\`\``,
        taskDescription: "Create an object called 'book' with properties: title ('The Great Gatsby'), author ('F. Scott Fitzgerald'), year (1925), and a method 'getSummary' that returns 'Title by Author (Year)'.",
        starterCode: `// Create the book object


// Test the method
console.log(book.getSummary());
`,
        solutionCode: `let book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925,
  getSummary() {
    return this.title + " by " + this.author + " (" + this.year + ")";
  }
};

console.log(book.getSummary());`,
        quizQuestions: [
          {
            question: "How do you access the 'name' property of an object called 'obj'?",
            options: ["obj[name]", "obj.name", "obj->name", "obj::name"],
            correctIndex: 1
          },
          {
            question: "What does 'this' refer to inside an object method?",
            options: ["The global object", "The function itself", "The object that owns the method", "Nothing"],
            correctIndex: 2
          },
          {
            question: "How do you add a new property to an object?",
            options: ["obj.addProperty(key, value)", "obj[key] = value or obj.key = value", "obj.push(key, value)", "obj.new(key, value)"],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Scope & Closures",
        description: "Understand variable visibility and the power of closures",
        content: `# Scope & Closures

Scope determines where variables are accessible in your code.

## Global Scope

Variables declared outside any function are global:

\`\`\`javascript
let globalVar = "I'm everywhere!";

function test() {
  console.log(globalVar);  // Works!
}
\`\`\`

## Function Scope

Variables declared inside a function are only accessible within it:

\`\`\`javascript
function myFunction() {
  let localVar = "I'm hidden!";
  console.log(localVar);  // Works
}

console.log(localVar);  // Error! Not defined
\`\`\`

## Block Scope (\`let\` and \`const\`)

Variables with \`let\` or \`const\` are scoped to the nearest block \`{}\`:

\`\`\`javascript
if (true) {
  let blockVar = "I'm in a block";
  const alsoBlock = "Me too";
  var notBlocked = "I escape!";  // var ignores block scope
}

console.log(blockVar);     // Error!
console.log(notBlocked);   // Works (bad practice)
\`\`\`

## Closures

A closure is a function that remembers the variables from where it was created:

\`\`\`javascript
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

let counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
\`\`\`

The inner function "closes over" (remembers) the \`count\` variable even after \`createCounter\` has finished running.

## Why Closures Matter

Closures are everywhere in JavaScript:
- **Event handlers** that remember state
- **Factory functions** that create customized functions
- **Module pattern** for private variables`,
        taskDescription: "Write a function called 'createGreeter' that takes a 'greeting' parameter and returns a new function that takes a 'name' parameter and prints the greeting followed by the name.",
        starterCode: `function createGreeter(greeting) {
  // Return a function that takes name and prints greeting + name
  
}

let sayHello = createGreeter("Hello");
sayHello("Alice"); // Should print "Hello Alice"

let sayGoodbye = createGreeter("Goodbye");
sayGoodbye("Bob"); // Should print "Goodbye Bob"
`,
        solutionCode: `function createGreeter(greeting) {
  return function(name) {
    console.log(greeting + " " + name);
  };
}

let sayHello = createGreeter("Hello");
sayHello("Alice");

let sayGoodbye = createGreeter("Goodbye");
sayGoodbye("Bob");`,
        quizQuestions: [
          {
            question: "What is a closure?",
            options: ["A way to close a function", "A function that remembers its outer variables", "A type of loop", "An error in JavaScript"],
            correctIndex: 1
          },
          {
            question: "Which keyword creates block-scoped variables?",
            options: ["var", "let and const", "function", "global"],
            correctIndex: 1
          },
          {
            question: "Where is a variable declared with let inside an if block accessible?",
            options: ["Throughout the file", "Only inside that if block", "Inside the parent function", "Anywhere in the script"],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Higher-Order Functions",
        description: "Use functions that take or return other functions for powerful patterns",
        content: `# Higher-Order Functions

A higher-order function is a function that either:
- Takes another function as an argument, OR
- Returns a function

JavaScript has many built-in higher-order functions for arrays.

## forEach

Executes a function for each element:

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(num) {
  console.log(num * 2);
});
// 2, 4, 6, 8, 10
\`\`\`

## map

Creates a new array by transforming each element:

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled);  // [2, 4, 6, 8, 10]
\`\`\`

## filter

Creates a new array with only elements that pass a test:

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5, 6];
let evens = numbers.filter(function(num) {
  return num % 2 === 0;
});

console.log(evens);  // [2, 4, 6]
\`\`\`

## Arrow Functions (Shorter Syntax)

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

// Traditional function
let doubled1 = numbers.map(function(n) { return n * 2; });

// Arrow function
let doubled2 = numbers.map(n => n * 2);

console.log(doubled2);  // [2, 4, 6, 8, 10]
\`\`\`

## Chaining

You can chain these methods together:

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

let result = numbers
  .filter(n => n % 2 === 0)    // [2, 4, 6, 8]
  .map(n => n * 3)              // [6, 12, 18, 24]
  .filter(n => n > 10);         // [12, 18, 24]

console.log(result);  // [12, 18, 24]
\`\`\``,
        taskDescription: "Given the array [3, 7, 1, 9, 4, 6, 8, 2], use filter and map to: (1) keep only numbers greater than 4, (2) then double each remaining number. Print the result.",
        starterCode: `let numbers = [3, 7, 1, 9, 4, 6, 8, 2];

// Use filter then map to transform the array

// Print the result
`,
        solutionCode: `let numbers = [3, 7, 1, 9, 4, 6, 8, 2];

let result = numbers
  .filter(n => n > 4)
  .map(n => n * 2);

console.log(result);`,
        quizQuestions: [
          {
            question: "What does the map() method do?",
            options: ["Filters an array", "Transforms each element into a new array", "Sorts an array", "Finds an element"],
            correctIndex: 1
          },
          {
            question: "What does filter() return?",
            options: ["The first matching element", "A new array with elements that pass the test", "The original array", "A boolean"],
            correctIndex: 1
          },
          {
            question: "What is the arrow function equivalent of function(n) { return n * 2; }?",
            options: ["n => n * 2", "n => { n * 2 }", "n * 2 => n", "n => return n * 2"],
            correctIndex: 0
          }
        ]
      },
    ],
    exam: {
      title: "Intermediate Level Exam",
      description: "Demonstrate mastery of objects, scope, closures, and higher-order functions.",
      questions: [
        {
          type: "multiple-choice",
          question: "What does this return?\n\nlet arr = [1, 2, 3, 4];\narr.filter(n => n > 2).map(n => n * 2);",
          options: ["[6, 8]", "[3, 4]", "[3, 4, 6, 8]", "[2, 4, 6, 8]"],
          correctIndex: 0
        },
        {
          type: "multiple-choice",
          question: "What will this log?\n\nlet x = 10;\nfunction outer() {\n  let x = 20;\n  function inner() {\n    console.log(x);\n  }\n  inner();\n}\nouter();",
          options: ["10", "20", "Error", "undefined"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "Which method would you use to transform every element of an array?",
          options: ["filter()", "forEach()", "map()", "find()"],
          correctIndex: 2
        },
        {
          type: "coding" as const,
          question: "Write a function called 'createMultiplier' that takes a number 'factor' and returns a new function that multiplies any number by that factor.",
          testCases: [
            { input: "let double = createMultiplier(2); double(5)", expected: "10" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What is a closure in JavaScript?",
          options: ["A type of error", "A function that remembers its outer scope variables", "A way to close browser tabs", "A loop construct"],
          correctIndex: 1
        },
      ]
    }
  },
  {
    title: "Advanced JavaScript",
    subtitle: "Modern JavaScript Mastery",
    description: "Level up to modern JavaScript: arrow functions, promises, async/await, modules, and error handling — the skills every real codebase uses.",
    color: "#8b5cf6",
    resources: [
      { title: "MDN: Using Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", type: "article" },
      { title: "javascript.info: Async/await", url: "https://javascript.info/async-await", type: "tutorial" },
      { title: "MDN: JavaScript Modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", type: "article" },
      { title: "The Odin Project: Full Stack JS", url: "https://www.theodinproject.com/paths/full-stack-javascript", type: "course" },
    ],
    lessons: [
      {
        title: "Arrow Functions & Modern Syntax",
        description: "Write cleaner functions with arrow syntax, destructuring, and template literals",
        content: `# Arrow Functions & Modern Syntax

ES6 gave JavaScript superpowers. The most visible change: **arrow functions**.

## Arrow Functions

A normal function:

\`\`\`javascript
function double(n) {
  return n * 2;
}
\`\`\`

The same as an arrow function:

\`\`\`javascript
const double = (n) => n * 2;
\`\`\`

- If there's one parameter, parentheses are optional: \`n => n * 2\`
- If the body is a single expression, it's returned implicitly
- Arrow functions don't have their own \`this\` — they inherit it from where they're defined

## Template Literals

Backticks allow multi-line strings and interpolation:

\`\`\`javascript
const name = "Ada";
console.log(\`Hello, \${name}! Welcome back.\`);
\`\`\`

## Destructuring

Pull values out of objects and arrays in one line:

\`\`\`javascript
const user = { name: "Ada", age: 36 };
const { name, age } = user;          // object destructuring
const [first, second] = [10, 20];    // array destructuring
\`\`\`

## Spread & Rest

\`...\` spreads values or collects them:

\`\`\`javascript
const nums = [1, 2, 3];
const copy = [...nums, 4];            // [1, 2, 3, 4]
function sum(...args) { return args.reduce((a, b) => a + b, 0); }
\`\`\`

## Key Concepts

- **Arrow function** — concise syntax, inherits \`this\`
- **Template literal** — string with \${expression} interpolation
- **Destructuring** — unpack values from objects/arrays
- **Spread/Rest** — \`...\` expands or collects values`,
        taskDescription: "Write an arrow function called 'greet' that takes a name and returns a template literal: 'Hello, NAME!' (use ${name} interpolation).",
        starterCode: `// Write an arrow function 'greet' below
// It should take a 'name' parameter and return \`Hello, \${name}!\`

`,
        solutionCode: `const greet = (name) => \`Hello, \${name}!\`;`,
        quizQuestions: [
          {
            question: "What do arrow functions inherit instead of having their own this?",
            options: ["The global object", "The this from where they're defined", "Nothing", "A new this every call"],
            correctIndex: 1
          },
          {
            question: "Which syntax creates a template literal?",
            options: ["'single quotes'", "\"double quotes\"", "`backticks`", "/* comment */"],
            correctIndex: 2
          },
          {
            question: "What does [...nums] do?",
            options: ["Deletes nums", "Creates a copy of the array", "Sorts the array", "Converts to a string"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Promises",
        description: "Handle asynchronous work with promises and fetch data from APIs",
        content: `# Promises

JavaScript runs one thing at a time, but many tasks (network requests, file reads, timers) take time. **Promises** let you say: \"do this now, and when it finishes, run that.\"

## The Promise Object

\`\`\`javascript
const wait = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done!"), 1000);
});

wait.then((result) => console.log(result)); // "done!" after 1s
\`\`\`

- \`resolve(value)\` — the task succeeded
- \`reject(error)\` — the task failed
- \`.then()\` runs on success, \`.catch()\` on failure

## Chaining

\`\`\`javascript
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Failed:", err));
\`\`\`

Each \`.then\` receives the result of the previous one — this is a **chain**.

## Promise States

- **Pending** — still running
- **Fulfilled** — succeeded, \`.then\` will run
- **Rejected** — failed, \`.catch\` will run

## Key Concepts

- **Promise** — represents a future value
- **resolve / reject** — success / failure callbacks
- **Chaining** — \`.then().catch()\` sequences async steps`,
        taskDescription: "Create a promise called 'myPromise' that resolves with the string 'Success!' after 500ms, then chain a .then() that logs the value.",
        starterCode: `// Create a promise that resolves with "Success!" after 500ms
// Chain a .then() that logs the resolved value

`,
        solutionCode: `const myPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Success!"), 500);
});
myPromise.then((value) => console.log(value));`,
        quizQuestions: [
          {
            question: "Which callback runs when a promise succeeds?",
            options: ["reject", "then", "catch", "finally"],
            correctIndex: 1
          },
          {
            question: "What are the three states of a promise?",
            options: ["Start, middle, end", "Pending, fulfilled, rejected", "Open, closed, errored", "Queued, running, done"],
            correctIndex: 1
          },
          {
            question: "What does .catch() handle?",
            options: ["Successful values", "Errors from the chain", "Timers", "Events"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Async/Await & the Event Loop",
        description: "Write promise code like it's synchronous with async and await",
        content: `# Async/Await & the Event Loop

\`async/await\` is sugar over promises — you write asynchronous code that reads like normal top-to-bottom code.

## async Functions

An \`async\` function always returns a promise:

\`\`\`javascript
async function getData() {
  return "data";
}
getData().then(console.log); // "data"
\`\`\`

## await

\`await\` pauses the function until a promise settles:

\`\`\`javascript
async function showUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const user = await res.json();
  console.log(user.name);
}
\`\`\`

- \`await\` only works inside \`async\` functions
- Errors propagate automatically — wrap in \`try/catch\`

\`\`\`javascript
async function safe() {
  try {
    const res = await fetch("/api/data");
    return await res.json();
  } catch (err) {
    console.error("Request failed:", err);
  }
}
\`\`\`

## The Event Loop

JavaScript runs on a single thread. Long tasks block the page. The **event loop** moves async callbacks (timers, network, events) to a queue and runs them when the main thread is free:

1. Run synchronous code
2. When a promise/timer finishes, queue its callback
3. When the stack is empty, run the next queued callback

## Key Concepts

- **async** — marks a function that returns a promise
- **await** — pauses until a promise settles
- **Event loop** — processes async callbacks without blocking`,
        taskDescription: "Write an async function called 'getUser' that uses await to 'fetch' a user object (simulate with a promise that resolves to { name: 'Ada' }) and returns the name.",
        starterCode: `// Write an async function 'getUser'
// Simulate a fetch with a promise that resolves to { name: "Ada" }
// Return the user's name

`,
        solutionCode: `async function getUser() {
  const user = await Promise.resolve({ name: "Ada" });
  return user.name;
}`,
        quizQuestions: [
          {
            question: "Where can you use await?",
            options: ["Anywhere", "Only inside async functions", "Only in loops", "Only in the browser"],
            correctIndex: 1
          },
          {
            question: "What does an async function always return?",
            options: ["A number", "A promise", "A string", "Undefined"],
            correctIndex: 1
          },
          {
            question: "What is the event loop's job?",
            options: ["To run code on multiple threads", "To process async callbacks without blocking the main thread", "To compile JavaScript", "To manage memory only"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "ES Modules & Error Handling",
        description: "Split code into modules and handle errors like a professional",
        content: `# ES Modules & Error Handling

Real apps are split into files. **Modules** keep code organized and reusable.

## Export & Import

\`\`\`javascript
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { add } from "./math.js";
console.log(add(2, 3), multiply(2, 3));
\`\`\`

- \`export default\` — one default export per file
- \`export { name }\` — named exports, imported with \`{ }\`

## try / catch / finally

\`\`\`javascript
try {
  riskyOperation();
} catch (err) {
  console.error("Something went wrong:", err.message);
} finally {
  cleanup(); // always runs
}
\`\`\`

## Throwing Errors

\`\`\`javascript
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
\`\`\`

## Key Concepts

- **Module** — a file with exports/imports
- **Default vs named exports** — one default, many named
- **try/catch/finally** — handle and clean up errors
- **throw** — create your own errors`,
        taskDescription: "Write a function called 'safeDivide' that takes a and b, and if b is 0, throws an error with the message 'Cannot divide by zero' — otherwise returns a / b.",
        starterCode: `// Write 'safeDivide(a, b)'
// Throw an Error("Cannot divide by zero") when b is 0

`,
        solutionCode: `function safeDivide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}`,
        quizQuestions: [
          {
            question: "How do you import a default export?",
            options: ["import { name } from", "import name from", "require()", "import * as all"],
            correctIndex: 1
          },
          {
            question: "What block ALWAYS runs after try/catch?",
            options: ["else", "finally", "done", "then"],
            correctIndex: 1
          },
          {
            question: "What does throw do?",
            options: ["Logs an error", "Creates and raises an error", "Ends the program silently", "Returns null"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "Advanced JavaScript Exam",
      description: "Show mastery of modern syntax, promises, and async programming.",
      questions: [
        {
          type: "multiple-choice",
          question: "What will this log?\n\nconst f = (x) => x * 2;\nconsole.log(f(21));",
          options: ["21", "42", "2", "undefined"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "Which keyword lets you use promises like synchronous code?",
          options: ["async/await", "defer", "setTimeout", "promisify"],
          correctIndex: 0
        },
        {
          type: "multiple-choice",
          question: "What does fetch() return?",
          options: ["An array", "A promise", "A string", "A DOM node"],
          correctIndex: 1
        },
        {
          type: "coding" as const,
          question: "Write an async function 'getMessage' that returns the string 'Hello, async world!' using await with a promise.",
          testCases: [
            { input: "getMessage()", expected: "Hello, async world!" }
          ]
        },
        {
          type: "multiple-choice",
          question: "What is the event loop?",
          options: ["A loop that repeats code", "The mechanism that processes async callbacks when the stack is clear", "A type of for loop", "A browser animation"],
          correctIndex: 1
        },
      ]
    }
  },
  {
    title: "Data Structures & Algorithms",
    subtitle: "Think Like an Engineer",
    description: "Learn to measure and structure code: Big O, arrays, stacks, queues, recursion, and trees — the foundation of every interview and every great system.",
    color: "#f59e0b",
    resources: [
      { title: "freeCodeCamp: Big O Explained", url: "https://www.youtube.com/watch?v=Mo4vesaut8g0", type: "video" },
      { title: "GeeksforGeeks: Data Structures", url: "https://www.geeksforgeeks.org/data-structures/", type: "course" },
      { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
      { title: "MDN: Recursion", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion", type: "article" },
    ],
    lessons: [
      {
        title: "Big O Notation",
        description: "Measure how fast your code scales as data grows",
        content: `# Big O Notation

Big O describes **how runtime grows** as input size grows. It's the language engineers use to discuss performance.

## Common Complexities (fast → slow)

- **O(1)** — constant. Same speed no matter the input: reading \`arr[0]\`
- **O(log n)** — logarithmic. Doubling input adds one step: binary search
- **O(n)** — linear. One pass over the data: \`for\` loop
- **O(n log n)** — sorting: merge sort, quicksort
- **O(n²)** — quadratic. Nested loops

## Examples

\`\`\`javascript
// O(1) — constant
const first = arr[0];

// O(n) — linear
for (const item of arr) {
  console.log(item);
}

// O(n²) — nested loops
for (const a of arr) {
  for (const b of arr) {
    console.log(a, b);
  }
}
\`\`\`

## How to Analyze

1. Count the loops — each nested loop multiplies by n
2. Drop constants — \`2n\` is still O(n)
3. Keep the largest term — \`n² + n\` is O(n²)

## Key Concepts

- **Big O** — worst-case growth rate of an algorithm
- **O(1), O(n), O(n²)** — constant, linear, quadratic
- **Drop constants, keep the biggest term**`,
        taskDescription: "Write a function 'findMax' that returns the largest number in an array in O(n) time, returning 0 for an empty array.",
        starterCode: `// Write findMax(arr) returning the largest element in O(n)
// Return 0 for an empty array

`,
        solutionCode: `function findMax(arr) {
  if (arr.length === 0) return 0;
  let max = arr[0];
  for (const n of arr) {
    if (n > max) max = n;
  }
  return max;
}`,
        quizQuestions: [
          {
            question: "What's the complexity of a single for loop over n items?",
            options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
            correctIndex: 1
          },
          {
            question: "Reading one element by index (arr[0]) is...?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
            correctIndex: 2
          },
          {
            question: "Two nested loops over n items is...?",
            options: ["O(n)", "O(2n)", "O(n²)", "O(log n)"],
            correctIndex: 2
          },
        ],
      },
      {
        title: "Arrays & Strings",
        description: "Master the workhorse structures used in nearly every program",
        content: `# Arrays & Strings

Arrays and strings are the most-used data structures in JavaScript. Knowing their methods (and costs) makes you faster.

## Array Methods

\`\`\`javascript
const arr = [1, 2, 3];
arr.push(4);            // add to end:    [1,2,3,4]
arr.pop();              // remove end:    [1,2,3]
arr.unshift(0);         // add to front:  [0,1,2,3]
arr.shift();            // remove front:  [1,2,3]
arr.indexOf(2);         // find index: 1
arr.includes(3);        // true
arr.slice(0, 2);        // copy [1,2] — doesn't mutate
arr.splice(1, 1);       // remove 1 item at index 1
\`\`\`

## Transforming

\`\`\`javascript
const nums = [1, 2, 3, 4];
nums.map((n) => n * 2);            // [2,4,6,8]
nums.filter((n) => n > 2);         // [3,4]
nums.reduce((sum, n) => sum + n, 0); // 10
nums.sort((a, b) => a - b);        // ascending
\`\`\`

## Strings

\`\`\`javascript
const s = "hello";
s.length;              // 5
s.toUpperCase();       // "HELLO"
s.split("");           // ['h','e','l','l','o']
s.includes("ell");     // true
s.slice(1, 3);         // "el"
\`\`\`

Strings are **immutable** — methods return new strings.

## Key Concepts

- **push/pop** — O(1) at the end
- **unshift/shift** — O(n), it shifts everything
- **map/filter/reduce** — transform data functionally
- **Strings are immutable**`,
        taskDescription: "Write a function 'reverseString' that takes a string and returns it reversed (e.g. 'hello' → 'olleh'). Hint: split → reverse → join.",
        starterCode: `// Write reverseString(str) — return the string reversed
// e.g. reverseString("hello") → "olleh"

`,
        solutionCode: `function reverseString(str) {
  return str.split("").reverse().join("");
}`,
        quizQuestions: [
          {
            question: "Which method adds an item to the END of an array?",
            options: ["unshift", "push", "shift", "concat"],
            correctIndex: 1
          },
          {
            question: "What does arr.slice(0, 2) do?",
            options: ["Removes items permanently", "Returns a copy of items 0-1 without mutating", "Sorts the array", "Joins the array"],
            correctIndex: 1
          },
          {
            question: "Are strings mutable in JavaScript?",
            options: ["Yes", "No — methods return new strings", "Only uppercase ones", "Only in strict mode"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Stacks & Queues",
        description: "Order data with LIFO and FIFO structures",
        content: `# Stacks & Queues

Two simple but powerful ordering structures.

## Stack — LIFO (Last In, First Out)

Like a pile of plates: the last one added is the first removed.

\`\`\`javascript
class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  get size() { return this.items.length; }
}

const s = new Stack();
s.push(1); s.push(2);
console.log(s.pop()); // 2 — LIFO!
\`\`\`

Real uses: undo/redo, browser back button, function call stack.

## Queue — FIFO (First In, First Out)

Like a line at a store: first come, first served.

\`\`\`javascript
class Queue {
  constructor() { this.items = []; }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.shift(); }
  peek() { return this.items[0]; }
  get size() { return this.items.length; }
}

const q = new Queue();
q.enqueue(1); q.enqueue(2);
console.log(q.dequeue()); // 1 — FIFO!
\`\`\`

Real uses: task queues, print jobs, message buffers.

## Key Concepts

- **Stack** — LIFO: push/pop at the same end
- **Queue** — FIFO: enqueue at back, dequeue at front
- Both built on arrays for simplicity`,
        taskDescription: "Build a Stack class with push, pop, peek, and a size getter. Then: push(10), push(20), pop() once, and peek the top (should be 10).",
        starterCode: `// Build a Stack class with push(), pop(), peek(), and a size getter
// Then: push(10), push(20), pop() once, peek the top

`,
        solutionCode: `class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  get size() { return this.items.length; }
}
const s = new Stack();
s.push(10);
s.push(20);
s.pop();
console.log(s.peek()); // 10`,
        quizQuestions: [
          {
            question: "A stack is...?",
            options: ["FIFO", "LIFO", "Random access", "Alphabetical"],
            correctIndex: 1
          },
          {
            question: "A queue is...?",
            options: ["LIFO", "FIFO", "Random", "Sorted"],
            correctIndex: 1
          },
          {
            question: "Which real-world thing behaves like a stack?",
            options: ["A checkout line", "The undo button", "A printer queue", "A playlist shuffle"],
            correctIndex: 1
          },
        ],
      },
      {
        title: "Recursion & Trees",
        description: "Solve problems by breaking them into smaller versions of themselves",
        content: `# Recursion & Trees

A recursive function **calls itself** on a smaller input until it hits a **base case**.

## The Two Parts

1. **Base case** — when to stop
2. **Recursive case** — call yourself with a smaller problem

\`\`\`javascript
function factorial(n) {
  if (n <= 1) return 1;        // base case
  return n * factorial(n - 1); // recursive case
}
factorial(5); // 120
\`\`\`

## Trees

A **tree** is data in parent/child nodes. The most famous: binary search trees.

\`\`\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Visit every node: recursion shines here
function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.value);
  inorder(node.right);
}
\`\`\`

## Why It Matters

Recursion is the natural way to handle trees, file systems, JSON, and divide-and-conquer algorithms.

## Key Concepts

- **Base case** — stops recursion
- **Recursive case** — calls itself on smaller input
- **Tree** — hierarchical nodes with left/right children
- Recursion = elegant tree traversal`,
        taskDescription: "Write a recursive function 'sumUpTo' that returns the sum of all integers from 1 to n (e.g. sumUpTo(5) → 15).",
        starterCode: `// Write recursive sumUpTo(n) — sum of 1..n
// sumUpTo(5) → 15

`,
        solutionCode: `function sumUpTo(n) {
  if (n <= 1) return n;
  return n + sumUpTo(n - 1);
}`,
        quizQuestions: [
          {
            question: "What stops infinite recursion?",
            options: ["A return", "The base case", "console.log", "Strict mode"],
            correctIndex: 1
          },
          {
            question: "What is a tree?",
            options: ["A sorted array", "Data in parent/child nodes", "A type of loop", "A stack of values"],
            correctIndex: 1
          },
          {
            question: "sumUpTo(3) evaluates to?",
            options: ["3", "6", "9", "5"],
            correctIndex: 1
          },
        ],
      },
    ],
    exam: {
      title: "Data Structures & Algorithms Exam",
      description: "Prove you can analyze complexity and build core data structures.",
      questions: [
        {
          type: "multiple-choice",
          question: "What is the time complexity of looking up a key in a JavaScript object?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
          correctIndex: 2
        },
        {
          type: "multiple-choice",
          question: "Which structure is FIFO?",
          options: ["Stack", "Queue", "Tree", "Object"],
          correctIndex: 1
        },
        {
          type: "multiple-choice",
          question: "What does this print?\n\nfunction f(n) {\n  if (n <= 1) return 1;\n  return n + f(n - 1);\n}\nconsole.log(f(4));",
          options: ["4", "6", "10", "15"],
          correctIndex: 2
        },
        {
          type: "coding" as const,
          question: "Write a function 'countVowels' that returns how many vowels (a, e, i, o, u) are in a string.",
          testCases: [
            { input: "countVowels('hello')", expected: "2" }
          ]
        },
        {
          type: "multiple-choice",
          question: "Dropping constants, what is 3n + 5?",
          options: ["O(3n)", "O(n)", "O(5)", "O(n²)"],
          correctIndex: 1
        },
      ]
    }
  },
];

// ============================================================
// Device guides — the school tailors setup + tips to the
// device the student chooses when they start (Mac / Windows / Android).
// `setupSteps` is indexed by curriculum level (0 = Zero, 1 = Beginner, ...)
// ============================================================

export interface DeviceGuide {
  id: DeviceId;
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: "laptop" | "monitor" | "smartphone" | "pc";
  lessonTip: string;
  setupSteps: { title: string; steps: string[] }[];
  /** Free setup tutorials for this device, indexed by curriculum level (0, 1, 2, ...) */
  setupResources: Resource[][];
}

export const DEVICES: DeviceGuide[] = [
  {
    id: "mac",
    name: "Mac",
    tagline: "macOS",
    description:
      "Apple's laptop or desktop. Great for developers — Terminal and Unix tools are built right in.",
    color: "#94a3b8",
    icon: "laptop",
    lessonTip:
      "Pro tip: on a Mac, ⌘ + Enter runs your code in most editors and this sandbox.",
    setupSteps: [
      {
        title: "Zero — Getting Started",
        steps: [
          "No installs needed! The CodeSchool editor runs right in your browser, so you can start coding today.",
          "Use Safari or Chrome and keep this tab open while you learn.",
          "Later on, you can continue lessons from your iPhone's Safari too — progress saves automatically.",
        ],
      },
      {
        title: "Beginner — Real Tools",
        steps: [
          "Install Visual Studio Code from code.visualstudio.com — the free editor most pros use.",
          "Open the Terminal app (Finder → Applications → Utilities) to practice running commands.",
          "Install Node.js LTS from nodejs.org so you can run JavaScript outside the browser.",
        ],
      },
      {
        title: "Intermediate — Power Setup",
        steps: [
          "Install Homebrew (brew.sh) — the Mac package manager — by pasting the install command into Terminal.",
          "Run `brew install node` to keep Node updated, then check with `node --version`.",
          "Use Spotlight (⌘ + Space) to launch Terminal, VS Code, and apps instantly.",
        ],
      },
    ],
    setupResources: [
      [
        { title: "Mac Basics (Apple Support)", url: "https://support.apple.com/guide/mac-help/welcome/mac", type: "guide" },
        { title: "Safari User Guide", url: "https://support.apple.com/guide/safari/welcome/mac", type: "guide" },
        { title: "Mac Keyboard Shortcuts", url: "https://support.apple.com/en-us/102650", type: "reference" },
      ],
      [
        { title: "Install VS Code on macOS", url: "https://code.visualstudio.com/docs/setup/mac", type: "tutorial" },
        { title: "Install Node.js (LTS)", url: "https://nodejs.org/en/download", type: "download" },
        { title: "Terminal User Guide (Apple)", url: "https://support.apple.com/guide/terminal/welcome/mac", type: "guide" },
      ],
      [
        { title: "Homebrew — the Mac package manager", url: "https://brew.sh/", type: "tool" },
        { title: "Install Git on Mac", url: "https://git-scm.com/download/mac", type: "download" },
        { title: "VS Code Key Bindings", url: "https://code.visualstudio.com/docs/getstarted/keybindings", type: "reference" },
      ],
    ],
  },
  {
    id: "windows",
    name: "Windows",
    tagline: "Windows 10 / 11",
    description:
      "The world's most common OS. Everything works here — from the browser editor to a full WSL developer setup.",
    color: "#3b82f6",
    icon: "monitor",
    lessonTip:
      "Pro tip: on Windows, Ctrl + Enter runs your code in most editors and this sandbox.",
    setupSteps: [
      {
        title: "Zero — Getting Started",
        steps: [
          "No installs needed! The CodeSchool editor runs right in your browser, so you can start coding today.",
          "Use Microsoft Edge or Chrome and keep this tab open while you learn.",
          "Everything in this level works on any Windows PC or laptop.",
        ],
      },
      {
        title: "Beginner — Real Tools",
        steps: [
          "Install Visual Studio Code from code.visualstudio.com — the free editor most pros use.",
          "Open PowerShell (search 'PowerShell' in the Start menu) to practice running commands.",
          "Install Node.js LTS from nodejs.org so you can run JavaScript outside the browser.",
        ],
      },
      {
        title: "Intermediate — Power Setup",
        steps: [
          "Enable Windows Subsystem for Linux: open an admin PowerShell and run `wsl --install`, then restart.",
          "Inside WSL, install Node with `sudo apt install nodejs npm`.",
          "Pin VS Code to your taskbar and enable the 'WSL' extension for a real dev environment.",
        ],
      },
    ],
    setupResources: [
      [
        { title: "Windows Help & Learning", url: "https://support.microsoft.com/en-us/windows", type: "guide" },
        { title: "Microsoft Edge Support", url: "https://support.microsoft.com/en-us/microsoft-edge", type: "guide" },
      ],
      [
        { title: "Install VS Code on Windows", url: "https://code.visualstudio.com/docs/setup/windows", type: "tutorial" },
        { title: "Install Node.js (LTS)", url: "https://nodejs.org/en/download", type: "download" },
        { title: "PowerShell Documentation", url: "https://learn.microsoft.com/en-us/powershell/", type: "docs" },
      ],
      [
        { title: "Install WSL (Windows Subsystem for Linux)", url: "https://learn.microsoft.com/en-us/windows/wsl/install", type: "tutorial" },
        { title: "Windows Terminal Docs", url: "https://learn.microsoft.com/en-us/windows/terminal/", type: "docs" },
        { title: "Develop in WSL with VS Code", url: "https://code.visualstudio.com/docs/remote/wsl", type: "tutorial" },
      ],
    ],
  },
  {
    id: "android",
    name: "Android",
    tagline: "Phone / Tablet",
    description:
      "Learning from your phone or tablet is totally possible. CodeSchool's editor runs in your browser — no PC required.",
    color: "#22c55e",
    icon: "smartphone",
    lessonTip:
      "Pro tip: on Android, just tap the Run button — no keyboard shortcut needed.",
    setupSteps: [
      {
        title: "Zero — Getting Started",
        steps: [
          "You're learning from a phone or tablet — no problem! The CodeSchool editor runs entirely in your browser.",
          "Use Chrome on Android for the best experience and keep this tab open.",
          "All lessons and the built-in code sandbox work perfectly on your device.",
        ],
      },
      {
        title: "Beginner — Real Tools",
        steps: [
          "Install Termux from the Play Store (or F-Droid) — a real Linux terminal for your phone.",
          "In Termux, run `pkg install nodejs` to install Node.js.",
          "Optional: install the Acode app for a lightweight code editor made for phones.",
        ],
      },
      {
        title: "Intermediate — Power Setup",
        steps: [
          "Use Termux in split-screen with Acode (or CodeSchool) to edit and run code side by side.",
          "Connect a Bluetooth or USB-C keyboard — typing code with your thumbs gets old fast!",
          "Keep practicing in the built-in sandbox: it runs your JavaScript instantly on any device.",
        ],
      },
    ],
    setupResources: [
      [
        { title: "Android.com — about your device", url: "https://www.android.com/", type: "guide" },
        { title: "Chrome for Android (Play Store)", url: "https://play.google.com/store/apps/details?id=com.android.chrome", type: "download" },
      ],
      [
        { title: "Install Termux (F-Droid)", url: "https://f-droid.org/en/packages/com.termux/", type: "download" },
        { title: "Termux Wiki — getting started", url: "https://wiki.termux.com/wiki/Main_Page", type: "wiki" },
        { title: "Acode — code editor for phones", url: "https://play.google.com/store/apps/details?id=com.foxdebug.acode", type: "download" },
      ],
      [
        { title: "Termux Wiki — managing packages", url: "https://wiki.termux.com/wiki/Main_Page", type: "wiki" },
        { title: "Node.js Learning (official)", url: "https://nodejs.org/en/learn", type: "docs" },
        { title: "Termux on GitHub", url: "https://github.com/termux/termux-app", type: "repo" },
      ],
    ],
  },
  {
    id: "linux",
    name: "Linux",
    tagline: "Ubuntu / Fedora / etc.",
    description:
      "The developer's favorite. A real terminal and package manager come built in — perfect for learning how code really runs.",
    color: "#eab308",
    icon: "pc",
    lessonTip:
      "Pro tip: on Linux, Ctrl + Enter runs your code in most editors and this sandbox.",
    setupSteps: [
      {
        title: "Zero — Getting Started",
        steps: [
          "No installs needed! The CodeSchool editor runs right in your browser, so you can start coding today.",
          "Use Firefox or Chrome and keep this tab open while you learn.",
          "Everything in this level works on any Linux distribution.",
        ],
      },
      {
        title: "Beginner — Real Tools",
        steps: [
          "Install Visual Studio Code from code.visualstudio.com (the .deb/.rpm installer or `sudo snap install code --classic`).",
          "Open your terminal — on Ubuntu it's Ctrl + Alt + T — to practice running commands.",
          "Install Node.js LTS from nodejs.org, or with `sudo apt install nodejs npm` (Debian/Ubuntu) or your distro's package manager.",
        ],
      },
      {
        title: "Intermediate — Power Setup",
        steps: [
          "Learn your package manager: `apt` (Debian/Ubuntu), `dnf` (Fedora), or `pacman` (Arch).",
          "Install Git with `sudo apt install git` (or equivalent) and check `git --version`.",
          "Create an SSH key for GitHub with `ssh-keygen -t ed25519` and add it to your GitHub account.",
        ],
      },
    ],
    setupResources: [
      [
        { title: "Ubuntu Desktop Guide", url: "https://ubuntu.com/desktop", type: "guide" },
        { title: "Ubuntu Documentation", url: "https://help.ubuntu.com/", type: "docs" },
      ],
      [
        { title: "Install VS Code on Linux", url: "https://code.visualstudio.com/docs/setup/linux", type: "tutorial" },
        { title: "Install Node.js (LTS)", url: "https://nodejs.org/en/download", type: "download" },
        { title: "Command Line for Beginners (Ubuntu)", url: "https://ubuntu.com/tutorials/command-line-for-beginners", type: "tutorial" },
      ],
      [
        { title: "Install Git on Linux", url: "https://git-scm.com/download/linux", type: "download" },
        { title: "Command Line for Beginners (Ubuntu)", url: "https://ubuntu.com/tutorials/command-line-for-beginners", type: "tutorial" },
        { title: "Node.js Learning (official)", url: "https://nodejs.org/en/learn", type: "docs" },
      ],
    ],
  },
];

// ============================================================
// Device detection — pre-selects the student's device from
// their browser so they only have to tap to confirm.
// ============================================================

export function detectDevice(): DeviceId | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";

  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "android"; // mobile Safari — closest match
  if (/mac|macintosh|mac os x/i.test(ua + " " + platform)) return "mac";
  if (/win(dows)?/i.test(platform) || /windows/i.test(ua)) return "windows";
  if (/linux|ubuntu|fedora|debian/i.test(platform + " " + ua)) return "linux";
  return null;
}

// ============================================================
// Lesson-level device tips — keyed by `${levelIdx}-${lessonIdx}`.
// Falls back to the device's generic lessonTip when a lesson
// has no specific tip.
// ============================================================

const LESSON_DEVICE_TIPS: Record<string, Partial<Record<DeviceId, string>>> = {
  // Level 0 — Zero
  "0-0": {
    mac: "Try the example in the editor above — it runs in your browser, no setup needed on a Mac.",
    windows: "Try the example in the editor above — it runs in your browser, no setup needed on Windows.",
    android: "Try the example in the editor — it runs right on your phone, no installs needed.",
    linux: "Try the example in the editor above — it runs in your browser, no setup needed on Linux.",
  },
  "0-1": {
    android: "Tip: on a phone, switch the editor to full screen for more room while typing.",
  },
  "0-2": {
    mac: "On a Mac, ⌘ + / toggles comments — handy for experimenting with operators.",
    windows: "On Windows, Ctrl + / toggles comments — handy for experimenting with operators.",
    linux: "On Linux, Ctrl + / toggles comments — handy for experimenting with operators.",
  },
  // Level 1 — Beginner
  "1-1": {
    mac: "Later, test functions in Terminal with `node yourfile.js` — Macs include Node-friendly tooling.",
    windows: "Later, test functions in PowerShell with `node yourfile.js` after installing Node.js.",
    linux: "Later, test functions in your terminal with `node yourfile.js` — Linux terminals are a coder's home.",
  },
  "1-3": {
    android: "In Termux, you can test arrays by running `node -e 'console.log([1,2,3])'` from your phone.",
  },
  // Level 2 — Intermediate
  "2-0": {
    mac: "On a Mac, use Spotlight (⌘ + Space) to jump between Terminal and your editor fast.",
    windows: "On Windows, Win + → snaps your editor and PowerShell side by side for easier testing.",
    linux: "On Linux, use Alt + Tab or a tiling shortcut to keep your editor and terminal side by side.",
  },
  "2-1": {
    android: "On Android, use Termux split-screen (swipe from the left edge) to edit and run side by side.",
    mac: "On a Mac, ⌘ + Option + I opens the browser console — great for exploring scope live.",
    windows: "On Windows, Ctrl + Shift + I opens the browser console — great for exploring scope live.",
    linux: "On Linux, Ctrl + Shift + I opens the browser console — great for exploring scope live.",
  },
};

export function getLessonDeviceTip(
  levelIdx: number,
  lessonIdx: number,
  device: DeviceId | null | undefined
): string | null {
  const guide = getDeviceById(device);
  if (!guide) return null;
  const specific = LESSON_DEVICE_TIPS[`${levelIdx}-${lessonIdx}`]?.[guide.id];
  return specific ?? guide.lessonTip;
}

export function getDeviceById(id: DeviceId | null | undefined): DeviceGuide | null {
  if (!id) return null;
  return DEVICES.find((d) => d.id === id) ?? null;
}
