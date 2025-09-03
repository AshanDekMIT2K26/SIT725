const service = require("../services/chargingStationService");

async function getAllStations(req, res, next) {
  try {
    const stations = await service.getAllStations();
    return res.status(200).json(stations); // tests expect an array
  } catch (err) {
    console.error("Error in controller:", err);
    return next(err);
  }
}

async function getStationById(req, res, next) {
  try {
    const { id } = req.params;
    const station = await service.getStationById(id);
    if (!station) return res.status(404).json({ error: "Not Found" });
    return res.status(200).json(station); // tests expect 200 + object when found
  } catch (err) {
    console.error("Error in controller:", err);
    return next(err);
  }
}

async function createStation(req, res, next) {
  try {
    const created = await service.addStation(req.body);
    // tests accept 200 or 201
    return res.status(201).json(created);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error in controller:", err);
    return next(err);
  }
}

module.exports = {
  getAllStations,
  getStationById,
  createStation,
};
