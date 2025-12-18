const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Computer = db.define('Computer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'computers',
    timestamps: false
});

module.exports = Computer;
