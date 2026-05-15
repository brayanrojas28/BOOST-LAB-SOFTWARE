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
    professionalLicense: "",
    profileImage: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    console.log("Raw user from localStorage:", rawUser);
    let storedUser = null;
    try {
      const validRawUser = rawUser && rawUser !== "undefined" ? rawUser : null;
      if (!validRawUser && rawUser) {
        localStorage.removeItem("user");
      }
      storedUser = validRawUser ? JSON.parse(validRawUser) : null;
      console.log("Parsed user:", storedUser);
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
        professionalLicense: storedUser.professionalLicense || "",
        profileImage: storedUser.profileImage || ""
      }));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const validateBirthYear = (birthDate) => {
    const birth = new Date(birthDate);
    const birthYear = birth.getFullYear();
    return birthYear <= 2008;
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ La imagen no debe superar 5MB");
        return;
      }
      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setForm({ ...form, profileImage: file.name });
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setForm({ ...form, profileImage: "" });
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

    if (!validateBirthYear(form.birthDate)) {
      setMessage("❌ Debes ser mayor de edad (18 años o más) para registrarte como profesional.");
      setLoading(false);
      return;
    }

    try {
      // Verificar que el usuario existe
      console.log("Usuario en handleSubmit:", user);
      console.log("user.id:", user.id);
      
      if (!user || !user.id) {
        setMessage("❌ Error: Usuario no encontrado. Por favor inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      // Crear FormData para manejar la subida de imagen
      const formData = new FormData();
      formData.append('idUser', user.id);
      formData.append('phoneNumber', form.phoneNumber);
      formData.append('city', form.city);
      formData.append('address', form.address);
      formData.append('birthDate', form.birthDate);
      formData.append('bio', form.bio);
      formData.append('profession', form.profession);
      formData.append('experience', form.experience);
      formData.append('languages', JSON.stringify(form.languages));
      formData.append('softSkills', JSON.stringify(form.softSkills));
      formData.append('professionalLicense', form.professionalLicense);
      
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      const res = await fetch("http://localhost:8080/api/register/professional", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);

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
        profileImage: data.professional?.profileImage || (user ? user.profileImage || "" : ""),
        dataCompleted: true 
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Usuario actualizado en localStorage:", updatedUser);

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
          <p>{user ? user.fullName || "Usuario" : "Usuario"}</p>
          <p style={{ fontSize: "0.85rem", color: "#999" }}>{user ? user.email : ""}</p>

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
            {/* Imagen de Perfil */}
            <fieldset style={{ border: "none", padding: "0", marginBottom: "1.5rem" }}>
              <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>
                Foto de Perfil
              </legend>
              
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                {imagePreview || (user && user.profileImage) ? (
                  <div style={{ position: "relative", width: "150px", height: "150px" }}>
                    <img 
                      src={imagePreview || (user ? `http://localhost:8080/uploads/${user.profileImage}` : "")} 
                      alt="Perfil" 
                      style={{ 
                        width: "150px", 
                        height: "150px", 
                        borderRadius: "50%", 
                        objectFit: "cover", 
                        border: "4px solid #030347" 
                      }} 
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        fontSize: "16px"
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "2px dashed #030347",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc"
                  }}>
                    <span style={{ fontSize: "48px", color: "#030347" }}>👤</span>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  style={{ display: "none" }}
                  id="profileImage"
                />
                
                <button
                  type="button"
                  onClick={() => document.getElementById('profileImage').click()}
                  disabled={loading}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#030347",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  {imagePreview || (user && user.profileImage) ? "Cambiar Foto" : "Subir Foto"}
                </button>
              </div>
            </fieldset>
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
            <fieldset style={{ border: "none", padding: "0", marginBottom: "1.5rem", borderTop: "1px solid #d0d0d0", paddingTop: "1.5rem" }}>
              <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>Idiomas (Opcional)</legend>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {["Español", "Inglés", "Portugués", "Francés"].map((lang) => (
                  <label key={lang} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      value={lang}
                      checked={form.languages.includes(lang)}
                      onChange={(e) => handleCheckbox(e, "languages")}
                      disabled={loading}
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Habilidades */}
            <fieldset style={{ border: "none", padding: "0", marginBottom: "1.5rem", borderTop: "1px solid #d0d0d0", paddingTop: "1.5rem" }}>
              <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>Habilidades y Competencias (Opcional)</legend>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {["Comunicación", "Empatía", "Paciencia", "Liderazgo", "Flexibilidad", "Creatividad"].map((skill) => (
                  <label key={skill} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      value={skill}
                      checked={form.softSkills.includes(skill)}
                      onChange={(e) => handleCheckbox(e, "softSkills")}
                      disabled={loading}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </fieldset>

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