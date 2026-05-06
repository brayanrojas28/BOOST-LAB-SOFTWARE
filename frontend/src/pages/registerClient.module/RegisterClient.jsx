import { useState, useEffect } from "react";
import "./RegisterClient.css"; // estilos opcionales

export default function RegisterClient() {
  const [form, setForm] = useState({
    phoneNumber: "",
    city: "",
    address: "",
    birthDate: "",
    occupation: "",
    bio: ""
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // cargar usuario desde localStorage
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    let storedUser = null;
    try {
      const validRawUser = rawUser && rawUser !== "undefined" ? rawUser : null;
      if (!validRawUser && rawUser) {
        localStorage.removeItem("user");
      }
      storedUser = validRawUser ? JSON.parse(validRawUser) : null;
    } catch (parseError) {
      console.error("Invalid user in localStorage:", rawUser, parseError);
      localStorage.removeItem("user");
    }

    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.phoneNumber || !form.city || !form.birthDate) {
      setMessage("Faltan campos obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/register/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // opcional (cuando uses JWT en backend)
          // Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          idUser: user.id, // enviamos el id del usuario registrado
          ...form
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessage("Registro completado correctamente");

    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="page">
      <div className="container">
        
        {/* PANEL IZQUIERDO */}
        <div className="sidebar">
          <h2>👤 Perfil</h2>
          <p><strong>{user.fullName || "Usuario"}</strong></p>
          <p>{user.email}</p>
          <p style={{ opacity: 0.8 }}>ID: {user.userName}</p>

          <div className="info-box">
            <p>Completa tu información para continuar 🚀</p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="card">
          <h2>Datos del cliente</h2>

          <form onSubmit={handleSubmit}>
            <input 
              name="phoneNumber" 
              placeholder="Teléfono *" 
              onChange={handleChange} 
              required 
            />

            <select name="city" onChange={handleChange} required value={form.city}>
              <option value="">Ciudad *</option>
              <option value="Medellín">Medellín</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Cali">Cali</option>
            </select>

            <input 
              type="date" 
              name="birthDate" 
              onChange={handleChange} 
              required 
            />

            <input 
              name="address" 
              placeholder="Dirección (opcional)" 
              onChange={handleChange} 
            />

            <input 
              name="occupation" 
              placeholder="Ocupación (opcional)" 
              onChange={handleChange} 
            />

            <textarea 
              name="bio" 
              placeholder="Biografía (opcional)" 
              onChange={handleChange} 
            />

            <button type="submit">Guardar</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>

      </div>
    </div>
  );
}