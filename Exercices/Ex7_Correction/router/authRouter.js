const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');
const { authenticateToken } = require('../middleware/auth');

// Routes publiques
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

// Routes protégées
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
