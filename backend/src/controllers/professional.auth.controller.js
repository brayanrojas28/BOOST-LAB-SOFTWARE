// Este archivo recibe la petición HTTP y coordina la lógica.
// No hace la lógica de negocio ni toca la base de datos directamente,
// solo recibe la info y la pasa al service.

const professionalService = require('../services/professional.auth.service');

exports.registerProfessional = async (req, res) => {
  try {
    const data = req.body; // Aquí llegan los datos del JSON enviado por el cliente
    const professional = await professionalService.createOrUpdateProfessional(data); // Llamamos al service
    res.status(201).json({ message: 'Profesional registrado', professional }); // Respondemos con éxito
  } catch (error) {
  console.error("ERROR BACKEND:", error); // 👈 CLAVE
  res.status(500).json({ error: error.message });
}
};
