const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  getArticleComments,
} = require("../controllers/articles.controller.js");

// GET  - api/articles -  Get All Articles
articlesRouter.get("/", getAllArticles);

// GET  - api/articles/:article_id -  Get Article by ID
articlesRouter.get("/:article_id", getArticleById);

// Patch - api/articles/:article_id -  Update Article by ID
articlesRouter.patch("/:article_id", patchArticleById);

// Get - api/articles/:article_id/comments - Get Article Comments
articlesRouter.get("/:article_id/comments", getArticleComments);

module.exports = articlesRouter;
