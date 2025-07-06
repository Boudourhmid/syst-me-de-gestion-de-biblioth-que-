const mongoose = require('mongoose');

const employeSchema = mongoose.Schema({
  Matricule: {
    type: Number,
    required: true
  },
  Departement: {
    type: String,
    enum: ['Acquisitions', 'Pret'],
    default: 'Acquisitions'
  },
  roleEmploye: {
    type: String,
    enum: ['Administrateur', 'Bibliothécaire', 'Technicien'],
    default: 'Bibliothécaire'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Employe', employeSchema);
