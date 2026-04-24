import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">BOOST</div>
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/especialidades">Especialidades</Link>
        <Link to="/contacto">Contacto</Link>
      </ul>
      <div className="navbar-buttons">
        <Link to="/login" className="btn-outline">Ingresar</Link>
        <Link to="/register" className="btn-solid">Registrarse</Link>
      </div>
    </nav>
  );
}
