import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { getToken, removeToken } from "../services/auth.js";
import BrandMark from "../components/BrandMark.jsx";

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
async function loadProfile() {
  const token = getToken();

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await api.get("/perfil");

    setUser(response.data.user);
  } catch (requestError) {
    if (requestError.response?.status === 401) {
      removeToken();
      navigate("/login");
      return;
    }

    setError(
      requestError.response?.data?.message ||
        "Não foi possível carregar o perfil."
    );
  } finally {
    setLoading(false);
  }

    // TODO: pegar o token salvo no localStorage usando getToken.
    // TODO: se não existir token, redirecionar para /login.
    // TODO: ativar loading.
    // TODO: chamar GET /users/profile usando api.get.
    // TODO: enviar o token no header Authorization no formato Bearer TOKEN.
    // TODO: salvar os dados do usuário no estado user.
    // TODO: se o token for inválido, remover token e redirecionar para /login.
    // TODO: mostrar mensagem de erro se acontecer algum problema.
    // TODO: desativar loading no final.
    // Dica: api.get("/users/profile", { headers: { Authorization: `Bearer ${token}` } })
  }

  function handleLogout() {
    removeToken();
    navigate("/login");
    // TODO: remover o token usando removeToken.
    // TODO: redirecionar para /login.
  }

  useEffect(() => {
    // Este efeito prepara o carregamento do perfil quando a página abre.
    // Após completar loadProfile, a requisição acontecerá aqui.
    loadProfile();
  }, []);

  return (
    <main className="auth-shell flex items-center justify-center px-4 py-8">
      <section className="auth-card w-full max-w-lg p-6 sm:p-8">
        <div className="auth-card-inner">
          <div className="profile-intro">
            <BrandMark />
            <p className="eyebrow">Sessão ativa</p>
          </div>
          <div className="auth-heading">
            <h1 className="auth-title mb-4 text-center text-3xl font-bold">Área Protegida</h1>
          </div>
        <p role="status" className="success-message mb-5 rounded-md p-3 text-center">Login realizado com sucesso</p>

        {loading && <p role="status" className="mb-4 text-slate-400">Carregando perfil...</p>}
        {error && <p role="alert" className="error-message mb-4">{error}</p>}

        <div className="profile-data mb-6 space-y-2 rounded-md p-4">
          <h2 className="font-semibold">Dados do usuário</h2>
          <p><strong>ID:</strong> {user?.id ?? "Aguardando perfil"}</p>
          <p><strong>Nome:</strong> {user?.name ?? "Aguardando perfil"}</p>
          <p><strong>Email:</strong> {user?.email ?? "Aguardando perfil"}</p>
        </div>

        <button type="button" onClick={handleLogout} className="primary-button w-full rounded-md px-4 py-2 font-semibold text-white">
          Sair
        </button>
        </div>
      </section>
    </main>
  );
}
