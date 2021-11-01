const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("App", () => {
  describe("Invalid Endpoint", () => {
    test("should receive 404 Status And 'Invalid EndPoint' in res.body", () => {
      return request(app)
        .get("/SomeEndpoint")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid EndPoint");
        });
    });
  });

  describe("GET /", () => {
    test("Should receive 200 ok Status", () => {
      return request(app).get("/").expect(200);
    });
    test('Should receive 200 ok Status and "Hello" in res.body', () => {
      return request(app)
        .get("/")
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe("Hello");
        });
    });
  });

  describe("GET /api/topics", () => {
    test("should receive 200 ok Status and all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
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
          body: expect.any(String),
          votes: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
        });
      });
    });

    describe("GET -  /api/articles/article_id", () => {
      test('Status: 400 "Bad Request" - on invalid param', () => {
        return request(app)
          .get("/api/articles/notavalidparam")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe("Invalid Param");
          });
      });
      test('Status: 404 "Not Found" - on wrong ID', () => {
        return request(app)
          .get("/api/articles/1233")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe("No Article Found");
          });
      });
      test('Status: 200 "OK" on Valid ID', () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
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
    });
    test("GET api ", () => {});
  });
});
