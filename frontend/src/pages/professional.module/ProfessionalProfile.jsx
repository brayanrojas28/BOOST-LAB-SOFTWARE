import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfessionalProfile.css";

export default function ProfessionalProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionalData = async (currentUser) => {
      try {
        const res = await fetch(`http://localhost:8080/api/professionals/user/${currentUser.id}`);
        if (res.ok) {
          const professionalData = await res.json();
          console.log("Datos del backend:", professionalData);
          
          // Mezclar datos del backend con los del localStorage
          const mergedUser = { 
            ...currentUser, 
            ...professionalData,
            // Asegurarse de que los arrays sean arrays válidos
            languages: Array.isArray(professionalData.languages) 
              ? professionalData.languages 
              : (professionalData.languages ? JSON.parse(professionalData.languages) : []),
            softSkills: Array.isArray(professionalData.softSkills) 
              ? professionalData.softSkills 
              : (professionalData.softSkills ? JSON.parse(professionalData.softSkills) : []),
            dataCompleted: true 
          };
          
          setUser(mergedUser);
          // Actualizar localStorage con los datos más recientes
          localStorage.setItem("user", JSON.stringify(mergedUser));
        }
      } catch (error) {
        console.error("Error al obtener datos del profesional:", error);
      }
    };

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
      // Obtener datos frescos del backend
      fetchProfessionalData(storedUser);
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
    <div className="professional-profile">
      <div className="profile-header">
        <button className="btn-back" onClick={() => navigate("/professional/dashboard")}>
          ← Volver al Dashboard
        </button>
        <h1>👤 Mi Perfil Profesional</h1>
        <p className="profile-subtitle">Revisa y gestiona tu información profesional</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header-section">
            <div className="profile-image-container">
              {user.profileImage ? (
                <img 
                  src={`http://localhost:8080/uploads/${user.profileImage}`} 
                  alt="Perfil" 
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">
                  <span className="profile-icon">👤</span>
                </div>
              )}
            </div>
            <div className="profile-name-section">
              <h1>{user.fullName}</h1>
              <p className="profile-profession">{user.profession || "Profesional"}</p>
            </div>
          </div>

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
            </div>
          </div>

          {user.dataCompleted && (
            <>
              <div className="profile-section">
                <h2>💼 Información Profesional</h2>
                <div className="profile-grid">
                  <div className="profile-item">
                    <span className="profile-label">💼 Profesión:</span>
                    <span className="profile-value">{user.profession || "No especificada"}</span>
                  </div>
                  <div className="profile-item">
                    <span className="profile-label">📊 Experiencia:</span>
                    <span className="profile-value">{user.experience ? `${user.experience} años` : "No especificada"}</span>
                  </div>
                  <div className="profile-item">
                    <span className="profile-label">🪪 Licencia Profesional:</span>
                    <span className="profile-value">{user.professionalLicense || "No especificada"}</span>
                  </div>
                  {user.bio && (
                    <div className="profile-item full-width">
                      <span className="profile-label">📝 Biografía:</span>
                      <span className="profile-value">{user.bio}</span>
                    </div>
                  )}
                </div>
              </div>

              {(user.languages && user.languages.length > 0) || (user.softSkills && user.softSkills.length > 0) ? (
                <div className="profile-section">
                  <h2>🎯 Habilidades y Competencias</h2>
                  {user.languages && user.languages.length > 0 && (
                    <div className="skills-group">
                      <h3>🌍 Idiomas</h3>
                      <div className="skills-list">
                        {user.languages.map((language, index) => (
                          <span key={index} className="skill-tag">{language}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.softSkills && user.softSkills.length > 0 && (
                    <div className="skills-group">
                      <h3>🎯 Habilidades Blandas</h3>
                      <div className="skills-list">
                        {user.softSkills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </>
          )}

          <div className="profile-actions">
            <button className="btn-edit" onClick={() => navigate("/register/professional?edit=true")}>
              ✏️ Editar Perfil
            </button>
            <button className="btn-back" onClick={() => navigate("/professional/dashboard")}>
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
