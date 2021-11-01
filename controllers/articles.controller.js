const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles.model");

exports.getAllArticles = async (req, res, next) => {
  fetchAllArticles()
    .then((Articles) => {
      res.status(200).send({ Articles });
    })
    .catch((err) => next(err));
};

exports.getArticleById = async (req, res, next) => {
  const { article_id: id } = req.params;

  fetchArticleById(id)
    .then((Article) => {
      res.status(200).send({ Article });
    })
    .catch((err) => next(err));
};
