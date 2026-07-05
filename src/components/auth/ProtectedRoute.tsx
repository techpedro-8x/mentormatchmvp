import { UserRole } from "@/hooks/useAuth";

// Modo demo: sem verificação de autenticação, apenas passa o conteúdo direto.
export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
  requireRole?: UserRole;
}) => {
  return <>{children}</>;
};