const {
  deleteCommentByID,
  updateVote,
  fetchCommentById,
} = require("../models/comments.model.js");

exports.deleteComment = (req, res, next) => {
  const { comment_id: id } = req.params;
  deleteCommentByID(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => next(err));
};

exports.updateVoteCount = (req, res, next) => {
  const { comment_id: id } = req.params;
  const { inc_votes: incVotes } = req.body;
  updateVote(id, incVotes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => next(err));
};

exports.getCommentById = (req, res, next) => {
  const { comment_id: id } = req.params;
  fetchCommentById(id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => next(err));
};
