const express = require("express");
require("./config/db"); 
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors()); 
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const professionalRoutes = require("./routes/professional.routes");

// Usar rutas
app.use("/api/auth", authRoutes);

// Monta la ruta con prefijo /api
app.use('/api', userRoutes);
app.use('/api', professionalRoutes);

module.exports = { app, upload };