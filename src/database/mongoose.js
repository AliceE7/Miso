const mongoose = require("mongoose");
const chalk = require('chalk');
module.exports = {
  async initializeMongoose() {
    console.log(
      chalk.red("[ "), chalk.italic(chalk.green("MOMGO")), chalk.red(" ]"),
      chalk.blue(`Connecting to MongoDb`)
    )

    try {
      mongoose.set('strictQuery', true)
      mongoose.connect(process.env.mongo, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        connectTimeoutMS: 90000,
        keepAlive: false,
      });

      console.log(
        chalk.red("[ "), chalk.italic(chalk.green("MONGO")), chalk.red(" ]"),
        chalk.blue(`MongoDB Connected!`)
      )


      return mongoose.connection;
    } catch (err) {
      console.error("Mongoose: Failed to connect to database", err);
      process.exit(1);
    }
  },

  schemas: {
  },
};