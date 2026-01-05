const { addition, estPair, capitaliser } = require('./utils');

describe('Tests des fonctions utilitaires', () => {

    // Tests pour la fonction addition
    describe('addition', () => {
        it('devrait additionner deux nombres positifs', () => {
            expect(addition(2, 3)).toBe(5);
        });

        it('devrait additionner deux nombres négatifs', () => {
            expect(addition(-2, -3)).toBe(-5);
        });

        it('devrait additionner un nombre positif et un nombre négatif', () => {
            expect(addition(5, -3)).toBe(2);
        });

        it('devrait retourner le même nombre si on additionne avec 0', () => {
            expect(addition(10, 0)).toBe(10);
            expect(addition(0, 10)).toBe(10);
        });

        it('devrait gérer les nombres décimaux', () => {
            expect(addition(1.5, 2.3)).toBeCloseTo(3.8);
        });

        it('devrait retourner 0 si on additionne 0 + 0', () => {
            expect(addition(0, 0)).toBe(0);
        });
    });

    // Tests pour la fonction estPair
    describe('estPair', () => {
        it('devrait retourner true pour un nombre pair positif', () => {
            expect(estPair(4)).toBe(true);
            expect(estPair(10)).toBe(true);
            expect(estPair(100)).toBe(true);
        });

        it('devrait retourner false pour un nombre impair positif', () => {
            expect(estPair(3)).toBe(false);
            expect(estPair(7)).toBe(false);
            expect(estPair(99)).toBe(false);
        });

        it('devrait retourner true pour 0', () => {
            expect(estPair(0)).toBe(true);
        });

        it('devrait retourner true pour un nombre pair négatif', () => {
            expect(estPair(-4)).toBe(true);
            expect(estPair(-10)).toBe(true);
        });

        it('devrait retourner false pour un nombre impair négatif', () => {
            expect(estPair(-3)).toBe(false);
            expect(estPair(-7)).toBe(false);
        });

        it('devrait retourner true pour 2', () => {
            expect(estPair(2)).toBe(true);
        });

        it('devrait retourner false pour 1', () => {
            expect(estPair(1)).toBe(false);
        });
    });

    // Tests pour la fonction capitaliser
    describe('capitaliser', () => {
        it('devrait mettre la première lettre en majuscule', () => {
            expect(capitaliser('hello')).toBe('Hello');
        });

        it('devrait gérer une chaîne déjà capitalisée', () => {
            expect(capitaliser('Hello')).toBe('Hello');
        });

        it('devrait gérer une chaîne en majuscules', () => {
            expect(capitaliser('HELLO')).toBe('HELLO');
        });

        it('devrait retourner une chaîne vide pour une entrée vide', () => {
            expect(capitaliser('')).toBe('');
        });

        it('devrait retourner une chaîne vide pour null', () => {
            expect(capitaliser(null)).toBe('');
        });

        it('devrait retourner une chaîne vide pour undefined', () => {
            expect(capitaliser(undefined)).toBe('');
        });

        it('devrait gérer une chaîne d\'un seul caractère', () => {
            expect(capitaliser('a')).toBe('A');
            expect(capitaliser('A')).toBe('A');
        });

        it('devrait gérer une phrase complète', () => {
            expect(capitaliser('bonjour le monde')).toBe('Bonjour le monde');
        });

        it('devrait gérer une chaîne avec des espaces au début', () => {
            expect(capitaliser(' hello')).toBe(' hello');
        });

        it('devrait gérer une chaîne avec des chiffres au début', () => {
            expect(capitaliser('123abc')).toBe('123abc');
        });

        it('devrait gérer des caractères spéciaux', () => {
            expect(capitaliser('éléphant')).toBe('Éléphant');
        });
    });
});
