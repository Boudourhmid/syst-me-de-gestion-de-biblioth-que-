const Reservation = require('../models/Reservation');
const Livre = require("../models/Livre");

// ✅ Ajouter réservation
async function createReservation(req, res) {
  try {
    const { livre } = req.body;

    // Vérifier livre existe
    const livreTrouve = await Livre.findById(livre);
    if (!livreTrouve) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    // Vérifier disponibilité
    if (livreTrouve.statutLivre === "indisponible") {
      return res.status(400).json({ message: "Livre déjà indisponible" });
    }

    // Créer réservation
    const reservation = new Reservation({
      ...req.body,
      utilisateur: req.user.id // important
    });

    await reservation.save();

    // Modifier statut livre
    livreTrouve.statutLivre = "indisponible";
    await livreTrouve.save();

    res.status(201).json(reservation);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// ✅ Étudiant: mes réservations
async function getMyReservations(req, res) {
  try {
    const reservations = await Reservation.find({ utilisateur: req.user.id })
      .populate('livre');

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Employé: toutes les réservations
async function getAllReservations(req, res) {
  try {
    const reservations = await Reservation.find()
      .populate('utilisateur', 'nom prenom')
      .populate('livre');

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Confirmer réservation
async function confirmerReservation(req, res) {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

reservation.statutReservation = "confirmée";    await reservation.save();

    res.json(reservation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Annuler réservation
async function annulerReservation(req, res) {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // (optionnel) remettre livre disponible
    const livre = await Livre.findById(reservation.livre);
    if (livre) {
      livre.statutLivre = "disponible";
      await livre.save();
    }

    res.json({ message: "Réservation annulée" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Export
module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  confirmerReservation,
  annulerReservation
};