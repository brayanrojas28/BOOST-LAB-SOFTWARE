import "./Especialidades.css";

export default function Especialidades() {
  const especialidades = [
    {
      icon: "🧠",
      title: "Salud Mental",
      description: "Ansiedad, depresión, estrés, trauma y autoestima",
      specialties: ["Terapia Cognitivo-Conductual", "Psicoterapia Humanista", "Mindfulness"]
    },
    {
      icon: "💰",
      title: "Finanzas Personales",
      description: "Planificación financiera, inversión y gestión de deuda",
      specialties: ["Planificación de Presupuesto", "Asesoría de Inversión", "Gestión de Deuda"]
    },
    {
      icon: "💼",
      title: "Desarrollo Profesional",
      description: "Carrera laboral, habilidades blandas y liderazgo",
      specialties: ["Coaching de Carrera", "Desarrollo de Habilidades", "Preparación de Entrevistas"]
    },
    {
      icon: "📚",
      title: "Educación y Aprendizaje",
      description: "Apoyo académico, técnicas de estudio y preparación de exámenes",
      specialties: ["Refuerzo Académico", "Técnicas de Estudio", "Preparación de Exámenes"]
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Relaciones Familiares",
      description: "Terapia familiar, de pareja y dinámicas familiares",
      specialties: ["Terapia Familiar", "Terapia de Pareja", "Dinámicas Familiares"]
    },
    {
      icon: "🏃‍♂️",
      title: "Bienestar y Estilo de Vida",
      description: "Hábitos saludables, manejo del tiempo y equilibrio vida-trabajo",
      specialties: ["Coaching de Vida", "Manejo del Estrés", "Equilibrio Vida-Trabajo"]
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Consulta Inicial",
      description: "Conversamos sobre tus necesidades y objetivos para encontrar el especialista ideal"
    },
    {
      number: "2",
      title: "Agendamiento",
      description: "Programa tus sesiones en los horarios que mejor se adapten a tu rutina"
    },
    {
      number: "3",
      title: "Sesiones Personalizadas",
      description: "Recibe atención individualizada adaptada a tus metas específicas"
    },
    {
      number: "4",
      title: "Seguimiento",
      description: "Monitoreamos tu progreso y ajustamos el plan según sea necesario"
    }
  ];

  return (
    <div className="especialidades-page">

      {/* ─── HERO ─── */}
      <section className="especialidades-hero">
        <h1>Nuestras Especialidades</h1>
        <p className="hero-subtitle">Expertos en diferentes áreas para tu bienestar integral</p>
        <p className="hero-description">
          Contamos con profesionales especializados en diferentes áreas para brindarte el apoyo 
          que necesitas. Cada especialidad está diseñada para ayudarte a alcanzar tus metas 
          personales y profesionales con la guía de expertos certificados.
        </p>
      </section>

      {/* ─── ESPECIALIDADES ─── */}
      <section className="especialidades-section">
        <div className="section-inner">
          <div className="especialidades-grid">
            {especialidades.map((especialidad, index) => (
              <div key={index} className="especialidad-card">
                <div className="especialidad-header">
                  <span className="especialidad-icon">{especialidad.icon}</span>
                  <h3>{especialidad.title}</h3>
                </div>
                <p className="especialidad-description">{especialidad.description}</p>
                <div className="especialidad-list">
                  <h4>Áreas de enfoque:</h4>
                  <ul>
                    {especialidad.specialties.map((specialty, idx) => (
                      <li key={idx}>{specialty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESO ─── */}
      <section className="process-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Nuestro Proceso</h2>
            <p>Te acompañamos en cada paso de tu transformación</p>
          </div>
          
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-card">
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
