const { fetchAllArticles } = require("../models/articles.model");

exports.getAllArticles = async (req, res, next) => {
  try {
    const Articles = await fetchAllArticles();
    res.status(200).send({ Articles });
  } catch (error) {
    res.status(500).send({ error });
  }
};
