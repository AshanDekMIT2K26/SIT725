const mongoose = require("mongoose");
const ChargingStationSchema = new mongoose.Schema({
  name: String,
  location: { lat: Number, lng: Number },
  connectors: [String],
  available: Boolean
}, { timestamps: true });
module.exports = mongoose.model("ChargingStation", ChargingStationSchema);