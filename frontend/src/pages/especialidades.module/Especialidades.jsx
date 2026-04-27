import "../servicios.module/Servicios.css";

export default function Servicios() {
  return (
    <div className="container servicios">
      <h1>Áreas destacadas en BOOST</h1>
      <div className="cards">
        <div className="card">
          <div className="icon">💰</div>
          <h2>Asesoría Financiera</h2>
          <p>Optimiza tus recursos con expertos.</p>
        </div>
        <div className="card">
          <div className="icon">🎓</div>
          <h2>Asesorías Académicas</h2>
          <p>Apoyo en tus estudios y proyectos académicos.</p>
        </div>
        <div className="card">
          <div className="icon">💬</div>
          <h2>Acompañamiento Psicológico</h2>
          <p>Bienestar emocional con profesionales confiables.</p>
        </div>
      </div>
    </div>
  );
}
