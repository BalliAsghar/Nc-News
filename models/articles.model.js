const db = require("../db/connection");

exports.fetchAllArticles = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM articles;");
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "No Articles Found" });
    }
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.fetchArticleById = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [id]
    );
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "No Article Found" });
    }
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
