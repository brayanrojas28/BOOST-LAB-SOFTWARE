import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfessionalDashboard.css";

export default function ProfessionalDashboard() {
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
    return <div className="professional-dashboard loading">Cargando tu espacio profesional...</div>;
  }

  return (
    <div className="professional-dashboard">
      <div className="dashboard-header">
        <h1>Bienvenido, {user.fullName} 🎉</h1>
        <p className="dashboard-subtitle">
          Tu perfil profesional está activo. Aquí puedes gestionar tu negocio en BOOST.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <h2>Mi Perfil</h2>
          <p>Revisa y actualiza tus datos profesionales.</p>
          <button className="btn-card" onClick={() => navigate("/register/professional?edit=true")}>Editar Perfil</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💼</div>
          <h2>Mis Servicios</h2>
          <p>Configura los servicios que ofreces.</p>
          <button className="btn-card">Gestionar Servicios</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h2>Agenda</h2>
          <p>Administra tus citas y disponibilidad.</p>
          <button className="btn-card">Ver Agenda</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💰</div>
          <h2>Ganancias</h2>
          <p>Consulta tu historial de ingresos.</p>
          <button className="btn-card">Ver Ganancias</button>
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
