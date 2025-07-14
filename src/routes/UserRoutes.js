const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// ✅ Nouvelle route d'inscription
//router.post('/register', userController.register);

// Routes CRUD existantes
router.post('/creer', userController.createUser);
router.get('/getall', userController.getAllUsers);
router.get('/getbyId/:id', userController.getUserById);
router.put('/modifie/:id', userController.updateUser);
router.delete('/supprimer/:id', userController.deleteUser);


module.exports = router;
