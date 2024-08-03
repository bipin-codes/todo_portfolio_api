const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`MongoDB Connecting to : ${process.env.MONGODB_URI}`);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB!');

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Trying to reconnect...');
      setTimeout(connectDB, 5000);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
