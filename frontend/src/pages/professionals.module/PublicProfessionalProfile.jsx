import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PublicProfessionalProfile.css";

export default function PublicProfessionalProfile() {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/professionals/${id}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Profesional no encontrado");
        }
        
        setProfessional(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

  const handleContactProfessional = () => {
    // Aquí podrías implementar una función de contacto
    alert("Función de contacto próximamente disponible");
  };

  if (loading) {
    return (
      <div className="public-profile">
        <div className="profile-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando perfil del profesional...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-profile">
        <div className="profile-container">
          <div className="error-container">
            <span className="error-icon">❌</span>
            <h2>Profesional no encontrado</h2>
            <p>{error}</p>
            <button onClick={() => navigate("/professionals")} className="btn-back">
              ← Volver a Profesionales
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return null;
  }

  return (
    <div className="public-profile">
      <div className="profile-container">
        <button onClick={() => navigate("/professionals")} className="btn-back">
          ← Volver a Profesionales
        </button>

        <div className="profile-header">
          <div className="profile-image-section">
            {professional.profileImage ? (
              <img 
                src={`http://localhost:8080/uploads/${professional.profileImage}`} 
                alt={`${professional.fullName} - Perfil`}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-placeholder">
                <span>👤</span>
              </div>
            )}
          </div>

          <div className="profile-info-section">
            <h1>{professional.fullName}</h1>
            <div className="profession-badge-large">
              <span className="profession-icon">💼</span>
              <span>{professional.profession}</span>
            </div>
            <div className="experience-badge">
              <span className="experience-icon">📊</span>
              <span>{professional.experience} años de experiencia</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="info-card">
              <h2>📋 Información de Contacto</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">📍 Ciudad:</span>
                  <span className="info-value">{professional.city}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📱 Teléfono:</span>
                  <span className="info-value">{professional.phoneNumber}</span>
                </div>
                {professional.address && (
                  <div className="info-item full-width">
                    <span className="info-label">🏠 Dirección:</span>
                    <span className="info-value">{professional.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="info-card">
              <h2>🪪 Información Profesional</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">🪪 Licencia:</span>
                  <span className="info-value">{professional.professionalLicense}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📅 Edad:</span>
                  <span className="info-value">
                    {professional.birthDate ? 
                      `${new Date().getFullYear() - new Date(professional.birthDate).getFullYear()} años` 
                      : "No especificada"
                    }
                  </span>
                </div>
              </div>
            </div>

            {professional.bio && (
              <div className="info-card full-width">
                <h2>📝 Biografía</h2>
                <div className="bio-content">
                  <p>{professional.bio}</p>
                </div>
              </div>
            )}

            <div className="skills-section">
              {professional.languages && professional.languages.length > 0 && (
                <div className="info-card">
                  <h2>🌍 Idiomas</h2>
                  <div className="skills-grid">
                    {professional.languages.map((language, index) => (
                      <span key={index} className="skill-tag language-tag">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {professional.softSkills && professional.softSkills.length > 0 && (
                <div className="info-card">
                  <h2>🎯 Habilidades y Competencias</h2>
                  <div className="skills-grid">
                    {professional.softSkills.map((skill, index) => (
                      <span key={index} className="skill-tag skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleContactProfessional} className="btn-contact">
            💬 Contactar Profesional
          </button>
          <button onClick={() => navigate("/professionals")} className="btn-back">
            ← Volver a Profesionales
          </button>
        </div>
      </div>
    </div>
  );
}
