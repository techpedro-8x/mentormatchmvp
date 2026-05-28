import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  TextField,
  PasswordField,
  GoogleButton,
  Divider,
} from "@/components/auth/AuthFormFields";

const LoginMentor = () => {
  const [loading, setLoading] = useState(false);
  const [google, setGoogle] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate("/app/mentor", { replace: true });
  };

  const handleGoogle = async () => {
    setGoogle(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/app/mentor",
    });
    if (result.error) {
      toast.error("Não foi possível entrar com Google");
      setGoogle(false);
    }
  };

  return (
    <AuthLayout
      badge="Mentor"
      title="Olá de novo, mentor"
      subtitle="Entre para responder mensagens, agendar sessões e acompanhar seu impacto."
      accent="hotpink"
      footer={
        <>
          Ainda não é mentor?{" "}
          <Link to="/cadastro/mentor" className="font-semibold text-hotpink hover:underline underline-offset-4">
            Quero ser mentor
          </Link>
        </>
      }
    >
      <GoogleButton label={google ? "Conectando..." : "Entrar com Google"} onClick={handleGoogle} disabled={google} />
      <Divider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          name="email"
          type="email"
          label="Email institucional"
          placeholder="voce@universidade.edu.br"
          autoComplete="email"
          required
        />
        <PasswordField
          name="password"
          label="Senha"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink/65 cursor-pointer">
            <input
              type="checkbox"
              className="size-4 rounded border-ink/20 accent-hotpink"
            />
            Lembrar de mim
          </label>
          <Link
            to="/recuperar-senha"
            className="text-hotpink font-semibold hover:underline underline-offset-4"
          >
            Esqueci a senha
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cssbuttons-io w-full mt-2 disabled:opacity-60"
        >
          <span className="w-full justify-center">
            {loading ? "Entrando..." : "Entrar"}
          </span>
        </button>
      </form>

      <p className="text-xs text-ink/45 text-center mt-6">
        É aluno?{" "}
        <Link to="/login/aluno" className="text-electric font-semibold hover:underline underline-offset-4">
          Entrar como aluno
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginMentor;