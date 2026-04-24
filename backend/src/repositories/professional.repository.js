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
    INSERT INTO professional (idUser, profession, experience, languages, softSkills, professionalLicense)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.idUser,
    data.profession,
    data.experience,
    JSON.stringify(data.languages), // Guardamos arrays como JSON
    JSON.stringify(data.softSkills),
    data.professionalLicense
  ];

  const [result] = await db.execute(query, values); // Ejecutamos el query
  return { idProfessional: result.insertId, ...data }; // Devolvemos el nuevo registro
};

// Actualizar profesional existente
const updateProfessional = async (data) => {
  const query = `
    UPDATE professional
    SET profession = ?, experience = ?, languages = ?, softSkills = ?, professionalLicense = ?
    WHERE idUser = ?
  `;
  const values = [
    data.profession,
    data.experience,
    JSON.stringify(data.languages),
    JSON.stringify(data.softSkills),
    data.professionalLicense,
    data.idUser
  ];
  await db.execute(query, values);
  return { ...data };
};

module.exports = { 
  create,
  findByUserId,
  saveProfessional,
  updateProfessional
};
