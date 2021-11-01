const { fetchTopics } = require("../models/topics.model");

exports.getTopcis = async (req, res, next) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics });
  } catch (error) {
    res.send(500).send(error);
  }
};
