# Exercice 8

# PARTIE 1

Crée un fichier utils.js et colle y le code suivant.

```
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
```

Réalise les tests unitaires de chaque fonction.

# PARTIE 2

Reprendre l'API sql de gestion de livres et réalsez les tests unitaires pour les services.
On fera seulement les tests unitaires pour les services de gestion des livres, pas l'authentification (bookService.js et librarayService.js)