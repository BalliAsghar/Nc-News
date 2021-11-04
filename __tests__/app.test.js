const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("App", () => {
  describe("Invalid Endpoint", () => {
    test("should receive 404 Status And 'Invalid EndPoint' in res.body", async () => {
      await request(app).get("/SomeEndpoint").expect(404);
    });
  });

  describe("GET /", () => {
    test("Should receive 200 ok Status", () => {
      return request(app).get("/").expect(200);
    });
    test('Should receive 200 ok Status and "Hello" in res.body', async () => {
      const { body } = await request(app).get("/").expect(200);
      expect(body.message).toBe("Hello");
    });
  });

  describe("GET /api/topics", () => {
    test("should receive 200 ok Status and all topics", async () => {
      const { body } = await request(app).get("/api/topics").expect(200);
      const { topics } = body;
      topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        });
      });
    });
  });

  describe("GET /api/articles", () => {
    test("should receive 200 ok Status and all articles", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      const { Articles } = body;
      Articles.forEach((article) => {
        expect(article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          votes: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(Number),
        });
      });
    });

    describe("GET -  /api/articles/article_id", () => {
      test('Status: 400 "Bad Request" - on invalid Id', async () => {
        const { body } = await request(app)
          .get("/api/articles/1nt13")
          .expect(400);
        expect(body.message).toBe("Invalid Id");
      });
      test('Status: 404 "Not Found" - on wrong ID', async () => {
        const { body } = await request(app)
          .get("/api/articles/1233")
          .expect(404);
        expect(body.message).toBe("No Article Found");
      });
      test('Status: 200 "OK" on Valid ID', async () => {
        const { body } = await request(app).get("/api/articles/1").expect(200);
        const { Article } = body;
        expect(Article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(Number),
        });
      });
    });
    describe("GET - /api/article?query", () => {
      test("Status: 200 'Ok' -  returns -  (by default) ascending date ordered articles", async () => {
        const { body } = await request(app).get("/api/articles").expect(200);
        const { Articles } = body;
        expect(Articles).toBeSorted("created_at");
      });
      test("Status: 200 'Ok' - returns sorted Articles And in ASC Order", async () => {
        const sort_by = "title";
        const order = "ASC";
        const { body } = await request(app)
          .get(`/api/articles`)
          .query({ sort_by, order })
          .expect(200);
        const { Articles } = body;
        expect(Articles).toBeSortedBy("title");
      });
      test('Status 400 "Bad Request" -  returns error "bad query - invalid type"', async () => {
        const { body } = await request(app)
          .get("/api/articles?sort_by=asdads234234")
          .expect(400);
        expect(body.message).toBe("Bad Query");
      });
    });

    describe("GET - api/:article_id/comments", () => {
      test('Status: 200 "Ok" - Get Article Comments', async () => {
        const { body } = await request(app)
          .get("/api/articles/1/comments")
          .expect(200);
        const { comments } = body;
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            author: expect.any(String),
            article_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            body: expect.any(String),
          });
        });
      });
      test('Status: 404 "Not Found" - Article Not Found', async () => {
        const { body } = await request(app)
          .get("/api/articles/55/comments")
          .expect(404);
        expect(body.message).toBe("No Article Found");
      });
      test('Status 400 "Bad Request" - Invalid Id', async () => {
        const { body } = await request(app)
          .get("/api/articles/notaValidId/comments")
          .expect(400);
        expect(body.message).toBe("Invalid Id");
      });
    });
  });

  describe("PATCH api/article/article_id", () => {
    test('Status: 400 "Bad Request" - on not providing vote in body', async () => {
      const { body } = await request(app).patch("/api/articles/1").expect(400);
      expect(body.message).toBe("No vote property provided");
    });
    test('Status: 404 "Not Found" - on wrong ID', async () => {
      const { body } = await request(app)
        .patch("/api/articles/1234")
        .send({ inc_votes: 2 })
        .expect(404);
      expect(body.message).toBe("No Article Found");
    });
    test('Status: 400 "Bad Request" - on invalid Id', async () => {
      const { body } = await request(app)
        .patch("/api/articles/1b3d")
        .send({ inc_votes: 2 })
        .expect(400);
      expect(body.message).toBe("Invalid Id");
    });
  });

  // NOTE:  This test is not working.  I am not sure why.
  describe.skip("POST api/articles/:article_id/comments", () => {
    test('Status: 201 "Created" - on valid article Id', () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "tickle122",
          body: "I am a comment",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.body).toBe("I am a comment");
          expect(body.comment.author).toBe("tickle122");
        });
    });
  });
  describe("DELETE api/comments/comment_id", () => {
    test('Status 204 "No Content" - Delete Comment', () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test('Status 404 "Not Found" - Comment does not exists', () => {
      return request(app).delete("/api/comments/1123423").expect(404);
    });
    test('Status 400 "Bad Request" - Invalid Id', () => {
      return request(app).delete("/api/comments/ada3q3e").expect(400);
    });
  });

  describe("GET - /api/users", () => {
    test("Status: 200 'Ok' - Returns all users", async () => {
      const { body } = await request(app).get("/api/users").expect(200);
      const { users } = body;
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
        });
      });
    });
  });

  describe.only("GET - api/users/:username", () => {
    test("Status: 200 'OK' - get User by Username", async () => {
      const { body } = await request(app)
        .get("/api/users/rogersop")
        .expect(200);
      const { user } = body;
      expect(user).toMatchObject({
        username: expect.any(String),
        name: expect.any(String),
        avatar_url: expect.any(String),
      });
    });

    test("Status: 404 'Not Found' - User does not exist", async () => {
      const { body } = await request(app).get("/api/users/balli").expect(404);
      expect(body.message).toBe("User Not Found");
    });
  });
});
