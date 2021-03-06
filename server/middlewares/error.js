const debug = require("debug")("socialMedia:error");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Not Endpoint found" });
}

const generalErrorHandler = (error, req, res, next) => {
  debug(`Some error happens: ${error.message}`);
  const message = error.code ? error.message : "General pete";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
}