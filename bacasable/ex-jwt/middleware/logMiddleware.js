const logMiddleware = (req, res, next) => {
    // pour travailler sur l'objet req avant d'arriver dans mon controleur
    next();
    // pour travailler sur l'objet res avant d'arriver dans mon controleur
    // traitement de mise en forme de ma réponse
    console.log(res);
};

module.exports = logMiddleware;