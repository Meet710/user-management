
const mongoose = require('mongoose');

/**
 * @class DatabaseConfig
 * @description Handles the configuration and connection to a MongoDB database using Mongoose.
 * @param {string} DB_URI - MongoDB connection string.
 * @method connectDB - Asynchronously connects to the MongoDB database and logs the result.
 */

class DatabaseConfig {
  constructor(DB_URI) {
    this.databaseURI = DB_URI;
  }

  async connectDB() {
    try {
      const connection = await mongoose.connect(this.databaseURI);
      if (connection) {
        console.log('Successfully connected to the database');
      }
    } catch (error) {
      console.log('Error connecting to database', error);
      process.exit(1);
    }
  }
}

module.exports = DatabaseConfig;
