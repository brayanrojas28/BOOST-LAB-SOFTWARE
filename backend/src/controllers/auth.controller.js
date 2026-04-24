const authService = require("../services/auth.service");

//Register
const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login
const login = async (req, res) => {
  try {
    // Recibe datos del frontend y llama al servicio
    const result = await authService.login(req.body);

    // Envía respuesta al cliente
    res.json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register
};