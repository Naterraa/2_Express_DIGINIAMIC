const equipmentService = require('../service/equipmentService');

const getEquipmentById = async (req, res) => {
    try {
        const equipment = await equipmentService.getEquipmentById(req.params.id);
        res.status(200).json({
            success: true,
            data: equipment
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const createEquipment = async (req, res) => {
    try {
        const newEquipment = await equipmentService.createEquipment(req.body);
        res.status(201).json({
            success: true,
            message: 'Équipement créé avec succès',
            data: newEquipment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateEquipment = async (req, res) => {
    try {
        const updatedEquipment = await equipmentService.updateEquipment(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Équipement mis à jour avec succès',
            data: updatedEquipment
        });
    } catch (error) {
        const statusCode = error.message.includes('non trouvé') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteEquipment = async (req, res) => {
    try {
        const deletedEquipment = await equipmentService.deleteEquipment(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Équipement supprimé avec succès',
            data: deletedEquipment
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
};
