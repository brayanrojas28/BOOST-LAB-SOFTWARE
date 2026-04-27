import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login }  from "../../services/auth.service";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.userName) {
      return "El número de documento es obligatorio";
    }
    if (formData.password.length < 5) {
      return "La contraseña debe tener al menos 5 caracteres";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      const data = await login(formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "client") {
        navigate("/register/client");
      } else if (data.user.role === "professional") {
        navigate("/register/professional");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Error en login: " + err.message);
    }
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  };
};