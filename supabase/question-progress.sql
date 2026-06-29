-- ============================================================================
-- AceBoard — official-question progress tracking.
-- Tracks, per user, which official College Board questions (by Question ID)
-- they've practiced / finished / saved. No question content is stored here.
-- Safe to re-run.
-- ============================================================================

create table if not exists public.question_progress (
  user_id     uuid not null references auth.users (id) on delete cascade,
  external_id text not null,                         -- College Board Question ID
  status      text check (status in ('practiced', 'done')),
  saved       boolean not null default false,
  updated_at  timestamptz not null default now(),
  primary key (user_id, external_id)
);

alter table public.question_progress enable row level security;

drop policy if exists "qp_select_own" on public.question_progress;
drop policy if exists "qp_insert_own" on public.question_progress;
drop policy if exists "qp_update_own" on public.question_progress;
drop policy if exists "qp_delete_own" on public.question_progress;

create policy "qp_select_own" on public.question_progress
  for select using (auth.uid() = user_id);
create policy "qp_insert_own" on public.question_progress
  for insert with check (auth.uid() = user_id);
create policy "qp_update_own" on public.question_progress
  for update using (auth.uid() = user_id);
create policy "qp_delete_own" on public.question_progress
  for delete using (auth.uid() = user_id);
