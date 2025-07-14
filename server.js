const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const amendeRoutes = require('./src/routes/amendeRoutes');
const categorieRoutes = require('./src/routes/categorieRoutes');
const commandeRoutes = require('./src/routes/CommandeFournisseurRoutes');

dotenv.config();

connectDB(); // Connexion à la base de données

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Backend opérationnel'));
app.use('/api/users', userRoutes);
app.use('/api/amendes', amendeRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/commandes', commandeRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});

