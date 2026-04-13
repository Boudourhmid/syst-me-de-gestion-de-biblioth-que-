const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Livre = require('./src/models/Livre');
const Categorie = require('./src/models/Categorie');
const Exemplaire = require('./src/models/Exemplaire');

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    console.log('Nettoyage des collections...');
    await Promise.all([
      User.deleteMany(),
      Categorie.deleteMany(),
      Livre.deleteMany(),
      Exemplaire.deleteMany(),
    ]);

    const passwordHash = await bcrypt.hash('Password123!', 10);

    const users = [
      {
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@example.com',
        motDePasse: passwordHash,
        role: 'admin',
        statut: 'actif',
      },
      {
        nom: 'Leila',
        prenom: 'Khalil',
        email: 'employe@example.com',
        motDePasse: passwordHash,
        role: 'employe',
        statut: 'actif',
        matricule: 'EMP001',
        departement: 'Gestion',
        roleEmploye: 'Bibliothécaire',
      },
      {
        nom: 'Sofia',
        prenom: 'Amine',
        email: 'etudiant@example.com',
        motDePasse: passwordHash,
        role: 'etudiant',
        statut: 'actif',
        numeroEtudiant: 'ETU12345',
        filiere: 'Informatique',
        niveauEtude: 'Licence 2',
        maxEmprunts: 5,
      },
      {
        nom: 'Pierre',
        prenom: 'Dupont',
        email: 'fournisseur@example.com',
        motDePasse: passwordHash,
        role: 'supplier',
        statut: 'actif',
        nomEntreprise: 'Books Distribution SARL',
        siret: '12345678900010',
        adresseEntreprise: '12 Rue de la Bibliothèque, Paris',
        contactPrincipal: 'Pierre Dupont',
      },
    ];

    const categories = [
      {
        nom: 'Informatique',
        description: 'Ouvrages sur les technologies, le code et les systèmes d\'information.',
        codeClassification: 'INF-001',
      },
      {
        nom: 'Littérature',
        description: 'Romans, poésie et essais littéraires.',
        codeClassification: 'LIT-002',
      },
    ];

    const createdUsers = await User.insertMany(users);
    const createdCategories = await Categorie.insertMany(categories);

    const livres = [
      {
        titre: 'Introduction à Node.js',
        auteur: 'Nadia Benali',
        isbn: 9782100123456,
        statutLivre: 'disponible',
        anneePublication: new Date('2021-05-10'),
        editeur: 'OpenSource Press',
        langue: 'Français',
        description: 'Guide pratique pour débuter avec Node.js et développer des API.',
        image: '/uploads/1755547251851-image.jpg',
      },
      {
        titre: 'Les mystères de Paris',
        auteur: 'Eugène Sue',
        isbn: 9782234567890,
        statutLivre: 'disponible',
        anneePublication: new Date('1843-01-01'),
        editeur: 'Classiques Français',
        langue: 'Français',
        description: 'Roman historique et feuilleton de l\'époque romantique.',
        image: '/uploads/1755547259946-image.jpg',
      },
    ];

    const createdLivres = await Livre.insertMany(livres);

    const exemplaires = [
      {
        IdExemplaire: 'EX-001',
        etat: 'Neuf',
        disponible: true,
        livreId: createdLivres[0]._id,
        dateAcquisition: new Date('2024-01-15'),
      },
      {
        IdExemplaire: 'EX-002',
        etat: 'Bon',
        disponible: true,
        livreId: createdLivres[1]._id,
        dateAcquisition: new Date('2024-02-20'),
      },
    ];

    const createdExemplaires = await Exemplaire.insertMany(exemplaires);

    console.log('Données insérées avec succès :');
    console.log(`- Utilisateurs : ${createdUsers.length}`);
    console.log(`- Catégories : ${createdCategories.length}`);
    console.log(`- Livres : ${createdLivres.length}`);
    console.log(`- Exemplaires : ${createdExemplaires.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding :', error);
    process.exit(1);
  }
};

seed();
