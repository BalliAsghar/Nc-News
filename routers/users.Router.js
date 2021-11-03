const usersRouter = require("express").Router();
const { getUsers, getUser } = require("../controllers/users.controller");

// GET - /api/users - Get All Users
usersRouter.get("/", getUsers);
// GET - /api/users/:username - Get User Profile
usersRouter.get("/:username", getUser);

module.exports = usersRouter;
