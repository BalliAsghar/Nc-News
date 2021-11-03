const { deleteCommentByID } = require("../models/comments.model.js");

exports.deleteComment = (req, res, next) => {
  const { comment_id: id } = req.params;
  deleteCommentByID(id)
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => next(err));
};
