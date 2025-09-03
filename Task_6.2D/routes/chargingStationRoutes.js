const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/chargingStationController");

// GET /api/charging-stations
router.get("/", ctrl.getAllStations);

// GET /api/charging-stations/:id
router.get("/:id", ctrl.getStationById);

// POST /api/charging-stations
router.post("/", ctrl.createStation);

module.exports = router;
