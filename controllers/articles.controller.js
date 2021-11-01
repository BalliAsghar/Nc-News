const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles.model");

exports.getAllArticles = async (req, res, next) => {
  try {
    const Articles = await fetchAllArticles();
    res.status(200).send({ Articles });
  } catch (error) {
    res.status(500).send({ error });
  }
};

exports.getArticleById = async (req, res, next) => {
  const { article_id: id } = req.params;
  try {
    const Article = await fetchArticleById(id);
    res.status(200).send({ Article });
  } catch (error) {
    res.status(500).send({ error });
  }
};
