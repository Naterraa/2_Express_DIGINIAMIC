const Computer = require('../model/Computer');

const getAllComputers = async () => {
    return await Computer.findAll();
    // FindAll est une méthode de sequelize qui permet de récupérer tous les ordinateurs
    // SELECT * FROM computers;
};

const getComputerById = async (id) => {
    const computer = await Computer.findByPk(id); // SELECT * FROM computers WHERE id = id;
    if (!computer) {
        throw new Error(`Ordinateur avec l'ID ${id} non trouvé`);
    }
    return computer;
};

const createComputer = async (name) => {
    if (!name || name.trim() === '') {
        throw new Error('Le nom de l\'ordinateur est requis');
    }
    return await Computer.create({ name: name.trim() });
};

const updateComputer = async (id, name) => {
    if (!name || name.trim() === '') {
        throw new Error('Le nom de l\'ordinateur est requis');
    }

    const computer = await Computer.findByPk(id);
    if (!computer) {
        throw new Error(`Ordinateur avec l'ID ${id} non trouvé`);
    }

    computer.name = name.trim();
    await computer.save();
    return computer;
};

const deleteComputer = async (id) => {
    const computer = await Computer.findByPk(id);
    if (!computer) {
        throw new Error(`Ordinateur avec l'ID ${id} non trouvé`);
    }

    await computer.destroy();
    return computer;
};

module.exports = {
    getAllComputers,
    getComputerById,
    createComputer,
    updateComputer,
    deleteComputer
};
