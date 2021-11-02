const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require("../controllers/articles.controller.js");

// GET  - api/articles -  Get All Articles
articlesRouter.get("/", getAllArticles);

// GET  - api/articles/:article_id -  Get Article by ID
articlesRouter.get("/:article_id", getArticleById);

// Patch - api/articles/:article_id -  Update Article by ID
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
