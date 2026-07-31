import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth, SetupNotice } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  Terminal,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Info,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const { session, ready } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  // Redirect once a session exists (after sign in / successful sign up)
  useEffect(() => {
    if (session) {
      navigate(returnTo, { replace: true });
    }
  }, [session, navigate, returnTo]);

  if (!ready) return <SetupNotice />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    try {
      if (!supabase) throw new Error("Backend not configured");

      if (mode === "signUp") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: name.trim() || email.split("@")[0] },
          },
        });
        if (err) throw err;
        if (!data.session) {
          setInfo(
            "Account created! Check your email to confirm your address, then sign in."
          );
        }
        // if a session was returned, the useEffect above redirects
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        // the useEffect above redirects on session change
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      if (/already registered/i.test(message)) {
        setError("An account with this email already exists. Try signing in.");
      } else if (/invalid login credentials/i.test(message)) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cs-900">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-cs-400 hover:text-cs-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card variant="glass" className="p-8">
          <CardHeader className="text-center mb-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-accent" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-cs-100">
              {mode === "signIn" ? "Welcome Back" : "Join CodeSchool"}
            </CardTitle>
            <CardDescription>
              {mode === "signIn"
                ? "Sign in to continue your learning journey"
                : "Create an account and start learning to code"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signUp" && (
                <div>
                  <label className="block text-sm font-medium text-cs-300 mb-1.5">
                    Name
                  </label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cs-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={cn(
                        "w-full bg-cs-700 text-cs-100 placeholder:text-cs-500 rounded-lg py-2.5 pl-10 pr-3",
                        "border border-cs-600 focus:border-accent focus:ring-1 focus:ring-accent transition-all",
                        "text-sm outline-none"
                      )}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-cs-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cs-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                      "w-full bg-cs-700 text-cs-100 placeholder:text-cs-500 rounded-lg py-2.5 pl-10 pr-3",
                      "border border-cs-600 focus:border-accent focus:ring-1 focus:ring-accent transition-all",
                      "text-sm outline-none"
                    )}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cs-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cs-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className={cn(
                      "w-full bg-cs-700 text-cs-100 placeholder:text-cs-500 rounded-lg py-2.5 pl-10 pr-10",
                      "border border-cs-600 focus:border-accent focus:ring-1 focus:ring-accent transition-all",
                      "text-sm outline-none"
                    )}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cs-500 hover:text-cs-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-danger-muted border border-danger/20">
                  <p className="text-sm text-danger">{error}</p>
                </div>
              )}

              {info && (
                <div className="p-3 rounded-lg bg-success-muted border border-success/20 flex items-start gap-2">
                  <Info className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-success">{info}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : mode === "signIn" ? (
                  <LogIn className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {mode === "signIn" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pt-2">
            <p className="text-sm text-cs-400">
              {mode === "signIn" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setMode(mode === "signIn" ? "signUp" : "signIn");
                  setError("");
                  setInfo("");
                }}
                className="text-accent hover:text-accent-hover font-medium transition-colors cursor-pointer"
              >
                {mode === "signIn" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
