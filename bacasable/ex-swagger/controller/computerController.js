const computerService = require('../service/computerService');

const getAllComputers = async (req, res) => {
    try {
        const computers = await computerService.getAllComputers();
        res.status(200).json({
            success: true,
            data: computers,
            count: computers.length,
            user: req.user // Informations de l'utilisateur authentifié
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
        const computer = await computerService.createComputer(req.body);
        res.status(201).json({
            success: true,
            message: 'Ordinateur créé avec succès',
            data: computer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllComputers,
    getComputerById,
    createComputer
};
