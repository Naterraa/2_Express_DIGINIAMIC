const gymService = require('../service/gymService');

const getAllGyms = async (req, res) => {
    try {
        const gyms = await gymService.getAllGyms();
        res.status(200).json({
            success: true,
            data: gyms,
            count: gyms.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des salles de sport',
            error: error.message
        });
    }
};

const getGymWithEquipments = async (req, res) => {
    try {
        const gym = await gymService.getGymWithEquipments(req.params.id);
        res.status(200).json({
            success: true,
            data: gym
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllGyms,
    getGymWithEquipments
};
