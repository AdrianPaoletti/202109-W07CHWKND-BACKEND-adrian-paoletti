const debug = require('debug')('socialMedia:database');
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret._v;
      },
    })
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("No se ha podido iniciar la DB"));
        debug(error.message);
        reject();
        return;
      }
      debug(chalk.green("DB conected"));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug("Desconectado de la base de datos");
    })
  })

module.exports = connectDB;