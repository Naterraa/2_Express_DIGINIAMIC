const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Equipment = db.define('Equipment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    maxLoad: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'gyms',
            key: 'id'
        }
    }
}, {
    tableName: 'equipments',
    timestamps: false
});

module.exports = Equipment;
