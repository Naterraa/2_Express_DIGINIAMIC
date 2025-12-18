const express = require('express');
const equipmentController = require('../controller/equipmentController');

const router = express.Router();

// GET /equipments/:id - Afficher un équipement par son ID
router.get('/:id', equipmentController.getEquipmentById);

// POST /equipments - Ajouter un équipement à une salle de sport
router.post('/', equipmentController.createEquipment);

// PUT /equipments/:id - Modifier un équipement
router.put('/:id', equipmentController.updateEquipment);

// DELETE /equipments/:id - Supprimer un équipement d'une salle de sport
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
