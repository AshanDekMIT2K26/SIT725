// Import assertion library (Chai) and HTTP plugin (chai-http)
const chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = chai;

// Ensure chai-http works in both CommonJS and ESM environments
if (typeof chaiHttp !== "function") {
  const maybe = require("chai-http");
  chaiHttp = maybe.default || maybe;
}
chai.use(chaiHttp);

// Import test DB helpers (memory server setup + seed data)
const {
  connectMemoryDB,
  clearDatabase,
  closeDatabase,
  seedChargingStations,
} = require("./db.helper");

// Import the real Express app (no .listen())
const app = require("../app");

let seeded;   // Holds seeded station documents
let firstId;  // Convenience variable for testing GET /:id

// Main test suite
describe("Charging Stations API (DB-backed with mongodb-memory-server)", function () {
  this.timeout(20000); // Allow enough time for Mongo memory server startup

  // Before all tests: connect to in-memory DB and insert sample stations
  before(async function () {
    await connectMemoryDB();
    seeded = await seedChargingStations();
    firstId = String(seeded[0]._id); // store one seeded ID as string
  });

  // After all tests: clean and stop DB
  after(async function () {
    await clearDatabase();
    await closeDatabase();
  });

  // Health check route should return ok:true
  it("GET /health returns ok:true (smoke)", async function () {
    const res = await chai.request(app).get("/health");
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ ok: true });
  });

  // GET all charging stations should return an array with data
  it("GET /api/charging-stations returns an array of stations", async function () {
    const res = await chai.request(app).get("/api/charging-stations");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").with.length.greaterThan(0);

    // Check that the first item has at least a name
    const item = res.body[0];
    expect(item).to.have.property("name");
  });

  // GET one charging station by ID should return an object
  it("GET /api/charging-stations/:id returns a station", async function () {
    const res = await chai.request(app).get(`/api/charging-stations/${firstId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id");
    expect(String(res.body._id)).to.equal(firstId);
  });

  // POST with valid body should create a new station
  it("POST /api/charging-stations creates a new station (valid body)", async function () {
    const payload = {
      name: "Created Via Test",
      location: { lat: -37.8136, lng: 144.9631 },
      connectors: ["Type2"],
      available: true,
    };
    const res = await chai.request(app).post("/api/charging-stations").send(payload);
    expect([200, 201]).to.include(res.status);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("name", payload.name);
    // Check that the response has an _id or id
    expect(res.body).to.satisfy((o) => o._id || o.id);
  });

  // POST with invalid body should return a client error
  it("POST /api/charging-stations returns 400/422 for invalid body", async function () {
    const bad = { name: "", connectors: "Type2" };
    const res = await chai.request(app).post("/api/charging-stations").send(bad);
    expect([400, 422]).to.include(res.status);
  });
});
