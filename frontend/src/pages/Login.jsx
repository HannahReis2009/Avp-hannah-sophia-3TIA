import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { saveToken } from "../services/auth.js";
import BrandMark from "../components/BrandMark.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    // TODO: impedir o comportamento padrão do formulário.
    event.preventDefault(); // Preparação mínima: a página não recarrega durante a aula.
    setError("");
    if (!email.trim() || !password) {
      setError("Informe email e senha.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/login", {
        email: email.trim(),
        password,
      });
      saveToken(response.data.token);
      navigate("/perfil");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Não foi possível entrar. Verifique seus dados.",
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
            <p className="eyebrow mb-3 text-center">Portal seguro</p>
            <h1 className="auth-title mb-6 text-center text-3xl font-bold">Entrar</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="field-label mb-1 block text-center text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="auth-input w-full rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="password" className="field-label mb-1 block text-center text-sm font-medium">Senha</label>
            <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="auth-input w-full rounded-md px-3 py-2" />
          </div>

          {error && <p role="alert" className="error-message text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="primary-button w-full rounded-md px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
          </form>

          <div className="auth-nav">
            <span>Ainda não tem conta?</span>
            <Link to="/register" className="nav-button">Criar conta</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
