const { Gym, Equipment } = require('../config/associations');

const getAllGyms = async () => {
    return await Gym.findAll();
};

const getGymWithEquipments = async (id) => {

    // Include pour récupérer les équipements liés à la salle de sport
    const gym = await Gym.findByPk(id, {
        include: [{
            model: Equipment,
            as: 'equipments'
        }]
    });

    // Gestion mauvais id
    if (!gym) {
        throw new Error(`Salle de sport avec l'ID ${id} non trouvée`);
    }

    return gym;
};

module.exports = {
    getAllGyms,
    getGymWithEquipments
};
