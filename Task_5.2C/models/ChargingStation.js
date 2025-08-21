const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lat: Number,
  lng: Number,
  availability: String,
  connector: String,
  price: String,
  rating: String,
  image: String,
});

module.exports = mongoose.model('ChargingStation', chargingStationSchema);