const apiRouter = require("express").Router();
const topicsRouter = require("./topics.Router");
const articlesRouter = require("./articles.Router");

apiRouter.get("/", (req, res) => res.send("This Api Endpoint"));

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
