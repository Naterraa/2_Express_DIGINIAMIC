const { body, validationResult } = require('express-validator');

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

// Validation pour l'inscription
const validateRegister = [
    body('username')
        .trim()
        .notEmpty().withMessage('Le nom d\'utilisateur est requis')
        .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit contenir au moins 3 caractères'),
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('L\'email doit être valide'),
    body('password')
        .notEmpty().withMessage('Le mot de passe est requis')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Le rôle doit être "user" ou "admin"'),
    handleValidationErrors
];

// Validation pour la connexion
const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('L\'email doit être valide'),
    body('password')
        .notEmpty().withMessage('Le mot de passe est requis'),
    handleValidationErrors
];

module.exports = {
    validateRegister,
    validateLogin
};
