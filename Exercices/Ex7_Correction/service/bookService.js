const { Book } = require('../config/associations');
const { Op } = require('sequelize');

const getAllBooks = async () => {
    return await Book.findAll();
};

const getBookById = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error(`Livre avec l'ID ${id} non trouvé`);
    }
    return book;
};

const createBook = async (bookData) => {
    const { title, author, year, type, available, libraryId } = bookData;

    if (!libraryId) {
        throw new Error('Le champ libraryId est requis');
    }

    const newBook = await Book.create({
        title: title.trim(),
        author: author.trim(),
        year: year,
        type: type.trim(),
        available: available !== undefined ? available : true,
        libraryId: libraryId
    });

    return newBook;
};

const updateBook = async (id, bookData) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error(`Livre avec l'ID ${id} non trouvé`);
    }

    const { title, author, year, type, available } = bookData;

    if (title !== undefined) book.title = title.trim();
    if (author !== undefined) book.author = author.trim();
    if (year !== undefined) book.year = year;
    if (type !== undefined) book.type = type.trim();
    if (available !== undefined) book.available = available;

    await book.save();
    return book;
};

const deleteBook = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error(`Livre avec l'ID ${id} non trouvé`);
    }

    await book.destroy();
    return book;
};

// Bonus 

const getAvailableBooks = async () => {
    return await Book.findAll({
        where: {
            available: true
        }
    });
};

const getBooksByGenre = async (query) => {
    if (!query) {
        return await Book.findAll();
    }
    return await Book.findAll({
        where: {
            type: {
                [Op.like]: `%${query}%`
            }
        }
    });
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
