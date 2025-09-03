const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod; // will hold the in-memory MongoDB server instance

// Start an in-memory MongoDB server and connect Mongoose to it
async function connectMemoryDB() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  // Connect to the in-memory DB using a clean test database name
  await mongoose.connect(uri, {
    dbName: "testdb",
  });
}

// Clear all data from all collections (useful between tests)
async function clearDatabase() {
  const { collections } = mongoose.connection;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany();
  }
}

// Disconnect Mongoose and stop the in-memory MongoDB server
async function closeDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongod) {
    await mongod.stop();
  }
}

// Insert some sample charging station documents into the DB
async function seedChargingStations() {
  // Import the model so it uses the same active mongoose connection
  const ChargingStation = require("../models/ChargingStation");

  // Example stations for tests
  const docs = [
    {
      name: "Test Station A",
      location: { lat: -37.81, lng: 144.96 },
      connectors: ["Type2"],
      available: true,
    },
    {
      name: "Test Station B",
      location: { lat: -37.82, lng: 144.97 },
      connectors: ["CCS"],
      available: false,
    },
  ];

  // Insert into DB and return the created docs (with _id)
  const created = await ChargingStation.insertMany(docs);
  return created;
}

// Export all helper functions for use in tests
module.exports = {
  connectMemoryDB,
  clearDatabase,
  closeDatabase,
  seedChargingStations,
};
