import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home.module/Home";
import Servicios from "./pages/servicios.module/Servicios";
import Especialidades from "./pages/especialidades.module/Especialidades";
import Contacto from "./pages/contacto.module/Contacto";
import Login from "./pages/login.module/Login";
import Register from "./pages/register.module/Register";
import Recover from "./pages/recoverPassword.module/RecoverPassword";
import RegisterClient from "./pages/registerClient.module/RegisterClient";
import RegisterProfessional from "./pages/registerProfessional.module/RegisterProfessional";
import ProfessionalDashboard from "./pages/professional.module/ProfessionalDashboard";
import ClientDashboard from "./pages/client.module/ClientDashboard";
import "./index.css";

// 👇 componente intermedio
function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/register/client",
    "/register/professional",
    "/professional/dashboard",
    "/client/dashboard"
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
        <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
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