const Categorie = require('../models/Categorie');

async function createCategorie(req, res) {
  try {
    const { nom, description, codeClassification } = req.body;

    const categorie = new Categorie({
      nom,
      description,
      codeClassification
    });

    await categorie.save();
    res.status(201).json({ message: 'Catégorie créée.', categorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCategorieById(req, res) {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCategorie(req, res) {
  try {
    const updates = req.body;
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée.' });

    res.json({ message: 'Catégorie mise à jour.', categorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCategorie(req, res) {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json({ message: 'Catégorie supprimée.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  deleteCategorie
};
