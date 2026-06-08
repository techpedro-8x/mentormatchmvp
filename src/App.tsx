import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/auth/Auth.tsx";
import LoginAluno from "./pages/auth/LoginAluno.tsx";
import LoginMentor from "./pages/auth/LoginMentor.tsx";
import CadastroAluno from "./pages/auth/CadastroAluno.tsx";
import CadastroMentor from "./pages/auth/CadastroMentor.tsx";
import DashboardAluno from "./pages/app/DashboardAluno.tsx";
import DashboardMentor from "./pages/app/DashboardMentor.tsx";
import AppRedirect from "./pages/app/AppRedirect.tsx";
import Comunidade from "./pages/app/Comunidade.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login/aluno" element={<LoginAluno />} />
            <Route path="/login/mentor" element={<LoginMentor />} />
            <Route path="/cadastro/aluno" element={<CadastroAluno />} />
            <Route path="/cadastro/mentor" element={<CadastroMentor />} />
            <Route path="/app" element={<AppRedirect />} />
            <Route
              path="/app/comunidade"
              element={
                <ProtectedRoute>
                  <Comunidade />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/comunidade/:slug"
              element={
                <ProtectedRoute>
                  <Comunidade />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/aluno"
              element={
                <ProtectedRoute requireRole="aluno">
                  <DashboardAluno />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/mentor"
              element={
                <ProtectedRoute requireRole="mentor">
                  <DashboardMentor />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
