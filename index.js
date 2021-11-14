require('dotenv').config();
const connectDB = require("./database/index");
const { initializeServer } = require("./server/index");

const port = process.env.SERVER_PORT ?? 3000;

(async () => {
  try {
    await connectDB("mongodb+srv://toto:saavedra@cluster0.jbqgc.mongodb.net/Social_network");
    console.log(port);
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
