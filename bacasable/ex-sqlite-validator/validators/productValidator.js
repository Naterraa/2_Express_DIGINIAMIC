const { body, param, validationResult } = require('express-validator');

// Documentation à lire 
// https://express-validator.github.io/docs/guides/validation-chain

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

// Validation pour la création d'un produit
const validateCreateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères')
        .matches(/^[a-zA-Z0-9\s\-_]+$/)
        .withMessage('Le nom ne peut contenir que des lettres, chiffres, espaces, tirets et underscores'),
    handleValidationErrors
];

// Validation pour la mise à jour d'un produit
const validateUpdateProduct = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères')
        .matches(/^[a-zA-Z0-9\s\-_]+$/)
        .withMessage('Le nom ne peut contenir que des lettres, chiffres, espaces, tirets et underscores'),
    handleValidationErrors
];

// Validation pour récupérer un produit par ID
const validateGetProductById = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

// Validation pour supprimer un produit
const validateDeleteProduct = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

module.exports = {
    validateCreateProduct,
    validateUpdateProduct,
    validateGetProductById,
    validateDeleteProduct
};
