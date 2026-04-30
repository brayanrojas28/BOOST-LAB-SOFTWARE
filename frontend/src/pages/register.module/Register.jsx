import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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

      if (selectedRole === "professional") {
        navigate("/register/professional");
      } else {
        navigate("/register/client");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
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
            <p>Completa tu información para continuar</p>
          </div>

          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
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
                  Registrando...
                </>
              ) : (
                "Registrarse"
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
