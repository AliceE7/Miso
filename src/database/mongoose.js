const mongoose = require("mongoose");

module.exports = {
  async initializeMongoose() {
    console.info(`Connecting to MongoDb...`);

    try {
      mongoose.set('strictQuery', true)
      mongoose.connect(process.env.mongo, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        connectTimeoutMS: 90000,
        keepAlive: false,
      });
      
      console.info("Mongoose: Database connection established");

      return mongoose.connection;
    } catch (err) {
      console.error("Mongoose: Failed to connect to database", err);
      process.exit(1);
    }
  },

  schemas: {
    prefix: require('./schemas/prefix.js'),
  },
};