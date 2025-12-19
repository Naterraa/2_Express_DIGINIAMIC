const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API JWT avec Swagger',
            version: '1.0.0',
            description: 'Documentation de l\'API REST avec authentification JWT, gestion des utilisateurs et des ordinateurs',
            contact: {
                name: 'Support API',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3009',
                description: 'Serveur de développement'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Entrez votre token JWT (obtenu via /auth/login ou /auth/register)'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID auto-généré de l\'utilisateur'
                        },
                        username: {
                            type: 'string',
                            description: 'Nom d\'utilisateur unique',
                            minLength: 3,
                            maxLength: 50
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email unique de l\'utilisateur'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'Mot de passe (hashé en base)',
                            minLength: 6
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de dernière modification'
                        }
                    }
                },
                Computer: {
                    type: 'object',
                    required: ['name', 'brand', 'price'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID auto-généré de l\'ordinateur'
                        },
                        name: {
                            type: 'string',
                            description: 'Nom de l\'ordinateur'
                        },
                        brand: {
                            type: 'string',
                            description: 'Marque de l\'ordinateur'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            description: 'Prix de l\'ordinateur'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        },
                        message: {
                            type: 'string'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        username: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                                token: {
                                    type: 'string',
                                    description: 'Token JWT à utiliser pour les requêtes authentifiées'
                                }
                            }
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Message d\'erreur'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Authentication',
                description: 'Endpoints pour l\'authentification (register, login)'
            },
            {
                name: 'Computers',
                description: 'Endpoints pour la gestion des ordinateurs (protégés par JWT)'
            }
        ]
    },
    apis: ['./router/*.js'] // Chemins vers les fichiers contenant les annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
