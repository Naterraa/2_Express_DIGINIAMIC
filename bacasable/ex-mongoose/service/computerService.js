const Computer = require('../model/Computer');

const getAllComputers = async () => {
    return await Computer.find();
};

const getComputerById = async (id) => {

    const computer = await Computer.findById(id);

    if (!computer) { throw new Error('Ordinateur non trouvé'); }

    return computer;
};

const createComputer = async (name) => {

    if (!name || name.trim() === '') { throw new Error('Le nom est requis'); }

    const computer = new Computer({ name: name.trim() });

    return await computer.save();
};

const updateComputer = async (id, name) => {

    if (!name || name.trim() === '') { throw new Error('Le nom est requis'); }

    const computer = await Computer.findByIdAndUpdate(id, { name: name.trim() }, { new: true, runValidators: true });

    if (!computer) { throw new Error('Ordinateur non trouvé'); }

    return computer;
};

const deleteComputer = async (id) => {

    const computer = await Computer.findByIdAndDelete(id);
    if (!computer) { throw new Error('Ordinateur non trouvé'); }
    return computer;
};

module.exports = { getAllComputers, getComputerById, createComputer, updateComputer, deleteComputer };
