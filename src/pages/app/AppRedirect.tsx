import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AppRedirect = () => {
  const { user, profile, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="size-10 rounded-full border-2 border-ink/10 border-t-electric animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth?mode=login" replace />;
  return <Navigate to={profile?.role === "mentor" ? "/app/mentor" : "/app/aluno"} replace />;
};

export default AppRedirect;