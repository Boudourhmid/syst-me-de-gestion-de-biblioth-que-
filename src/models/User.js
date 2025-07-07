const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now },
  statut: {
    type: String,
    enum: ['actif', 'inactif', 'suspendu'],
    default: 'inactif'
  }
});

// Avant d'enregistrer, hacher le mot de passe
userSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.verifierMotDePasse = async function (motDePasse) {
  return await bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = mongoose.model('Utilisateur', userSchema);
