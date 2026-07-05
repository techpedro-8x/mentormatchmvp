import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Sparkles, Check, X, CalendarClock, Award, Download, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { bookedSessions, BookedSession } from "@/data/mentors";

const MENTOR_NAME = "Ana Beatriz";
const MENTOR_COURSE = "Medicina";
const MENTOR_UNIVERSITY = "USP";

const DashboardMentor = () => {
  const [sessions, setSessions] = useState<BookedSession[]>(bookedSessions);

  const updateStatus = (id: string, status: "accepted" | "declined") => {
    if (status === "declined") {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      toast.success("Pedido recusado");
      return;
    }
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, status: "accepted" } : s)));
    toast.success("Pedido aceito!");
  };

  const pending = sessions.filter((s) => s.status === "pending");
  const upcoming = sessions.filter(
    (s) => s.status === "accepted" && new Date(s.slot.date) >= new Date()
  );
  const completed = sessions.filter((s) => s.status === "completed");

  const downloadCertificate = (r: BookedSession) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(3);
    doc.rect(24, 24, w - 48, h - 48);
    doc.setLineWidth(0.5);
    doc.rect(36, 36, w - 72, h - 72);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(236, 72, 153);
    doc.text("CERTIFICADO DE MENTORIA", w / 2, 100, { align: "center" });
    doc.setFont("times", "bold");
    doc.setFontSize(42);
    doc.setTextColor(15, 23, 42);
    doc.text("Certificado de Conclusão", w / 2, 160, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text("Certificamos que", w / 2, 220, { align: "center" });
    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.setTextColor(15, 23, 42);
    doc.text(MENTOR_NAME, w / 2, 265, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(60, 60, 60);
    const body =
      `concluiu com êxito uma sessão de mentoria voluntária pela plataforma MentorMatch,\n` +
      `orientando o(a) estudante ${r.studentName} em ${r.slot.label}.\n\n` +
      `Esta atividade pode ser computada como horas complementares\n` +
      `junto à instituição ${MENTOR_UNIVERSITY} (${MENTOR_COURSE}).`;
    doc.text(body, w / 2, 310, { align: "center", lineHeightFactor: 1.6 });
    doc.setDrawColor(15, 23, 42);
    doc.line(w / 2 - 120, h - 110, w / 2 + 120, h - 110);
    doc.setFontSize(11);
    doc.text("MentorMatch · Programa de mentoria voluntária", w / 2, h - 92, { align: "center" });
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Emitido em ${new Date().toLocaleDateString("pt-BR")}`, w / 2, h - 46, { align: "center" });
    doc.save(`certificado-${r.id}.pdf`);
  };

  return (
    <AppShell accent="hotpink">
      <section className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-hotpink bg-hotpink/10 px-3 py-1.5 rounded-full mb-4 sm:mb-5">
          <Sparkles className="size-3.5" /> Painel do mentor
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl tracking-[-0.04em] mb-2 sm:mb-3 break-words">
          Olá, {MENTOR_NAME.split(" ")[0]}.
        </h1>
        <p className="text-ink/65 max-w-xl text-sm sm:text-base">
          {MENTOR_COURSE} · {MENTOR_UNIVERSITY}. Veja os alunos que agendaram com você e gerencie suas mentorias.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 max-w-lg">
          <StatCard label="Pendentes" value={pending.length} accent="hotpink" />
          <StatCard label="Agendadas" value={upcoming.length} accent="electric" />
          <StatCard label="Concluídas" value={completed.length} accent="ink" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight mb-5">
          Pedidos pendentes <span className="text-ink/40">({pending.length})</span>
        </h2>
        {pending.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm">
            Nenhum pedido novo agora.
          </div>
        ) : (
          <ul className="space-y-4">
            {pending.map((r) => (
              <li key={r.id} className="bg-paper border border-ink/8 rounded-3xl p-5 sm:p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-12 shrink-0 rounded-full bg-hotpink/15 text-hotpink flex items-center justify-center font-semibold">
                    {r.studentName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{r.studentName}</p>
                    <p className="text-xs text-ink/55">{r.grade} · {r.school}</p>
                    <p className="text-sm text-hotpink mt-2 inline-flex items-center gap-1.5 font-medium">
                      <CalendarClock className="size-3.5" /> {r.slot.label}
                    </p>
                    <p className="text-sm text-ink/70 mt-3 inline-flex items-start gap-1.5">
                      <MessageCircle className="size-3.5 mt-0.5 text-ink/40 shrink-0" /> {r.topic}
                    </p>
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
      </section>

      <section className="mb-12">
        <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight mb-5 flex items-center gap-2">
          <CalendarClock className="size-5 text-electric" /> Próximas mentorias
        </h2>
        {upcoming.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm">
            Nenhuma sessão confirmada ainda.
          </div>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((r) => (
              <li key={r.id} className="bg-paper border border-ink/8 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-11 shrink-0 rounded-full bg-electric/15 text-electric flex items-center justify-center font-semibold">
                    {r.studentName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{r.studentName}</p>
                    <p className="text-xs text-ink/55 truncate">{r.slot.label} · {r.topic}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-electric/15 text-electric shrink-0">
                  <Check className="size-3" /> Confirmada
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Award className="size-5 text-hotpink" /> Certificados
        </h2>
        <p className="text-sm text-ink/60 mb-4">
          Baixe certificados das mentorias concluídas para somar nas suas horas complementares.
        </p>
        {completed.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm">
            Você ainda não tem mentorias concluídas.
          </div>
        ) : (
          <ul className="space-y-3">
            {completed.map((r) => (
              <li
                key={r.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper border border-ink/8 rounded-3xl p-4 sm:p-5"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{r.studentName}</p>
                  <p className="text-xs text-ink/55 inline-flex items-center gap-1.5 mt-1">
                    <CalendarClock className="size-3.5" /> {r.slot.label}
                  </p>
                </div>
                <button
                  onClick={() => downloadCertificate(r)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:bg-hotpink transition-colors"
                >
                  <Download className="size-3.5" /> Baixar PDF
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
};

const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "hotpink" | "electric" | "ink";
}) => {
  const color =
    accent === "hotpink" ? "text-hotpink" : accent === "electric" ? "text-electric" : "text-ink";
  return (
    <div className="bg-paper border border-ink/8 rounded-2xl px-4 py-3">
      <p className={`font-display font-bold text-2xl ${color}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-ink/55 mt-0.5">
        {label}
      </p>
    </div>
  );
};

export default DashboardMentor;