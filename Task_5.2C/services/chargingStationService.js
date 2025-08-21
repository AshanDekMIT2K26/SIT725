const ChargingStation = require('../models/ChargingStation');

// Get all charging stations
const getAllStations = async () => {
  try {
    return await ChargingStation.find({});
  } catch (error) {
    throw new Error('Error fetching stations from DB: ' + error.message);
  }
};

// Get station by ID
const getStationById = async (id) => {
  try {
    return await ChargingStation.findOne({ id: id });
  } catch (error) {
    throw new Error('Error fetching station by ID: ' + error.message);
  }
};


module.exports = {
  getAllStations,
  getStationById,
};