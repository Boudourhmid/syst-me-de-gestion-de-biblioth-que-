const mongoose = require('mongoose');

const fournisseurSchema = mongoose.Schema({
  nomEntreprise: {
    type: String,
    required: true
  },
  adresseEntreprise: {
    type: String,
    required: true
  },
  contactPrincipall: {
    type: String,
    required: true,
  },
  siret: {
    type: number,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Fournisseur', fournisseurSchema);
