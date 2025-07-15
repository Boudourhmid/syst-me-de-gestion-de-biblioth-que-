const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Génération du token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Créer un utilisateur
async function createUser(req, res) {
  try {
    const {
      nom, prenom, email, motDePasse, role,
      matricule, departement, roleEmploye,
      numeroEtudiant, filiere, niveauEtude, maxEmprunts,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    } = req.body;

    if (!['employe', 'etudiant', 'supplier'].includes(role)) {
      return res.status(400).json({ message: 'Role invalide.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant avec cet email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    const user = new User({
      nom, prenom, email, motDePasse: hashedPassword, role,
      matricule, departement, roleEmploye,
      numeroEtudiant, filiere, niveauEtude, maxEmprunts,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer tous les utilisateurs
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer un utilisateur par ID
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Mettre à jour un utilisateur
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

// Supprimer un utilisateur
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json({ message: 'Utilisateur supprimé.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export des fonctions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
