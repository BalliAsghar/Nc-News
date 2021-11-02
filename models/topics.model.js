const db = require("../db/connection");

exports.fetchTopics = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM topics;");
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.fetchSlugs = async () => {
  try {
    const { rows } = await db.query("SELECT slug FROM topics;");
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
