require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {

  mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Database connected 🥳🥳🥳🥳");
  });

  connection.on("error", console.error.bind(console, "error connecting to db"));
}

module.exports = connectDB;
