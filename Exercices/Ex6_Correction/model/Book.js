const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Book = db.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    libraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'libraries',
            key: 'id'
        }
    }
}, {
    tableName: 'books',
    timestamps: false
});

module.exports = Book;
