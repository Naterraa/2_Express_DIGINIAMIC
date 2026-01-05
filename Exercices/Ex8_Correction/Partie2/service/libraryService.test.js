const libraryService = require('../service/libraryService');
const { Library, Book } = require('../config/associations');

// Mock des modèles
jest.mock('../config/associations', () => ({
    Library: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
    Book: {}
}));

describe('LibraryService - Tests unitaires', () => {

    // Réinitialiser les mocks avant chaque test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllLibraries', () => {
        test('devrait retourner toutes les bibliothèques', async () => {
            const mockLibraries = [
                { id: 1, name: 'Bibliothèque Centrale', address: '123 Rue Principale' },
                { id: 2, name: 'Bibliothèque du Quartier', address: '456 Avenue Secondaire' }
            ];

            Library.findAll.mockResolvedValue(mockLibraries);

            const result = await libraryService.getAllLibraries();

            expect(Library.findAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockLibraries);
            expect(result).toHaveLength(2);
        });

        test('devrait retourner un tableau vide si aucune bibliothèque', async () => {
            Library.findAll.mockResolvedValue([]);

            const result = await libraryService.getAllLibraries();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });
    });

    describe('getLibraryWithBooks', () => {
        test('devrait retourner une bibliothèque avec ses livres', async () => {
            const mockLibrary = {
                id: 1,
                name: 'Bibliothèque Centrale',
                address: '123 Rue Principale',
                books: [
                    { id: 1, title: 'Livre 1', author: 'Auteur 1' },
                    { id: 2, title: 'Livre 2', author: 'Auteur 2' }
                ]
            };

            Library.findByPk.mockResolvedValue(mockLibrary);

            const result = await libraryService.getLibraryWithBooks(1);

            expect(Library.findByPk).toHaveBeenCalledWith(1, {
                include: [{
                    model: Book,
                    as: 'books'
                }]
            });
            expect(result).toEqual(mockLibrary);
            expect(result.books).toHaveLength(2);
        });

        test('devrait retourner une bibliothèque sans livres', async () => {
            const mockLibrary = {
                id: 1,
                name: 'Bibliothèque Vide',
                address: '789 Rue Vide',
                books: []
            };

            Library.findByPk.mockResolvedValue(mockLibrary);

            const result = await libraryService.getLibraryWithBooks(1);

            expect(result.books).toEqual([]);
            expect(result.books).toHaveLength(0);
        });

        test('devrait lancer une erreur si la bibliothèque n\'existe pas', async () => {
            Library.findByPk.mockResolvedValue(null);

            await expect(libraryService.getLibraryWithBooks(999)).rejects.toThrow('Bibliothèque avec l\'ID 999 non trouvée');
            expect(Library.findByPk).toHaveBeenCalledWith(999, expect.any(Object));
        });
    });

    describe('createLibrary', () => {
        test('devrait créer une nouvelle bibliothèque avec toutes les données', async () => {
            const libraryData = {
                name: '  Nouvelle Bibliothèque  ',
                address: '  123 Nouvelle Rue  '
            };

            const mockCreatedLibrary = {
                id: 1,
                name: 'Nouvelle Bibliothèque',
                address: '123 Nouvelle Rue'
            };

            Library.create.mockResolvedValue(mockCreatedLibrary);

            const result = await libraryService.createLibrary(libraryData);

            expect(Library.create).toHaveBeenCalledWith({
                name: 'Nouvelle Bibliothèque',
                address: '123 Nouvelle Rue'
            });
            expect(result).toEqual(mockCreatedLibrary);
        });

        test('devrait trim les espaces des champs', async () => {
            const libraryData = {
                name: '   Bibliothèque avec espaces   ',
                address: '   Adresse avec espaces   '
            };

            Library.create.mockResolvedValue({});

            await libraryService.createLibrary(libraryData);

            expect(Library.create).toHaveBeenCalledWith({
                name: 'Bibliothèque avec espaces',
                address: 'Adresse avec espaces'
            });
        });

        test('devrait lancer une erreur si le nom est manquant', async () => {
            const libraryData = {
                address: '123 Rue'
            };

            await expect(libraryService.createLibrary(libraryData)).rejects.toThrow('Le nom et l\'adresse sont requis');
            expect(Library.create).not.toHaveBeenCalled();
        });

        test('devrait lancer une erreur si l\'adresse est manquante', async () => {
            const libraryData = {
                name: 'Bibliothèque'
            };

            await expect(libraryService.createLibrary(libraryData)).rejects.toThrow('Le nom et l\'adresse sont requis');
            expect(Library.create).not.toHaveBeenCalled();
        });

        test('devrait lancer une erreur si le nom est une chaîne vide', async () => {
            const libraryData = {
                name: '',
                address: '123 Rue'
            };

            await expect(libraryService.createLibrary(libraryData)).rejects.toThrow('Le nom et l\'adresse sont requis');
            expect(Library.create).not.toHaveBeenCalled();
        });

        test('devrait lancer une erreur si l\'adresse est une chaîne vide', async () => {
            const libraryData = {
                name: 'Bibliothèque',
                address: ''
            };

            await expect(libraryService.createLibrary(libraryData)).rejects.toThrow('Le nom et l\'adresse sont requis');
            expect(Library.create).not.toHaveBeenCalled();
        });

        test('devrait lancer une erreur si les deux champs sont manquants', async () => {
            const libraryData = {};

            await expect(libraryService.createLibrary(libraryData)).rejects.toThrow('Le nom et l\'adresse sont requis');
            expect(Library.create).not.toHaveBeenCalled();
        });
    });
});
