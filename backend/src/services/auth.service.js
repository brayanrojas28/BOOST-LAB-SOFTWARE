const bcrypt = require("bcrypt"); // Comparar y generar hash de contraseñas
const jwt = require("jsonwebtoken"); // Generar token JWT

const userRepo = require("../repositories/user.repository");
const professionalRepo = require("../repositories/professional.repository");


// =====================
// REGISTER
// =====================
const register = async ({ userName, fullName, email, password, role}) => {

  // Validación básica
  if (!userName || !fullName || !email || !password || !role) {
    throw new Error("Faltan datos");
  }

  // Verificar si el usuario ya existe
  const existingUser = await userRepo.findByUserName(userName);

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario en BD
  const resultUser = await userRepo.create({
    userName,
    fullName,
    email,
    password: hashedPassword,
    role
  });

  const idUser = resultUser.insertId;

  // Si es profesional → crear registro en tabla professional
  let professional = null;

  if (role === "professional") {
    const resultProf = await professionalRepo.create({
      idUser
    });

    professional = {
      idProfessional: resultProf.insertId,
      idUser
    };
  }

  // Respuesta
  return {
    message: "Usuario registrado",
    userId: idUser,
    professional
  };
};

// =====================
// LOGIN
// =====================
const login = async ({ userName, password }) => {

  // Validación básica
  if (!userName || !password) {
    throw new Error("Faltan datos");
  }

  // Buscar usuario por nombre de usuario
  const user = await userRepo.findByUserName(userName);

  if (!user) {
    throw new Error("Usuario no existe");
  }

  // Comparar contraseña ingresada con la almacenada (hash)
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Verificar si el usuario tiene perfil profesional
  const professional = await professionalRepo.findByUserId(user.idUser);

  // Crear token JWT
  const token = jwt.sign(
    {
      idUser: user.idUser,
      role: professional ? "professional" : "client"
    },
    "secreto_super_seguro",
    { expiresIn: "2h" }
  );

  // Respuesta
  return {
  message: "Login exitoso",
  token,
  user: {
    id: user.idUser,
    userName: user.userName,
    fullName: user.fullName,
    email: user.email,
    role: professional ? "professional" : "client"
  }
};
};


// Exportar método
module.exports = {
    login, 
    register};