const mysql = require("mysql2/promise");

// CONEXION A LA BASE DE DATOS MySQL
const db = mysql.createPool({
  localhost: "3306",
  user: "root",
  password: "admin123",        // CONTRASEÑA MySQL
  database: "boostSoft",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar la conexión a la base de datos
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Conectado a MySQL (BD: boostSoft)");
    connection.release();
  } catch (err) {
    console.log("Error al conectar a MySQL:", err);
  }
})();

module.exports = db;