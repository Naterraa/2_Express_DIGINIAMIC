const express = require('express');
const db = require('./config/database');
const bookRouter = require('./router/bookRouter');
const libraryRouter = require('./router/libraryRouter');
const authRouter = require('./router/authRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = 3007;

app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes d'authentification
app.use('/auth', authRouter);

// Routes de l'API
app.use('/books', bookRouter);
app.use('/libraries', libraryRouter);

const initDatabase = async () => {
    try {
        await db.sync(); // permet de se connecter et de creer la base de donnees
        app.listen(PORT, () => {
            console.log(`Serveur demarre sur http://localhost:${PORT}`);
            console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Erreur initialisation:', error);
    }
};

initDatabase();