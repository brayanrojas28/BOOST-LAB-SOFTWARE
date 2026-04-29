import "./Contacto.css";

export default function Contacto() {
  const contactInfo = [
    {
      icon: "📧",
      label: "Correo Electrónico",
      value: "contacto@boost.com"
    },
    {
      icon: "📱",
      label: "Teléfono",
      value: "+57 300 123 4567"
    },
    {
      icon: "🌐",
      label: "Atención",
      value: "Online 24/7"
    },
    {
      icon: "📍",
      label: "Ubicación",
      value: "Medellín, Colombia"
    }
  ];

  const benefits = [
    {
      icon: "🚀",
      title: "Respuesta Rápida",
      description: "Te responderemos en menos de 24 horas"
    },
    {
      icon: "🎯",
      title: "Atención Personalizada",
      description: "Cada caso es único y lo tratamos como tal"
    },
    {
      icon: "🔆",
      title: "Sin Compromiso",
      description: "La primera consulta es completamente gratuita"
    },
    {
      icon: "🌟",
      title: "Expertos Certificados",
      description: "Todo nuestro equipo está verificado y calificado"
    }
  ];

  return (
    <div className="contacto-page">

      {/* ─── HERO ─── */}
      <section className="contacto-hero">
        <h1>Contáctanos</h1>
        <p className="hero-subtitle">Estamos aquí para ayudarte en tu camino hacia el bienestar</p>
        <p className="hero-description">
          ¿Tienes dudas o quieres más información? Nuestro equipo está listo para ayudarte.
          Escríbenos o llámanos, y te responderemos lo más pronto posible con la atención 
          que te mereces.
        </p>
      </section>

      {/* ─── CONTACTO INFO Y FORMULARIO ─── */}
      <section className="contacto-section">
        <div className="section-inner">
          <div className="contacto-grid">
            
            {/* Información de Contacto */}
            <div className="contacto-info-card">
              <div className="card-header">
                <h2>📞 Información de Contacto</h2>
                <p>Puedes comunicarte con nosotros a través de estos medios</p>
              </div>
              
              <div className="contacto-items">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contacto-item">
                    <span className="contacto-icon">{item.icon}</span>
                    <div className="contacto-details">
                      <h3>{item.label}</h3>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="contacto-form-card">
              <div className="card-header">
                <h2>💬 Envíanos un Mensaje</h2>
                <p>Completa el formulario y te responderemos a la brevedad</p>
              </div>
              
              <form className="contacto-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Tu nombre completo" 
                    required 
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    required 
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    placeholder="Escribe tu mensaje aquí..." 
                    rows="5" 
                    required 
                    className="form-textarea"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-submit">
                  <span>Enviar Mensaje</span>
                  <span className="btn-arrow">→</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ─── BENEFICIOS ─── */}
      <section className="benefits-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>¿Por qué contactarnos?</h2>
            <p>Descubre las ventajas de comunicarte con nuestro equipo de expertos</p>
          </div>
          
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <h3>{benefit.icon} {benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
