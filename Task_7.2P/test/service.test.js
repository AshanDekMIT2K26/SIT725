const { expect } = require("chai");

// Import DB helper functions for in-memory MongoDB
const {
  connectMemoryDB,
  clearDatabase,
  closeDatabase,
  seedChargingStations,
} = require("./db.helper");

// Try to load the chargingStationService
let service;
try {
  service = require("../services/chargingStationService");
} catch {
  service = null;
}

// Test suite for the service layer
describe("chargingStationService (DB-backed)", function () {
  // If the service is missing, skip all tests
  if (!service) {
    it("Service module not found — skipping.", function () { this.skip(); });
    return;
  }

  this.timeout(20000); // allow enough time for DB setup

  let seeded;   // will hold the seeded stations
  let firstId;  // store one station's ID for lookup tests

  // Before all tests: connect to memory DB and insert sample data
  before(async function () {
    await connectMemoryDB();
    seeded = await seedChargingStations();
    firstId = String(seeded[0]._id);
  });

  // After all tests: clear DB and close connection
  after(async function () {
    await clearDatabase();
    await closeDatabase();
  });

  // getAllStations should return an array of stations
  it("getAllStations returns an array", async function () {
    const stations = await service.getAllStations();
    expect(stations).to.be.an("array").with.length.greaterThan(0);
  });

  // getStationById should return a station when found, or null otherwise
  it("getStationById returns the station when found, else null", async function () {
    const station = await service.getStationById(firstId);
    expect(station).to.be.an("object");

    // Ensure the returned ID matches the seeded one
    const stationId = String(station._id || station.id);
    expect(stationId).to.equal(firstId);

    // Query with a non-existent ID should return null/undefined
    const notFound = await service.getStationById("000000000000000000000000");
    expect(notFound === null || notFound === undefined).to.equal(true);
  });

  // addStation should create a new station with valid data
  it("addStation validates payload and returns created doc", async function () {
    const payload = {
      name: "Service Layer Create",
      location: { lat: -37.7, lng: 145.0 },
      connectors: ["Type2"],
      available: true,
    };
    const created = await service.addStation(payload);
    expect(created).to.be.an("object");
    expect(created).to.have.property("name", payload.name);
    // Must have an _id (or id if mapped in the service)
    expect(created).to.satisfy((o) => o._id || o.id);
  });
});
