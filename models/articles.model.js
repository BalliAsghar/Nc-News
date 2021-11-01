const db = require("../db/connection");

exports.fetchAllArticles = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM articles;");
    return rows;
  } catch (error) {
    return rows;
  }
};
