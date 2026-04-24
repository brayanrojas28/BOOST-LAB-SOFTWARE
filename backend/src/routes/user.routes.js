// Definimos el endpoint para clientes.
const express = require('express');
const router = express.Router();

const userService = require('../controllers/user.auth.controller');

// Cuando se el haga POST a /register/client, se ejecuta el controller
router.post('/register/client', userService.registerUser);

module.exports = router;
