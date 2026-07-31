-- ============================================================
-- CodeSchool — Supabase Setup
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- TABLES ----------

-- User profiles (one row per auth user, auto-created on signup)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  device text,          -- 'mac' | 'windows' | 'android' (what device the student learns on)
  current_level int not null default 0,
  created_at timestamptz not null default now()
);

-- Migration-safe: adds the device column if you already ran the earlier version of this script
alter table public.profiles add column if not exists device text;

-- Completed lessons (level_id / lesson_id are the curriculum indices)
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  level_id int not null,
  lesson_id int not null,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- Exam submissions
create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  level_id int not null,
  score int not null default 0,
  max_score int not null default 0,
  passed boolean not null default false,
  answers jsonb,
  submitted_at timestamptz not null default now()
);

-- Earned certificates (public verification by unique_code)
-- NOTE: level_id = -1 marks the special full-program Graduation Certificate
-- (awarded when the student passes the Capstone exam).
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  level_id int not null,
  user_name text not null default 'Student',
  level_title text not null,
  unique_code text not null unique,
  issued_at timestamptz not null default now()
);

-- ---------- TRIGGER: auto-create profile on signup ----------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(coalesce(new.email, 'student'), '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- ROW LEVEL SECURITY ----------

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.certificates enable row level security;

-- profiles: users manage only their own row
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update using (auth.uid() = id);

-- user_progress: only your own
drop policy if exists "progress select own" on public.user_progress;
create policy "progress select own" on public.user_progress for select using (auth.uid() = user_id);

drop policy if exists "progress insert own" on public.user_progress;
create policy "progress insert own" on public.user_progress for insert with check (auth.uid() = user_id);

drop policy if exists "progress delete own" on public.user_progress;
create policy "progress delete own" on public.user_progress for delete using (auth.uid() = user_id);

-- exam_attempts: only your own
drop policy if exists "attempts select own" on public.exam_attempts;
create policy "attempts select own" on public.exam_attempts for select using (auth.uid() = user_id);

drop policy if exists "attempts insert own" on public.exam_attempts;
create policy "attempts insert own" on public.exam_attempts for insert with check (auth.uid() = user_id);

-- certificates: anyone can view (public verification by code), only the owner creates
drop policy if exists "certificates select all" on public.certificates;
create policy "certificates select all" on public.certificates for select using (true);

drop policy if exists "certificates insert own" on public.certificates;
create policy "certificates insert own" on public.certificates for insert with check (auth.uid() = user_id);
