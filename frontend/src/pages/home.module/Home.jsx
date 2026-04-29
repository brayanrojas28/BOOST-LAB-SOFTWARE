import "./Home.css";
import heroImage from "../../assets/images/hero-bg.jpg"

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <div 
        className="hero" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="overlay">
          <h1>Bienvenido a BOOST</h1>
          <p>Conecta con profesionales de confianza en un solo lugar.</p>
        </div>
      </div>

      {/* Servicios */}
      <section className="services">
        <div className="section-container">
          <h2>Nuestros Servicios</h2>
          <p className="section-subtitle">Explora la variedad de servicios profesionales disponibles</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🧠</div>
              <h3>Psicología</h3>
              <p>Terapia individual y grupal con psicólogos profesionales</p>
            </div>
            <div className="service-card">
              <div className="service-icon">�</div>
              <h3>Terapias</h3>
              <p>Diferentes enfoques terapéuticos adaptados a tus necesidades</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Asesoría Financiera</h3>
              <p>Planificación y gestión financiera personal y empresarial</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Tutorías Laborales</h3>
              <p>Orientación profesional y desarrollo de carrera</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>Tutorías Educativas</h3>
              <p>Apoyo académico y desarrollo de habilidades de aprendizaje</p>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="specialties">
        <div className="section-container">
          <h2>🎯 Áreas de Especialización</h2>
          <p className="section-subtitle">Profesionales certificados en las áreas más importantes para tu bienestar</p>
          <div className="specialties-grid">
            <div className="specialty-item">
              <span className="specialty-badge">😰 Ansiedad</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">😔 Depresión</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">💑 Relaciones</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">💪 Autoestima</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">😓 Estrés</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">👨‍👩‍👧‍👦 Familia</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">🚭 Adicciones</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">💔 Trauma</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Rápido */}
      <section className="contact">
        <div className="section-container">
          <h2>📞 Contáctanos</h2>
          <p className="section-subtitle">Estamos aquí para ayudarte en tu camino hacia el bienestar</p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <h3>Email</h3>
                <p>info@boost.com</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <h3>Teléfono</h3>
                <p>+57 123 456 7890</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <h3>Atención</h3>
                <p>Online 24/7</p>
              </div>
            </div>
            <a href="/contacto" className="btn-contact">💬 Enviar Mensaje</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>🚀 Comienza tu Transformación</h2>
        <p>Únete a miles de personas que han mejorado su calidad de vida con BOOST</p>
        <a href="/register" className="btn-primary">✨ Registrarse Ahora</a>
      </section>

      {/* Footer */}
      <footer className="rights">
        <p>© 2026 BOOST. Todos los derechos reservados.</p>
        <p>Diseñado con ❤️ por BoostLabSoftware</p>
      </footer>
    </div>
  );
}
