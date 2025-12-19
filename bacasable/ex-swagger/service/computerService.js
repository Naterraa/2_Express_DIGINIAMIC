const Computer = require('../model/Computer');

const getAllComputers = async () => {
    return await Computer.findAll();
};

const getComputerById = async (id) => {
    const computer = await Computer.findByPk(id);

    if (!computer) {
        throw new Error('Ordinateur non trouvé');
    }

    return computer;
};

const createComputer = async (computerData) => {
    const { name, brand, price } = computerData;

    if (!name || !brand || price === undefined) {
        throw new Error('Tous les champs sont requis (name, brand, price)');
    }

    const computer = await Computer.create({
        name: name.trim(),
        brand: brand.trim(),
        price: parseFloat(price)
    });

    return computer;
};

module.exports = {
    getAllComputers,
    getComputerById,
    createComputer
};
