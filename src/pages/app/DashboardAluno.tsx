import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, Profile } from "@/hooks/useAuth";
import { AppShell } from "@/components/app/AppShell";
import { GraduationCap, Search, Send, Check, Clock, X } from "lucide-react";
import { toast } from "sonner";

type RequestRow = {
  id: string;
  mentor_id: string;
  status: "pending" | "accepted" | "declined";
  message: string;
  created_at: string;
  mentor: Pick<Profile, "id" | "full_name" | "university" | "course"> | null;
};

const DashboardAluno = () => {
  const { user, profile } = useAuth();
  const [mentors, setMentors] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [query, setQuery] = useState("");
  const [sendingTo, setSendingTo] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const loadMentors = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "mentor")
      .order("created_at", { ascending: false });
    setMentors((data as Profile[]) ?? []);
  };

  const loadRequests = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("mentorship_requests")
      .select("id, mentor_id, status, message, created_at, mentor:profiles!mentorship_requests_mentor_id_fkey(id, full_name, university, course)")
      .eq("student_id", user.id)
      .order("created_at", { ascending: false });
    setRequests((data as unknown as RequestRow[]) ?? []);
  };

  useEffect(() => {
    loadMentors();
    loadRequests();
  }, [user]);

  const sendRequest = async (mentorId: string) => {
    if (!user) return;
    const { error } = await supabase.from("mentorship_requests").insert({
      mentor_id: mentorId,
      student_id: user.id,
      message: message.trim() || "Oi! Gostaria de conversar com você sobre seu curso.",
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Pedido enviado!");
    setSendingTo(null);
    setMessage("");
    loadRequests();
  };

  const filtered = mentors.filter((m) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      m.full_name?.toLowerCase().includes(q) ||
      m.university?.toLowerCase().includes(q) ||
      m.course?.toLowerCase().includes(q)
    );
  });

  const statusBadge = (s: RequestRow["status"]) => {
    const map = {
      pending: { label: "Aguardando", icon: Clock, cls: "bg-ink/10 text-ink/70" },
      accepted: { label: "Aceito", icon: Check, cls: "bg-electric/15 text-electric" },
      declined: { label: "Recusado", icon: X, cls: "bg-hotpink/15 text-hotpink" },
    } as const;
    const it = map[s];
    const Icon = it.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold ${it.cls}`}>
        <Icon className="size-3" /> {it.label}
      </span>
    );
  };

  return (
    <AppShell accent="electric">
      <section className="mb-10">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full mb-5">
          <GraduationCap className="size-3.5" /> Painel do aluno
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-[-0.04em] mb-3">
          Olá, {profile?.full_name?.split(" ")[0] || "aluno"}.
        </h1>
        <p className="text-ink/65 max-w-xl">
          Descubra universitários que viveram o que você está prestes a viver. Mande uma mensagem.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">Mentores disponíveis</h2>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Curso, universidade, nome..."
              className="w-full bg-paper border border-ink/10 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-electric focus:ring-4 focus:ring-electric/15"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-ink/15 rounded-3xl text-ink/55">
            Nenhum mentor encontrado ainda. Volte em breve!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((m) => (
              <article key={m.id} className="bg-paper border border-ink/8 rounded-3xl p-6 hover:shadow-soft transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-full bg-electric/15 text-electric flex items-center justify-center font-semibold">
                    {(m.full_name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-ink leading-tight">{m.full_name}</p>
                    <p className="text-xs text-ink/55">{m.course || "—"}</p>
                  </div>
                </div>
                <p className="text-sm text-ink/65 mb-1">
                  <span className="font-semibold text-ink/80">Universidade:</span> {m.university || "—"}
                </p>
                {m.period && (
                  <p className="text-sm text-ink/65 mb-1">
                    <span className="font-semibold text-ink/80">Período:</span> {m.period}
                  </p>
                )}
                {m.bio && <p className="text-sm text-ink/60 mt-3 line-clamp-3">{m.bio}</p>}

                {sendingTo === m.id ? (
                  <div className="mt-4 space-y-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Conte por que quer conversar..."
                      rows={3}
                      className="w-full bg-softgray rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => sendRequest(m.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-electric text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:opacity-90"
                      >
                        <Send className="size-3.5" /> Enviar
                      </button>
                      <button
                        onClick={() => { setSendingTo(null); setMessage(""); }}
                        className="px-4 py-3 rounded-full border border-ink/15 text-xs uppercase tracking-[0.16em] font-semibold text-ink/70 hover:bg-softgray"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setSendingTo(m.id); setMessage(""); }}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-ink text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:bg-electric transition-colors"
                  >
                    <Send className="size-3.5" /> Pedir mentoria
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-6">Meus pedidos</h2>
        {requests.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm">
            Você ainda não pediu mentoria.
          </div>
        ) : (
          <ul className="space-y-3">
            {requests.map((r) => (
              <li key={r.id} className="bg-paper border border-ink/8 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{r.mentor?.full_name ?? "Mentor"}</p>
                  <p className="text-xs text-ink/55">{r.mentor?.course} · {r.mentor?.university}</p>
                  <p className="text-sm text-ink/65 mt-1 italic">"{r.message}"</p>
                </div>
                {statusBadge(r.status)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
};

export default DashboardAluno;