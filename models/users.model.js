const db = require("../db/connection");

exports.fetchUsers = async () => {
  try {
    const { rows } = await db.query("SELECT username FROM users");
    if (!rows.length)
      return Promise.reject({ status: 404, message: "No Users Found" });
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.fetchUser = async (username) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    if (!rows.length)
      return Promise.reject({ status: 404, message: "User Not Found" });
    return rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
