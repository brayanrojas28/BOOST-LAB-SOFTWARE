// Este archivo recibe la petición HTTP y coordina la lógica.
// No hace la lógica de negocio ni toca la base de datos directamente,
// solo recibe la info y la pasa al service.

const professionalService = require('../services/professional.auth.service');

exports.registerProfessional = async (req, res) => {
  try {
    // Manejar FormData con archivo
    const data = req.body;
    
    // Validar que idUser no sea undefined o string "undefined"
    if (!data.idUser || data.idUser === 'undefined') {
      return res.status(400).json({ error: 'idUser es requerido y no puede ser undefined' });
    }
    
    // Convertir idUser a número si viene como string
    data.idUser = parseInt(data.idUser);
    
    // Parsear arrays que vienen como strings JSON
    if (typeof data.languages === 'string') {
      data.languages = JSON.parse(data.languages);
    }
    if (typeof data.softSkills === 'string') {
      data.softSkills = JSON.parse(data.softSkills);
    }
    
    // Agregar nombre del archivo de imagen si existe
    if (req.file) {
      data.profileImage = req.file.filename;
    }
    
    const professional = await professionalService.createOrUpdateProfessional(data);
    res.status(201).json({ message: 'Profesional registrado', professional });
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los profesionales
exports.getAllProfessionals = async (req, res) => {
  try {
    const professionals = await professionalService.getAllProfessionals();
    res.status(200).json(professionals);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener un profesional por ID
exports.getProfessionalById = async (req, res) => {
  try {
    const { id } = req.params;
    const professional = await professionalService.getProfessionalById(id);
    if (!professional) {
      return res.status(404).json({ error: 'Profesional no encontrado' });
    }
    res.status(200).json(professional);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener un profesional por idUser (ID del usuario)
exports.getProfessionalByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const professional = await professionalService.getProfessionalByUserId(idUser);
    if (!professional) {
      return res.status(404).json({ error: 'Profesional no encontrado' });
    }
    res.status(200).json(professional);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};
