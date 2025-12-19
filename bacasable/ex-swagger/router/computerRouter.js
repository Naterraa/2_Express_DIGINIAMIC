const express = require('express');
const router = express.Router();
const computerController = require('../controller/computerController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /computers:
 *   get:
 *     summary: Récupérer tous les ordinateurs
 *     tags: [Computers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des ordinateurs récupérée avec succès
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
 *                     $ref: '#/components/schemas/Computer'
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 user:
 *                   type: object
 *                   description: Informations de l'utilisateur authentifié
 *       401:
 *         description: Non authentifié - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', computerController.getAllComputers);

/**
 * @swagger
 * /computers/{id}:
 *   get:
 *     summary: Récupérer un ordinateur par son ID
 *     tags: [Computers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'ordinateur
 *     responses:
 *       200:
 *         description: Ordinateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Computer'
 *       404:
 *         description: Ordinateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', computerController.getComputerById);

/**
 * @swagger
 * /computers:
 *   post:
 *     summary: Créer un nouvel ordinateur
 *     tags: [Computers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: MacBook Pro
 *               brand:
 *                 type: string
 *                 example: Apple
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2500
 *     responses:
 *       201:
 *         description: Ordinateur créé avec succès
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
 *                   example: Ordinateur créé avec succès
 *                 data:
 *                   $ref: '#/components/schemas/Computer'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', computerController.createComputer);

module.exports = router;
