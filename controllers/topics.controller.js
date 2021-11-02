const { fetchTopics, fetchSlugs } = require("../models/topics.model");

exports.getTopcis = async (req, res, next) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics });
  } catch (error) {
    res.send(500).send(error);
  }
};
exports.getSlugs = async (req, res, next) => {
  try {
    const slugs = await fetchSlugs();
    res.status(200).send({ slugs });
  } catch (error) {
    res.send(500).send(error);
  }
};
