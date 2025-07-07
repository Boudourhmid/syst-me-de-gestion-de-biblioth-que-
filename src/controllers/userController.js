const Utilisateur = require('../models/User');

// Créer un utilisateur
exports.creerUtilisateur = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, statut } = req.body;
    const utilisateur = new Utilisateur({ nom, prenom, email, motDePasse, statut });
    await utilisateur.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur });
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
};

// Obtenir tous les utilisateurs
exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

// Obtenir un utilisateur par ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

// Supprimer un utilisateur
exports.supprimerUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};
