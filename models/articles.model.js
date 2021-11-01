const db = require("../db/connection");

exports.fetchAllArticles = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM articles;");
    return rows;
  } catch (error) {
    return rows;
  }
};

exports.fetchArticleById = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [id]
    );
    return rows;
  } catch (error) {
    return error;
  }
};
