const bookService = require('../service/bookService');
const { Book } = require('../config/associations');

// Mock du modèle Book
jest.mock('../config/associations', () => ({
    Book: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    }
}));

describe('BookService - Tests unitaires', () => {

    // Réinitialiser les mocks avant chaque test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBooks', () => {
        test('devrait retourner tous les livres', async () => {
            const mockBooks = [
                { id: 1, title: 'Livre 1', author: 'Auteur 1', year: 2020, type: 'Fiction', available: true, libraryId: 1 },
                { id: 2, title: 'Livre 2', author: 'Auteur 2', year: 2021, type: 'Science', available: false, libraryId: 1 }
            ];

            Book.findAll.mockResolvedValue(mockBooks);

            const result = await bookService.getAllBooks();

            expect(Book.findAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockBooks);
            expect(result).toHaveLength(2);
        });

        test('devrait retourner un tableau vide si aucun livre', async () => {
            Book.findAll.mockResolvedValue([]);

            const result = await bookService.getAllBooks();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });
    });

    describe('getBookById', () => {
        test('devrait retourner un livre par son ID', async () => {
            const mockBook = {
                id: 1,
                title: 'Test Book',
                author: 'Test Author',
                year: 2020,
                type: 'Fiction',
                available: true,
                libraryId: 1
            };

            Book.findByPk.mockResolvedValue(mockBook);

            const result = await bookService.getBookById(1);

            expect(Book.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockBook);
        });

        test('devrait lancer une erreur si le livre n\'existe pas', async () => {
            Book.findByPk.mockResolvedValue(null);

            await expect(bookService.getBookById(999)).rejects.toThrow('Livre avec l\'ID 999 non trouvé');
            expect(Book.findByPk).toHaveBeenCalledWith(999);
        });
    });

    describe('createBook', () => {
        test('devrait créer un nouveau livre avec toutes les données', async () => {
            const bookData = {
                title: '  Nouveau Livre  ',
                author: '  Nouvel Auteur  ',
                year: 2023,
                type: '  Fantasy  ',
                available: true,
                libraryId: 1
            };

            const mockCreatedBook = {
                id: 1,
                title: 'Nouveau Livre',
                author: 'Nouvel Auteur',
                year: 2023,
                type: 'Fantasy',
                available: true,
                libraryId: 1
            };

            Book.create.mockResolvedValue(mockCreatedBook);

            const result = await bookService.createBook(bookData);

            expect(Book.create).toHaveBeenCalledWith({
                title: 'Nouveau Livre',
                author: 'Nouvel Auteur',
                year: 2023,
                type: 'Fantasy',
                available: true,
                libraryId: 1
            });
            expect(result).toEqual(mockCreatedBook);
        });

        test('devrait créer un livre avec available=true par défaut', async () => {
            const bookData = {
                title: 'Livre',
                author: 'Auteur',
                year: 2023,
                type: 'Fiction',
                libraryId: 1
            };

            const mockCreatedBook = {
                id: 1,
                ...bookData,
                available: true
            };

            Book.create.mockResolvedValue(mockCreatedBook);

            const result = await bookService.createBook(bookData);

            expect(Book.create).toHaveBeenCalledWith(expect.objectContaining({
                available: true
            }));
        });

        test('devrait lancer une erreur si libraryId est manquant', async () => {
            const bookData = {
                title: 'Livre',
                author: 'Auteur',
                year: 2023,
                type: 'Fiction'
            };

            await expect(bookService.createBook(bookData)).rejects.toThrow('Le champ libraryId est requis');
            expect(Book.create).not.toHaveBeenCalled();
        });

        test('devrait trim les espaces des champs texte', async () => {
            const bookData = {
                title: '   Livre avec espaces   ',
                author: '   Auteur avec espaces   ',
                year: 2023,
                type: '   Type avec espaces   ',
                available: true,
                libraryId: 1
            };

            Book.create.mockResolvedValue({});

            await bookService.createBook(bookData);

            expect(Book.create).toHaveBeenCalledWith({
                title: 'Livre avec espaces',
                author: 'Auteur avec espaces',
                year: 2023,
                type: 'Type avec espaces',
                available: true,
                libraryId: 1
            });
        });
    });

    describe('updateBook', () => {
        test('devrait mettre à jour un livre existant', async () => {
            const mockBook = {
                id: 1,
                title: 'Ancien Titre',
                author: 'Ancien Auteur',
                year: 2020,
                type: 'Fiction',
                available: true,
                libraryId: 1,
                save: jest.fn()
            };

            const updateData = {
                title: '  Nouveau Titre  ',
                author: '  Nouvel Auteur  ',
                year: 2023,
                type: '  Science  ',
                available: false
            };

            Book.findByPk.mockResolvedValue(mockBook);

            const result = await bookService.updateBook(1, updateData);

            expect(Book.findByPk).toHaveBeenCalledWith(1);
            expect(mockBook.title).toBe('Nouveau Titre');
            expect(mockBook.author).toBe('Nouvel Auteur');
            expect(mockBook.year).toBe(2023);
            expect(mockBook.type).toBe('Science');
            expect(mockBook.available).toBe(false);
            expect(mockBook.save).toHaveBeenCalled();
        });

        test('devrait mettre à jour uniquement les champs fournis', async () => {
            const mockBook = {
                id: 1,
                title: 'Titre Original',
                author: 'Auteur Original',
                year: 2020,
                type: 'Fiction',
                available: true,
                libraryId: 1,
                save: jest.fn()
            };

            const updateData = {
                title: 'Nouveau Titre'
            };

            Book.findByPk.mockResolvedValue(mockBook);

            await bookService.updateBook(1, updateData);

            expect(mockBook.title).toBe('Nouveau Titre');
            expect(mockBook.author).toBe('Auteur Original'); // Non modifié
            expect(mockBook.year).toBe(2020); // Non modifié
        });

        test('devrait lancer une erreur si le livre n\'existe pas', async () => {
            Book.findByPk.mockResolvedValue(null);

            await expect(bookService.updateBook(999, { title: 'Test' })).rejects.toThrow('Livre avec l\'ID 999 non trouvé');
        });
    });

    describe('deleteBook', () => {
        test('devrait supprimer un livre existant', async () => {
            const mockBook = {
                id: 1,
                title: 'Livre à supprimer',
                destroy: jest.fn()
            };

            Book.findByPk.mockResolvedValue(mockBook);

            const result = await bookService.deleteBook(1);

            expect(Book.findByPk).toHaveBeenCalledWith(1);
            expect(mockBook.destroy).toHaveBeenCalled();
            expect(result).toEqual(mockBook);
        });

        test('devrait lancer une erreur si le livre n\'existe pas', async () => {
            Book.findByPk.mockResolvedValue(null);

            await expect(bookService.deleteBook(999)).rejects.toThrow('Livre avec l\'ID 999 non trouvé');
        });
    });

    describe('getAvailableBooks', () => {
        test('devrait retourner uniquement les livres disponibles', async () => {
            const mockAvailableBooks = [
                { id: 1, title: 'Livre 1', available: true },
                { id: 2, title: 'Livre 2', available: true }
            ];

            Book.findAll.mockResolvedValue(mockAvailableBooks);

            const result = await bookService.getAvailableBooks();

            expect(Book.findAll).toHaveBeenCalledWith({
                where: { available: true }
            });
            expect(result).toEqual(mockAvailableBooks);
        });
    });

    describe('getBooksByGenre', () => {
        test('devrait retourner les livres filtrés par genre', async () => {
            const mockBooks = [
                { id: 1, title: 'Livre Fantasy 1', type: 'Fantasy' },
                { id: 2, title: 'Livre Fantasy 2', type: 'Fantasy' }
            ];

            Book.findAll.mockResolvedValue(mockBooks);

            const result = await bookService.getBooksByGenre('Fantasy');

            expect(Book.findAll).toHaveBeenCalledWith({
                where: {
                    type: {
                        [require('sequelize').Op.like]: '%Fantasy%'
                    }
                }
            });
            expect(result).toEqual(mockBooks);
        });

        test('devrait retourner tous les livres si aucun genre n\'est spécifié', async () => {
            const mockBooks = [
                { id: 1, title: 'Livre 1', type: 'Fantasy' },
                { id: 2, title: 'Livre 2', type: 'Science' }
            ];

            Book.findAll.mockResolvedValue(mockBooks);

            const result = await bookService.getBooksByGenre('');

            expect(Book.findAll).toHaveBeenCalledWith();
            expect(result).toEqual(mockBooks);
        });

        test('devrait retourner tous les livres si query est null', async () => {
            const mockBooks = [
                { id: 1, title: 'Livre 1', type: 'Fantasy' }
            ];

            Book.findAll.mockResolvedValue(mockBooks);

            const result = await bookService.getBooksByGenre(null);

            expect(Book.findAll).toHaveBeenCalledWith();
            expect(result).toEqual(mockBooks);
        });
    });
});
