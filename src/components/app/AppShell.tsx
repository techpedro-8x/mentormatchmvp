import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User as UserIcon, LayoutDashboard, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const AppShell = ({
  children,
  accent = "electric",
}: {
  children: ReactNode;
  accent?: "electric" | "hotpink";
}) => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const accentText = accent === "electric" ? "text-electric" : "text-hotpink";
  const accentBg = accent === "electric" ? "bg-electric/10" : "bg-hotpink/10";

  const handleLogout = async () => {
    await signOut();
    toast.success("Até logo!");
    navigate("/", { replace: true });
  };

  const initials = (profile?.full_name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dashHref = profile?.role === "mentor" ? "/app/mentor" : "/app/aluno";
  const navLinks = [
    { href: dashHref, label: "Painel", icon: LayoutDashboard },
    { href: "/app/comunidade", label: "Comunidade", icon: Users },
  ];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
            <Link to="/" className="font-display font-bold text-lg sm:text-2xl tracking-tight text-ink shrink-0">
              MentorMatch<span className="text-hotpink">.</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => {
                const active = location.pathname === l.href || location.pathname.startsWith(l.href + "/");
                const Icon = l.icon;
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors ${active ? `${accentBg} ${accentText}` : "text-ink/65 hover:bg-softgray"}`}
                  >
                    <Icon className="size-4" /> {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full ${accentBg}`}>
              <span className={`size-1.5 rounded-full ${accent === "electric" ? "bg-electric" : "bg-hotpink"} animate-pulse`} />
              <span className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${accentText}`}>
                {profile?.role === "mentor" ? "Mentor" : "Aluno"}
              </span>
            </div>
            <div className={`hidden xs:flex sm:flex size-9 sm:size-10 rounded-full ${accentBg} ${accentText} items-center justify-center font-semibold text-xs sm:text-sm shrink-0`}>
              {initials || <UserIcon className="size-4" />}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 size-9 sm:size-auto sm:px-4 sm:py-2.5 rounded-full border border-ink/10 hover:border-ink/30 hover:bg-softgray transition-colors text-sm font-semibold text-ink/75 justify-center shrink-0"
              aria-label="Sair"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
        <nav className="md:hidden border-t border-ink/8 px-5 py-2 flex items-center gap-1 overflow-x-auto">
          {navLinks.map((l) => {
            const active = location.pathname === l.href || location.pathname.startsWith(l.href + "/");
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                to={l.href}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${active ? `${accentBg} ${accentText}` : "text-ink/65 hover:bg-softgray"}`}
              >
                <Icon className="size-3.5" /> {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8 sm:py-12">{children}</div>
    </main>
  );
};