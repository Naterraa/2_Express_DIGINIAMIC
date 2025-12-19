const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');
const { User } = require('../config/associations');

// Middleware pour vérifier le token JWT
const authenticateToken = async (req, res, next) => {
    try {
        // Récupérer le token depuis le header Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Accès refusé. Aucun token fourni.'
            });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, jwtSecret);

        // Récupérer l'utilisateur depuis la base de données
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token invalide. Utilisateur non trouvé.'
            });
        }

        // Ajouter les informations de l'utilisateur à la requête
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token invalide ou expiré.',
            error: error.message
        });
    }
};

// Middleware pour vérifier le rôle admin (BONUS)
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentification requise.'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Accès refusé. Droits administrateur requis.'
        });
    }

    next();
};

module.exports = {
    authenticateToken,
    requireAdmin
};
