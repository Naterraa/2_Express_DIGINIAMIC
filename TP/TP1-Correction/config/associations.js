const Gym = require('../model/Gym');
const Equipment = require('../model/Equipment');

// Une salle de sport possède plusieurs équipements
Gym.hasMany(Equipment, { foreignKey: 'gymId', as: 'equipments' });
// Un équipement appartient à une salle de sport
Equipment.belongsTo(Gym, { foreignKey: 'gymId', as: 'gym' });

module.exports = { Gym, Equipment };
