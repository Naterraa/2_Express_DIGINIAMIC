const express = require('express');
const db = require('./config/database');
const { Library, Book } = require('./config/associations');
const bookRouter = require('./router/bookRouter');
const libraryRouter = require('./router/libraryRouter');

const app = express();
const PORT = 3006;

app.use(express.json());

// /books
app.use('/books', bookRouter);

// /libraries
app.use('/libraries', libraryRouter);

const initDatabase = async () => {
    try {
        await db.sync(); // permet de se connecter et de creer la base de donnees
        app.listen(PORT, () => {
            console.log(`Serveur demarre sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur initialisation:', error);
    }
};

initDatabase();