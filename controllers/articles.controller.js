const {
  fetchAllArticles,
  fetchArticleById,
  updateVoteArticleById,
  fetchArticleComments,
} = require("../models/articles.model");

exports.getAllArticles = async (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  fetchAllArticles(sort_by, order, topic)
    .then((Articles) => {
      res.status(200).send({ Articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = async (req, res, next) => {
  const { article_id: id } = req.params;

  fetchArticleById(id)
    .then((Article) => {
      res.status(200).send({ Article });
    })
    .catch((err) => next(err));
};

exports.patchArticleById = async (req, res, next) => {
  const { article_id: id } = req.params;
  const { inc_votes: vote } = req.body;
  updateVoteArticleById(id, vote)
    .then((Article) => {
      res.status(200).send({ Article });
    })
    .catch((err) => next(err));
};

exports.getArticleComments = (req, res, next) => {
  const { article_id: id } = req.params;
  fetchArticleComments(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => next(err));
};
