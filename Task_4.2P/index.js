var express = require("express");
var app = express();
var port = process.env.port || 3000;

// Import Mongoose
const mongoose = require('mongoose');

// MongoDB Connection String
// MongoDB is running locally on default port 27017
const dbURI = 'mongodb://localhost:27017/locateasocketDB';

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schema and Model for Charging Stations
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

// Create the Mongoose Model
const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema);


// Middleware
// Tells Express to serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));
app.use(express.json()); // For parsing application/json requests
app.use(express.urlencoded({ extended: false }));


// REST API Route to fetch Charging Stations from MongoDB
app.get('/api/stations', async (req, res) => {
    try {
        const stations = await ChargingStation.find({}); // Fetch all documents from the collection
        res.json({ statusCode: 200, data: stations, message: 'Stations fetched successfully' });
    } catch (error) {
        console.error('Error fetching stations from DB:', error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log("App listening to: " + port);
});
