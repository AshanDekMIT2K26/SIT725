const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

/* --------------------- Middleware --------------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* --------------------- Serve static files (frontend) --------------------- */
const PUBLIC_DIR = path.join(__dirname, "public");
app.use(express.static(PUBLIC_DIR));

// Default route -> index.html
app.get("/", (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

/* --------------------- Health check --------------------- */
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

/* --------------------- API Routes --------------------- */
try {
  const chargingStationRoutes = require("./routes/chargingStationRoutes");
  app.use("/api/charging-stations", chargingStationRoutes);
} catch (err) {
  console.warn("[warn] Could not load chargingStationRoutes:", err.message);
}

/* --------------------- 404 handler --------------------- */
app.use((req, res, _next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Not Found", path: req.path });
  }
  return res.status(404).send("Not Found");
});

/* --------------------- Error handler --------------------- */
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[error]", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

/* --------------------- Export app --------------------- */
module.exports = app;
