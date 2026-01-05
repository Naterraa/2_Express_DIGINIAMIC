const Book = require('../model/Book');
const Library = require('../model/Library');
const User = require('../model/User');

// Une bibliothèque possède plusieurs livres
Library.hasMany(Book, { foreignKey: 'libraryId', as: 'books' });
// Un livre appartient à une bibliothèque
Book.belongsTo(Library, { foreignKey: 'libraryId', as: 'library' })

module.exports = { Book, Library, User };
