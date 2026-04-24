import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importamos el hook
import "../styles/Login.css"; // Asegúrate de tener este archivo para estilos específicos de login

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 inicializamos el hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👈 evita recarga

    if (!formData.userName) {
      setError("El número de documento es obligatorio");
      return;
    }
    if (formData.password.length < 5) {
      setError("La contraseña debe  tener al menos 5 caracteres");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();

      // Guardamos token y datos del usuario
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigimos según el rol usando navigate (sin recargar)
      if (data.user.role === "client") {
        navigate("/register/client");
      } else if (data.user.role === "professional") {
        navigate("/register/professional");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Error en login: " + err.message);
    }
  };

  return (
    <div className="container login">
      <h1>Ingresar</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Número de documento"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="recover">
        <p>¿Olvidaste tu contraseña?</p>
        <a href="/recover">Recuperar contraseña</a>
      </div>
    </div>
  );
}
