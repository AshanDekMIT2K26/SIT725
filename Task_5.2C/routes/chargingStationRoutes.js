const express = require('express');
const router = express.Router();
const chargingStationController = require('../controllers/chargingStationController');

// GET /api/stations - Get all stations
router.get('/', chargingStationController.getAllStations);

// GET /api/stations/:id - Get station by ID
router.get('/:id', chargingStationController.getStationById);

module.exports = router;