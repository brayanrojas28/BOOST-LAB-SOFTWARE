import "../styles/Home.css";
import heroImage from "../assets/images/hero-bg.jpg"; // 👈 importa la imagen

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

      {/* Beneficios */}
      <section className="benefits">
        <h2>¿Por qué elegir BOOST?</h2>
        <div className="benefits-grid">
          <div className="benefit">✔ Profesionales validados y seguros</div>
          <div className="benefit">✔ Plataforma fácil de usar</div>
          <div className="benefit">✔ Atención personalizada</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Comienza hoy mismo</h2>
        <p>Regístrate y accede a nuestras asesorías profesionales.</p>
        <a href="/register" className="btn-primary">Registrarse</a>
      </section>

      {/* Derechos */}
      <footer className="rights">
        <p>© 2026 BOOST. Todos los derechos reservados.</p>
        <p>Diseñado con ❤️ por BoostLabSoftware</p>
      </footer>
    </div>
  );
}
