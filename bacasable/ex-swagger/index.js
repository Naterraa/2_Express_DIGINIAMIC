const express = require('express');
const db = require('./config/database');
const authRouter = require('./router/authRouter');
const computerRouter = require('./router/computerRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API JWT Documentation'
}));

// Routes publiques (authentification)
app.use('/auth', authRouter);

// Routes protégées (nécessitent un token JWT)
app.use('/computers', computerRouter);

const initDatabase = async () => {
    try {
        await db.sync();
        console.log('Base de données synchronisée');

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
            console.log(`\nDocumentation Swagger: http://localhost:${PORT}/api-docs`);

            console.log('\nRoutes disponibles:');
            console.log('  POST /auth/register - Inscription');
            console.log('  POST /auth/login - Connexion');
            console.log('  GET  /computers - Liste des ordinateurs (protégé)');
            console.log('  GET  /computers/:id - Détails d\'un ordinateur (protégé)');
            console.log('  POST /computers - Créer un ordinateur (protégé)');
        });
    } catch (error) {
        console.error('Erreur initialisation:', error);
    }
};

initDatabase();
