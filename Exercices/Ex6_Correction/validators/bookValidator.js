const { body, param, validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Erreurs de validation',
            errors: errors.array()
        });
    }
    next();
};

// Validation pour la création d'un livre
const validateCreateBook = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Le titre est requis')
        .isLength({ min: 1, max: 200 })
        .withMessage('Le titre doit contenir entre 1 et 200 caractères'),
    body('author')
        .trim()
        .notEmpty()
        .withMessage('L\'auteur est requis')
        .isLength({ min: 2, max: 100 })
        .withMessage('L\'auteur doit contenir entre 2 et 100 caractères'),
    body('year')
        .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
        .withMessage(`L'année doit être entre 1000 et ${new Date().getFullYear() + 1}`),
    body('type')
        .trim()
        .notEmpty()
        .withMessage('Le type est requis')
        .isIn(['Roman', 'Science-Fiction', 'Fantaisie', 'Biographie', 'Histoire', 'Autre'])
        .withMessage('Le type doit être: Roman, Science-Fiction, Fantaisie, Biographie, Histoire ou Autre'),
    body('available')
        .optional()
        .isBoolean()
        .withMessage('Le champ available doit être un booléen'),
    body('libraryId')
        .isInt({ min: 1 })
        .withMessage('L\'ID de la bibliothèque doit être un entier positif'),
    handleValidationErrors
];

// Validation pour la mise à jour d'un livre
const validateUpdateBook = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le titre ne peut pas être vide')
        .isLength({ min: 1, max: 200 })
        .withMessage('Le titre doit contenir entre 1 et 200 caractères'),
    body('author')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('L\'auteur ne peut pas être vide')
        .isLength({ min: 2, max: 100 })
        .withMessage('L\'auteur doit contenir entre 2 et 100 caractères'),
    body('year')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
        .withMessage(`L'année doit être entre 1000 et ${new Date().getFullYear() + 1}`),
    body('type')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le type ne peut pas être vide')
        .isIn(['Roman', 'Science-Fiction', 'Fantaisie', 'Biographie', 'Histoire', 'Autre'])
        .withMessage('Le type doit être: Roman, Science-Fiction, Fantaisie, Biographie, Histoire ou Autre'),
    body('available')
        .optional()
        .isBoolean()
        .withMessage('Le champ available doit être un booléen'),
    handleValidationErrors
];

// Validation pour récupérer un livre par ID
const validateGetBookById = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

// Validation pour supprimer un livre
const validateDeleteBook = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

module.exports = {
    validateCreateBook,
    validateUpdateBook,
    validateGetBookById,
    validateDeleteBook
};
