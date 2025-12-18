const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Gym = db.define('Gym', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'gyms',
    timestamps: false
});

module.exports = Gym;
