const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Library = db.define('Library', {
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
    tableName: 'libraries',
    timestamps: false
});

module.exports = Library;
