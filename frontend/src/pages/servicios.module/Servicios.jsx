import "./Servicios.css";

export default function Servicios() {
  const services = [
    {
      icon: "🧠",
      title: "Psicología",
      description: "Sesiones terapéuticas individuales y grupales con psicólogos clínicos certificados.",
      items: ["Terapia cognitivo-conductual", "Terapia humanista", "Psicoterapia psicodinámica"]
    },
    {
      icon: "🤝",
      title: "Terapias Especializadas",
      description: "Enfoques terapéuticos adaptados a tus necesidades y situación particular.",
      items: ["Terapia familiar y de pareja", "Terapia de grupo", "Mindfulness y relajación"]
    },
    {
      icon: "💰",
      title: "Asesoría Financiera",
      description: "Planificación financiera personal y empresarial con asesores certificados.",
      items: ["Gestión de presupuesto", "Inversión y ahorro", "Gestión de deuda"]
    },
    {
      icon: "💼",
      title: "Tutorías Laborales",
      description: "Orientación profesional integral para impulsar tu desarrollo de carrera.",
      items: ["Coaching de carrera", "Preparación de entrevistas", "Habilidades blandas"]
    },
    {
      icon: "📚",
      title: "Tutorías Educativas",
      description: "Apoyo académico personalizado para estudiantes de todos los niveles.",
      items: ["Refuerzo académico", "Técnicas de estudio", "Preparación para exámenes"]
    }
  ];

  const benefits = [
    { icon: "🎯", title: "Profesionales Certificados", text: "Todos nuestros expertos están verificados y con experiencia comprobada." },
    { icon: "⏰", title: "Flexibilidad Total", text: "Agenda tus sesiones en los horarios que mejor se adapten a tu rutina." },
    { icon: "🔒", title: "Confidencialidad Garantizada", text: "Tu información y sesiones están protegidas con los más altos estándares." },
    { icon: "💎", title: "Resultados Comprobados", text: "Miles de clientes han transformado sus vidas con la ayuda de BOOST." }
  ];

  return (
    <div className="servicios-page">

      {/* ─── HERO ─── */}
      <section className="servicios-hero">
        <h1>¿Qué es BOOST?</h1>
        <p className="hero-subtitle">Plataforma Integral de Bienestar y Desarrollo</p>
        <p className="hero-description">
          BOOST es tu aliado para el crecimiento personal y profesional. Te conectamos
          con expertos certificados en psicología, finanzas, educación y desarrollo
          laboral — todo en un solo lugar, de forma segura y personalizada.
        </p>
        <div className="hero-badges">
          <span className="hero-badge">✅ Profesionales certificados</span>
          <span className="hero-badge">⏰ Flexibilidad de horarios</span>
          <span className="hero-badge">🔒 Confidencialidad garantizada</span>
          <span className="hero-badge">🎯 Servicios personalizados</span>
        </div>
      </section>

      {/* ─── SERVICIOS ─── */}
      <section className="servicios-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Nuestros Servicios Profesionales</h2>
            <p>Descubre nuestra gama de servicios diseñados para transformar tu vida.</p>
          </div>

          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul>
                  {s.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFICIOS ─── */}
      <section className="benefits-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>¿Por qué elegir BOOST?</h2>
            <p>Nos comprometemos con tu bienestar en cada paso del camino.</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <h3>{b.icon} {b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
