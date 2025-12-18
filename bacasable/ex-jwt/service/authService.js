const User = require('../model/User');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
    const { username, email, password } = userData;

    // Vérifier que tous les champs sont présents
    if (!username || !email || !password) {
        throw new Error('Tous les champs sont requis (username, email, password)');
    }

    // Vérifier la longueur du mot de passe
    if (password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

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

    // Créer l'utilisateur (le mot de passe sera hashé automatiquement)
    const user = await User.create({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password
    });

    // Générer un token JWT
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
        token
    };
};

const login = async (credentials) => {
    const { email, password } = credentials;

    // Vérifier que tous les champs sont présents
    if (!email || !password) {
        throw new Error('Email et mot de passe requis');
    }

    // Trouver l'utilisateur par email
    const user = await User.findOne({
        where: {
            email: email.toLowerCase()
        }
    });

    if (!user) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe (méthode comparePassword définie dans le model User)
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // Générer un token JWT
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
        token
    };
};

module.exports = {
    register,
    login
};
