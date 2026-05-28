import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";
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

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink">
            MentorMatch<span className="text-hotpink">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full ${accentBg}`}>
              <span className={`size-1.5 rounded-full ${accent === "electric" ? "bg-electric" : "bg-hotpink"} animate-pulse`} />
              <span className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${accentText}`}>
                {profile?.role === "mentor" ? "Mentor" : "Aluno"}
              </span>
            </div>
            <div className={`size-10 rounded-full ${accentBg} ${accentText} flex items-center justify-center font-semibold text-sm`}>
              {initials || <UserIcon className="size-4" />}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 size-10 sm:size-auto sm:px-4 sm:py-2.5 rounded-full border border-ink/10 hover:border-ink/30 hover:bg-softgray transition-colors text-sm font-semibold text-ink/75 justify-center"
              aria-label="Sair"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8 sm:py-12">{children}</div>
    </main>
  );
};