const express = require("express");
require("./config/db"); 
const cors = require("cors");
const app = express();

app.use(cors()); 
// middlewares
app.use(express.json());

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const professionalRoutes = require("./routes/professional.routes");

// Usar rutas
app.use("/api/auth", authRoutes);

// Monta la ruta con prefijo /api
app.use('/api', userRoutes);
app.use('/api', professionalRoutes);

module.exports = app;