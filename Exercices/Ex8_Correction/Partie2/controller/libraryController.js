const libraryService = require('../service/libraryService');

const getAllLibraries = async (req, res) => {
    try {
        const libraries = await libraryService.getAllLibraries();
        res.status(200).json({
            success: true,
            data: libraries,
            count: libraries.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des bibliothèques',
            error: error.message
        });
    }
};

const getLibraryWithBooks = async (req, res) => {
    try {
        const library = await libraryService.getLibraryWithBooks(req.params.id);
        res.status(200).json({
            success: true,
            data: library
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const createLibrary = async (req, res) => {
    try {
        const newLibrary = await libraryService.createLibrary(req.body);
        res.status(201).json({
            success: true,
            message: 'Bibliothèque créée avec succès',
            data: newLibrary
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllLibraries,
    getLibraryWithBooks,
    createLibrary
};
