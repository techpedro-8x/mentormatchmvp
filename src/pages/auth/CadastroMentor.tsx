import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  TextField,
  PasswordField,
  GoogleButton,
  Divider,
} from "@/components/auth/AuthFormFields";

const CadastroMentor = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <AuthLayout
      badge="Quero ser mentor"
      title="Inspire a próxima geração"
      subtitle="Compartilhe sua jornada universitária e ajude alunos do ensino médio a tomarem decisões mais conscientes."
      accent="hotpink"
      footer={
        <>
          Já é mentor?{" "}
          <Link to="/login/mentor" className="font-semibold text-hotpink hover:underline underline-offset-4">
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
          placeholder="João Souza"
          autoComplete="name"
          required
        />
        <TextField
          name="email"
          type="email"
          label="Email institucional"
          placeholder="voce@universidade.edu.br"
          autoComplete="email"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="university"
            label="Universidade"
            placeholder="USP, UNICAMP..."
            required
          />
          <TextField
            name="course"
            label="Curso"
            placeholder="Engenharia"
            required
          />
        </div>
        <TextField
          name="period"
          label="Período / Ano"
          placeholder="5º semestre"
          required
        />
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
            className="mt-0.5 size-4 rounded border-ink/20 accent-hotpink flex-shrink-0"
          />
          <span>
            Concordo com os{" "}
            <a href="#" className="text-hotpink font-semibold hover:underline">
              Termos de Uso
            </a>{" "}
            e o{" "}
            <a href="#" className="text-hotpink font-semibold hover:underline">
              Código de Conduta de Mentores
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="cssbuttons-io w-full mt-2 disabled:opacity-60"
        >
          <span className="w-full justify-center">
            {loading ? "Enviando..." : "Quero ser mentor"}
          </span>
        </button>
      </form>

      <p className="text-xs text-ink/45 text-center mt-6">
        É aluno?{" "}
        <Link to="/cadastro/aluno" className="text-electric font-semibold hover:underline underline-offset-4">
          Cadastro de aluno
        </Link>
      </p>
    </AuthLayout>
  );
};

export default CadastroMentor;