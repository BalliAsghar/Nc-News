const express = require("express");

//  load environment variables
require("dotenv").config();

// App initialization
const app = express();

// Index Route
app.get("/", (req, res) => res.send({ message: "Hello" }));

// Get Port
const PORT = process.env.PORT || 3000;

// listen Server
app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));

module.exports = app;
