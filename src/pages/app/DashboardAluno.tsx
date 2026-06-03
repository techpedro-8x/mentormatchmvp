import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, Profile } from "@/hooks/useAuth";
import { AppShell } from "@/components/app/AppShell";
import { GraduationCap, Search, Send, Check, Clock, X, CalendarClock } from "lucide-react";
import { toast } from "sonner";

type RequestRow = {
  id: string;
  mentor_id: string;
  status: "pending" | "accepted" | "declined";
  message: string;
  created_at: string;
  mentor: Pick<Profile, "id" | "full_name" | "university" | "course"> | null;
  slot: { id: string; slot_at: string } | null;
};

type Slot = { id: string; mentor_id: string; slot_at: string; booked: boolean };

const DashboardAluno = () => {
  const { user, profile } = useAuth();
  const [mentors, setMentors] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [query, setQuery] = useState("");
  const [openMentor, setOpenMentor] = useState<string | null>(null);

  const loadMentors = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "mentor")
      .order("created_at", { ascending: false });
    setMentors((data as Profile[]) ?? []);
  };

  const loadSlots = async () => {
    const { data } = await supabase
      .from("mentor_availability")
      .select("*")
      .eq("booked", false)
      .gte("slot_at", new Date().toISOString())
      .order("slot_at", { ascending: true });
    setSlots((data as Slot[]) ?? []);
  };

  const loadRequests = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("mentorship_requests")
      .select(
        "id, mentor_id, status, message, created_at, mentor:profiles!mentorship_requests_mentor_id_fkey(id, full_name, university, course), slot:mentor_availability(id, slot_at)"
      )
      .eq("student_id", user.id)
      .order("created_at", { ascending: false });
    setRequests((data as unknown as RequestRow[]) ?? []);
  };

  useEffect(() => {
    loadMentors();
    loadSlots();
    loadRequests();
  }, [user]);

  const fmtSlot = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const bookSlot = async (mentor: Profile, slot: Slot) => {
    if (!user) return;
    const { error: reqError } = await supabase.from("mentorship_requests").insert({
      mentor_id: mentor.id,
      student_id: user.id,
      message: `Reserva para ${fmtSlot(slot.slot_at)}`,
      slot_id: slot.id,
    });
    if (reqError) {
      toast.error(reqError.message);
      return;
    }
    await supabase.from("mentor_availability").update({ booked: true }).eq("id", slot.id);
    toast.success("Horário reservado!");
    setOpenMentor(null);
    loadSlots();
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

  const slotsByMentor = (mentorId: string) => slots.filter((s) => s.mentor_id === mentorId);

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
      <section className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full mb-4 sm:mb-5">
          <GraduationCap className="size-3.5" /> Painel do aluno
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl tracking-[-0.04em] mb-2 sm:mb-3 break-words">
          Olá, {profile?.full_name?.split(" ")[0] || "aluno"}.
        </h1>
        <p className="text-ink/65 max-w-xl text-sm sm:text-base">
          Descubra universitários disponíveis e reserve um horário direto na agenda deles.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight">Mentores disponíveis</h2>
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
          <div className="text-center py-12 sm:py-16 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm px-4">
            Nenhum mentor encontrado ainda. Volte em breve!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((m) => {
              const mentorSlots = slotsByMentor(m.id);
              const isOpen = openMentor === m.id;
              return (
                <article key={m.id} className="bg-paper border border-ink/8 rounded-3xl p-5 sm:p-6 hover:shadow-soft transition-all flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 shrink-0 rounded-full bg-electric/15 text-electric flex items-center justify-center font-semibold">
                      {(m.full_name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-ink leading-tight truncate">{m.full_name}</p>
                      <p className="text-xs text-ink/55 truncate">{m.course || "—"}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-ink/65">
                    <p><span className="font-semibold text-ink/80">Curso:</span> {m.course || "—"}</p>
                    <p><span className="font-semibold text-ink/80">Universidade:</span> {m.university || "—"}</p>
                    {m.period && <p><span className="font-semibold text-ink/80">Período:</span> {m.period}</p>}
                  </div>
                  {m.bio && <p className="text-sm text-ink/60 mt-3 line-clamp-3">{m.bio}</p>}

                  <div className="mt-4 pt-4 border-t border-ink/8">
                    <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-ink/55 mb-3 flex items-center gap-1.5">
                      <CalendarClock className="size-3" /> Horários disponíveis ({mentorSlots.length})
                    </p>
                    {mentorSlots.length === 0 ? (
                      <p className="text-xs text-ink/50 italic">Sem horários no momento.</p>
                    ) : isOpen ? (
                      <div className="space-y-2">
                        {mentorSlots.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => bookSlot(m, s)}
                            className="w-full text-left text-sm bg-softgray hover:bg-electric hover:text-paper rounded-2xl px-4 py-2.5 transition-colors flex items-center justify-between gap-2"
                          >
                            <span className="truncate">{fmtSlot(s.slot_at)}</span>
                            <Send className="size-3.5 shrink-0" />
                          </button>
                        ))}
                        <button
                          onClick={() => setOpenMentor(null)}
                          className="w-full text-[10px] uppercase tracking-[0.16em] font-semibold text-ink/50 hover:text-ink py-1"
                        >
                          Fechar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setOpenMentor(m.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-ink text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:bg-electric transition-colors"
                      >
                        <CalendarClock className="size-3.5" /> Ver horários
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight mb-6">Minhas reservas</h2>
        {requests.length === 0 ? (
          <div className="text-center py-10 sm:py-12 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm px-4">
            Você ainda não reservou nenhum horário.
          </div>
        ) : (
          <ul className="space-y-3">
            {requests.map((r) => (
              <li key={r.id} className="bg-paper border border-ink/8 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate">{r.mentor?.full_name ?? "Mentor"}</p>
                  <p className="text-xs text-ink/55 truncate">{r.mentor?.course} · {r.mentor?.university}</p>
                  {r.slot && (
                    <p className="text-sm text-electric mt-1 inline-flex items-center gap-1.5 font-medium">
                      <CalendarClock className="size-3.5" /> {fmtSlot(r.slot.slot_at)}
                    </p>
                  )}
                </div>
                <div className="shrink-0 self-start sm:self-auto">{statusBadge(r.status)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
};

export default DashboardAluno;