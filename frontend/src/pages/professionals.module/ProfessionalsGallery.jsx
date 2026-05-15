import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfessionalsGallery.css";

export default function ProfessionalsGallery() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fictitiousProfessionals = [
    {
      id: 101,
      fullName: "Dr. Carlos Mendoza",
      profession: "psicología",
      city: "Medellín",
      experience: 12,
      profileImage: null,
      bio: "Especialista en psicología clínica y terapia conductual",
      isFictitious: true
    },
    {
      id: 102,
      fullName: "Laura Gómez",
      profession: "finanzas",
      city: "Bogotá",
      experience: 8,
      profileImage: null,
      bio: "Asesora financiera con experiencia en inversiones",
      isFictitious: true
    },
    {
      id: 103,
      fullName: "Juan Pérez",
      profession: "educativo",
      city: "Cali",
      experience: 10,
      profileImage: null,
      bio: "Tutor especializado en matemáticas e inglés",
      isFictitious: true
    },
    {
      id: 104,
      fullName: "María Rodríguez",
      profession: "coach",
      city: "Medellín",
      experience: 6,
      profileImage: null,
      bio: "Coach de vida enfocada en desarrollo personal",
      isFictitious: true
    },
    {
      id: 105,
      fullName: "Roberto Silva",
      profession: "laboral",
      city: "Bogotá",
      experience: 9,
      profileImage: null,
      bio: "Asesor laboral especializado en recursos humanos",
      isFictitious: true
    }
  ];

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/professionals");
      const data = await res.json();
      
      if (!res.ok) {
        setProfessionals(fictitiousProfessionals);
        return;
      }
      
      setProfessionals(data && data.length > 0 ? data : fictitiousProfessionals);
    } catch (err) {
      setError(err.message);
      setProfessionals(fictitiousProfessionals);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = filter === "all" 
    ? professionals 
    : professionals.filter(prof => prof.profession === filter);

  const handleViewProfile = (professional) => {
    if (professional.isFictitious) {
      alert("Este es un profesional de ejemplo. Cuando se registren profesionales reales, los verás aquí.");
    } else {
      navigate(`/professional/public/${professional.id}`);
    }
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
      <button className="btn-back-gallery" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="gallery-header">
        <div className="header-content">
          <h1>🔍 Profesionales BOOST</h1>
          <p>Descubre expertos en diversas áreas y encuentra el profesional perfecto para ti</p>
        </div>
        
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
                onClick={() => handleViewProfile(professional)}
                className="btn-view-profile"
                style={{ cursor: professional.isFictitious ? "not-allowed" : "pointer" }}
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
