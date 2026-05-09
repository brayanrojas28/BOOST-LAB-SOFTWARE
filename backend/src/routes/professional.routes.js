const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const professionalController = require('../controllers/professional.auth.controller');

// Configurar multer directamente en este archivo
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

// Endpoints para profesionales
router.post('/register/professional', upload.single('profileImage'), professionalController.registerProfessional);

// Obtener todos los profesionales
router.get('/professionals', professionalController.getAllProfessionals);

// Obtener un profesional específico
router.get('/professionals/:id', professionalController.getProfessionalById);

// Obtener un profesional por idUser (ID del usuario)
router.get('/professionals/user/:idUser', professionalController.getProfessionalByUserId);

module.exports = router;
