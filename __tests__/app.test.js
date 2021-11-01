const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

// beforeEach(() => seed(testData));
// afterAll(() => db.end());

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
});
