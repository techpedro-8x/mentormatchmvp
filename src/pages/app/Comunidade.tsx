import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "@/components/app/AppShell";
import { Users, Search, Send, ArrowLeft, Trash2, GraduationCap, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Community = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  color: string;
};

type Message = {
  id: string;
  community_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: { full_name: string; role: "aluno" | "mentor"; course: string | null } | null;
};

const Comunidade = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const accent = profile?.role === "mentor" ? "hotpink" : "electric";
  const accentText = accent === "electric" ? "text-electric" : "text-hotpink";
  const accentBg = accent === "electric" ? "bg-electric" : "bg-hotpink";
  const accentBgSoft = accent === "electric" ? "bg-electric/10" : "bg-hotpink/10";

  const [communities, setCommunities] = useState<Community[]>([]);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const active = useMemo(() => communities.find((c) => c.slug === slug) ?? null, [communities, slug]);

  useEffect(() => {
    supabase
      .from("communities")
      .select("*")
      .order("name", { ascending: true })
      .then(({ data }) => setCommunities((data as Community[]) ?? []));
  }, []);

  const loadMessages = async (communityId: string) => {
    const { data } = await supabase
      .from("community_messages")
      .select("id, community_id, user_id, content, created_at, author:profiles!community_messages_user_id_fkey(full_name, role, course)")
      .eq("community_id", communityId)
      .order("created_at", { ascending: true })
      .limit(200);
    setMessages((data as unknown as Message[]) ?? []);
  };

  useEffect(() => {
    if (!active) {
      setMessages([]);
      return;
    }
    loadMessages(active.id);
    const channel = supabase
      .channel(`community-${active.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "community_messages", filter: `community_id=eq.${active.id}` },
        async (payload) => {
          const row = payload.new as Message;
          const { data: prof } = await supabase
            .from("profiles")
            .select("full_name, role, course")
            .eq("id", row.user_id)
            .maybeSingle();
          setMessages((prev) =>
            prev.some((m) => m.id === row.id) ? prev : [...prev, { ...row, author: prof as Message["author"] }],
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "community_messages", filter: `community_id=eq.${active.id}` },
        (payload) => {
          const old = payload.old as { id: string };
          setMessages((prev) => prev.filter((m) => m.id !== old.id));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [active?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !active || !draft.trim()) return;
    setSending(true);
    const content = draft.trim().slice(0, 2000);
    const { error } = await supabase.from("community_messages").insert({
      community_id: active.id,
      user_id: user.id,
      content,
    });
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDraft("");
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from("community_messages").delete().eq("id", id);
    if (error) toast.error(error.message);
  };

  const filtered = communities.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return c.name.toLowerCase().includes(q);
  });

  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const initialsOf = (name?: string) =>
    (name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  if (!active) {
    return (
      <AppShell accent={accent}>
        <section className="mb-8 sm:mb-10">
          <div className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold ${accentText} ${accentBgSoft} px-3 py-1.5 rounded-full mb-4 sm:mb-5`}>
            <Users className="size-3.5" /> Comunidades
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl tracking-[-0.04em] mb-2 sm:mb-3">
            Converse com quem vive o mesmo curso.
          </h1>
          <p className="text-ink/65 max-w-xl text-sm sm:text-base">
            Escolha uma comunidade abaixo para entrar no chat em grupo de alunos e mentores.
          </p>
        </section>

        <div className="relative w-full sm:max-w-md mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar curso..."
            className={`w-full bg-paper border border-ink/10 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-${accent} focus:ring-4 focus:ring-${accent}/15`}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm">
            Nenhuma comunidade encontrada.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((c) => {
              const colorBg = c.color === "hotpink" ? "bg-hotpink/10" : c.color === "ink" ? "bg-ink/10" : "bg-electric/10";
              const colorText = c.color === "hotpink" ? "text-hotpink" : c.color === "ink" ? "text-ink" : "text-electric";
              return (
                <Link
                  key={c.id}
                  to={`/app/comunidade/${c.slug}`}
                  className="group bg-paper border border-ink/8 rounded-3xl p-4 sm:p-5 hover:border-ink/30 hover:shadow-soft transition-all flex flex-col items-start gap-3"
                >
                  <div className={`size-12 rounded-2xl ${colorBg} ${colorText} flex items-center justify-center text-2xl`}>
                    {c.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink text-sm sm:text-base leading-tight">{c.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-ink/45 mt-1">
                      Entrar no chat →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </AppShell>
    );
  }

  // Chat view
  return (
    <AppShell accent={accent}>
      <button
        onClick={() => navigate("/app/comunidade")}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-ink/55 hover:text-ink mb-5"
      >
        <ArrowLeft className="size-3.5" /> Todas as comunidades
      </button>

      <section className="mb-6 flex items-center gap-4">
        <div className={`size-14 rounded-2xl ${accentBgSoft} ${accentText} flex items-center justify-center text-3xl shrink-0`}>
          {active.emoji}
        </div>
        <div className="min-w-0">
          <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.03em] truncate">{active.name}</h1>
          <p className="text-xs sm:text-sm text-ink/55">Chat aberto a alunos e mentores</p>
        </div>
      </section>

      <div className="bg-paper border border-ink/8 rounded-3xl overflow-hidden flex flex-col h-[70vh] min-h-[480px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-ink/45 text-sm gap-2">
              <Users className="size-8 text-ink/25" />
              Nenhuma mensagem ainda. Seja o primeiro a dizer oi!
            </div>
          ) : (
            messages.map((m) => {
              const mine = m.user_id === user?.id;
              const isMentor = m.author?.role === "mentor";
              const roleBadgeCls = isMentor ? "bg-hotpink/15 text-hotpink" : "bg-electric/15 text-electric";
              const RoleIcon = isMentor ? Sparkles : GraduationCap;
              return (
                <div key={m.id} className={`flex gap-3 ${mine ? "flex-row-reverse" : ""}`}>
                  <div className={`size-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${roleBadgeCls}`}>
                    {initialsOf(m.author?.full_name)}
                  </div>
                  <div className={`max-w-[75%] min-w-0 ${mine ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`flex items-center gap-2 mb-1 text-[11px] ${mine ? "flex-row-reverse" : ""}`}>
                      <span className="font-semibold text-ink truncate max-w-[140px]">
                        {mine ? "Você" : m.author?.full_name ?? "Usuário"}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.16em] font-semibold ${roleBadgeCls}`}>
                        <RoleIcon className="size-2.5" />
                        {isMentor ? "Mentor" : "Aluno"}
                      </span>
                      <span className="text-ink/40">{fmtTime(m.created_at)}</span>
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm break-words whitespace-pre-wrap ${mine ? `${accentBg} text-paper` : "bg-softgray text-ink"}`}>
                      {m.content}
                    </div>
                    {mine && (
                      <button
                        onClick={() => deleteMessage(m.id)}
                        className="mt-1 text-[10px] text-ink/40 hover:text-hotpink inline-flex items-center gap-1"
                      >
                        <Trash2 className="size-3" /> Apagar
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={sendMessage} className="border-t border-ink/8 p-3 sm:p-4 flex items-end gap-2 bg-paper">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e as unknown as React.FormEvent);
              }
            }}
            rows={1}
            maxLength={2000}
            placeholder={`Mensagem para ${active.name}...`}
            className={`flex-1 resize-none bg-softgray/60 border border-transparent rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-${accent} focus:bg-paper focus:ring-4 focus:ring-${accent}/15 max-h-32`}
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full ${accentBg} text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:opacity-90 disabled:opacity-50 shrink-0`}
          >
            <Send className="size-3.5" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </AppShell>
  );
};

export default Comunidade;