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
  res.status(404).send(`<div><img alt="404" 
  src="https://illustatus.herokuapp.com/?title=Oops,%20Page%20not%20found&fill=%234f86ed"/>
</div`)
);

// Error Handler
app.use(errorHandler);

// Get Port
const { PORT = 9090 } = process.env;

// listen Server
app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));

module.exports = app;
