const computerService = require('./computerService');
const Computer = require('../model/Computer');

// Mock le modèle Computer
// c'est à dire que l'on va simuler le comportement de la classe Computer
jest.mock('../model/Computer', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
}));

// Ensemble de tests pour le service Computer
describe('ComputerService', () => {

    // avant chaque test, on réinitialise les mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // getAllComputers
    describe('getAllComputers', () => {
        it('devrait retourner tous les ordinateurs', async () => {

            // ARRANGE 

            // Création d'un mock des données pour avoir des données de test
            const mockComputers = [
                { id: 1, name: 'PC1', brand: 'Dell', price: 800 },
                { id: 2, name: 'PC2', brand: 'HP', price: 900 }
            ];

            // Mock de la fonction findAll pour simuler le comportement de la fonction findAll
            // Ici on ne veut pas tester le fonctionnement de findAll, mais simuler son comportement
            Computer.findAll.mockResolvedValue(mockComputers);

            // ACT 
            const result = await computerService.getAllComputers();


            // ASSERT 
            expect(Computer.findAll).toHaveBeenCalledTimes(1);
            // Vérification que le résultat est égal au mock
            expect(result).toEqual(mockComputers);
        });
    });

    // getComputerById
    describe('getComputerById', () => {
        it('devrait retourner un ordinateur par son ID', async () => {
            const mockComputer = { id: 1, name: 'PC1', brand: 'Dell', price: 800 };
            Computer.findByPk.mockResolvedValue(mockComputer);

            const result = await computerService.getComputerById(1);

            expect(Computer.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockComputer);
        });

        it('devrait lancer une erreur si ordinateur non trouvé', async () => {
            Computer.findByPk.mockResolvedValue(null);

            await expect(computerService.getComputerById(999)).rejects.toThrow('Ordinateur non trouvé');
        });
    });

    // createComputer
    describe('createComputer', () => {
        it('devrait créer un ordinateur', async () => {

            const computerData = { name: '  PC Test  ', brand: '  Dell  ', price: '1000' };

            const mockCreated = { id: 1, name: 'PC Test', brand: 'Dell', price: 1000 };
            Computer.create.mockResolvedValue(mockCreated);

            const result = await computerService.createComputer(computerData);

            expect(Computer.create).toHaveBeenCalledWith({
                name: 'PC Test',
                brand: 'Dell',
                price: 1000
            });
            expect(result).toEqual(mockCreated);
        });

        it('devrait lancer une erreur si champs manquants', async () => {
            await expect(computerService.createComputer({ name: 'PC' })).rejects.toThrow('Tous les champs sont requis');
        });
    });
});
