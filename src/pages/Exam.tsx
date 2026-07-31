import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth, SetupNotice, LoadingScreen } from "../lib/auth";
import { CURRICULUM, GRADUATION_LEVEL_INDEX } from "../lib/curriculumFull";
import type { ExamQuestion } from "../lib/types";
import { getProfile, submitExam } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import CodeEditor from "../components/CodeEditor";
import {
  ArrowLeft,
  Trophy,
  Loader2,
  AlertTriangle,
  Award,
  GraduationCap,
} from "lucide-react";

export default function Exam() {
  const { levelId } = useParams();
  const idx = parseInt(levelId ?? "", 10);
  const level = Number.isInteger(idx) && CURRICULUM[idx] ? CURRICULUM[idx] : null;
  const exam = level?.exam ?? null;

  const { session, ready } = useAuth();
  const { data: profile } = useAsync(getProfile, [session?.user?.id]);

  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [codingCode, setCodingCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [graduationCertificateId, setGraduationCertificateId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (exam) {
      setQuestions(exam.questions);
      setAnswers(new Array(exam.questions.length).fill(-1));
      setCurrentQ(0);
      setSubmitted(false);
      setScore(0);
      setPassed(false);
      setCertificateId(null);
      setGraduationCertificateId(null);
      setCodingCode("");
    }
  }, [idx, exam]);

  if (!ready) return <SetupNotice />;

  if (!level || !exam) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card variant="glass" className="p-10 text-center">
          <p className="text-cs-400">Exam not found.</p>
          <Link to="/dashboard" className="mt-4 inline-block">
            <Button variant="primary" size="sm">Go to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleCodingSubmit = () => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = codingCode;
    setAnswers(newAnswers);
  };

  const handleSubmitExam = async () => {
    setSubmitting(true);
    let totalScore = 0;
    const maxScore = questions.length;

    questions.forEach((q, i) => {
      if (q.type === "multiple-choice") {
        if (answers[i] === q.correctIndex) totalScore++;
      } else {
        if (typeof answers[i] === "string" && (answers[i] as string).length > 0) {
          totalScore++;
        }
      }
    });

    const passedExam = maxScore > 0 && totalScore / maxScore >= 0.8;
    setScore(totalScore);
    setPassed(passedExam);
    setSubmitted(true);

    try {
      const result = await submitExam({
        levelId: idx,
        score: totalScore,
        maxScore,
        answers: answers.map((a) => ({ answer: a })),
        levelTitle: level.title,
        userName: profile?.display_name ?? "Student",
        isGraduation: idx === GRADUATION_LEVEL_INDEX,
      });
      setCertificateId(result.certificateId);
      setGraduationCertificateId(result.graduationCertificateId);
    } catch (err) {
      console.error("Failed to submit exam:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!questions.length) {
    return <LoadingScreen />;
  }

  const question = questions[currentQ];
  const isMcq = question?.type === "multiple-choice";
  const hasAnsweredAll = answers.every((a) => a !== -1 && a !== "");

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card variant="glass" className="text-center p-12">
          <div className="flex justify-center mb-6">
            {passed ? (
              <div className="w-20 h-20 rounded-full bg-success-muted flex items-center justify-center">
                <Trophy className="w-10 h-10 text-success" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-danger-muted flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-danger" />
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-cs-100 mb-2">
            {passed
              ? idx === GRADUATION_LEVEL_INDEX
                ? "You Graduated! 🎓"
                : "Congratulations!"
              : "Keep Trying!"}
          </h2>
          <p className="text-cs-400 mb-4">
            You scored {score} out of {questions.length} (
            {Math.round((score / questions.length) * 100)}%)
          </p>
          {passed && (
            <Badge
              variant="success"
              size="md"
              className="mb-4"
            >
              {idx === GRADUATION_LEVEL_INDEX
                ? "Program Complete — Graduated"
                : "Exam Passed"}
            </Badge>
          )}
          {passed && idx === GRADUATION_LEVEL_INDEX && (
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-400/30 rounded-xl px-4 py-2">
              <GraduationCap className="w-4 h-4" />
              You've completed the full CodeSchool software engineering program!
            </div>
          )}
          {!passed && (
            <p className="text-sm text-cs-500 mb-4">
              You need 80% to pass. Review the lessons and try again!
            </p>
          )}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {passed && graduationCertificateId && (
              <Link to={`/certificate/${graduationCertificateId}`}>
                <Button variant="success">
                  <GraduationCap className="w-4 h-4" />
                  View Graduation Certificate
                </Button>
              </Link>
            )}
            {passed && certificateId && (
              <Link to={`/certificate/${certificateId}`}>
                <Button variant="secondary">
                  <Award className="w-4 h-4" />
                  View Level Certificate
                </Button>
              </Link>
            )}
            <Link to={`/levels/${idx}`}>
              <Button variant="secondary">Back to Level</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/levels/${idx}`}
          className="inline-flex items-center gap-1.5 text-sm text-cs-400 hover:text-cs-200 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Level
        </Link>
        <h1 className="text-2xl font-bold text-cs-100">{exam.title}</h1>
        <p className="text-cs-400 text-sm mt-1">{exam.description}</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Progress value={currentQ + 1} max={questions.length} showLabel />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-cs-500">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-xs text-cs-500">Pass: 80%</span>
        </div>
      </div>

      {/* Question Card */}
      <Card variant="glass" className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={isMcq ? "accent" : "warning"} size="sm">
              {isMcq ? "Multiple Choice" : "Coding"}
            </Badge>
          </div>
          <CardTitle className="text-lg">
            <pre className="whitespace-pre-wrap font-sans text-cs-100">{question?.question}</pre>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isMcq ? (
            <div className="space-y-2">
              {question?.options?.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    answers[currentQ] === i
                      ? "border-accent bg-accent-muted text-cs-100"
                      : "border-cs-700 bg-cs-800 text-cs-300 hover:border-cs-500"
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-cs-700 text-xs font-mono mr-3 flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <CodeEditor
                starterCode="// Write your solution here"
                onCodeChange={setCodingCode}
                height="250px"
              />
              <Button
                variant="secondary"
                size="sm"
                className="mt-3"
                onClick={handleCodingSubmit}
                disabled={!codingCode.trim()}
              >
                Save Answer
              </Button>
              {typeof answers[currentQ] === "string" && (answers[currentQ] as string).length > 0 && (
                <span className="text-xs text-success ml-2">✓ Answer saved</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                currentQ === i
                  ? "bg-accent text-white"
                  : answers[i] !== -1 && answers[i] !== ""
                    ? "bg-success-muted text-success border border-success/30"
                    : "bg-cs-700 text-cs-400 hover:bg-cs-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQ < questions.length - 1 ? (
          <Button variant="ghost" onClick={() => setCurrentQ(currentQ + 1)}>
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmitExam}
            disabled={!hasAnsweredAll || submitting}
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trophy className="w-4 h-4" />
            )}
            Submit Exam
          </Button>
        )}
      </div>
    </div>
  );
}
