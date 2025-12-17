const express = require('express');
const libraryController = require('../controller/libraryController');

const router = express.Router();

// GET /libraries/:id - Récupérer une bibliothèque avec ses livres
router.get('/:id', libraryController.getLibraryWithBooks);

// GET /libraries - Récupérer toutes les bibliothèques
router.get('/', libraryController.getAllLibraries);

// POST /libraries - Créer une nouvelle bibliothèque
router.post('/', libraryController.createLibrary);

module.exports = router;
