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

const CadastroAluno = () => {
  const [loading, setLoading] = useState(false);
  const [google, setGoogle] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: String(data.get("email")),
      password: String(data.get("password")),
      options: {
        emailRedirectTo: `${window.location.origin}/app/aluno`,
        data: {
          role: "aluno",
          full_name: String(data.get("name")),
          grade: String(data.get("grade")),
          school: String(data.get("school")),
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Conta criada! Bem-vindo.");
    navigate("/app/aluno", { replace: true });
  };

  const handleGoogle = async () => {
    setGoogle(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/app/aluno",
      extraParams: { prompt: "select_account" },
    });
    if (result.error) {
      toast.error("Não foi possível entrar com Google");
      setGoogle(false);
    }
  };

  return (
    <AuthLayout
      badge="Sou aluno"
      title="Vamos começar"
      subtitle="Crie sua conta e converse com universitários reais sobre o que vem depois do ensino médio."
      accent="electric"
      footer={
        <>
          Já tem conta?{" "}
          <Link to="/login/aluno" className="font-semibold text-electric hover:underline underline-offset-4">
            Entrar
          </Link>
        </>
      }
    >
      <GoogleButton label={google ? "Conectando..." : "Continuar com Google"} onClick={handleGoogle} disabled={google} />
      <Divider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          name="name"
          label="Nome completo"
          placeholder="Maria Silva"
          autoComplete="name"
          required
        />
        <TextField
          name="email"
          type="email"
          label="Email"
          placeholder="voce@email.com"
          autoComplete="email"
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            name="grade"
            label="Série / Ano"
            placeholder="3º EM"
            required
          />
          <TextField
            name="school"
            label="Escola"
            placeholder="Colégio..."
            required
          />
        </div>
        <PasswordField
          name="password"
          label="Senha"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <label className="flex items-start gap-3 text-xs text-ink/60 cursor-pointer mt-1">
          <input
            type="checkbox"
            required
            className="mt-0.5 size-4 rounded border-ink/20 accent-electric flex-shrink-0"
          />
          <span>
            Concordo com os{" "}
            <a href="#" className="text-electric font-semibold hover:underline">
              Termos de Uso
            </a>{" "}
            e a{" "}
            <a href="#" className="text-electric font-semibold hover:underline">
              Política de Privacidade
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="cssbuttons-io w-full mt-2 disabled:opacity-60"
        >
          <span className="w-full justify-center">
            {loading ? "Criando conta..." : "Criar conta"}
          </span>
        </button>
      </form>

      <p className="text-xs text-ink/45 text-center mt-6">
        Quer ser mentor?{" "}
        <Link to="/cadastro/mentor" className="text-hotpink font-semibold hover:underline underline-offset-4">
          Cadastro de mentor
        </Link>
      </p>
    </AuthLayout>
  );
};

export default CadastroAluno;