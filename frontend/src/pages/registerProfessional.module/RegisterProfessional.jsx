import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./RegisterProfessional.css";

export default function RegisterProfessional() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

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

    if (storedUser) {
      setUser(storedUser);
      // Si hay datos en el usuario, prellenar el formulario con todos los datos guardados
      setForm(prev => ({
        ...prev,
        phoneNumber: storedUser.phoneNumber || "",
        city: storedUser.city || "",
        address: storedUser.address || "",
        birthDate: storedUser.birthDate || "",
        bio: storedUser.bio || "",
        profession: storedUser.profession || "",
        experience: storedUser.experience || "",
        languages: storedUser.languages || [],
        softSkills: storedUser.softSkills || [],
        professionalLicense: storedUser.professionalLicense || ""
      }));
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
    setLoading(true);

    if (
      !form.phoneNumber ||
      !form.city ||
      !form.birthDate ||
      !form.bio ||
      !form.profession ||
      !form.professionalLicense
    ) {
      setMessage("❌ Faltan campos obligatorios");
      setLoading(false);
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

      // Actualizar usuario en localStorage con datos completos y dataCompleted: true
      const updatedUser = { 
        ...user, 
        phoneNumber: form.phoneNumber,
        city: form.city,
        address: form.address,
        birthDate: form.birthDate,
        bio: form.bio,
        profession: form.profession,
        experience: form.experience,
        languages: form.languages,
        softSkills: form.softSkills,
        professionalLicense: form.professionalLicense,
        dataCompleted: true 
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Perfil profesional registrado correctamente");
      setTimeout(() => {
        navigate("/professional/dashboard");
      }, 1500);

    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div style={{ textAlign: "center", padding: "2rem" }}>Cargando...</div>;

  return (
    <div className="page">
      <div className="container">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>💼 Datos Profesionales</h2>
          <p>{user.fullName || "Usuario"}</p>
          <p style={{ fontSize: "0.85rem", color: "#999" }}>{user.email}</p>

          <div className="info-box">
            <p>
              {isEditMode 
                ? "Actualiza tu información profesional en cualquier momento 📝"
                : "Completa tu información profesional para ofrecer servicios en BOOST 🚀"}
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #d0d0d0" }}>
            <p style={{ fontSize: "0.85rem", color: "#999" }}>Tus servicios:</p>
            <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>Psicología, Terapias, Asesoría Financiera, Tutoría Laboral, Tutoría Educativa</p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="card">
          <h2>Información Profesional</h2>

          <form onSubmit={handleSubmit}>
            {/* Información de Contacto */}
            <fieldset style={{ border: "none", padding: "0" }}>
              <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>
                Datos de Contacto
              </legend>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Teléfono *"
                value={form.phoneNumber}
                onChange={handleChange}
                disabled={loading}
                required
              />

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="">Selecciona Ciudad *</option>
                <option value="Medellín">Medellín</option>
                <option value="Bogotá">Bogotá</option>
                <option value="Cali">Cali</option>
              </select>

              <input
                type="text"
                name="address"
                placeholder="Dirección (opcional)"
                value={form.address}
                onChange={handleChange}
                disabled={loading}
              />

              <legend style={{ color: "#030347", fontWeight: "400", marginBottom: "0rem", fontSize: "0.80rem", marginTop: "0.95rem" }}>
                Fecha de Nacimiento *
              </legend>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                disabled={loading}
                required
                style={{ marginTop: "0.5rem" }}
              />
            </fieldset>

            {/* Información Profesional */}
            <fieldset style={{ border: "none", padding: "0", marginTop: "1.5rem" }}>
              <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>
                Experiencia Profesional
              </legend>

              <select
                name="profession"
                value={form.profession}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="">Selecciona tu Profesión *</option>
                <option value="psicología">Psicólogo/a</option>
                <option value="finanzas">Asesor/a Financiero</option>
                <option value="educativo">Tutor/a Educativo</option>
                <option value="laboral">Asesor/a Laboral</option>
                <option value="coach">Coach de Vida</option>
              </select>

              <input
                type="number"
                name="experience"
                placeholder="Años de experiencia *"
                value={form.experience}
                onChange={handleChange}
                disabled={loading}
                required
                min="0"
              />

              <input
                type="text"
                name="professionalLicense"
                placeholder="Tarjeta Profesional *"
                value={form.professionalLicense}
                onChange={handleChange}
                disabled={loading}
                required
              />

              <textarea
                name="bio"
                placeholder="Perfil profesional *  (Cuéntanos sobre ti, tu experiencia y especialidades)"
                value={form.bio}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </fieldset>

            {/* Idiomas */}
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
                      disabled={loading}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </div>

            {/* Habilidades */}
            <div className="checkbox-group">
              <p>Habilidades y Competencias</p>
              <div className="checkbox-grid">
                {["Liderazgo", "Comunicación", "Empatía", "Trabajo en Equipo", "Creatividad", "Pensamiento Crítico"].map((skill) => (
                  <label key={skill}>
                    <input
                      type="checkbox"
                      value={skill}
                      checked={form.softSkills.includes(skill)}
                      onChange={(e) => handleCheckbox(e, "softSkills")}
                      disabled={loading}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span style={{
                    display: "inline-block",
                    width: "14px",
                    height: "14px",
                    border: "2px solid rgba(242, 242, 242, 0.3)",
                    borderTopColor: "#F2F2F2",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                  }}></span>
                  Guardando...
                </>
              ) : (
                "✓ Guardar Perfil Profesional"
              )}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}