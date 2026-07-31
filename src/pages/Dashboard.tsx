import { Link } from "react-router-dom";
import { useAuth, SetupNotice, LoadingScreen } from "../lib/auth";
import { CURRICULUM } from "../lib/curriculum";
import {
  getProfile,
  getProgress,
  getMyCertificates,
} from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Trophy,
  GraduationCap,
  BookOpen,
  Code2,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const { session, ready } = useAuth();
  const { data: profile, loading: loadingProfile } = useAsync(getProfile, [
    session?.user?.id,
  ]);
  const { data: progress, loading: loadingProgress } = useAsync(getProgress, [
    session?.user?.id,
  ]);
  const { data: certificates, loading: loadingCerts } = useAsync(
    getMyCertificates,
    [session?.user?.id]
  );

  if (!ready) return <SetupNotice />;
  if (loadingProfile || loadingProgress || loadingCerts) return <LoadingScreen />;

  const levelsWithProgress = CURRICULUM.map((level, index) => {
    const rows = (progress ?? []).filter((p) => p.level_id === index);
    return {
      index,
      title: level.title,
      description: level.description,
      color: level.color,
      totalLessons: level.lessons.length,
      completedLessons: rows.length,
    };
  });

  const totalLessons = levelsWithProgress.reduce((sum, l) => sum + l.totalLessons, 0);
  const completedLessons = levelsWithProgress.reduce(
    (sum, l) => sum + l.completedLessons,
    0
  );
  const currentLevel = profile?.current_level ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-cs-100 mb-2">
          Welcome back{profile?.display_name ? `, ${profile.display_name}` : ""}!
        </h1>
        <p className="text-cs-400">
          Continue your learning journey. You've completed {completedLessons} of {totalLessons} lessons.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Levels Available", value: levelsWithProgress.length.toString(), icon: BookOpen, color: "accent" },
          { label: "Lessons Done", value: completedLessons.toString(), icon: Code2, color: "success" },
          { label: "Level Progress", value: `${Math.round((completedLessons / (totalLessons || 1)) * 100)}%`, icon: GraduationCap, color: "warning" },
          { label: "Certificates", value: (certificates?.length ?? 0).toString(), icon: Trophy, color: "accent" },
        ].map((stat) => (
          <Card key={stat.label} variant="glass" className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    stat.color === "accent"
                      ? "rgba(99,102,241,0.15)"
                      : stat.color === "success"
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(245,158,11,0.15)",
                }}
              >
                <stat.icon
                  className={`w-5 h-5 ${
                    stat.color === "accent"
                      ? "text-accent"
                      : stat.color === "success"
                        ? "text-success"
                        : "text-warning"
                  }`}
                />
              </div>
              <div>
                <div className="text-xl font-bold text-cs-100">{stat.value}</div>
                <div className="text-xs text-cs-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-cs-100 mb-4">Curriculum Path</h2>
      <div className="space-y-4">
        {levelsWithProgress.map((level, index) => {
          const isLocked = index > currentLevel;
          const isComplete =
            level.completedLessons === level.totalLessons && level.totalLessons > 0;
          const isCurrent = index === currentLevel;

          return (
            <Link
              key={level.index}
              to={isLocked ? "#" : `/levels/${level.index}`}
              className={`block group ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <Card
                variant={isCurrent ? "highlight" : "glass"}
                className="p-5 flex items-center gap-5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${level.color}20` }}
                >
                  {isLocked ? (
                    <Lock className="w-5 h-5" style={{ color: level.color }} />
                  ) : isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <span className="text-lg font-bold" style={{ color: level.color }}>
                      {index}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-cs-100 group-hover:text-accent transition-colors">
                      {level.title}
                    </h3>
                    {isComplete && (
                      <Badge variant="success" size="sm">Completed</Badge>
                    )}
                    {isCurrent && (
                      <Badge variant="accent" size="sm">In Progress</Badge>
                    )}
                  </div>
                  <p className="text-sm text-cs-400 line-clamp-1">{level.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress
                      value={level.completedLessons}
                      max={level.totalLessons}
                      size="sm"
                      barClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                    <span className="text-xs text-cs-500 font-mono whitespace-nowrap">
                      {level.completedLessons}/{level.totalLessons} lessons
                    </span>
                  </div>
                </div>

                {!isLocked && (
                  <ArrowRight className="w-5 h-5 text-cs-500 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                )}
              </Card>
            </Link>
          );
        })}
      </div>

      {(progress ?? []).length === 0 && (
        <div className="mt-8 p-5 rounded-2xl border border-accent/20 bg-accent-muted/30">
          <p className="text-sm text-cs-300 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-accent" />
            Start with <span className="font-semibold text-cs-100">Level 0</span> and work your
            way up — lessons unlock as you progress.
          </p>
        </div>
      )}
    </div>
  );
}
