import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";

export const ProtectedRoute = ({
  children,
  requireRole,
}: {
  children: React.ReactNode;
  requireRole?: UserRole;
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="size-10 rounded-full border-2 border-ink/10 border-t-electric animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" replace state={{ from: location }} />;
  }

  if (requireRole && profile && profile.role !== requireRole) {
    return <Navigate to={profile.role === "mentor" ? "/app/mentor" : "/app/aluno"} replace />;
  }

  return <>{children}</>;
};