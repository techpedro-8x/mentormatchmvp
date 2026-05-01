import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  TextField,
  PasswordField,
  GoogleButton,
  Divider,
} from "@/components/auth/AuthFormFields";

const CadastroAluno = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
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
      <GoogleButton label="Continuar com Google" />
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
        <div className="grid grid-cols-2 gap-4">
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