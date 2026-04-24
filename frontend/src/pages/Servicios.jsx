import "../styles/Servicios.css";

export default function Servicios() {
  return (
    <div className="container servicios">
      <h1>Servicios que ofrecemos</h1>
      <p className="intro">
        BOOST pone a tu disposición herramientas y formatos que facilitan tu experiencia de asesoría. 
        Contamos con recursos digitales, agendamiento en la jornada que prefieras y sesiones diseñadas 
        para adaptarse a tus necesidades.
      </p>

      <div className="cards">
        <div className="card">
          <div className="icon">💻</div>
          <h2>Recursos Digitales</h2>
          <p>Accede a materiales interactivos y contenidos exclusivos que complementan tus asesorías.</p>
        </div>
        <div className="card">
          <div className="icon">📅</div>
          <h2>Agendamiento Flexible</h2>
          <p>Programa tus sesiones en la jornada que prefieras, con disponibilidad adaptada a tu ritmo.</p>
        </div>
        <div className="card">
          <div className="icon">👤</div>
          <h2>Sesiones Individuales</h2>
          <p>Atención personalizada uno a uno con profesionales especializados en cada área.</p>
        </div>
      </div>
    </div>
  );
}
