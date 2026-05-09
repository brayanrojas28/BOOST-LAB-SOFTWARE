import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    let storedUser = null;

    try {
      const validRawUser = rawUser && rawUser !== "undefined" ? rawUser : null;
      if (!validRawUser && rawUser) {
        localStorage.removeItem("user");
      }
      storedUser = validRawUser ? JSON.parse(validRawUser) : null;
    } catch (parseError) {
      console.error("Invalid user in localStorage:", rawUser, parseError);
      localStorage.removeItem("user");
    }

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <div className="client-dashboard loading">Cargando tu espacio...</div>;
  }

  return (
    <div className="client-dashboard">
      <div className="dashboard-header">
        <h1>¡Bienvenido, {user.fullName}! 🎉</h1>
        <p className="dashboard-subtitle">
          Tu cuenta está lista. Busca los mejores profesionales para ti en BOOST.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">�</div>
          <h2>Mi Perfil</h2>
          <p>Revisa y actualiza tus datos personales.</p>
          <button className="btn-card" onClick={() => navigate("/client/profile")}>Ver Perfil</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">�🔍</div>
          <h2>Buscar Profesionales</h2>
          <p>Encuentra expertos en psicología, finanzas, educación y más.</p>
          <button className="btn-card">Explorar</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h2>Mis Citas</h2>
          <p>Visualiza y gestiona tus sesiones agendadas.</p>
          <button className="btn-card">Ver Citas</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⭐</div>
          <h2>Favoritos</h2>
          <p>Accede rápidamente a tus profesionales preferidos.</p>
          <button className="btn-card">Ver Favoritos</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💬</div>
          <h2>Mensajes</h2>
          <p>Comunícate con tus profesionales.</p>
          <button className="btn-card">Ver Mensajes</button>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="btn-home" onClick={() => navigate("/")}>
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
}
