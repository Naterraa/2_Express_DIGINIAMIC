const { totofunction } = require('./toto.js');

describe('toto', () => {
    it('devrait retourner "toto"', () => {
        expect(totofunction()).toBe('toto');
    });
});