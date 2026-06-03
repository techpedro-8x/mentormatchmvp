
-- Mentor availability slots
CREATE TABLE public.mentor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid NOT NULL,
  slot_at timestamptz NOT NULL,
  booked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.mentor_availability TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mentor_availability TO authenticated;
GRANT ALL ON public.mentor_availability TO service_role;

ALTER TABLE public.mentor_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Availability viewable by everyone"
  ON public.mentor_availability FOR SELECT
  USING (true);

CREATE POLICY "Mentors insert own availability"
  ON public.mentor_availability FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentor_id);

CREATE POLICY "Mentors update own availability"
  ON public.mentor_availability FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentor_id);

CREATE POLICY "Mentors delete own availability"
  ON public.mentor_availability FOR DELETE
  TO authenticated
  USING (auth.uid() = mentor_id);

-- Students can mark slot as booked when accepting (allow update of booked field by students booking)
CREATE POLICY "Students can book open slots"
  ON public.mentor_availability FOR UPDATE
  TO authenticated
  USING (booked = false)
  WITH CHECK (booked = true);

CREATE INDEX idx_mentor_availability_mentor ON public.mentor_availability(mentor_id, slot_at);

-- Add slot reference to mentorship_requests
ALTER TABLE public.mentorship_requests
  ADD COLUMN slot_id uuid REFERENCES public.mentor_availability(id) ON DELETE SET NULL;
