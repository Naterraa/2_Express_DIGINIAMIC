const express = require('express');
const connectDB = require('./config/database');
const computerRouter = require('./router/computerRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());

app.use('/computer', computerRouter);

const startServer = async () => {
    try {
        await connectDB(); // Connexion à MongoDB
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur initialisation:', error);
    }
};

startServer();
