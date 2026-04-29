import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="logo">BOOST</div>

      <ul className="nav-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
        <Link to="/servicios" className={isActive("/servicios") ? "active" : ""}>Servicios</Link>
        <Link to="/especialidades" className={isActive("/especialidades") ? "active" : ""}>Especialidades</Link>
        <Link to="/contacto" className={isActive("/contacto") ? "active" : ""}>Contacto</Link>
      </ul>

      <div className="navbar-buttons">
        <Link to="/login" className="btn btn-outline">Ingresar</Link>
        <Link to="/register" className="btn btn-solid">Registrarse</Link>
      </div>
    </nav>
  );
}
