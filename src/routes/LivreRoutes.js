const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const { protect } = require('../middelweras/authMiddleware');

// Routes protégées
router.post('/', protect, livreController.createLivre);
router.get('/', protect, livreController.getAllLivres);
router.get('/:id', protect, livreController.getLivreById);
router.put('/:id', protect, livreController.updateLivre);
router.delete('/:id', protect, livreController.deleteLivre);

module.exports = router;
