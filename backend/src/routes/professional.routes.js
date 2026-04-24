const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professional.auth.controller');

// Cuando se haga POST a /register/professional, se ejecuta el controller
router.post('/register/professional', professionalController.registerProfessional);

module.exports = router;
