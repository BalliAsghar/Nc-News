const express = require("express");
const morgan = require("morgan");
const apiRouter = require("./routers");
const errorHandler = require("./utils/errorHandler");
// App initialization
const app = express();

// JSON Parser
app.use(express.json());

// Logger
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

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
const { PORT = 9090 } = process.env;

// listen Server
app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));

module.exports = app;
