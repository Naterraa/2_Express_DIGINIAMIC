const express = require('express');
const gymController = require('../controller/gymController');

const router = express.Router();

// GET /gyms - Lister les salles de sport
router.get('/', gymController.getAllGyms);

// GET /gyms/:id - Lister une salle de sport avec ses équipements
router.get('/:id', gymController.getGymWithEquipments);

module.exports = router;
