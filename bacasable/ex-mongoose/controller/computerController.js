const computerService = require('../service/computerService');

const getAllComputers = async (req, res) => {
    try {
        const computers = await computerService.getAllComputers();
        res.status(200).json({
            success: true,
            data: computers,
            count: computers.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des ordinateurs',
            error: error.message
        });
    }
};

const getComputerById = async (req, res) => {
    try {
        const computer = await computerService.getComputerById(req.params.id);
        res.status(200).json({
            success: true,
            data: computer
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const createComputer = async (req, res) => {
    try {
        const { name } = req.body;
        const newComputer = await computerService.createComputer(name);
        res.status(201).json({
            success: true,
            message: 'Ordinateur créé avec succès',
            data: newComputer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateComputer = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedComputer = await computerService.updateComputer(req.params.id, name);
        res.status(200).json({
            success: true,
            message: 'Ordinateur mis à jour avec succès',
            data: updatedComputer
        });
    } catch (error) {
        const statusCode = error.message.includes('non trouvé') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteComputer = async (req, res) => {
    try {
        const deletedComputer = await computerService.deleteComputer(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Ordinateur supprimé avec succès',
            data: deletedComputer
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllComputers,
    getComputerById,
    createComputer,
    updateComputer,
    deleteComputer
};
