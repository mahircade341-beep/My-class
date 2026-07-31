import { useParams, Link } from "react-router-dom";
import { useAuth, SetupNotice, LoadingScreen } from "../lib/auth";
import { CURRICULUM, getDeviceById, detectDevice } from "../lib/curriculum";
import type { DeviceId } from "../lib/types";
import { getProfile, getProgress, hasPassed, updateDevice } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { useState } from "react";
import DevicePicker from "../components/DevicePicker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Trophy,
  ExternalLink,
  FileText,
  Brain,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";

export default function LevelDetail() {
  const { levelId } = useParams();
  const idx = parseInt(levelId ?? "", 10);
  const level = Number.isInteger(idx) && CURRICULUM[idx] ? CURRICULUM[idx] : null;
  const { session, ready } = useAuth();

  const [pendingDevice, setPendingDevice] = useState<DeviceId | null>(null);
  const [savingDevice, setSavingDevice] = useState(false);
  const [detected] = useState<DeviceId | null>(detectDevice);
  const { data: profile } = useAsync(getProfile, [session?.user?.id]);
  const { data: progress } = useAsync(getProgress, [session?.user?.id]);
  const { data: examPassed, loading: loadingExam } = useAsync(
    () => (Number.isInteger(idx) ? hasPassed(idx).catch(() => false) : Promise.resolve(false)),
    [session?.user?.id, idx]
  );

  const deviceGuide = getDeviceById(pendingDevice ?? profile?.device);

  const handleDeviceSelect = async (d: DeviceId) => {
    setSavingDevice(true);
    try {
      await updateDevice(d);
      setPendingDevice(d);
    } finally {
      setSavingDevice(false);
    }
  };

  if (!ready) return <SetupNotice />;

  if (!level) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-cs-400 hover:text-cs-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Card variant="glass" className="p-10 text-center">
          <p className="text-cs-400">Level not found.</p>
          <Link to="/dashboard" className="mt-4 inline-block">
            <Button variant="primary" size="sm">Go to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loadingExam) return <LoadingScreen />;

  const completedCount = (progress ?? []).filter((p) => p.level_id === idx).length;
  const totalLessons = level.lessons.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-cs-400 hover:text-cs-200 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Level Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: level.color }}
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-cs-100">{level.title}</h1>
        </div>
        <p className="text-cs-400 mb-4">{level.description}</p>
        <Progress value={completedCount} max={totalLessons} size="md" showLabel />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lessons */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-cs-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Lessons
          </h2>
          <div className="space-y-3">
            {level.lessons.map((lesson, i) => {
              const done = (progress ?? []).some(
                (p) => p.level_id === idx && p.lesson_id === i
              );
              return (
                <Link key={i} to={`/learn/${idx}-${i}`}>
                  <Card
                    variant="glass"
                    className="p-4 hover:border-accent/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors ${
                          done ? "bg-success-muted" : "bg-accent-muted"
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <span className="text-sm font-bold text-accent">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-cs-100 group-hover:text-accent transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-cs-400 mt-0.5">{lesson.description}</p>
                      </div>
                      <PlayCircle className="w-5 h-5 text-cs-500 group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Device setup — the school tailors this to your device */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MonitorSmartphone className="w-4 h-4" style={{ color: deviceGuide?.color ?? "#6366f1" }} />
                {deviceGuide ? `Setup for ${deviceGuide.name}` : "Setup for your device"}
              </CardTitle>
              <CardDescription>
                {deviceGuide
                  ? "How to follow this level on your device"
                  : "Pick your device to get tailored setup steps for this level"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {deviceGuide ? (
                <div className="space-y-3">
                  {(() => {
                    const setup = deviceGuide.setupSteps[Math.min(idx, deviceGuide.setupSteps.length - 1)];
                    const resources =
                      deviceGuide.setupResources[Math.min(idx, deviceGuide.setupResources.length - 1)] ?? [];
                    return (
                      <>
                        <p className="text-xs font-semibold text-cs-300 uppercase tracking-wide">
                          {setup?.title}
                        </p>
                        <ul className="space-y-2">
                          {(setup?.steps ?? []).map((step, si) => (
                            <li key={si} className="flex items-start gap-2 text-sm text-cs-300">
                              <span
                                className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: `${deviceGuide.color}1f`, color: deviceGuide.color }}
                              >
                                {si + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>

                        {resources.length > 0 && (
                          <div className="pt-3 border-t border-cs-700">
                            <p className="text-xs font-semibold text-cs-300 uppercase tracking-wide mb-2">
                              Free tutorials for your device
                            </p>
                            <div className="space-y-2">
                              {resources.map((r, ri) => (
                                <a
                                  key={ri}
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-cs-300 hover:text-accent transition-colors group"
                                >
                                  <FileText className="w-3.5 h-3.5 text-cs-500 group-hover:text-accent flex-shrink-0" />
                                  <span className="truncate flex-1">{r.title}</span>
                                  <ExternalLink className="w-3 h-3 text-cs-600 group-hover:text-accent flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                  <Link
                    to="/profile"
                    className="inline-flex items-center gap-1.5 text-xs text-cs-500 hover:text-accent transition-colors underline underline-offset-2"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    Change device
                  </Link>
                </div>
              ) : (
                <DevicePicker
                  device={pendingDevice}
                  detected={detected}
                  onSelect={handleDeviceSelect}
                  saving={savingDevice}
                  compact
                />
              )}
            </CardContent>
          </Card>

          {/* Resources */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-accent" />
                Free Resources
              </CardTitle>
              <CardDescription>Curated learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {level.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-cs-700/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cs-700 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-cs-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cs-300 group-hover:text-accent transition-colors truncate">
                        {resource.title}
                      </p>
                      <span className="text-[10px] text-cs-500 uppercase">{resource.type}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-cs-600 group-hover:text-accent flex-shrink-0" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam Card */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-warning" />
                Level Exam
              </CardTitle>
              <CardDescription>Test your knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cs-400 mb-4">
                Complete all lessons and pass the exam with 80%+ to earn your certificate.
              </p>
              {examPassed ? (
                <div className="flex items-center gap-2 text-success mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Exam Passed!</span>
                </div>
              ) : (
                <Link to={`/exam/${idx}`}>
                  <Button variant="primary" size="md" className="w-full">
                    <Trophy className="w-4 h-4" />
                    Take Exam
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
