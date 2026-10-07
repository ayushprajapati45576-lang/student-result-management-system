const mongoose = require("mongoose");
require("dotenv").config();

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (mongoose.connection.readyState === 0) {
    connectionPromise = undefined;
  }

  if (!process.env.LIVE_URL) {
    throw new Error("LIVE_URL environment variable is required");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.LIVE_URL).catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  return connectionPromise;
};

module.exports = connectDB;