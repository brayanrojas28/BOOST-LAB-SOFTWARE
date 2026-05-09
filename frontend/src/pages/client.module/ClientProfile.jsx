import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientProfile.css";

export default function ClientProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="profile-loading">Cargando perfil...</div>;
  }

  if (!user) {
    return <div className="profile-error">No se pudo cargar el perfil</div>;
  }

  return (
    <div className="client-profile">
      <div className="profile-header">
        <button className="btn-back" onClick={() => navigate("/client/dashboard")}>
          ← Volver al Dashboard
        </button>
        <h1>👤 Mi Perfil de Cliente</h1>
        <p className="profile-subtitle">Revisa y gestiona tu información personal</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-section">
            <h2>📋 Información Personal</h2>
            <div className="profile-grid">
              <div className="profile-item">
                <span className="profile-label">👤 Nombre Completo:</span>
                <span className="profile-value">{user.fullName || "No especificado"}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">📧 Correo Electrónico:</span>
                <span className="profile-value">{user.email || "No especificado"}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">📱 Teléfono:</span>
                <span className="profile-value">{user.phoneNumber || "No especificado"}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">📍 Ciudad:</span>
                <span className="profile-value">{user.city || "No especificada"}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">📅 Fecha de Nacimiento:</span>
                <span className="profile-value">{user.birthDate || "No especificada"}</span>
              </div>
              {user.address && (
                <div className="profile-item full-width">
                  <span className="profile-label">🏠 Dirección:</span>
                  <span className="profile-value">{user.address}</span>
                </div>
              )}
              {user.occupation && (
                <div className="profile-item">
                  <span className="profile-label">💼 Ocupación:</span>
                  <span className="profile-value">{user.occupation}</span>
                </div>
              )}
              {user.bio && (
                <div className="profile-item full-width">
                  <span className="profile-label">📝 Biografía:</span>
                  <span className="profile-value">{user.bio}</span>
                </div>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-edit" onClick={() => navigate("/register/client?edit=true")}>
              ✏️ Editar Perfil
            </button>
            <button className="btn-back" onClick={() => navigate("/client/dashboard")}>
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
