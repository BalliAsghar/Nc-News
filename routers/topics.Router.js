const topicsRouter = require("express").Router();

const { getTopcis } = require("../controllers/topics.controller");

// GET - api/topics
topicsRouter.get("/", getTopcis);

module.exports = topicsRouter;
