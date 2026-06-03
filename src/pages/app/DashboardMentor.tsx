import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, Profile } from "@/hooks/useAuth";
import { AppShell } from "@/components/app/AppShell";
import { Sparkles, Check, X, Save, CalendarClock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type RequestRow = {
  id: string;
  student_id: string;
  status: "pending" | "accepted" | "declined";
  message: string;
  created_at: string;
  student: Pick<Profile, "id" | "full_name" | "school" | "grade"> | null;
  slot: { id: string; slot_at: string } | null;
};

type Slot = { id: string; slot_at: string; booked: boolean };

const DashboardMentor = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [newSlot, setNewSlot] = useState("");
  const [bio, setBio] = useState("");
  const [areas, setAreas] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? "");
      setAreas((profile.areas ?? []).join(", "));
    }
  }, [profile]);

  const loadRequests = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("mentorship_requests")
      .select(
        "id, student_id, status, message, created_at, student:profiles!mentorship_requests_student_id_fkey(id, full_name, school, grade), slot:mentor_availability(id, slot_at)"
      )
      .eq("mentor_id", user.id)
      .order("created_at", { ascending: false });
    setRequests((data as unknown as RequestRow[]) ?? []);
  };

  const loadSlots = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("mentor_availability")
      .select("id, slot_at, booked")
      .eq("mentor_id", user.id)
      .order("slot_at", { ascending: true });
    setSlots((data as Slot[]) ?? []);
  };

  useEffect(() => {
    loadRequests();
    loadSlots();
  }, [user]);

  const addSlot = async () => {
    if (!user || !newSlot) return;
    const iso = new Date(newSlot).toISOString();
    if (new Date(iso) < new Date()) {
      toast.error("Escolha uma data futura.");
      return;
    }
    const { error } = await supabase.from("mentor_availability").insert({
      mentor_id: user.id,
      slot_at: iso,
    });
    if (error) return toast.error(error.message);
    toast.success("Horário adicionado!");
    setNewSlot("");
    loadSlots();
  };

  const removeSlot = async (id: string) => {
    const { error } = await supabase.from("mentor_availability").delete().eq("id", id);
    if (error) return toast.error(error.message);
    loadSlots();
  };

  const updateStatus = async (id: string, status: "accepted" | "declined") => {
    const { error } = await supabase.from("mentorship_requests").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(status === "accepted" ? "Pedido aceito!" : "Pedido recusado");
    loadRequests();
  };

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        bio: bio.trim() || null,
        areas: areas.split(",").map((a) => a.trim()).filter(Boolean),
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Perfil atualizado!");
    refreshProfile();
  };

  const fmtSlot = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const pending = requests.filter((r) => r.status === "pending");
  const history = requests.filter((r) => r.status !== "pending");

  return (
    <AppShell accent="hotpink">
      <section className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-hotpink bg-hotpink/10 px-3 py-1.5 rounded-full mb-4 sm:mb-5">
          <Sparkles className="size-3.5" /> Painel do mentor
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl tracking-[-0.04em] mb-2 sm:mb-3 break-words">
          Olá, {profile?.full_name?.split(" ")[0] || "mentor"}.
        </h1>
        <p className="text-ink/65 max-w-xl text-sm sm:text-base">
          {profile?.course} · {profile?.university}. Veja os pedidos de alunos e mantenha seu perfil afiado.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <section className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CalendarClock className="size-5 text-hotpink" /> Minha agenda
            </h2>
            <div className="bg-paper border border-ink/8 rounded-3xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="datetime-local"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="flex-1 bg-paper border border-ink/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-hotpink/15"
                />
                <button
                  onClick={addSlot}
                  disabled={!newSlot}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-hotpink text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  <Plus className="size-3.5" /> Adicionar
                </button>
              </div>
              {slots.length === 0 ? (
                <p className="text-sm text-ink/55 italic text-center py-4">
                  Adicione horários para que alunos possam reservar.
                </p>
              ) : (
                <ul className="space-y-2">
                  {slots.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-3 bg-softgray/60 rounded-2xl px-4 py-2.5 text-sm"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <CalendarClock className="size-3.5 shrink-0 text-hotpink" />
                        <span className="truncate">{fmtSlot(s.slot_at)}</span>
                        {s.booked && (
                          <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-electric shrink-0">
                            Reservado
                          </span>
                        )}
                      </span>
                      {!s.booked && (
                        <button
                          onClick={() => removeSlot(s.id)}
                          className="text-ink/40 hover:text-hotpink p-1"
                          aria-label="Remover horário"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight mb-5">
              Pedidos pendentes <span className="text-ink/40">({pending.length})</span>
            </h2>
            {pending.length === 0 ? (
              <div className="text-center py-10 sm:py-12 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm px-4">
                Nenhum pedido novo agora.
              </div>
            ) : (
              <ul className="space-y-4">
                {pending.map((r) => (
                  <li key={r.id} className="bg-paper border border-ink/8 rounded-3xl p-4 sm:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="size-12 shrink-0 rounded-full bg-hotpink/15 text-hotpink flex items-center justify-center font-semibold">
                        {(r.student?.full_name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{r.student?.full_name ?? "Aluno"}</p>
                        <p className="text-xs text-ink/55 truncate">
                          {r.student?.grade || "—"} · {r.student?.school || "—"}
                        </p>
                        {r.slot && (
                          <p className="text-sm text-hotpink mt-2 inline-flex items-center gap-1.5 font-medium">
                            <CalendarClock className="size-3.5" /> {fmtSlot(r.slot.slot_at)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => updateStatus(r.id, "accepted")}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-electric text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:opacity-90"
                      >
                        <Check className="size-3.5" /> Aceitar
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, "declined")}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-ink/15 text-ink/70 text-xs uppercase tracking-[0.16em] font-semibold hover:bg-softgray"
                      >
                        <X className="size-3.5" /> Recusar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {history.length > 0 && (
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight mb-4">Histórico</h2>
              <ul className="space-y-2">
                {history.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 bg-softgray/60 rounded-2xl px-4 py-3 text-sm">
                    <span className="text-ink/75 truncate">{r.student?.full_name}</span>
                    <span className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] font-semibold ${r.status === "accepted" ? "text-electric" : "text-hotpink"}`}>
                      {r.status === "accepted" ? <Check className="size-3" /> : <X className="size-3" />}
                      {r.status === "accepted" ? "Aceito" : "Recusado"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <aside className="bg-paper border border-ink/8 rounded-3xl p-5 sm:p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-display text-lg font-bold tracking-tight mb-4">Seu perfil público</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-ink/60 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Por que você quer mentorar? O que você já viveu?"
                className="w-full bg-paper border border-ink/10 rounded-2xl p-3 text-sm focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-hotpink/15 resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-ink/60 mb-2">
                Áreas (separadas por vírgula)
              </label>
              <input
                value={areas}
                onChange={(e) => setAreas(e.target.value)}
                placeholder="Exatas, Vestibular, ENEM"
                className="w-full bg-paper border border-ink/10 rounded-2xl px-3 py-3 text-sm focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-hotpink/15"
              />
            </div>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-hotpink text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:opacity-90 disabled:opacity-60"
            >
              <Save className="size-3.5" /> {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

export default DashboardMentor;