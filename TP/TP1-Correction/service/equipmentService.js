const { Equipment } = require('../config/associations');

const getEquipmentById = async (id) => {
    const equipment = await Equipment.findByPk(id);

    // Gestion mauvais id
    if (!equipment) {
        throw new Error(`Équipement avec l'ID ${id} non trouvé`);
    }
    return equipment;
};

const createEquipment = async (equipmentData) => {
    const { name, brand, price, maxLoad, gymId } = equipmentData;

    // Validation des données
    if (!name || !brand || price === undefined || maxLoad === undefined || !gymId) {
        throw new Error('Tous les champs sont requis (name, brand, price, maxLoad, gymId)');
    }

    const newEquipment = await Equipment.create({
        name: name.trim(),
        brand: brand.trim(),
        price: parseFloat(price),
        maxLoad: parseFloat(maxLoad),
        gymId: parseInt(gymId)
    });

    return newEquipment;
};

const updateEquipment = async (id, equipmentData) => {
    const equipment = await Equipment.findByPk(id);

    // Gestion mauvais id
    if (!equipment) {
        throw new Error(`Équipement avec l'ID ${id} non trouvé`);
    }

    const { name, brand, price, maxLoad } = equipmentData;

    // Validation des données
    if (name !== undefined) equipment.name = name.trim();
    if (brand !== undefined) equipment.brand = brand.trim();
    if (price !== undefined) equipment.price = parseFloat(price);
    if (maxLoad !== undefined) equipment.maxLoad = parseFloat(maxLoad);

    await equipment.save();
    return equipment;
};

const deleteEquipment = async (id) => {
    const equipment = await Equipment.findByPk(id);

    // Gestion mauvais id
    if (!equipment) {
        throw new Error(`Équipement avec l'ID ${id} non trouvé`);
    }

    await equipment.destroy();
    return equipment;
};

module.exports = {
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
};
