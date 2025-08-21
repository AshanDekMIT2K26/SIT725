const express = require('express');
const app = express();
const port = process.env.port || 3000;

// Database connection
const connectDB = require('./config/database');
connectDB();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/api/stations', require('./routes/chargingStationRoutes'));

// Start the Express server
app.listen(port, () => {
  console.log("App listening to: " + port);
});