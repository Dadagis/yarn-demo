const request = require("supertest");
let server;

describe("/api/courses", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all courses", async () => {
      const res = await request(server).get("/api/courses");
      expect(res.status).toBe(200);
    });
  });
});
