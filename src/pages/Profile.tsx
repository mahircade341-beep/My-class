import { Link } from "react-router-dom";
import { useAuth, SetupNotice, LoadingScreen } from "../lib/auth";
import { CURRICULUM } from "../lib/curriculum";
import { getProfile, getMyCertificates, getProgress } from "../lib/api";
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
import {
  User,
  Trophy,
  Award,
  ExternalLink,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { formatDate } from "../lib/utils";

export default function Profile() {
  const { session, ready } = useAuth();
  const { data: profile, loading: loadingProfile } = useAsync(getProfile, [
    session?.user?.id,
  ]);
  const { data: certificates, loading: loadingCerts } = useAsync(
    getMyCertificates,
    [session?.user?.id]
  );
  const { data: progress, loading: loadingProgress } = useAsync(getProgress, [
    session?.user?.id,
  ]);

  if (!ready) return <SetupNotice />;
  if (loadingProfile || loadingCerts || loadingProgress) return <LoadingScreen />;

  const levelsWithProgress = CURRICULUM.map((level, index) => {
    const rows = (progress ?? []).filter((p) => p.level_id === index);
    return {
      index,
      title: level.title,
      color: level.color,
      totalLessons: level.lessons.length,
      completedLessons: rows.length,
    };
  });

  const completedLessons = levelsWithProgress.reduce(
    (s, l) => s + l.completedLessons,
    0
  );
  const certCount = certificates?.length ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card variant="glass" className="mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-accent-muted flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-accent" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-cs-100">
              {profile?.display_name || "Student"}
            </h1>
            <p className="text-cs-400 text-sm">
              {profile?.email || session?.user?.email || "No email"}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="accent" size="sm">
                Level {profile?.current_level ?? 0}
              </Badge>
              <Badge variant="success" size="sm">
                {certCount} Certificate{certCount !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Levels", value: levelsWithProgress.length, icon: GraduationCap },
          { label: "Lessons Done", value: completedLessons, icon: BookOpen },
          { label: "Certificates", value: certCount, icon: Trophy },
        ].map((stat) => (
          <Card key={stat.label} variant="glass" className="p-4 text-center">
            <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-cs-100">{stat.value}</div>
            <div className="text-xs text-cs-500">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <Card variant="glass" className="mb-8">
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Your journey through the curriculum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {levelsWithProgress.map((level) => (
              <div key={level.index} className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: level.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-cs-100">
                      {level.title}
                    </span>
                    <span className="text-xs text-cs-500 font-mono">
                      {level.completedLessons}/{level.totalLessons}
                    </span>
                  </div>
                  <Progress
                    value={level.completedLessons}
                    max={level.totalLessons}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-warning" />
            Earned Certificates
          </CardTitle>
          <CardDescription>Printable certificates for completed levels</CardDescription>
        </CardHeader>
        <CardContent>
          {certCount === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-cs-600 mx-auto mb-3" />
              <p className="text-cs-500 text-sm">
                No certificates yet. Complete a level exam to earn one!
              </p>
              <Link to="/dashboard">
                <Button variant="secondary" size="sm" className="mt-3">
                  Continue Learning
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {(certificates ?? []).map((cert) => (
                <Link key={cert.id} to={`/certificate/${cert.id}`}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-cs-800/50 border border-cs-700 hover:border-accent/30 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-warning-muted flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-cs-100 group-hover:text-accent transition-colors">
                        {cert.level_title} Level
                      </h3>
                      <p className="text-xs text-cs-500 mt-0.5">
                        Issued {formatDate(cert.issued_at)} · Code: {cert.unique_code}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-cs-500 group-hover:text-accent transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
