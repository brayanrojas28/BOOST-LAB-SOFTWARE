import { useState } from "react";
import "../styles/Register.css"; // estilos opcionales

export default function Register() {
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    userName: "",        // documento del usuario (el backend espera "userName")
    fullName: "",        // nombre completo
    email: "",           // correo electrónico
    password: "",        // contraseña
    role: "client",      // rol por defecto ("client" o "professional")
  });

  const [error, setError] = useState(""); // para mostrar mensajes de error

  // Función que actualiza el estado cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue la página

    // Validaciones básicas en el front
    if (!formData.userName) {
      setError("El número de documento es obligatorio");
      return;
    }
    if (!formData.fullName) {
      setError("El nombre completo es obligatorio");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("El correo debe ser válido y contener @");
      return;
    }
    if (formData.password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(""); // limpiamos errores si todo está bien

    try {
      // Llamada al backend con fetch
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Enviamos solo lo que el backend espera
        body: JSON.stringify({
          userName: formData.userName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!res.ok) throw new Error("Error en registro");

      // Aquí sí usamos la respuesta para evitar el warning de ESLint
      const data = await res.json();
      alert("Usuario registrado con éxito: " + data.fullName);

      // Redirigimos al login
      window.location.href = "/login";
    } catch (err) {
      setError("Error en registro: " + err.message);
    }
  };

  return (
    <div className="container register">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        {/* Documento (userName) */}
        <input
          type="text"
          name="userName"
          placeholder="Número de documento"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        {/* Nombre completo */}
        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        {/* Correo */}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mínimo 5 caracteres)"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Confirmar contraseña */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Rol */}
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="client">Cliente</option>
          <option value="professional">Profesional</option>
        </select>

        {/* Botón */}
        <button type="submit" className="btn-primary">Registrarse</button>
      </form>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
