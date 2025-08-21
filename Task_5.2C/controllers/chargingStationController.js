const chargingStationService = require('../services/chargingStationService');

// Get all stations
const getAllStations = async (req, res) => {
  try {
    const stations = await chargingStationService.getAllStations();
    res.json({ statusCode: 200, data: stations, message: 'Stations fetched successfully' });
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
};

// Get station by ID
const getStationById = async (req, res) => {
  try {
    const station = await chargingStationService.getStationById(req.params.id);
    if (!station) {
      return res.status(404).json({ statusCode: 404, message: 'Station not found' });
    }
    res.json({ statusCode: 200, data: station, message: 'Station fetched successfully' });
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
};


module.exports = {
  getAllStations,
  getStationById,
};