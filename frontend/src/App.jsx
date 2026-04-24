import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Especialidades from "./pages/Especialidades";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recover from "./pages/RecoverPassword";
import RegisterClient from "./pages/RegisterClient";
import RegisterProfessional from "./pages/RegisterProfessional";
import "./index.css";

// 👇 componente intermedio
function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/register/client",
    "/register/professional"
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/register/client" element={<RegisterClient />} />
        <Route path="/register/professional" element={<RegisterProfessional />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}