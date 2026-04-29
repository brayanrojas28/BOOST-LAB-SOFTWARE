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
              <p>Sesiones de terapia individual y grupal</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💪</div>
              <h3>Coaching</h3>
              <p>Desarrollo personal y profesional</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🧘</div>
              <h3>Meditación</h3>
              <p>Técnicas de bienestar mental</p>
            </div>
            <div className="service-card">
              <div className="service-icon">❤️</div>
              <h3>Asesoramiento</h3>
              <p>Orientación para momentos difíciles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="specialties">
        <div className="section-container">
          <h2>Especialidades</h2>
          <p className="section-subtitle">Profesionales especializados en diferentes áreas</p>
          <div className="specialties-grid">
            <div className="specialty-item">
              <span className="specialty-badge">Ansiedad</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Depresión</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Relaciones</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Autoestima</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Estrés</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Familia</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Adicciones</span>
            </div>
            <div className="specialty-item">
              <span className="specialty-badge">Trauma</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="contact">
        <div className="section-container">
          <h2>¿Necesitas Ayuda?</h2>
          <p className="section-subtitle">Contáctanos y comenzamos a trabajar en tu bienestar</p>
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
                <span className="contact-icon">📍</span>
                <h3>Ubicación</h3>
                <p>Online 24/7</p>
              </div>
            </div>
            <a href="/contacto" className="btn-contact">Enviar Mensaje</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Comienza hoy mismo</h2>
        <p>Regístrate y accede a nuestras asesorías profesionales.</p>
        <a href="/register" className="btn-primary">Registrarse Ahora</a>
      </section>

      {/* Footer */}
      <footer className="rights">
        <p>© 2026 BOOST. Todos los derechos reservados.</p>
        <p>Diseñado con ❤️ por BoostLabSoftware</p>
      </footer>
    </div>
  );
}
