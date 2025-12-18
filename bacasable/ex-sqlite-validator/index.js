const express = require('express');
const db = require('./config/database'); // import de sequelize
const productRouter = require('./router/productRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.use('/product', productRouter);

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
