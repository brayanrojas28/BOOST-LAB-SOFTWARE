const db = require("../config/db");

//Insertar un profesional
const create = async ({ idUser }) => {
  const [result] = await db.query(
    "INSERT INTO professional (idUser) VALUES (?)",
    [idUser]
  );
  return result;
};

// Buscar profesional por id de usuario
const findByUserId = async (idUser) => {
  const [rows] = await db.query(
    "SELECT * FROM professional WHERE idUser = ?",
    [idUser]
  );

  return rows[0];
};

const saveProfessional = async (data) => {
  const query = `
    INSERT INTO professional (idUser, profession, experience, languages, softSkills, professionalLicense, profileImage)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.idUser,
    data.profession,
    data.experience,
    JSON.stringify(data.languages), // Guardamos arrays como JSON
    JSON.stringify(data.softSkills),
    data.professionalLicense,
    data.profileImage || null
  ];

  const [result] = await db.execute(query, values); // Ejecutamos el query
  return { idProfessional: result.insertId, ...data }; // Devolvemos el nuevo registro
};

// Actualizar profesional existente
const updateProfessional = async (data) => {
  const query = `
    UPDATE professional
    SET profession = ?, experience = ?, languages = ?, softSkills = ?, professionalLicense = ?, profileImage = ?
    WHERE idUser = ?
  `;
  const values = [
    data.profession,
    data.experience,
    JSON.stringify(data.languages),
    JSON.stringify(data.softSkills),
    data.professionalLicense,
    data.profileImage || null,
    data.idUser
  ];
  await db.execute(query, values);
  return { ...data };
};

// Obtener todos los profesionales con información de usuario
const getAllProfessionals = async () => {
  const [rows] = await db.query(`
    SELECT p.*, u.fullName, u.email, u.phoneNumber, u.city, u.address, u.birthDate, u.bio
    FROM professional p
    INNER JOIN users u ON p.idUser = u.id
    ORDER BY u.fullName
  `);
  return rows;
};

// Obtener un profesional por ID con información de usuario
const getProfessionalById = async (id) => {
  const [rows] = await db.query(`
    SELECT p.*, u.fullName, u.email, u.phoneNumber, u.city, u.address, u.birthDate, u.bio
    FROM professional p
    INNER JOIN users u ON p.idUser = u.id
    WHERE p.id = ?
  `, [id]);
  
  if (rows.length === 0) {
    return null;
  }
  
  return rows[0];
};

// Obtener un profesional por idUser con información de usuario
const getProfessionalByUserId = async (idUser) => {
  const [rows] = await db.query(`
    SELECT p.*, u.fullName, u.email, u.phoneNumber, u.city, u.address, u.birthDate, u.bio
    FROM professional p
    INNER JOIN users u ON p.idUser = u.id
    WHERE p.idUser = ?
  `, [idUser]);
  
  if (rows.length === 0) {
    return null;
  }
  
  return rows[0];
};

module.exports = { 
  create,
  findByUserId,
  saveProfessional,
  updateProfessional,
  getAllProfessionals,
  getProfessionalById,
  getProfessionalByUserId
};
