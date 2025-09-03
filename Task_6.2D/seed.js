const mongoose = require('mongoose');
const ChargingStation = require('./models/ChargingStation');

// MongoDB Connection String
const dbURI = 'mongodb://localhost:27017/locateasocketDB';

// Data to be inserted
const initialStations = [
  { id: 1, name: "Melbourne CBD Station", lat: -37.8136, lng: 144.9631, availability: "3/5 slots free", connector: "Type 2, CCS", price: "$0.30/kWh", rating: "4.5/5", image: "images/carlton-gardens.jpg" },
  { id: 2, name: "Southbank Chargers", lat: -37.8248, lng: 144.9691, availability: "1/2 slots free", connector: "CCS, CHAdeMO", price: "$0.35/kWh", rating: "3.9/5", image: "images/southbank.jpg" },
  { id: 3, name: "Carlton Gardens Station", lat: -37.8055, lng: 144.9698, availability: "4/4 slots free", connector: "Type 2", price: "$0.25/kWh", rating: "4.8/5", image: "images/Fitzory.jpg" },
  { id: 4, name: "St Kilda Beach Charging", lat: -37.8679, lng: 144.9764, availability: "2/3 slots free", connector: "Type 2, CHAdeMO", price: "$0.28/kWh", rating: "4.2/5", image: "images/Richmond.jpg" },
  { id: 5, name: "Fitzroy North ChargePoint", lat: -37.7877, lng: 144.9792, availability: "5/5 slots free", connector: "Type 2", price: "$0.20/kWh", rating: "4.0/5", image: "images/southern-cross-station.jpg" },
  { id: 6, name: "Richmond Fast Charge", lat: -37.8200, lng: 145.0000, availability: "0/3 slots free", connector: "CCS", price: "$0.40/kWh", rating: "4.7/5", image: "images/St-klida.jpg" },
];

async function seedDatabase() {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding!');

    // Clear existing data
    await ChargingStation.deleteMany({});
    console.log('Existing charging station data cleared.');

    // Insert new data
    await ChargingStation.insertMany(initialStations);
    console.log('Initial charging station data seeded successfully!');

  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    // Disconnect from the database
    mongoose.connection.close();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase();