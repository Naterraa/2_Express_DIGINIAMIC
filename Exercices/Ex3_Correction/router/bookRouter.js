const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
// Bonus
router.get('/available', bookController.getAvailableBooks);
router.get('/genre', bookController.getBooksByGenre);

module.exports = router;
