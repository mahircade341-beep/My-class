export type DeviceId = "mac" | "windows" | "android" | "linux";

export interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  title: string;
  description: string;
  content: string;
  taskDescription: string;
  starterCode: string;
  solutionCode: string;
  quizQuestions: QuizQuestion[];
}

export interface ExamQuestion {
  type: "multiple-choice" | "coding";
  question: string;
  options?: string[];
  correctIndex?: number;
  testCases?: { input: string; expected: string }[];
}

export interface Exam {
  title: string;
  description: string;
  questions: ExamQuestion[];
}

export interface Level {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  resources: Resource[];
  lessons: Lesson[];
  exam: Exam;
}
