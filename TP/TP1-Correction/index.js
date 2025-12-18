const express = require('express');
const db = require('./config/database');
const { Gym, Equipment } = require('./config/associations');
const gymRouter = require('./router/gymRouter');
const equipmentRouter = require('./router/equipmentRouter');

const app = express();
const PORT = 3007;

app.use(express.json());

// /gyms
app.use('/gyms', gymRouter);

// /equipments
app.use('/equipments', equipmentRouter);

const initDatabase = async () => {
    try {
        await db.sync(); // permet de se connecter et de créer la base de données
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur initialisation:', error);
    }
};

initDatabase();
