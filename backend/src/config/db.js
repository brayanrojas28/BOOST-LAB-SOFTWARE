const mysql = require("mysql2/promise");
require("dotenv").config();

// CONEXION A LA BASE DE DATOS MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "boostSoft",
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