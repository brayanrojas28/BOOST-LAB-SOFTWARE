const db = require("../config/db");

//Crear un usuario
const create = async ({ userName, fullName, email, password, role }) => {
  const [result] = await db.query(
    "INSERT INTO users (userName, fullName, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [userName, fullName, email, password, role]
  );
  return result;
};

// Buscar usuario por nombre de usuario
const findByUserName = async (userName) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE userName = ?",
    [userName]
  );
  return rows[0];
};

// Buscar usuario por idUser
const findById = async (idUser) => {
  const [rows] = await db.query("SELECT * FROM users WHERE idUser = ?", [idUser]);
  return rows[0];
};

const saveUser = async (data) => {
  const query = `
    UPDATE users SET phoneNumber = ?, city = ?, address = ?, birthDate = ?, occupation = ?, bio = ?
    WHERE idUser = ?
  `;
  const values = [
    data.phoneNumber,
    data.city,
    data.address,
    data.birthDate,
    data.occupation,
    data.bio,
    data.idUser
  ];
  await db.execute(query, values); // Actualizamos el usuario
  return {...data}; // Devolvemos el usuario actualizado
}

const updateUser = async (idUser, data) => {
  const query = `
    UPDATE users
    SET phoneNumber = ?, city = ?, address = ?, birthDate = ?, bio = ?
    WHERE idUser = ?
  `;

  const values = [
    data.phoneNumber,
    data.city,
    data.address,
    data.birthDate,
    data.bio,
    idUser
  ];

  await db.execute(query, values);
};

module.exports = { 
    create,
    findByUserName,
    saveUser,
    findById,
    updateUser
};


