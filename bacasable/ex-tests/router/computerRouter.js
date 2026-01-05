const express = require('express');
const router = express.Router();
const computerController = require('../controller/computerController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', computerController.getAllComputers);
router.get('/:id', computerController.getComputerById);
router.post('/', computerController.createComputer);

module.exports = router;
