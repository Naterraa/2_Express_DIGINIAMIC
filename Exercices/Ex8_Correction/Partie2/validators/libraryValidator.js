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

// Validation pour la création d'une bibliothèque
const validateCreateLibrary = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('L\'adresse est requise')
        .isLength({ min: 5, max: 200 })
        .withMessage('L\'adresse doit contenir entre 5 et 200 caractères'),
    handleValidationErrors
];

// Validation pour récupérer une bibliothèque par ID
const validateGetLibraryById = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

module.exports = {
    validateCreateLibrary,
    validateGetLibraryById
};
