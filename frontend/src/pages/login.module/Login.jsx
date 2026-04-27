import { useLogin } from "./login.service";
import "./Login.css"; // Asegúrate de tener este archivo para estilos específicos de login


export default function Login() {
  const { formData, error, handleChange, handleSubmit } = useLogin();

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
