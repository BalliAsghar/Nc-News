const apiRouter = require("express").Router();
const topicsRouter = require("./topics.Router");
const articlesRouter = require("./articles.Router");
const commentsRouter = require("./comments.router");
const usersRouter = require("./users.Router");
const endpoints = require("../endpoints.json");

apiRouter.get("/", (req, res) => res.send(endpoints));

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
