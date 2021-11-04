const commentsRouter = require("express").Router();
const {
  deleteComment,
  updateVoteCount,
  getCommentById,
} = require("../controllers/comments.controller");

// GET - /api/comments/:comment_id - returns a single comment
commentsRouter.get("/:comment_id", getCommentById);

// DELETE - /api/comments/:comment_id - Delete a comment by comment_id
commentsRouter.delete("/:comment_id", deleteComment);

// PATCH - /api/comments/:comment_id - Update Vote Count of a comment by comment_id
commentsRouter.patch("/:comment_id", updateVoteCount);

module.exports = commentsRouter;
