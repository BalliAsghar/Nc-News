const apiRouter = require("express").Router();
const topicsRouter = require("./topics.Router");
const articlesRouter = require("./articles.Router");
const commentsRouter = require("./comments.router");

apiRouter.get("/", (req, res) => res.send("This Api Endpoint"));

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
