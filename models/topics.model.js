const db = require("../db/connection");

exports.fetchTopics = async () => {
  try {
    const topics = await db.query("SELECT * FROM topics;");
    return topics["rows"];
  } catch (error) {
    return error;
  }
};
