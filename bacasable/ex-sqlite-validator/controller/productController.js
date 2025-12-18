const productService = require('../service/productService');

const getAllProducts = async (req, res) => {
    try {
        const computers = await productService.getAllComputers();
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

const getProductById = async (req, res) => {
    try {
        const computer = await productService.getComputerById(req.params.id);
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

const createProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const newComputer = await productService.createComputer(name);
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

const updateProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedComputer = await productService.updateComputer(req.params.id, name);
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

const deleteProduct = async (req, res) => {
    try {
        const deletedComputer = await productService.deleteComputer(req.params.id);
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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
