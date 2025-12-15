const bookService = require('../service/bookService');

const getAllBooks = (req, res) => {
    try {
        const books = bookService.getAllBooks();
        res.status(200).json({
            success: true,
            data: books,
            count: books.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des livres',
            error: error.message
        });
    }
};

const getBookById = (req, res) => {
    try {
        const book = bookService.getBookById(req.params.id);
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const createBook = (req, res) => {
    try {
        const newBook = bookService.createBook(req.body);
        res.status(201).json({
            success: true,
            message: 'Livre créé avec succès',
            data: newBook
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateBook = (req, res) => {
    try {
        const updatedBook = bookService.updateBook(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Livre mis à jour avec succès',
            data: updatedBook
        });
    } catch (error) {
        const statusCode = error.message.includes('non trouvé') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteBook = (req, res) => {
    try {
        const deletedBook = bookService.deleteBook(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Livre supprimé avec succès',
            data: deletedBook
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Bonus 

const getAvailableBooks = (req, res) => {
    try {
        const books = bookService.getAvailableBooks();
        res.status(200).json({
            success: true,
            data: books,
            count: books.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des livres disponibles',
            error: error.message
        });
    }
};

const getBooksByGenre = (req, res) => {
    try {
        const { query } = req.query;
        const books = bookService.getBooksByGenre(query);
        res.status(200).json({
            success: true,
            data: books,
            count: books.length,
            filter: query || 'aucun'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des livres par genre',
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    getAvailableBooks,
    getBooksByGenre,
    createBook,
    updateBook,
    deleteBook
};
