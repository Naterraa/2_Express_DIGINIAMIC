const authService = require('../service/authService');

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({
            success: true,
            message: 'Utilisateur créé avec succès',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            data: result
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// Route protégée pour obtenir le profil de l'utilisateur connecté
const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du profil',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getProfile
};
