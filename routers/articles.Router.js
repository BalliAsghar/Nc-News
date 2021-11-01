const articlesRouter = require("express").Router();
const { getAllArticles } = require("../controllers/articles.controller.js");

// GET  - api/articles -  Get All Articles
articlesRouter.get("/", getAllArticles);

module.exports = articlesRouter;
