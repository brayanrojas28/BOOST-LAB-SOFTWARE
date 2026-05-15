import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [professionals, setProfessionals] = useState([]);
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

    fetchProfessionals();
  }, [navigate]);

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

  const fetchProfessionals = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/professionals");
      if (res.ok) {
        const data = await res.json();
        setProfessionals(data && data.length > 0 ? data : fictitiousProfessionals);
      } else {
        setProfessionals(fictitiousProfessionals);
      }
    } catch (error) {
      console.error("Error al cargar profesionales:", error);
      setProfessionals(fictitiousProfessionals);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!user) {
    return <div className="client-dashboard loading">Cargando tu espacio...</div>;
  }

  return (
    <div className="client-dashboard">
      {/* Botón hamburguesa para móvil */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Menú Lateral */}
      <aside className={`sidebar-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-user-info">
          <div className="menu-avatar">
            {user.profileImage ? (
              <img src={`http://localhost:8080/uploads/${user.profileImage}`} alt="Perfil" />
            ) : (
              <span>👤</span>
            )}
          </div>
          <h3>{user.fullName}</h3>
          <p>{user.email}</p>
        </div>

        <nav className="menu-nav">
          <button className="menu-item" onClick={() => { navigate("/client/profile"); setMenuOpen(false); }}>
            <span>👤</span> Mi Perfil
          </button>
          <button className="menu-item" onClick={() => { navigate("/professionals"); setMenuOpen(false); }}>
            <span>🔍</span> Buscar Profesionales
          </button>
          <button className="menu-item" onClick={() => { navigate("/client/dashboard"); setMenuOpen(false); }}>
            <span>🏠</span> Inicio
          </button>
        </nav>

        <div className="menu-footer">
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Overlay para cerrar menú al hacer clic fuera */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

      {/* Contenido Principal */}
      <main className="main-content">
        <div className="dashboard-header">
          <h1>¡Bienvenido, {user.fullName}! 🎉</h1>
          <p className="dashboard-subtitle">
            Encuentra los mejores profesionales para ti en BOOST
          </p>
        </div>

        {/* Sección de profesionales */}
        <div className="professionals-section">
          <h2>🔍 Profesionales Disponibles</h2>
          
          {loading ? (
            <div className="loading-professionals">Cargando profesionales...</div>
          ) : (
            <div className="professionals-grid">
              {professionals.map((prof) => (
                <div 
                  key={prof.id} 
                  className="professional-card" 
                  onClick={() => {
                    if (prof.isFictitious) {
                      alert("Este es un profesional de ejemplo. Cuando se registren profesionales reales, los verás aquí.");
                    } else {
                      navigate(`/professional/public/${prof.id}`);
                    }
                  }}
                  style={{ cursor: prof.isFictitious ? "not-allowed" : "pointer" }}
                >
                  <div className="professional-card-header">
                    {prof.profileImage ? (
                      <img src={`http://localhost:8080/uploads/${prof.profileImage}`} alt={prof.fullName} />
                    ) : (
                      <div className="professional-placeholder">👤</div>
                    )}
                  </div>
                  <div className="professional-card-body">
                    <h3>{prof.fullName}</h3>
                    <span className="profession-badge">{prof.profession}</span>
                    <p className="profession-city">📍 {prof.city}</p>
                    <p className="profession-experience">📊 {prof.experience} años de experiencia</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && professionals.length === 0 && (
            <div className="no-professionals">
              <p>No hay profesionales registrados aún.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
