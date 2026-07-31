import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  ready: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  loading: true,
  ready: isSupabaseConfigured,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, ready: isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cs-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-cs-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export function SetupNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cs-900 p-6">
      <div className="max-w-lg w-full p-8 rounded-2xl border border-warning/30 bg-warning-muted/10 text-center">
        <p className="text-lg font-semibold text-cs-100 mb-2">
          ⚙️ Backend not configured yet
        </p>
        <p className="text-sm text-cs-400 leading-relaxed">
          Add <code className="text-accent">VITE_SUPABASE_URL</code> and{" "}
          <code className="text-accent">VITE_SUPABASE_ANON_KEY</code> in the API Keys
          tab, then run the SQL from <code className="text-accent">supabase/schema.sql</code>{" "}
          in the Supabase SQL Editor. Everything else works automatically.
        </p>
      </div>
    </div>
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading, ready } = useAuth();
  const location = useLocation();

  if (!ready) return <SetupNotice />;
  if (loading) return <LoadingScreen />;
  if (!session) {
    return (
      <Navigate
        to={`/auth?returnTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  return <>{children}</>;
}
