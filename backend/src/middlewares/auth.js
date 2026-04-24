const jwt = require("jsonwebtoken"); // valida el token

const auth = (req, res, next) => {

  // Obtener token desde headers
  const token = req.headers["authorization"];

  // Si no viene token → no autorizado
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    // Verificar token (firma + expiración)
    const decoded = jwt.verify(token, "secreto_super_seguro");

    //  Guardar datos del usuario en la request
    req.users = decoded;

    // Continuar con la siguiente función (controller)
    next();

  } catch (error) {
    // Token inválido o expirado
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = auth;