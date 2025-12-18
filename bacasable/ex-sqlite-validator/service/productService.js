const Computer = require('../model/Computer');

const getAllComputers = async () => {
    return await Computer.findAll();
    // FindAll est une méthode de sequelize qui permet de récupérer tous les ordinateurs
    // SELECT * FROM computers;
};

const getComputerById = async (id) => {
    const computer = await Computer.findByPk(id); // SELECT * FROM computers WHERE id = id;
    return computer;
};

const createComputer = async (name) => {

    return await Computer.create({ name: name.trim() });
};

const updateComputer = async (id, name) => {

    const computer = await Computer.findByPk(id);
    await computer.save();
    return computer;
};

const deleteComputer = async (id) => {
    const computer = await Computer.findByPk(id);
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
