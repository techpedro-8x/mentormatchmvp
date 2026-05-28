
-- Roles enum
create type public.user_role as enum ('aluno', 'mentor');
create type public.request_status as enum ('pending', 'accepted', 'declined');

-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  full_name text not null default '',
  avatar_url text,
  -- aluno fields
  school text,
  grade text,
  -- mentor fields
  university text,
  course text,
  period text,
  bio text,
  areas text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.profiles to anon;
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Auto-create profile on signup using metadata
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name, school, grade, university, course, period)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'aluno'::public.user_role),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'school',
    new.raw_user_meta_data->>'grade',
    new.raw_user_meta_data->>'university',
    new.raw_user_meta_data->>'course',
    new.raw_user_meta_data->>'period'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Mentorship requests
create table public.mentorship_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  mentor_id uuid not null references public.profiles(id) on delete cascade,
  message text not null default '',
  status public.request_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index mentorship_requests_mentor_idx on public.mentorship_requests(mentor_id);
create index mentorship_requests_student_idx on public.mentorship_requests(student_id);

grant select, insert, update, delete on public.mentorship_requests to authenticated;
grant all on public.mentorship_requests to service_role;

alter table public.mentorship_requests enable row level security;

create policy "Students see own requests, mentors see requests to them"
  on public.mentorship_requests for select
  to authenticated
  using (auth.uid() = student_id or auth.uid() = mentor_id);

create policy "Students create requests as themselves"
  on public.mentorship_requests for insert
  to authenticated
  with check (auth.uid() = student_id);

create policy "Mentors update status on their requests"
  on public.mentorship_requests for update
  to authenticated
  using (auth.uid() = mentor_id);

create policy "Students can cancel own requests"
  on public.mentorship_requests for delete
  to authenticated
  using (auth.uid() = student_id);

create trigger mentorship_requests_set_updated_at
  before update on public.mentorship_requests
  for each row execute function public.set_updated_at();
