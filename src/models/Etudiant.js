const mongoose = require('mongoose');

const etudiantSchema = mongoose.Schema({
  NumEtudiant: {
    type: number,
    required: true
  },
  filiere: {
    type: String,
    required: true
  },
  niveauEtude: {
    type: String,
    enum: ['Licence', 'Master', 'Doctorat','Ingenieur'],
    default: 'Licence'
  },
  maxEmprunts: {
    type: Number,
    required: true  
}
}, {
  timestamps: true
});

module.exports = mongoose.model('Etudiant', etudiantSchema);