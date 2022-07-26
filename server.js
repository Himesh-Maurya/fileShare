const path = require("path");
const schedule = require('node-schedule');
const cors = require("cors");
const fetchData = require('./script');
const express = require("express");
const app = express();

require("dotenv").config();

const PORT = (process.env.PORT) || 3000;

app.use(express.static("public"));
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

// Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
//   ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
};

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/home"));
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

const job = schedule.scheduleJob('* * * * *', function(){
    fetchData().then(console.log("hi"));
    console.log('The answer to life, the universe, and everything!');
  });

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
