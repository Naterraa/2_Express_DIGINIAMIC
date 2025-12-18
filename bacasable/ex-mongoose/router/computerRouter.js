const express = require('express');
const router = express.Router();
const computerController = require('../controller/computerController');

router.get('/', computerController.getAllComputers);
router.get('/:id', computerController.getComputerById);
router.post('/', computerController.createComputer);
router.put('/:id', computerController.updateComputer);
router.delete('/:id', computerController.deleteComputer);

module.exports = router;
