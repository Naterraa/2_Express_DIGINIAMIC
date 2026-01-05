const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestion de Livres',
            version: '1.0.0',
            description: 'Documentation de l\'API REST pour la gestion de livres et bibliothèques avec authentification JWT',
            contact: {
                name: 'Support API',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3007',
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
                Book: {
                    type: 'object',
                    required: ['title', 'author', 'year', 'type', 'available', 'libraryId'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID auto-généré du livre'
                        },
                        title: {
                            type: 'string',
                            description: 'Titre du livre',
                            example: 'Le Seigneur des Anneaux'
                        },
                        author: {
                            type: 'string',
                            description: 'Auteur du livre',
                            example: 'J.R.R. Tolkien'
                        },
                        year: {
                            type: 'integer',
                            description: 'Année de publication',
                            example: 1954
                        },
                        type: {
                            type: 'string',
                            description: 'Genre du livre',
                            example: 'Fantasy'
                        },
                        available: {
                            type: 'boolean',
                            description: 'Disponibilité du livre',
                            example: true
                        },
                        libraryId: {
                            type: 'integer',
                            description: 'ID de la bibliothèque',
                            example: 1
                        }
                    }
                },
                Library: {
                    type: 'object',
                    required: ['name', 'address'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID auto-généré de la bibliothèque'
                        },
                        name: {
                            type: 'string',
                            description: 'Nom de la bibliothèque',
                            example: 'Bibliothèque Municipale'
                        },
                        address: {
                            type: 'string',
                            description: 'Adresse de la bibliothèque',
                            example: '123 Rue de la Lecture, Paris'
                        }
                    }
                },
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
                            example: 'john_doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email unique de l\'utilisateur',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'Mot de passe (hashé en base)',
                            minLength: 6
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            description: 'Rôle de l\'utilisateur',
                            example: 'user'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Connexion réussie'
                        },
                        token: {
                            type: 'string',
                            description: 'Token JWT à utiliser pour les requêtes authentifiées',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                        },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                username: { type: 'string' },
                                email: { type: 'string' },
                                role: { type: 'string' }
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
                            description: 'Message d\'erreur',
                            example: 'Une erreur est survenue'
                        },
                        errors: {
                            type: 'array',
                            description: 'Liste des erreurs de validation',
                            items: {
                                type: 'object',
                                properties: {
                                    field: { type: 'string' },
                                    message: { type: 'string' }
                                }
                            }
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
                name: 'Books',
                description: 'Endpoints pour la gestion des livres'
            },
            {
                name: 'Libraries',
                description: 'Endpoints pour la gestion des bibliothèques'
            }
        ]
    },
    apis: ['./router/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
