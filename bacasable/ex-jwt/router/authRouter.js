const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// POST /auth/register - Inscription
router.post('/register', authController.register);

// POST /auth/login - Connexion
router.post('/login', authController.login);

module.exports = router;
