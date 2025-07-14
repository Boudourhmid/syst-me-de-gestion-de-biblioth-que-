const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  try {
    const {
      nom, prenom, email, motDePasse, role,
      matricule, departement, roleEmploye,
      numeroEtudiant, filiere, niveauEtude, maxEmprunts,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    } = req.body;

    // Vérifie que le rôle est valide
    if (!['employe', 'etudiant', 'supplier'].includes(role)) {
      return res.status(400).json({ message: 'Role invalide.' });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    const user = new User({
      nom, prenom, email, motDePasse: hashedPassword, role,
      matricule, departement, roleEmploye,
      numeroEtudiant, filiere, niveauEtude, maxEmprunts,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    });

    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const updates = req.body;

    if (updates.motDePasse) {
      const salt = await bcrypt.genSalt(10);
      updates.motDePasse = await bcrypt.hash(updates.motDePasse, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    res.json({ message: 'Utilisateur mis à jour.', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json({ message: 'Utilisateur supprimé.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
