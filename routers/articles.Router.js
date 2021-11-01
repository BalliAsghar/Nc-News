const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
} = require("../controllers/articles.controller.js");

// GET  - api/articles -  Get All Articles
articlesRouter.get("/", getAllArticles);

// GET  - api/articles/:article_id -  Get Article by ID
articlesRouter.get("/:article_id", getArticleById);

module.exports = articlesRouter;
