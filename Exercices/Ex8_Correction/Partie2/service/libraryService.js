const { Library, Book } = require('../config/associations');
const { log } = require('./loggerService');

const getAllLibraries = async () => {
    log();
    return await Library.findAll();
};

const getLibraryWithBooks = async (id) => {
    const library = await Library.findByPk(id, {
        include: [{
            model: Book,
            as: 'books'
        }]
    });

    if (!library) {
        throw new Error(`Bibliothèque avec l'ID ${id} non trouvée`);
    }

    return library;
};

const createLibrary = async (libraryData) => {
    const { name, address } = libraryData;

    if (!name || !address) {
        throw new Error('Le nom et l\'adresse sont requis');
    }

    const newLibrary = await Library.create({
        name: name.trim(),
        address: address.trim()
    });

    return newLibrary;
};

module.exports = {
    getAllLibraries,
    getLibraryWithBooks,
    createLibrary
};
