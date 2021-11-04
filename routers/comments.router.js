const commentsRouter = require("express").Router();
const {
  deleteComment,
  updateVoteCount,
} = require("../controllers/comments.controller");

// DELETE - /api/comments/:comment_id - Delete a comment by comment_id
commentsRouter.delete("/:comment_id", deleteComment);

// PATCH - /api/comments/:comment_id - Update Vote Count of a comment by comment_id
commentsRouter.patch("/:comment_id", updateVoteCount);

module.exports = commentsRouter;
