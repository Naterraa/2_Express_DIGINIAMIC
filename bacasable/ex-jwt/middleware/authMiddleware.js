const jwt = require('jsonwebtoken');

// cette fonction est un middleware
// Si ce middleware est appelé sur une route c'est pour vérifier le token
const authMiddleware = (req, res, next) => {
    try {
        // Récupérer le token depuis le header Authorization
        const authHeader = req.headers.authorization;

        // Si pas de authHeader, on retourne une erreur
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token manquant. Authentification requise.'
            });
        }

        // Format attendu: "Bearer TOKEN"
        console.log(authHeader);
        const token = authHeader.split(' ')[1];

        // Si pas de token, on retourne une erreur
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Format de token invalide. Utilisez: Bearer TOKEN'
            });
        }

        // Vérifier et décoder le token avec la méthode du module jwt verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter les informations de l'utilisateur à la requête
        req.user = decoded;

        // Appeler le middleware suivant - principe fondamental des middlewares
        // Si on arrive juste ici c'est que le token est valide
        next();

    } catch (error) {
        // Si erreur de vérification du token
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token invalide'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expiré'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la vérification du token',
            error: error.message
        });
    }
};

module.exports = authMiddleware;
