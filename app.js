const express = require("express");
const apiRouter = require("./routers");
const errorHandler = require("./utils/errorHandler");
// App initialization
const app = express();

// JSON Parser
app.use(express.json());

// Index Route
app.get("/", (req, res) => res.send({ message: "Hello" }));

// Api Routes
app.use("/api", apiRouter);

// Invalid Endpoint
app.all("/*", (req, res) =>
  res.status(404).send({ message: "Invalid EndPoint" })
);

// Error Handler
app.use(errorHandler);

// Get Port
const PORT = 9090;

// listen Server
app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));

module.exports = app;
