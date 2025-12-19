const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const {
    validateCreateBook,
    validateUpdateBook,
    validateGetBookById,
    validateDeleteBook
} = require('../validators/bookValidator');
const { authenticateToken } = require('../middleware/auth');

// Routes publiques (GET)
router.get('/', bookController.getAllBooks);
router.get('/available', bookController.getAvailableBooks);
router.get('/genre', bookController.getBooksByGenre);
router.get('/:id', validateGetBookById, bookController.getBookById);

// Routes protégées (POST/PUT/DELETE - nécessitent une authentification)
router.post('/', authenticateToken, validateCreateBook, bookController.createBook);
router.put('/:id', authenticateToken, validateUpdateBook, bookController.updateBook);
router.delete('/:id', authenticateToken, validateDeleteBook, bookController.deleteBook);

module.exports = router;
