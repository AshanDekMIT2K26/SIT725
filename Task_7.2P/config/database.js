const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = 'mongodb://localhost:27017/locateasocketDB';
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;