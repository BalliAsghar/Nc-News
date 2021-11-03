const usersRouter = require("express").Router();
const { getUsers } = require("../controllers/users.controller");

// GET - /api/users - Get All Users
usersRouter.get("/", getUsers);

module.exports = usersRouter;
