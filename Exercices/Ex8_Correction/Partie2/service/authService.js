const { User } = require('../config/associations');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/jwt');

// Générer un token JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        jwtSecret,
        { expiresIn: jwtExpire }
    );
};

// Inscription d'un nouvel utilisateur
const register = async (userData) => {
    const { username, email, password, role } = userData;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
        where: {
            email: email
        }
    });

    if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Vérifier si le username existe déjà
    const existingUsername = await User.findOne({
        where: {
            username: username
        }
    });

    if (existingUsername) {
        throw new Error('Ce nom d\'utilisateur est déjà pris');
    }

    // Créer le nouvel utilisateur (le mot de passe sera hashé automatiquement par le hook)
    const newUser = await User.create({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        role: role || 'user' // Par défaut 'user', sauf si 'admin' est spécifié
    });

    // Générer le token
    const token = generateToken(newUser);

    return {
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        },
        token
    };
};

// Connexion d'un utilisateur
const login = async (credentials) => {
    const { email, password } = credentials;

    // Trouver l'utilisateur par email
    const user = await User.findOne({
        where: {
            email: email.trim().toLowerCase()
        }
    });

    if (!user) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token
    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token
    };
};

module.exports = {
    register,
    login
};
