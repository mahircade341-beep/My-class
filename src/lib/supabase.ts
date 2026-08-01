import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase configuration — public-by-design values with a build-time fallback.
//
// Vite bakes VITE_* env vars into the bundle AT BUILD TIME. If the machine
// that ran `vite build` (e.g. Vercel) had no VITE_SUPABASE_URL/ANON_KEY set,
// the deployed bundle ships without a backend. The Supabase project URL and
// anon key are PUBLIC by design — they ship in every browser bundle anyway —
// and the data is protected by Row Level Security, NOT by the anon key.
//
// Order matters: the env var wins when set (e.g. if you ever switch Supabase
// projects), and the baked-in fallback below covers EVERY deployment with
// zero environment setup.
//
// SECURITY: never add service_role keys or any secret here. Those belong
// server-side only (Supabase Edge Functions / serverless secrets) — see
// supabase/functions/tutor/index.ts which reads SAMBANOVA_API_KEY via
// Deno.env.get() and never exposes it to the browser.
// ---------------------------------------------------------------------------

export const env = {
  supabaseUrl:
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
    "https://pzyzofghmrlmvfgyvsno.supabase.co",
  supabaseAnonKey:
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6eXpvZmdobXJsbXZmZ3l2c25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NTUwNzUsImV4cCI6MjEwMTAzMTA3NX0.vDbBn9ZbdU1MQB7DYW-slpo8GtDmXQQ7PHS7_36aixA",
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(env.supabaseUrl, env.supabaseAnonKey)
  : null;
