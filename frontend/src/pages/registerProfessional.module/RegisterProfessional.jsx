import { useState, useEffect } from "react";
import "./RegisterProfessional.css"; // estilos opcionales

export default function RegisterProfessional() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    phoneNumber: "",
    city: "",
    address: "",
    birthDate: "",
    bio: "",
    profession: "",
    experience: "",
    languages: [],
    softSkills: [],
    professionalLicense: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e, field) => {
    const value = e.target.value;

    setForm((prev) => {
      const exists = prev[field].includes(value);

      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM ENVIADO:", form); // 👈 DEBUG

    if (
      !form.phoneNumber ||
      !form.city ||
      !form.birthDate ||
      !form.bio ||
      !form.profession ||
      !form.professionalLicense
    ) {
      setMessage("Faltan campos obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/register/professional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idUser: user.id,
          phoneNumber: form.phoneNumber,
          city: form.city,
          address: form.address,
          birthDate: form.birthDate,
          bio: form.bio,
          profession: form.profession,
          experience: form.experience,
          languages: form.languages,
          softSkills: form.softSkills,
          professionalLicense: form.professionalLicense
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessage("Perfil profesional registrado correctamente");

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
      <h2>🧑‍💼 Profesional</h2>
      <p><strong>{user.fullName || "Usuario"}</strong></p>
      <p>{user.email}</p>
      <p style={{ opacity: 0.8 }}>ID: {user.userName}</p>

      <div className="info-box">
        <p>Completa tu perfil profesional para empezar 🚀</p>
      </div>
    </div>

    {/* FORMULARIO */}
    <div className="card">
      <h2>Datos profesionales</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="phoneNumber"
          placeholder="Teléfono *"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />

        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        >
          <option value="">Ciudad *</option>
          <option value="Medellín">Medellín</option>
          <option value="Bogotá">Bogotá</option>
          <option value="Cali">Cali</option>
        </select>

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Dirección (opcional)"
          value={form.address}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Biografía *"
          value={form.bio}
          onChange={handleChange}
          required
        />

        <select
          name="profession"
          value={form.profession}
          onChange={handleChange}
          required
        >
          <option value="">Profesión *</option>
          <option value="finanzas">Asesor/a  Financiero</option>
          <option value="académico">Profesor/a  Académico</option>
          <option value="Psicólogia">Psicólogo/a</option>
        </select>

        <input
          name="experience"
          type="number"
          placeholder="Años de experiencia *"
          value={form.experience}
          onChange={handleChange}
        />

        {/* IDIOMAS */}
        <div className="checkbox-group">
          <p>Idiomas</p>
          <div className="checkbox-grid">
            {["Español", "Inglés", "Portugués", "Francés", "Otro"].map((lang) => (
              <label key={lang}>
                <input
                  type="checkbox"
                  value={lang}
                  checked={form.languages.includes(lang)}
                  onChange={(e) => handleCheckbox(e, "languages")}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* HABILIDADES */}
        <div className="checkbox-group">
          <p>Habilidades</p>
          <div className="checkbox-grid">
            {["liderazgo", "comunicación", "empatía", "trabajo en equipo", "creatividad"].map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={form.softSkills.includes(skill)}
                  onChange={(e) => handleCheckbox(e, "softSkills")}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <input
          name="professionalLicense"
          placeholder="Carnet Profesional *"
          value={form.professionalLicense}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>

  </div>
</div>
  );
}