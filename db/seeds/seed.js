const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  try {
    const dropComments = await db.query("DROP TABLE IF EXISTS comments;");
    const dropArticles = await db.query(`DROP TABLE IF EXISTS articles;`);
    const dropUsers = await db.query("DROP TABLE IF EXISTS users;");
    const dropTopics = await db.query(`DROP TABLE IF EXISTS topics;`);
    await Promise.all([dropComments, dropArticles, dropUsers, dropTopics]);

    const topicsTable = await db.query(`CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY,
      description VARCHAR
      );`);

    const userTable = await db.query(`CREATE TABLE users(
      username VARCHAR PRIMARY KEY,
      avatar_url VARCHAR,
      name VARCHAR
      );`);

    const articlesTable = await db.query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR,
      body VARCHAR,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      created_at DATE DEFAULT CURRENT_TIMESTAMP);`);

    const commentsTable = await db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at DATE DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR
    );`);

    await Promise.all([userTable, topicsTable, articlesTable, commentsTable]);

    // Insert Data
    const topicQuery = format(
      `
    INSERT INTO topics (slug, description) 
    VALUES 
    %L
    RETURNING *;`,
      topicData.map((topic) => [topic.slug, topic.description])
    );

    const insertTopics = await db.query(topicQuery);

    const usersQuery = format(
      `INSERT INTO users (username, avatar_url, name)
      VALUES 
      %L
      RETURNING *;`,
      userData.map((user) => [user.username, user.avatar_url, user.name])
    );
    const insertUsers = await db.query(usersQuery);

    const articleQuery = format(
      `INSERT INTO articles
    (title, topic, author, body, created_at, votes)
    VALUES
    %L 
    RETURNING *;`,
      articleData.map((article) => [
        article.title,
        article.topic,
        article.author,
        article.body,
        article.created_at,
        article.votes,
      ])
    );
    const insertArticle = await db.query(articleQuery);

    const commmentQuery = format(
      `INSERT INTO comments (
        author,
        article_id,
        votes,
        created_at,
        body
      )
      VALUES %L RETURNING * ;`,
      commentData.map((item) => [
        item.author,
        item.article_id,
        item.votes,
        item.created_at,
        item.body,
      ])
    );
    const insertComments = await db.query(commmentQuery);

    await Promise.all([
      insertTopics,
      insertUsers,
      insertArticle,
      insertComments,
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
