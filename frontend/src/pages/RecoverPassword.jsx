import { useState } from "react";
import "../styles/RecoverPassword.css"; // Asegúrate de tener este archivo para estilos específicos de recuperación

export default function Recover() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Debe ingresar un correo válido");
      return;
    }

    try {
      // Aquí llamas al backend con axios
      // Ejemplo: await axios.post("/api/recover", { email });
      console.log("Solicitud enviada:", email);

      setMessage("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      setMessage("Error al solicitar recuperación. Intenta de nuevo.");
    }
  };

  return (
    <div className="container recover">
      <h1>Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico registrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Enviar enlace</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
