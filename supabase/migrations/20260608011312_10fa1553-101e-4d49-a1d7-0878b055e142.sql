
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🎓',
  color TEXT NOT NULL DEFAULT 'electric',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.communities TO anon, authenticated;
GRANT ALL ON public.communities TO service_role;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Communities viewable by everyone" ON public.communities FOR SELECT USING (true);

CREATE TABLE public.community_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.community_messages TO authenticated;
GRANT ALL ON public.community_messages TO service_role;
ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages viewable by authenticated" ON public.community_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users post as themselves" ON public.community_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own messages" ON public.community_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX community_messages_community_idx ON public.community_messages (community_id, created_at DESC);

ALTER TABLE public.community_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;

INSERT INTO public.communities (slug, name, emoji, color) VALUES
  ('engenharia-civil', 'Engenharia Civil', '🏗️', 'electric'),
  ('engenharia-de-software', 'Engenharia de Software', '💻', 'electric'),
  ('engenharia-mecanica', 'Engenharia Mecânica', '⚙️', 'electric'),
  ('engenharia-eletrica', 'Engenharia Elétrica', '⚡', 'electric'),
  ('medicina', 'Medicina', '🩺', 'hotpink'),
  ('enfermagem', 'Enfermagem', '💉', 'hotpink'),
  ('odontologia', 'Odontologia', '🦷', 'hotpink'),
  ('psicologia', 'Psicologia', '🧠', 'hotpink'),
  ('direito', 'Direito', '⚖️', 'ink'),
  ('administracao', 'Administração', '📊', 'ink'),
  ('economia', 'Economia', '💹', 'ink'),
  ('contabilidade', 'Ciências Contábeis', '🧮', 'ink'),
  ('arquitetura', 'Arquitetura e Urbanismo', '📐', 'electric'),
  ('design', 'Design', '🎨', 'hotpink'),
  ('publicidade', 'Publicidade e Propaganda', '📣', 'hotpink'),
  ('jornalismo', 'Jornalismo', '📰', 'ink'),
  ('letras', 'Letras', '📚', 'ink'),
  ('pedagogia', 'Pedagogia', '🍎', 'electric'),
  ('biologia', 'Ciências Biológicas', '🧬', 'electric'),
  ('quimica', 'Química', '⚗️', 'electric'),
  ('fisica', 'Física', '🔭', 'electric'),
  ('matematica', 'Matemática', '➗', 'electric'),
  ('ciencia-computacao', 'Ciência da Computação', '🖥️', 'electric'),
  ('sistemas-informacao', 'Sistemas de Informação', '🗄️', 'electric'),
  ('nutricao', 'Nutrição', '🥗', 'hotpink'),
  ('fisioterapia', 'Fisioterapia', '🏃', 'hotpink'),
  ('veterinaria', 'Medicina Veterinária', '🐾', 'hotpink'),
  ('agronomia', 'Agronomia', '🌱', 'electric'),
  ('relacoes-internacionais', 'Relações Internacionais', '🌍', 'ink'),
  ('historia', 'História', '🏛️', 'ink');
