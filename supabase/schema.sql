-- ============================================================================
-- AceBoard schema — run this once in the Supabase SQL Editor (entire file).
-- Safe to re-run: drops and recreates policies/triggers.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  first_name    text not null default 'Student',
  active_subject text not null default 'SAT',
  goal_score    int  not null default 1600,
  current_score int,
  test_date     date,
  created_at    timestamptz not null default now()
);

create table if not exists public.questions (
  id          uuid primary key default gen_random_uuid(),
  subject     text not null default 'SAT',
  domain      text not null,                 -- 'Math' | 'Reading and Writing'
  topic       text not null,
  difficulty  text not null default 'medium', -- 'easy' | 'medium' | 'hard'
  prompt      text not null,
  choices     jsonb not null,                -- [{ "key": "A", "text": "..." }, ...]
  correct_key text not null,
  explanation text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  question_id  uuid not null references public.questions (id) on delete cascade,
  selected_key text not null,
  is_correct   boolean not null,
  created_at   timestamptz not null default now()
);
create index if not exists attempts_user_created_idx
  on public.attempts (user_id, created_at desc);

create table if not exists public.saved_questions (
  user_id     uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- ---------------------------------------------------------------------------
-- Row-Level Security: each user sees only their own rows; questions are public.
-- ---------------------------------------------------------------------------

alter table public.profiles        enable row level security;
alter table public.questions       enable row level security;
alter table public.attempts        enable row level security;
alter table public.saved_questions enable row level security;

drop policy if exists "own profile read"   on public.profiles;
drop policy if exists "own profile write"  on public.profiles;
drop policy if exists "own profile update" on public.profiles;
create policy "own profile read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile write"  on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

drop policy if exists "questions readable" on public.questions;
create policy "questions readable" on public.questions for select to authenticated using (true);

drop policy if exists "own attempts read"   on public.attempts;
drop policy if exists "own attempts insert" on public.attempts;
create policy "own attempts read"   on public.attempts for select using (auth.uid() = user_id);
create policy "own attempts insert" on public.attempts for insert with check (auth.uid() = user_id);

drop policy if exists "own saved read"   on public.saved_questions;
drop policy if exists "own saved insert" on public.saved_questions;
drop policy if exists "own saved delete" on public.saved_questions;
create policy "own saved read"   on public.saved_questions for select using (auth.uid() = user_id);
create policy "own saved insert" on public.saved_questions for insert with check (auth.uid() = user_id);
create policy "own saved delete" on public.saved_questions for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Auto-create a profile row when a new auth user signs up.
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Seed questions (idempotent: only inserts when the table is empty).
-- ---------------------------------------------------------------------------

insert into public.questions (domain, topic, difficulty, prompt, choices, correct_key, explanation)
select * from (values
  -- ===== Math =====
  ('Math', 'Linear equations', 'easy',
   'If 3x + 7 = 22, what is the value of x?',
   '[{"key":"A","text":"3"},{"key":"B","text":"5"},{"key":"C","text":"7"},{"key":"D","text":"15"}]'::jsonb,
   'B', 'Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.'),

  ('Math', 'Linear functions', 'easy',
   'The function f is defined by f(x) = 2x - 3. What is the value of f(5)?',
   '[{"key":"A","text":"4"},{"key":"B","text":"7"},{"key":"C","text":"10"},{"key":"D","text":"13"}]'::jsonb,
   'B', 'f(5) = 2(5) - 3 = 10 - 3 = 7.'),

  ('Math', 'Slope', 'medium',
   'What is the slope of the line passing through the points (2, 3) and (4, 11)?',
   '[{"key":"A","text":"2"},{"key":"B","text":"3"},{"key":"C","text":"4"},{"key":"D","text":"8"}]'::jsonb,
   'C', 'Slope = (11 - 3) / (4 - 2) = 8 / 2 = 4.'),

  ('Math', 'Systems of equations', 'medium',
   'If x + y = 10 and x - y = 4, what is the value of xy?',
   '[{"key":"A","text":"16"},{"key":"B","text":"21"},{"key":"C","text":"24"},{"key":"D","text":"40"}]'::jsonb,
   'B', 'Adding the equations: 2x = 14, so x = 7 and y = 3. Then xy = 7 * 3 = 21.'),

  ('Math', 'Percentages', 'medium',
   'After a 20% discount, a jacket costs $40. What was its original price?',
   '[{"key":"A","text":"$48"},{"key":"B","text":"$50"},{"key":"C","text":"$60"},{"key":"D","text":"$8"}]'::jsonb,
   'B', 'The sale price is 80% of the original: 0.8 * original = 40, so original = 40 / 0.8 = $50.'),

  ('Math', 'Exponents', 'easy',
   'If 2^x = 32, what is the value of x?',
   '[{"key":"A","text":"4"},{"key":"B","text":"5"},{"key":"C","text":"6"},{"key":"D","text":"16"}]'::jsonb,
   'B', '32 = 2^5, so x = 5.'),

  ('Math', 'Quadratics', 'hard',
   'What is the sum of the solutions to x^2 - 5x + 6 = 0?',
   '[{"key":"A","text":"1"},{"key":"B","text":"5"},{"key":"C","text":"6"},{"key":"D","text":"-5"}]'::jsonb,
   'B', 'Factor: (x - 2)(x - 3) = 0, so x = 2 or x = 3. Their sum is 5 (also -b/a = 5).'),

  ('Math', 'Ratios', 'easy',
   'Two quantities are in the ratio 3 : 5. If the smaller quantity is 12, what is the larger?',
   '[{"key":"A","text":"15"},{"key":"B","text":"18"},{"key":"C","text":"20"},{"key":"D","text":"24"}]'::jsonb,
   'C', 'Each ratio unit equals 12 / 3 = 4. The larger quantity is 5 * 4 = 20.'),

  -- ===== Reading and Writing =====
  ('Reading and Writing', 'Subject-verb agreement', 'medium',
   'Choose the option that makes the sentence grammatically correct: "The collection of essays ___ widely praised by critics."',
   '[{"key":"A","text":"were"},{"key":"B","text":"have been"},{"key":"C","text":"was"},{"key":"D","text":"are"}]'::jsonb,
   'C', 'The subject is the singular noun "collection," not "essays," so it takes the singular verb "was."'),

  ('Reading and Writing', 'Punctuation', 'medium',
   'Which choice best joins the two independent clauses? "She studied for weeks ___ she felt fully prepared for the exam."',
   '[{"key":"A","text":", and"},{"key":"B","text":";"},{"key":"C","text":" (no punctuation)"},{"key":"D","text":":"}]'::jsonb,
   'B', 'Two independent clauses can be joined by a semicolon. A comma alone (without a conjunction) would be a comma splice.'),

  ('Reading and Writing', 'Transitions', 'easy',
   'Which transition best fits? "The first trial was inconclusive. ___, the team decided to repeat the experiment."',
   '[{"key":"A","text":"For example"},{"key":"B","text":"Therefore"},{"key":"C","text":"However"},{"key":"D","text":"In contrast"}]'::jsonb,
   'B', 'The repeated experiment is a logical consequence of the inconclusive result, signaling cause and effect: "Therefore."'),

  ('Reading and Writing', 'Words in context', 'medium',
   'Which word best completes the sentence? "Her ___ approach meant she questioned every assumption before accepting any conclusion."',
   '[{"key":"A","text":"skeptical"},{"key":"B","text":"careless"},{"key":"C","text":"indifferent"},{"key":"D","text":"hasty"}]'::jsonb,
   'A', 'Questioning assumptions before accepting conclusions describes a "skeptical" approach.'),

  ('Reading and Writing', 'Subject-verb agreement', 'hard',
   'Choose the correct verb: "Neither the coach nor the players ___ satisfied with the final score."',
   '[{"key":"A","text":"was"},{"key":"B","text":"were"},{"key":"C","text":"is"},{"key":"D","text":"has been"}]'::jsonb,
   'B', 'With "neither...nor," the verb agrees with the nearer subject, "players," which is plural, so use "were."'),

  ('Reading and Writing', 'Concision', 'easy',
   'Which choice is the most concise replacement for the underlined phrase? "___ it rained, the game was canceled." (underlined: Due to the fact that)',
   '[{"key":"A","text":"Owing to the fact that"},{"key":"B","text":"Because"},{"key":"C","text":"In light of the fact that"},{"key":"D","text":"On account of the fact that"}]'::jsonb,
   'B', '"Because" conveys the same meaning in a single word; the others are wordy.'),

  ('Reading and Writing', 'Modifiers', 'hard',
   'Which choice avoids a dangling modifier? "Walking to school, ___."',
   '[{"key":"A","text":"the rain began to fall"},{"key":"B","text":"Maria felt the first drops of rain"},{"key":"C","text":"it started raining on Maria"},{"key":"D","text":"the umbrella was left at home"}]'::jsonb,
   'B', 'The introductory phrase describes the person walking, so the subject that follows must be a person: "Maria."'),

  ('Reading and Writing', 'Apostrophes', 'easy',
   'Choose the correct word: "The committee announced ___ decision on Friday."',
   '[{"key":"A","text":"it''s"},{"key":"B","text":"its"},{"key":"C","text":"its''"},{"key":"D","text":"it"}]'::jsonb,
   'B', '"Its" is the possessive form. "It''s" is a contraction of "it is," which does not fit here.')
) as seed(domain, topic, difficulty, prompt, choices, correct_key, explanation)
where not exists (select 1 from public.questions);
