import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth, SetupNotice } from "../lib/auth";
import { CURRICULUM, getDeviceById, getLessonDeviceTip } from "../lib/curriculum";
import { getProfile, getProgress, completeLesson } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import CodeEditor from "../components/CodeEditor";
import AITutor from "../components/AITutor";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Bot,
  Sparkles,
  Code,
  MonitorSmartphone,
} from "lucide-react";

export default function Lesson() {
  const { lessonId } = useParams();
  const [levelIdx, lessonIdx] = (lessonId ?? "-")
    .split("-")
    .map((s) => parseInt(s, 10));
  const level = Number.isInteger(levelIdx) ? CURRICULUM[levelIdx] : null;
  const lesson = level && Number.isInteger(lessonIdx) ? level.lessons[lessonIdx] : null;

  const { session, ready } = useAuth();
  const { data: profile } = useAsync(getProfile, [session?.user?.id]);
  const { data: progress } = useAsync(getProgress, [session?.user?.id]);
  const deviceGuide = getDeviceById(profile?.device ?? null);
  const deviceTip = lesson ? getLessonDeviceTip(levelIdx, lessonIdx, profile?.device) : null;

  const [code, setCode] = useState("");
  const [completed, setCompleted] = useState(false);
  const [showTutor, setShowTutor] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (lesson) {
      setCode(lesson.starterCode);
      setQuizAnswers(new Array(lesson.quizQuestions.length).fill(-1));
      setQuizSubmitted(false);
      setQuizScore(0);
    }
  }, [lessonId, lesson]);

  const alreadyCompleted = lesson
    ? (progress ?? []).some(
        (p) => p.level_id === levelIdx && p.lesson_id === lessonIdx
      )
    : false;

  useEffect(() => {
    if (alreadyCompleted) setCompleted(true);
  }, [alreadyCompleted]);

  if (!ready) return <SetupNotice />;

  if (!lesson || !level) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card variant="glass" className="p-10 text-center">
          <p className="text-cs-400">Lesson not found.</p>
          <Link to="/dashboard" className="mt-4 inline-block">
            <Button variant="primary" size="sm">Go to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const regularLessons = level.lessons;
  const currentIndex = lessonIdx;
  const prevLesson = currentIndex > 0 ? regularLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < regularLessons.length - 1
      ? regularLessons[currentIndex + 1]
      : null;

  const handleQuizSubmit = async () => {
    let correct = 0;
    lesson.quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) correct++;
    });
    setQuizScore(correct);
    setQuizSubmitted(true);

    if (correct === lesson.quizQuestions.length) {
      setCompleted(true);
      try {
        await completeLesson(levelIdx, lessonIdx);
      } catch {
        // progress sync failed silently; local state still marks it complete
      }
    }
  };

  const handleMarkComplete = async () => {
    setCompleted(true);
    try {
      await completeLesson(levelIdx, lessonIdx);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link
          to={`/levels/${levelIdx}`}
          className="inline-flex items-center gap-1.5 text-sm text-cs-400 hover:text-cs-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Level
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-cs-500 font-mono">
            {currentIndex + 1} / {regularLessons.length}
          </span>
          <Progress value={currentIndex + 1} max={regularLessons.length} size="sm" className="w-24" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="accent" size="sm">Lesson {currentIndex + 1}</Badge>
                {completed && <Badge variant="success" size="sm">Completed</Badge>}
              </div>
              <CardTitle className="text-xl">{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
          </Card>

          <Card variant="glass">
            <CardContent>
              <div className="text-sm leading-relaxed text-cs-200 space-y-4">
                {lesson.content.split("\n").map((line: string, i: number) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={i} className="text-xl font-bold text-cs-100 mt-6 mb-2">
                        {line.slice(2)}
                      </h1>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-lg font-semibold text-cs-100 mt-5 mb-2">
                        {line.slice(3)}
                      </h2>
                    );
                  }
                  if (line.startsWith("```")) {
                    return null;
                  }
                  if (line.trim() === "") {
                    return <div key={i} className="h-2" />;
                  }
                  return (
                    <p key={i} className="text-cs-300 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>

              <div className="mt-4 bg-cs-800 rounded-xl border border-cs-700 overflow-hidden">
                <div className="px-4 py-2 bg-cs-700/50 border-b border-cs-700 flex items-center gap-2">
                  <Code className="w-4 h-4 text-accent" />
                  <span className="text-xs text-cs-400 font-mono">Example</span>
                </div>
                <CodeEditor starterCode={lesson.solutionCode} readOnly height="200px" />
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-4 h-4 text-accent" />
                Coding Task
              </CardTitle>
              <CardDescription>{lesson.taskDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              {deviceGuide && deviceTip && (
                <div
                  className="mb-4 flex items-start gap-2.5 text-xs rounded-lg border px-3 py-2.5"
                  style={{
                    borderColor: `${deviceGuide.color}40`,
                    backgroundColor: `${deviceGuide.color}14`,
                  }}
                >
                  <MonitorSmartphone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: deviceGuide.color }} />
                  <span className="text-cs-300">{deviceTip}</span>
                </div>
              )}
              <CodeEditor starterCode={code} onCodeChange={setCode} height="300px" />
            </CardContent>
          </Card>

          {lesson.quizQuestions.length > 0 && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warning" />
                  Quick Quiz
                </CardTitle>
                <CardDescription>Test your understanding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lesson.quizQuestions.map((q, qi) => (
                    <div key={qi} className="p-4 rounded-lg bg-cs-800/50 border border-cs-700">
                      <p className="text-sm text-cs-100 font-medium mb-3">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, oi) => {
                          let optionStyle = "border-cs-700 bg-cs-800 text-cs-300 hover:border-cs-500";
                          if (quizSubmitted) {
                            if (oi === q.correctIndex) {
                              optionStyle = "border-success bg-success-muted text-success";
                            } else if (oi === quizAnswers[qi] && oi !== q.correctIndex) {
                              optionStyle = "border-danger bg-danger-muted text-danger";
                            } else {
                              optionStyle = "border-cs-700 bg-cs-800 text-cs-500";
                            }
                          } else if (quizAnswers[qi] === oi) {
                            optionStyle = "border-accent bg-accent-muted text-cs-100";
                          }

                          return (
                            <button
                              key={oi}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  const newAnswers = [...quizAnswers];
                                  newAnswers[qi] = oi;
                                  setQuizAnswers(newAnswers);
                                }
                              }}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-2.5 rounded-lg border text-sm transition-all cursor-pointer ${optionStyle}`}
                            >
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-cs-700 text-xs font-mono mr-2 flex-shrink-0">
                                {String.fromCharCode(65 + oi)}
                              </span>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <Button
                    variant="primary"
                    size="md"
                    className="mt-4"
                    onClick={handleQuizSubmit}
                    disabled={quizAnswers.some((a) => a === -1)}
                  >
                    Submit Answers
                  </Button>
                ) : (
                  <div className="mt-4 p-3 rounded-lg bg-cs-800 border border-cs-700">
                    <p className="text-sm text-cs-300">
                      You got <span className="text-accent font-bold">{quizScore}</span> out of{" "}
                      <span className="text-cs-100 font-bold">{lesson.quizQuestions.length}</span> correct
                    </p>
                    {quizScore === lesson.quizQuestions.length && (
                      <p className="text-xs text-success mt-1">Perfect score! 🎉</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between py-4">
            {prevLesson ? (
              <Link to={`/learn/${levelIdx}-${currentIndex - 1}`}>
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4" />
                  Previous: {prevLesson.title}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-2">
              {!completed && (
                <Button variant="success" size="md" onClick={handleMarkComplete}>
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Complete
                </Button>
              )}
              {nextLesson ? (
                <Link to={`/learn/${levelIdx}-${currentIndex + 1}`}>
                  <Button variant="primary">
                    Next: {nextLesson.title}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link to={`/levels/${levelIdx}`}>
                  <Button variant="primary">
                    <BookOpen className="w-4 h-4" />
                    Level Complete
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            {showTutor ? (
              <AITutor
                lessonTitle={lesson.title}
                lessonContent={lesson.content}
                taskDescription={lesson.taskDescription}
                userCode={code}
                deviceName={deviceGuide?.name ?? null}
              />
            ) : (
              <Card
                variant="glass"
                className="text-center p-8 h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent-muted flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-cs-100 mb-2">AI Tutor</h3>
                <p className="text-sm text-cs-400 mb-4">
                  Need help? Ask the AI tutor questions, get hints, or request code review.
                </p>
                <Button variant="primary" onClick={() => setShowTutor(true)} className="w-full">
                  <Bot className="w-4 h-4" />
                  Open AI Tutor
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
