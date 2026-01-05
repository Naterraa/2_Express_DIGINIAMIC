const express = require('express');
const libraryController = require('../controller/libraryController');
const {
    validateCreateLibrary,
    validateGetLibraryById
} = require('../validators/libraryValidator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Routes publiques (GET)
router.get('/', libraryController.getAllLibraries);
router.get('/:id', validateGetLibraryById, libraryController.getLibraryWithBooks);

// Routes protégées (POST - nécessite une authentification)
router.post('/', authenticateToken, validateCreateLibrary, libraryController.createLibrary);

module.exports = router;
