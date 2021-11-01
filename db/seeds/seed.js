const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  try {
    const dropDB = await db.query("DROP TABLE IF EXISTS comments;");
    const dropReviews = await db.query("DROP TABLE IF EXISTS reviews;");
    const dropUsers = await db.query("DROP TABLE IF EXISTS users;");
    const dropCategories = await db.query("DROP TABLE IF EXISTS categories;");
    await Promise.all([dropDB, dropReviews, dropUsers, dropCategories]);
    console.log("Tables Removed");

    const userTable = await db.query(`CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(25) NOT NULL,
      name VARCHAR NOT NULL,
      avatar_url VARCHAR DEFAULT 'default_avatar_url'
      );`);

    const topicsTable = await db.query(`CREATE TABLE topics (
      topic_id SERIAL PRIMARY KEY,
      slug VARCHAR(20) NOT NULL,
      description TEXT NOT NULL
      );`);

    const articlesTable = await db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        topic INT REFERENCES topics(topic_id) NOT NULL,
        body TEXT NOT NULL,
        author_id INT REFERENCES users(user_id) NOT NULL,
        created_at DATE NOT NULL,
        votes INT DEFAULT 0
      );`);

    const commentsTable = await db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      body VARCHAR NOT NULL,
      votes INT DEFAULT 0, 
      author_id INT REFERENCES users(user_id) NOT NULL,
      article_id INT REFERENCES articles(article_id) NOT NULL,
      created_at DATE NOT NULL
    );`);

    await Promise.all([userTable, topicsTable, articlesTable, commentsTable]);
    console.log("Tables Created");

    // Insert Data
    const usersQuery = format(
      `INSERT INTO users (username, avatar_url, name)
      VALUES 
      %L
      RETURNING *;`,
      userData.map((user) => [user.username, user.avatar_url, user.name])
    );
    const insertUsers = await db.query(usersQuery);

    const topicQuery = format(
      `
    INSERT INTO topics (slug, description) 
    VALUES 
    %L
    RETURNING *;`,
      topicData.map((topic) => [topic.slug, topic.description])
    );

    const insertTopics = await db.query(topicQuery);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
