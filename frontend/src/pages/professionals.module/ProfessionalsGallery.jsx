import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfessionalsGallery.css";

export default function ProfessionalsGallery() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/professionals");
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Error al cargar profesionales");
      }
      
      setProfessionals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = filter === "all" 
    ? professionals 
    : professionals.filter(prof => prof.profession === filter);

  const handleViewProfile = (professionalId) => {
    navigate(`/professional/public/${professionalId}`);
  };

  if (loading) {
    return (
      <div className="professionals-gallery">
        <div className="gallery-header">
          <h1>🔍 Profesionales BOOST</h1>
          <p>Descubre expertos en diversas áreas</p>
        </div>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando profesionales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="professionals-gallery">
        <div className="gallery-header">
          <h1>🔍 Profesionales BOOST</h1>
          <p>Descubre expertos en diversas áreas</p>
        </div>
        <div className="error-container">
          <p>❌ {error}</p>
          <button onClick={fetchProfessionals} className="btn-retry">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="professionals-gallery">
      <div className="gallery-header">
        <h1>🔍 Profesionales BOOST</h1>
        <p>Descubre expertos en diversas áreas</p>
        
        <div className="filter-container">
          <label htmlFor="filter">Filtrar por profesión:</label>
          <select 
            id="filter" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los profesionales</option>
            <option value="psicología">Psicólogos</option>
            <option value="finanzas">Asesores Financieros</option>
            <option value="educativo">Tutores Educativos</option>
            <option value="laboral">Asesores Laborales</option>
            <option value="coach">Coaches de Vida</option>
            <option value="terapia">Terapeutas</option>
          </select>
        </div>
      </div>

      <div className="professionals-grid">
        {filteredProfessionals.map((professional) => (
          <div key={professional.id} className="professional-card">
            <div className="card-header">
              {professional.profileImage ? (
                <img 
                  src={`http://localhost:8080/uploads/${professional.profileImage}`} 
                  alt={`${professional.fullName} - Perfil`}
                  className="professional-avatar"
                />
              ) : (
                <div className="professional-placeholder">
                  <span>👤</span>
                </div>
              )}
              <div className="professional-info">
                <h3>{professional.fullName}</h3>
                <p className="profession-badge">{professional.profession}</p>
              </div>
            </div>
            
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">📍 Ciudad:</span>
                <span className="info-value">{professional.city}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">📊 Experiencia:</span>
                <span className="info-value">{professional.experience} años</span>
              </div>
              
              {professional.bio && (
                <div className="bio-section">
                  <p>{professional.bio.substring(0, 150)}{professional.bio.length > 150 ? "..." : ""}</p>
                </div>
              )}
              
              {professional.languages && professional.languages.length > 0 && (
                <div className="languages-section">
                  <span className="info-label">🌍 Idiomas:</span>
                  <div className="languages-list">
                    {professional.languages.slice(0, 3).map((lang, index) => (
                      <span key={index} className="language-tag">{lang}</span>
                    ))}
                    {professional.languages.length > 3 && (
                      <span className="language-more">+{professional.languages.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="card-footer">
              <button 
                onClick={() => handleViewProfile(professional.id)}
                className="btn-view-profile"
              >
                Ver Perfil Completo
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProfessionals.length === 0 && !loading && (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>No se encontraron profesionales</h3>
          <p>
            {filter === "all" 
              ? "No hay profesionales registrados actualmente." 
              : `No hay profesionales en el área de ${filter}.`}
          </p>
          <button onClick={() => setFilter("all")} className="btn-show-all">
            Mostrar todos los profesionales
          </button>
        </div>
      )}
    </div>
  );
}
