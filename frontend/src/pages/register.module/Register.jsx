import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Paso 1: básico, Paso 2: datos adicionales
  const [user, setUser] = useState(null);
  
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [additionalData, setAdditionalData] = useState({
    phoneNumber: "",
    city: "",
    address: "",
    birthDate: "",
    bio: "",
    occupation: "",
    profession: "",
    experience: "",
    languages: [],
    softSkills: [],
    professionalLicense: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdditionalChange = (e) => {
    setAdditionalData({ ...additionalData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e, field) => {
    const value = e.target.value;
    setAdditionalData((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value]
      };
    });
  };

  // Paso 1: Registro básico
  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    if (!formData.userName) {
      setError("El número de documento es obligatorio");
      return;
    }
    if (!formData.fullName) {
      setError("El nombre completo es obligatorio");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("El correo debe ser válido");
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

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.userName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);

      // Pasar al paso 2
      setCurrentStep(2);
      setError("");
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Datos adicionales
  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    if (selectedRole === "professional") {
      if (!additionalData.phoneNumber || !additionalData.city || !additionalData.birthDate || !additionalData.profession || !additionalData.professionalLicense) {
        setError("❌ Faltan campos obligatorios");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/register/professional", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUser: user.id,
            phoneNumber: additionalData.phoneNumber,
            city: additionalData.city,
            address: additionalData.address,
            birthDate: additionalData.birthDate,
            bio: additionalData.bio,
            profession: additionalData.profession,
            experience: additionalData.experience,
            languages: additionalData.languages,
            softSkills: additionalData.softSkills,
            professionalLicense: additionalData.professionalLicense
          })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        // Actualizar usuario en localStorage
        const updatedUser = { 
          ...user, 
          phoneNumber: additionalData.phoneNumber,
          city: additionalData.city,
          address: additionalData.address,
          birthDate: additionalData.birthDate,
          bio: additionalData.bio,
          profession: additionalData.profession,
          experience: additionalData.experience,
          languages: additionalData.languages,
          softSkills: additionalData.softSkills,
          professionalLicense: additionalData.professionalLicense,
          dataCompleted: true 
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setError("");
        // Redirigir a dashboard
        setTimeout(() => {
          navigate("/professional/dashboard");
        }, 500);
      } catch (err) {
        setError("❌ Error: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Cliente
      if (!additionalData.phoneNumber || !additionalData.city || !additionalData.birthDate) {
        setError("Faltan campos obligatorios");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/register/client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUser: user.id,
            phoneNumber: additionalData.phoneNumber,
            city: additionalData.city,
            address: additionalData.address,
            birthDate: additionalData.birthDate,
            occupation: additionalData.occupation,
            bio: additionalData.bio
          })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        // Actualizar usuario en localStorage
        const updatedUser = { 
          ...user, 
          phoneNumber: additionalData.phoneNumber,
          city: additionalData.city,
          address: additionalData.address,
          birthDate: additionalData.birthDate,
          occupation: additionalData.occupation,
          bio: additionalData.bio,
          dataCompleted: true 
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setError("");
        // Redirigir a dashboard
        setTimeout(() => {
          navigate("/client/dashboard");
        }, 500);
      } catch (err) {
        setError("❌ Error: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!selectedRole) {
    return (
      <div className="register-container">
        <div className="register-background">
          <div className="register-background-image"></div>
          <div className="register-background-overlay"></div>
        </div>

        <button 
          className="btn-back"
          onClick={() => navigate("/")}
          title="Volver a la página de inicio"
        >
          ← Volver a Inicio
        </button>

        <div className="register-wrapper">
          <div className="role-selector">
            <div className="selector-header">
              <h1>¿Quién eres?</h1>
              <p>Selecciona tu rol para continuar</p>
            </div>

            <div className="role-options">
              <div 
                className="role-card client-card"
                onClick={() => setSelectedRole("client")}
              >
                <div className="role-icon">👤</div>
                <h2>Soy Cliente</h2>
                <p>Busco servicios profesionales de asesorías, terapias y más.</p>
                <ul className="role-features">
                  <li>✓ Acceso a profesionales</li>
                  <li>✓ Agendar sesiones</li>
                  <li>✓ Soporte 24/7</li>
                </ul>
              </div>

              <div 
                className="role-card professional-card"
                onClick={() => setSelectedRole("professional")}
              >
                <div className="role-icon">💼</div>
                <h2>Soy Profesional</h2>
                <p>Ofrezco servicios de psicología, tutoría, asesoría y más.</p>
                <ul className="role-features">
                  <li>✓ Tu propio perfil</li>
                  <li>✓ Gestiona tus sesiones</li>
                  <li>✓ Gana dinero</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Paso 1: Registro básico
  if (currentStep === 1) {
    return (
      <div className="register-container">
        <div className="register-background">
          <div className="register-background-image"></div>
          <div className="register-background-overlay"></div>
        </div>

        <button 
          className="btn-back"
          onClick={() => setSelectedRole(null)}
        >
          ← Atrás
        </button>

        <div className="register-wrapper">
          <div className="register-card">
            <div className="register-header">
              <div className="register-icon">
                {selectedRole === "professional" ? "💼" : "👤"}
              </div>
              <h1>{selectedRole === "professional" ? "Registro Profesional" : "Registro Cliente"}</h1>
              <p>Paso 1 de 2 - Información Básica</p>
            </div>

            {error && (
              <div className="error-alert">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmitStep1} className="register-form">
            <div className="form-group">
              <label htmlFor="userName">Número de Documento</label>
              <div className="input-wrapper">
                <span className="input-icon">📄</span>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  placeholder="Ej: 123456789"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Ej: Juan Pérez"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Ej: juan@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mínimo 5 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Continuando...
                </>
              ) : (
                "Continuar"
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>¿Ya tienes cuenta?</p>
            <a href="/login" className="login-link">Inicia sesión aquí</a>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // Paso 2: Datos adicionales
  if (currentStep === 2) {
    if (selectedRole === "professional") {
      return (
        <div className="page">
          <div className="container">
            {/* SIDEBAR */}
            <div className="sidebar">
              <h2>💼 Datos Profesionales</h2>
              <p>{user.fullName || "Usuario"}</p>
              <p style={{ fontSize: "0.85rem", color: "#999" }}>{user.email}</p>

              <div className="info-box">
                <p>Paso 2 de 2 - Completa tu información profesional para ofrecer servicios en BOOST 🚀</p>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="card">
              <h2>Información Profesional</h2>

              {error && (
                <div className="error-alert">
                  <span className="error-icon">⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmitStep2}>
                {/* Información de Contacto */}
                <fieldset style={{ border: "none", padding: "0", marginBottom: "1.5rem" }}>
                  <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>Datos de Contacto</legend>

                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    placeholder="Teléfono *" 
                    onChange={handleAdditionalChange}
                    value={additionalData.phoneNumber}
                    required 
                    style={{ marginBottom: "1rem" }}
                  />

                  <select name="city" onChange={handleAdditionalChange} required value={additionalData.city} style={{ marginBottom: "1rem" }}>
                    <option value="">Selecciona Ciudad *</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Cali">Cali</option>
                  </select>

                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Dirección (opcional)" 
                    onChange={handleAdditionalChange}
                    value={additionalData.address}
                    style={{ marginBottom: "1rem" }}
                  />

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#999", marginBottom: "0.5rem" }}>Fecha de Nacimiento *</label>
                    <input 
                      type="date" 
                      name="birthDate" 
                      onChange={handleAdditionalChange}
                      value={additionalData.birthDate}
                      required 
                    />
                  </div>
                </fieldset>

                {/* Experiencia Profesional */}
                <fieldset style={{ border: "none", padding: "0", marginBottom: "1.5rem", borderTop: "1px solid #d0d0d0", paddingTop: "1.5rem" }}>
                  <legend style={{ color: "#030347", fontWeight: "600", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase" }}>Experiencia Profesional</legend>

                  <select 
                    name="profession" 
                    onChange={handleAdditionalChange}
                    value={additionalData.profession}
                    required
                    style={{ marginBottom: "1rem" }}
                  >
                    <option value="">Selecciona tu Profesión *</option>
                    <option value="psicología">Psicólogo/a</option>
                    <option value="finanzas">Asesor/a Financiero</option>
                    <option value="educativo">Tutor/a Educativo</option>
                    <option value="laboral">Asesor/a Laboral</option>
                    <option value="coach">Coach de Vida</option>
                    <option value="otro">Otra Profesión</option>
                  </select>

                  <input 
                    type="number" 
                    name="experience" 
                    placeholder="Años de experiencia *" 
                    onChange={handleAdditionalChange}
                    value={additionalData.experience}
                    required
                    min="0"
                    style={{ marginBottom: "1rem" }}
                  />

                  <input 
                    type="text" 
                    name="professionalLicense" 
                    placeholder="Tarjeta Profesional / Licencia *" 
                    onChange={handleAdditionalChange}
                    value={additionalData.professionalLicense}
                    required
                    style={{ marginBottom: "1rem" }}
                  />

                  <textarea 
                    name="bio" 
                    placeholder="Perfil profesional * (Cuéntanos sobre ti, tu experiencia y especialidades)" 
                    onChange={handleAdditionalChange}
                    value={additionalData.bio}
                    required
                    style={{ marginBottom: "1rem", minHeight: "120px", fontFamily: "inherit" }}
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
                          checked={additionalData.languages.includes(lang)}
                          onChange={(e) => handleCheckbox(e, "languages")}
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
                          checked={additionalData.softSkills.includes(skill)}
                          onChange={(e) => handleCheckbox(e, "softSkills")}
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button 
                  type="submit"
                  style={{ marginTop: "2rem", width: "100%", padding: "0.75rem", backgroundColor: "#030347", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600", fontSize: "1rem" }}
                  disabled={loading}
                >
                  {loading ? "Completando registro..." : "✅ Completar Registro"}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      // Cliente
      return (
        <div className="page">
          <div className="container">
            {/* SIDEBAR */}
            <div className="sidebar">
              <h2>👤 Perfil</h2>
              <p><strong>{user.fullName || "Usuario"}</strong></p>
              <p>{user.email}</p>
              <p style={{ opacity: 0.8 }}>ID: {user.userName}</p>

              <div className="info-box">
                <p>Paso 2 de 2 - Completa tu información para continuar 🚀</p>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="card">
              <h2>Datos del cliente</h2>

              {error && (
                <div className="error-alert">
                  <span className="error-icon">⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmitStep2}>
                <input 
                  name="phoneNumber" 
                  placeholder="Teléfono *" 
                  onChange={handleAdditionalChange} 
                  value={additionalData.phoneNumber}
                  required 
                />

                <select name="city" onChange={handleAdditionalChange} required value={additionalData.city}>
                  <option value="">Ciudad *</option>
                  <option value="Medellín">Medellín</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Cali">Cali</option>
                </select>

                <input 
                  type="date" 
                  name="birthDate" 
                  onChange={handleAdditionalChange} 
                  value={additionalData.birthDate}
                  required 
                />

                <input 
                  name="address" 
                  placeholder="Dirección (opcional)" 
                  onChange={handleAdditionalChange}
                  value={additionalData.address}
                />

                <input 
                  name="occupation" 
                  placeholder="Ocupación (opcional)" 
                  onChange={handleAdditionalChange}
                  value={additionalData.occupation}
                />

                <textarea 
                  name="bio" 
                  placeholder="Cuéntanos sobre ti (opcional)" 
                  onChange={handleAdditionalChange}
                  value={additionalData.bio}
                />

                <button 
                  type="submit"
                  style={{ width: "100%", padding: "0.75rem", backgroundColor: "#030347", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600", marginTop: "1rem" }}
                  disabled={loading}
                >
                  {loading ? "Completando registro..." : "Completar Registro"}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
