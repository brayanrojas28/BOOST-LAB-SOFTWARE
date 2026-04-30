import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./login.service";
import "./Login.css";

export default function Login() {
  const { formData, error, handleChange, handleSubmit } = useLogin();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmitWithLoading = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSubmit(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-background-image"></div>
        <div className="login-background-overlay"></div>
      </div>
      
      <button 
        className="btn-home"
        onClick={() => navigate("/")}
        title="Volver a inicio"
      >
        ← Volver a Inicio
      </button>
      
      <div className="login-wrapper">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-icon">👤</div>
            <h1>Bienvenido</h1>
            <p className="subtitle">Iniciar sesión en BOOST</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitWithLoading} className="login-form">
            <div className="form-group">
              <label htmlFor="userName">Número de Documento</label>
              <div className="input-wrapper">
                <span className="input-icon">🪪</span>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  placeholder="Ingresa tu número de documento"
                  value={formData.userName}
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
                  placeholder="Ingresa tu contraseña"
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

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" name="rememberMe" />
                <span>Recuérdame</span>
              </label>
              <a href="/recover" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>¿Aún no tienes cuenta?</p>
              <a href="/register" className="register-link">Registrate Aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
}