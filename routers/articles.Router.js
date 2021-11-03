const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  getArticleComments,
  postComment,
} = require("../controllers/articles.controller.js");

// GET - api/articles -  Get All Articles
articlesRouter.get("/", getAllArticles);

// GET  - api/articles/:article_id -  Get Article by ID
articlesRouter.get("/:article_id", getArticleById);

// PATCH - api/articles/:article_id -  Update Article by ID
articlesRouter.patch("/:article_id", patchArticleById);

// GET - api/articles/:article_id/comments - Get Article Comments
articlesRouter.get("/:article_id/comments", getArticleComments);

// POST - api/articles/:article_id/comments  - Post a Comment on a Aricle
articlesRouter.post("/:article_id/comments", postComment);

module.exports = articlesRouter;
