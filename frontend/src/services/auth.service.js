// src/services/authService.js
// Este archivo centraliza las llamadas al backend relacionadas con autenticación

// Usamos fetch para llamar al backend
const API_URL = "http://localhost:8080/api/auth";

//REGISTER
export const register = async (data) => {
  // data = { userName, fullName, email, password, role }
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Error en registro");
  return result; // devolvemos la respuesta del backend
};


//LOGIN
export const login = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Credenciales inválidas");
  return result; // aquí token y role
};
