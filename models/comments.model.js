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
