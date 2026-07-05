import { useMemo, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { GraduationCap, Search, Star, CalendarClock, X, Check } from "lucide-react";
import { toast } from "sonner";
import { mentors, Mentor, MentorSlot } from "@/data/mentors";

const DashboardAluno = () => {
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "Gratuita" | "Paga">("all");
  const [selected, setSelected] = useState<Mentor | null>(null);
  const [bookings, setBookings] = useState<{ mentor: Mentor; slot: MentorSlot }[]>([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return mentors.filter((m) => {
      if (priceFilter !== "all" && m.price !== priceFilter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.course.toLowerCase().includes(q) ||
        m.university.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, priceFilter]);

  const book = (mentor: Mentor, slot: MentorSlot) => {
    if (bookings.some((b) => b.slot.id === slot.id && b.mentor.id === mentor.id)) {
      toast.info("Você já reservou esse horário.");
      return;
    }
    setBookings((prev) => [...prev, { mentor, slot }]);
    toast.success(`Horário reservado com ${mentor.name.split(" ")[0]}!`);
    setSelected(null);
  };

  return (
    <AppShell accent="electric">
      <section className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full mb-4 sm:mb-5">
          <GraduationCap className="size-3.5" /> Explorar mentores
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em] mb-3">
          Explorar <span className="text-electric">mentores</span>
        </h1>
        <p className="text-ink/65 max-w-2xl text-sm sm:text-base">
          Conheça universitários de diferentes cursos. As mentorias podem ser gratuitas ou pagas, sempre com confirmação do mentor.
        </p>
      </section>

      <div className="bg-paper border border-ink/10 rounded-full p-2 pl-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-3 shadow-soft mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-1 top-1/2 -translate-y-1/2 size-4 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por curso, área ou mentor"
            className="w-full bg-transparent pl-7 pr-2 py-2.5 text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-1.5 md:pr-1.5">
          {(["all", "Gratuita", "Paga"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriceFilter(p)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition-colors ${
                priceFilter === p
                  ? "bg-ink text-paper"
                  : "bg-softgray text-ink/70 hover:bg-ink/10"
              }`}
            >
              {p === "all" ? "Todos" : p}
            </button>
          ))}
        </div>
      </div>

      <section className="mb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-ink/15 rounded-3xl text-ink/55">
            Nenhum mentor encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m) => (
              <article
                key={m.id}
                onClick={() => setSelected(m)}
                className="group bg-paper border border-ink/8 rounded-3xl overflow-hidden hover:shadow-editorial transition-all cursor-pointer hover:-translate-y-1 duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-softgray">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    width={640}
                    height={480}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold ${
                      m.price === "Gratuita" ? "bg-paper text-ink" : "bg-ink text-paper"
                    }`}
                  >
                    {m.price}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="min-w-0">
                      <p className="font-display font-bold text-lg text-ink truncate">{m.name}</p>
                      <p className="text-sm text-ink/60 truncate">{m.course}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 shrink-0 bg-softgray text-ink text-xs font-semibold px-2.5 py-1 rounded-full">
                      <Star className="size-3 fill-electric text-electric" /> {m.rating}
                    </span>
                  </div>
                  <p className="text-sm text-ink/60 mt-3 line-clamp-2">{m.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {m.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-ink/10 text-ink/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-ink/8 flex items-center justify-between text-xs text-ink/55">
                    <span>{m.university} · {m.period}</span>
                    <span className="text-electric font-semibold">Ver horários →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold tracking-tight mb-5 flex items-center gap-2">
          <CalendarClock className="size-5 text-electric" /> Minhas reservas
        </h2>
        {bookings.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-ink/15 rounded-3xl text-ink/55 text-sm">
            Você ainda não reservou nenhum horário. Clique em um mentor acima para começar.
          </div>
        ) : (
          <ul className="space-y-3">
            {bookings.map((b, i) => (
              <li
                key={i}
                className="bg-paper border border-ink/8 rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={b.mentor.photo}
                    alt=""
                    className="size-11 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{b.mentor.name}</p>
                    <p className="text-xs text-ink/60 truncate">
                      {b.mentor.course} · {b.slot.label}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-electric/15 text-electric shrink-0">
                  <Check className="size-3" /> Confirmado
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selected && <MentorModal mentor={selected} onClose={() => setSelected(null)} onBook={book} />}
    </AppShell>
  );
};

const MentorModal = ({
  mentor,
  onClose,
  onBook,
}: {
  mentor: Mentor;
  onClose: () => void;
  onBook: (m: Mentor, s: MentorSlot) => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-paper w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-up"
      >
        <div className="relative aspect-[16/8] bg-softgray shrink-0">
          <img src={mentor.photo} alt={mentor.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 size-10 rounded-full bg-paper/90 backdrop-blur flex items-center justify-center hover:bg-paper"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">{mentor.name}</h3>
              <p className="text-ink/60">{mentor.course} · {mentor.university}</p>
            </div>
            <span className="inline-flex items-center gap-1 bg-softgray text-ink text-sm font-semibold px-3 py-1.5 rounded-full shrink-0">
              <Star className="size-3.5 fill-electric text-electric" /> {mentor.rating}
            </span>
          </div>
          <p className="text-ink/70 mt-4">{mentor.bio}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {mentor.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-ink/10 text-ink/70">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-electric mb-4 flex items-center gap-2">
              <CalendarClock className="size-3.5" /> Horários disponíveis
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mentor.slots.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onBook(mentor, s)}
                  className="text-left text-sm bg-softgray hover:bg-electric hover:text-paper rounded-2xl px-4 py-3 transition-colors font-medium"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAluno;