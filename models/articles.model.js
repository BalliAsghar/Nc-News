const db = require("../db/connection");
const { fetchSlugs } = require("./topics.model");

exports.fetchAllArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic,
  limit = 10,
  p = 1
) => {
  const offset = (p - 1) * limit;
  try {
    const getSlugs = await fetchSlugs();
    const topics = getSlugs.map((e) => e.slug);
    if (
      (topic !== undefined) &
      (topics.some((slug) => slug === topic) === false)
    ) {
      return Promise.reject({ status: 404, message: "Topic not Found" });
    }
    let query = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id)::Int AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;
    if (topic === undefined) {
      query += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
    } else {
      query += ` WHERE articles.topic = '${topic}' GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
    }
    query += ` LIMIT $1`;
    query += ` OFFSET $2`;
    const { rows } = await db.query(query, [limit, offset]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

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

exports.fetchArticleComments = async (id, limit = 5, p = 1) => {
  const offset = (p - 1) * limit;
  try {
    const article = await this.fetchArticleById(id);
    if (article.status === 404) return Promise.reject(article);
    const { rows } = await db.query(
      "SELECT * FROM comments Where article_id = $1 LIMIT $2 OFFSET $3",
      [id, limit, offset]
    );
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.insertComment = async (id, username, body) => {
  try {
    const article = await this.fetchArticleById(id);
    if (article.status === 404) return Promise.reject(article);
    const { rows } = await db.query(
      "INSERT INTO comments(article_id ,author, body) VALUES($1,$2,$3)RETURNING *;",
      [id, username, body]
    );
    return rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
