const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const authMiddleware = require('../middelweras/authMiddleware');
const{protect} = require('../middelweras/authMiddleware');

// Routes CRUD
router.post('/creer',  userController.createUser);// non protégée (ex. inscription)
router.get('/getall', authMiddleware, userController.getAllUsers); // protégée
router.get('/getbyId/:id', authMiddleware, userController.getUserById); // protégée
router.put('/modifie/:id', authMiddleware, userController.updateUser); // protégée
router.delete('/supprimer/:id', authMiddleware, userController.deleteUser); // protégée

module.exports = router;
