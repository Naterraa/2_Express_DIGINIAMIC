/**
 * Additionne deux nombres
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function addition(a, b) {
    return a + b;
}

/**
 * Vérifie si un nombre est pair
 * @param {number} n
 * @returns {boolean}
 */
function estPair(n) {
    return n % 2 === 0;
}

/**
 * Met la première lettre d'une chaîne en majuscule
 * @param {string} str
 * @returns {string}
 */
function capitaliser(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    addition,
    estPair,
    capitaliser,
};
