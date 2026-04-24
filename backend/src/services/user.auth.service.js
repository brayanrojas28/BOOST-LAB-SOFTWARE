// Aquí va la lógica de negocio.
// Se encarga de validar datos y decidir qué hacer con ellos.
// No toca la base directamente, eso lo hace el repository.

const userRepository = require('../repositories/user.repository');

exports.createUser = async (data) => {
  if (!data.userName || !data.fullName || !data.email || !data.password || !data.role) {
    throw new Error('Faltan datos obligatorios para crear usuario');
  }
  return await userRepository.create(data);
};

exports.saveUserData = async (data) => {
  if (!data.idUser) {
    throw new Error('idUser es obligatorio para actualizar datos');
  }
  return await userRepository.saveUser(data);
};
