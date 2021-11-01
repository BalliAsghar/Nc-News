const db = require("../db/connection");

exports.fetchTopics = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM topics;");
    return rows;
  } catch (error) {
    return error;
  }
};
