import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  TextField,
  PasswordField,
  GoogleButton,
  Divider,
} from "@/components/auth/AuthFormFields";

const LoginAluno = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrar Firebase Auth
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <AuthLayout
      badge="Aluno"
      title="Bem-vindo de volta"
      subtitle="Entre para continuar suas conversas com mentores e acompanhar seu caminho."
      accent="electric"
      footer={
        <>
          Não tem uma conta?{" "}
          <Link to="/cadastro/aluno" className="font-semibold text-electric hover:underline underline-offset-4">
            Criar conta de aluno
          </Link>
        </>
      }
    >
      <GoogleButton label="Entrar com Google" />
      <Divider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          name="email"
          type="email"
          label="Email"
          placeholder="voce@email.com"
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
              className="size-4 rounded border-ink/20 accent-electric"
            />
            Lembrar de mim
          </label>
          <Link
            to="/recuperar-senha"
            className="text-electric font-semibold hover:underline underline-offset-4"
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
        É mentor?{" "}
        <Link to="/login/mentor" className="text-hotpink font-semibold hover:underline underline-offset-4">
          Entrar como mentor
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginAluno;