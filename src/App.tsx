import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/auth/Auth.tsx";
import LoginAluno from "./pages/auth/LoginAluno.tsx";
import LoginMentor from "./pages/auth/LoginMentor.tsx";
import CadastroAluno from "./pages/auth/CadastroAluno.tsx";
import CadastroMentor from "./pages/auth/CadastroMentor.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login/aluno" element={<LoginAluno />} />
          <Route path="/login/mentor" element={<LoginMentor />} />
          <Route path="/cadastro/aluno" element={<CadastroAluno />} />
          <Route path="/cadastro/mentor" element={<CadastroMentor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
