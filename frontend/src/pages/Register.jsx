import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import BrandMark from "../components/BrandMark.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    // TODO: impedir o comportamento padrão do formulário.
    event.preventDefault(); // Preparação mínima: a página não recarrega durante a aula.
    // TODO: limpar mensagens anteriores de erro e sucesso.
    setError("");
    setSuccess("");
    // TODO: validar se name, email e password foram preenchidos.
    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/usuarios", { name, email, password });
      setSuccess("Cadastro realizado com sucesso! Você já pode fazer login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Não foi possível realizar o cadastro. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell flex items-center justify-center px-4 py-8">
      <section className="auth-card w-full max-w-lg px-8 py-10 sm:px-10 sm:py-12">
        <div className="auth-card-inner">
          <div className="flex justify-center">
            <BrandMark />
          </div>
          <div className="auth-heading">
            <p className="eyebrow mb-3 text-center">Comece agora</p>
            <h1 className="auth-title mb-6 text-center text-3xl font-bold">Criar conta</h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="field-label mb-1 block text-center text-sm font-medium">Nome</label>
            <input id="name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="auth-input w-full rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="field-label mb-1 block text-center text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="auth-input w-full rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="password" className="field-label mb-1 block text-center text-sm font-medium">Senha</label>
            <input id="password" name="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="auth-input w-full rounded-md px-3 py-2" />
          </div>

          {error && <p role="alert" className="error-message text-sm">{error}</p>}
          {success && <p role="status" className="success-message rounded-md p-3 text-sm">{success}</p>}

          <button type="submit" disabled={loading} className="primary-button w-full rounded-md px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          </form>

          <div className="auth-nav">
            <span>Já tem conta?</span>
            <Link to="/login" className="nav-button">Entrar</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
