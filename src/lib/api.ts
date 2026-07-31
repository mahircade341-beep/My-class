import { supabase } from "./supabase";
import { generateCode } from "./utils";

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  current_level: number;
  created_at: string;
}

export interface ProgressRow {
  id: string;
  user_id: string;
  level_id: number;
  lesson_id: number;
  completed_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  level_id: number;
  user_name: string;
  level_title: string;
  unique_code: string;
  issued_at: string;
}

async function requireUser() {
  if (!supabase) throw new Error("Supabase is not configured yet.");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("You must be signed in.");
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

export async function getProgress(): Promise<ProgressRow[]> {
  const user = await requireUser();
  const { data, error } = await supabase!
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id);
  if (error) throw error;
  return (data as ProgressRow[]) ?? [];
}

export async function completeLesson(
  levelId: number,
  lessonId: number
): Promise<void> {
  const user = await requireUser();
  const { error } = await supabase!.from("user_progress").upsert(
    {
      user_id: user.id,
      level_id: levelId,
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id", ignoreDuplicates: true }
  );
  if (error) throw error;
}

export async function hasPassed(levelId: number): Promise<boolean> {
  const user = await requireUser();
  const { data, error } = await supabase!
    .from("exam_attempts")
    .select("passed")
    .eq("user_id", user.id)
    .eq("level_id", levelId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data?.passed === true;
}

export async function submitExam(input: {
  levelId: number;
  score: number;
  maxScore: number;
  answers: unknown;
  levelTitle: string;
  userName: string;
}): Promise<{ passed: boolean; certificateId: string | null }> {
  const user = await requireUser();
  const passed =
    input.maxScore > 0 && input.score / input.maxScore >= 0.8;

  const { error } = await supabase!.from("exam_attempts").insert({
    user_id: user.id,
    level_id: input.levelId,
    score: input.score,
    max_score: input.maxScore,
    passed,
    answers: input.answers,
    submitted_at: new Date().toISOString(),
  });
  if (error) throw error;

  let certificateId: string | null = null;
  if (passed) {
    const { data: profile } = await supabase!
      .from("profiles")
      .select("current_level")
      .eq("id", user.id)
      .maybeSingle();
    const current = (profile as Profile | null)?.current_level ?? 0;
    const next = Math.max(current, input.levelId + 1);
    if (next !== current) {
      await supabase!
        .from("profiles")
        .update({ current_level: next })
        .eq("id", user.id);
    }
    certificateId = await generateCertificate(
      input.levelId,
      input.levelTitle,
      input.userName
    );
  }

  return { passed, certificateId };
}

async function generateCertificate(
  levelId: number,
  levelTitle: string,
  userName: string
): Promise<string> {
  const user = await requireUser();

  const { data: existing } = await supabase!
    .from("certificates")
    .select("id")
    .eq("user_id", user.id)
    .eq("level_id", levelId)
    .maybeSingle();
  if (existing) return existing.id as string;

  for (let i = 0; i < 5; i++) {
    const { data, error } = await supabase!
      .from("certificates")
      .insert({
        user_id: user.id,
        level_id: levelId,
        user_name: userName,
        level_title: levelTitle,
        unique_code: generateCode(),
      })
      .select("id")
      .single();
    if (!error && data) return data.id as string;
  }
  throw new Error("Could not generate a unique certificate code. Try again.");
}

export async function getMyCertificates(): Promise<Certificate[]> {
  const user = await requireUser();
  const { data, error } = await supabase!
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false });
  if (error) throw error;
  return (data as Certificate[]) ?? [];
}

export async function getCertificate(
  idOrCode: string
): Promise<Certificate | null> {
  if (!supabase) return null;
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrCode
    );

  if (!isUuid) {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("unique_code", idOrCode)
      .maybeSingle();
    if (error) throw error;
    return (data as Certificate) ?? null;
  }

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", idOrCode)
    .maybeSingle();
  if (error) {
    const { data: d2, error: e2 } = await supabase
      .from("certificates")
      .select("*")
      .eq("unique_code", idOrCode)
      .maybeSingle();
    if (e2) throw e2;
    return (d2 as Certificate) ?? null;
  }
  return (data as Certificate) ?? null;
}
