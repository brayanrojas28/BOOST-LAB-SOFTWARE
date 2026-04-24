import "../styles/Contacto.css";

export default function Contacto() {
  return (
    <div className="container contacto">
      <h1>Contáctanos</h1>
      <p className="intro">
        ¿Tienes dudas o quieres más información? Nuestro equipo está listo para ayudarte.
        Escríbenos o llámanos, y te responderemos lo más pronto posible.
      </p>

      <div className="contact-grid">
        {/* Datos de contacto */}
        <div className="contact-info">
          <h2>Información</h2>
          <p>Correo:   contacto@boost.com</p>
          <p>Número: +57 300 123</p>
          <p>Medellín, Colombia</p>
        </div>

        {/* Formulario */}
        <form className="contact-form">
          <h2>Envíanos un mensaje</h2>
          <input type="text" placeholder="Tu nombre" required />
          <input type="email" placeholder="Tu correo" required />
          <textarea placeholder="Escribe tu mensaje..." rows="5" required></textarea>
          <button type="submit" className="btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
}
