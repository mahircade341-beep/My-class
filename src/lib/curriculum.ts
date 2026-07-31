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
