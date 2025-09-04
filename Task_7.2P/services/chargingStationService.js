const mongoose = require("mongoose");
const ChargingStation = require("../models/ChargingStation");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getAllStations() {
  try {
    // Return plain objects for faster tests/serialisation
    return await ChargingStation.find({}).lean();
  } catch (err) {
    throw new Error(`Error fetching stations from DB: ${err.message}`);
  }
}

async function getStationById(id) {
  try {
    if (!isValidObjectId(id)) return null;
    const doc = await ChargingStation.findById(id).lean();
    return doc || null;
  } catch (err) {
    throw new Error(`Error fetching station by ID: ${err.message}`);
  }
}

async function addStation(payload) {
  // minimal validation to satisfy tests
  if (
    !payload ||
    typeof payload.name !== "string" ||
    !payload.name.trim() ||
    !payload.location ||
    typeof payload.location.lat !== "number" ||
    typeof payload.location.lng !== "number" ||
    !Array.isArray(payload.connectors)
  ) {
    const e = new Error("Invalid input");
    e.status = 400;
    throw e;
  }

  try {
    const created = await ChargingStation.create(payload);
    // Return plain object
    return created.toObject();
  } catch (err) {
    // map validation error to 400
    const e = new Error(`Error creating station: ${err.message}`);
    e.status = 400;
    throw e;
  }
}

module.exports = {
  getAllStations,
  getStationById,
  addStation,
};
