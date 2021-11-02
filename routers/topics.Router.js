const topicsRouter = require("express").Router();

const { getTopcis, getSlugs } = require("../controllers/topics.controller");

// GET - api/topics - Get All Topics
topicsRouter.get("/", getTopcis);
// GET - api/slugs = Get All Slugs
topicsRouter.get("/slugs", getSlugs);

module.exports = topicsRouter;
