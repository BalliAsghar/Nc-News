const db = require("../db/connection");
const { fetchSlugs } = require("./topics.model");

exports.fetchAllArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {};

exports.fetchArticleById = async (id) => {
  try {
    const { rows } = await db.query(
      `SELECT 
      articles.*, COUNT(comments.comment_id)::int AS comment_count
    FROM articles
    JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [id]
    );
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "No Article Found" });
    }
    return rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.updateVoteArticleById = async (id, vote) => {
  try {
    if (vote !== undefined) {
      const { rows } = await db.query(
        "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;",
        [id, vote]
      );
      if (rows.length < 1) {
        return Promise.reject({ status: 404, message: "No Article Found" });
      }
      return rows[0];
    }
    return Promise.reject({
      status: 400,
      message: "No vote property provided",
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
