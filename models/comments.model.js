const db = require("../db/connection");

exports.deleteCommentByID = async (id) => {
  try {
    const { rows } = await db.query(
      `DELETE FROM "comments" WHERE "comment_id" = $1 RETURNING *;;`,
      [id]
    );
    if (!rows.length)
      return Promise.reject({ status: 404, message: "Comment Not Found" });
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.updateVote = async (id, vote) => {
  try {
    if (vote !== undefined) {
      const { rows } = await db.query(
        'UPDATE "comments" SET votes = votes + $1 WHERE "comment_id" = $2 RETURNING *;',
        [vote, id]
      );
      if (!rows.length)
        return Promise.reject({ status: 404, message: "Comment Not Found" });
      return rows[0];
    }
    return Promise.reject({ status: 400, message: "No Vote count provided" });
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.fetchCommentById = async (id) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM "comments" WHERE "comment_id" = $1;',
      [id]
    );
    if (!rows.length)
      return Promise.reject({ status: 404, message: "Comment Not Found" });
    return rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
