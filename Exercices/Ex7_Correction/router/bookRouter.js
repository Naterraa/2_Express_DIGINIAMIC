const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const {
    validateCreateBook,
    validateUpdateBook,
    validateGetBookById,
    validateDeleteBook
} = require('../validators/bookValidator');
const { authenticateToken, requireAdmin } = require('../middleware/auth');


// Routes publiques (GET)
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Récupérer tous les livres
 *     description: Retourne la liste complète de tous les livres disponibles dans la base de données
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Liste des livres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 count:
 *                   type: integer
 *                   description: Nombre total de livres
 *                   example: 10
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', bookController.getAllBooks);
router.get('/available', bookController.getAvailableBooks);
router.get('/genre', bookController.getBooksByGenre);
router.get('/:id', validateGetBookById, bookController.getBookById);


// Routes protégées (POST/PUT/DELETE - nécessitent une authentification)
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Créer un nouveau livre
 *     description: Crée un nouveau livre dans la base de données (nécessite une authentification admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - year
 *               - type
 *               - available
 *               - libraryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du livre
 *                 example: "Harry Potter à l'école des sorciers"
 *               author:
 *                 type: string
 *                 description: Auteur du livre
 *                 example: "J.K. Rowling"
 *               year:
 *                 type: integer
 *                 description: Année de publication
 *                 example: 1997
 *               type:
 *                 type: string
 *                 description: Genre du livre
 *                 example: "Fantasy"
 *               available:
 *                 type: boolean
 *                 description: Disponibilité du livre
 *                 example: true
 *               libraryId:
 *                 type: integer
 *                 description: ID de la bibliothèque
 *                 example: 1
 *     responses:
 *       201:
 *         description: Livre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Livre créé avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Accès refusé - Droits administrateur requis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticateToken, requireAdmin, validateCreateBook, bookController.createBook);
router.put('/:id', authenticateToken, requireAdmin, validateUpdateBook, bookController.updateBook);
router.delete('/:id', authenticateToken, requireAdmin, validateDeleteBook, bookController.deleteBook);

module.exports = router;
