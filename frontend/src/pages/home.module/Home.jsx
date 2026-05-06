import "./Home.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/imagenFront1.jpg"; 
import img2 from "../../assets/images/imagenFront2.jpg";
import ctaImage from "../../assets/images/imagenFront3.jpg";
export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: "🌍", title: "Acceso Global", desc: "Conéctate con profesionales desde cualquier lugar" },
    { icon: "⏱️", title: "Flexibilidad de Horarios", desc: "Agenda sesiones que se adapten a tu vida" },
    { icon: "🔒", title: "Privacidad Garantizada", desc: "Tu información está protegida y confidencial" },
    { icon: "💬", title: "Disponibilidad 24/7", desc: "Soporte cuando lo necesites" },
  ];

  const benefits = [
    {
      icon: "✨",
      title: "Comodidad en tu Espacio",
      desc: "Recibe asesoría desde la comodidad de tu hogar, sin desplazamientos innecesarios. Ahorra tiempo y dinero."
    },
    {
      icon: "🎯",
      title: "Profesionales Certificados",
      desc: "Acceso a expertos verificados en psicología, finanzas, educación y más. Todos con experiencia comprobada."
    },
    {
      icon: "📱",
      title: "Tecnología Segura",
      desc: "Plataforma cifrada y con estándares de seguridad internacionales. Tu privacidad es nuestra prioridad."
    },
    {
      icon: "💡",
      title: "Resultados Comprobados",
      desc: "Miles de personas han transformado sus vidas. Metodologías basadas en investigación científica."
    },
  ];

  return (
    <div className="home">

      {/* HERO CON IMAGEN DE FONDO OSCURECIDA */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay oscuro encima de la imagen */}
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Transforma Tu Vida</h1>
          <p>Conecta con profesionales certificados en un espacio seguro y confidencial</p>
        </div>
      </section>

      {/* CARACTERÍSTICAS PRINCIPALES */}
      <section className="features-section">
        <div className="section-container">
          <h2>¿Por qué elegir servicios online?</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS CON PANELES */}
      <section
        className="benefits-section"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay oscuro encima de la imagen */}
        <div className="benefits-overlay" />

        <div className="section-container">
          <h2>Servicios Online Funcionales y Efectivos</h2>
          <p className="section-intro">Descubre por qué nuestros servicios online son la mejor opción para tu bienestar</p>

          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-panel">
                <div className="panel-top">
                  <span className="panel-icon">{b.icon}</span>
                </div>
                <div className="panel-body">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO / MÉTRICAS */}
      <section className="impact-section">
        <div className="section-container">
          <h2>Tu Transformación Comienza Aquí</h2>

          <div className="impact-grid">
            <div className="impact-card">
              <h3>500+</h3>
              <p>Profesionales Certificados</p>
            </div>
            <div className="impact-card">
              <h3>10K+</h3>
              <p>Usuarios Satisfechos</p>
            </div>
            <div className="impact-card">
              <h3>4.9 ⭐</h3>
              <p>Calificación Promedio</p>
            </div>
            <div className="impact-card">
              <h3>24/7</h3>
              <p>Disponibilidad Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="final-cta"
        style={{
          backgroundImage: `url(${ctaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="cta-overlay" />
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestra comunidad de bienestar hoy mismo</p>
          <button className="btn-primary-large" onClick={() => navigate("/register")}>
            Registrarse Ahora
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 BOOST | Transformando vidas, un paso a la vez</p>
      </footer>
    </div>
  );
}
