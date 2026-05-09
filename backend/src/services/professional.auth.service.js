// services/professional.service.js
// Este service maneja el registro2 de profesionales.
// Valida los datos y luego llama al repository.

const userRepository = require('../repositories/user.repository');
const professionalRepository = require('../repositories/professional.repository');

exports.createOrUpdateProfessional = async (data) => {

  if (!data.idUser || !data.profession || !data.professionalLicense) {
    throw new Error('Faltan datos obligatorios para registrar profesional');
  }
  // 1. Buscar el usuario en la tabla users
  const user = await userRepository.findById(data.idUser);
  if (!user) {
    throw new Error('El usuario no existe');
  }

  // 2. Validar que el rol sea professional
  if (user.role !== 'professional') {
    throw new Error('Este usuario no tiene rol de profesional');
  }

  // 3. Revisar si ya existe en professional
  const existing = await professionalRepository.findByUserId(data.idUser);

  await userRepository.updateUser(data.idUser, {
    phoneNumber: data.phoneNumber,
    city: data.city,
    address: data.address,
    birthDate: data.birthDate,
    bio: data.bio,
    profileImage: data.profileImage || null
  });

  if (existing) {
    // Ya existe → UPDATE
    return await professionalRepository.updateProfessional(data);
  } else {
    // No existe → INSERT
    return await professionalRepository.saveProfessional(data);
  }
};

// Obtener todos los profesionales
exports.getAllProfessionals = async () => {
    try {
        const professionals = await professionalRepository.getAllProfessionals();
        return professionals;
    } catch (error) {
        throw new Error('Error al obtener profesionales: ' + error.message);
    }
};

// Obtener un profesional por ID
exports.getProfessionalById = async (id) => {
    try {
        const professional = await professionalRepository.getProfessionalById(id);
        return professional;
    } catch (error) {
        throw new Error('Error al obtener profesional: ' + error.message);
    }
};

// Obtener un profesional por idUser (ID del usuario)
exports.getProfessionalByUserId = async (idUser) => {
    try {
        const professional = await professionalRepository.getProfessionalByUserId(idUser);
        return professional;
    } catch (error) {
        throw new Error('Error al obtener profesional: ' + error.message);
    }
};