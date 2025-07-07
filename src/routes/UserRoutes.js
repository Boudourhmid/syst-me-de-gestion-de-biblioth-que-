const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.creerUtilisateur);
router.get('/', userController.getUtilisateurs);
router.get('/:id', userController.getUtilisateurById);
router.delete('/:id', userController.supprimerUtilisateur);

module.exports = router;
