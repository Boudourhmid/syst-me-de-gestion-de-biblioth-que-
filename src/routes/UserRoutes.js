const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes CRUD
router.post('/', userController.creerUtilisateur);
router.get('/', userController.getUtilisateurs);
router.get('/:id', userController.getUtilisateurById);
router.put('/:id', userController.modifierUtilisateur);
router.delete('/:id', userController.supprimerUtilisateur);

module.exports = router;
