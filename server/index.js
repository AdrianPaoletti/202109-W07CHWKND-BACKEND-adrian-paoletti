const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const debug = require("debug")("socialMedia:server");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const socialNetworkRoutes = require("./routes/socialNetworkRoutes");
const { notFoundErrorHandler, generalErrorHandler } = require("./middlewares/error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Escuchando en el puerto ${port}`));
      resolve(server)
    });

    server.on("error", () => {
      debug(chalk.red("Ha habido un error al iniciar el servidor."));
      reject();
    });
  });



app.use("/users", userRoutes);
app.use("/socialNetwork", socialNetworkRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { app, initializeServer };