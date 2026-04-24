// Este archivo recibe la petición HTTP y coordina la lógica.
// No hace la lógica de negocio ni toca la base de datos directamente,
// solo recibe la info y la pasa al service.

const userService = require('../services/user.auth.service');

exports.registerUser = async (req, res) => {
  try {
    const data = req.body; // Aquí llegan los datos del JSON enviado por el cliente
    const user = await userService.saveUserData(data); // Llamamos al service
    res.status(201).json({ message: 'Usuario registrado', user }); // Respondemos con éxito
  } catch (error) {
    // Si algo falla, devolvemos un error
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};
