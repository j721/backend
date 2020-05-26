const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

beforeEach(() => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())

  })

  test ("GET /api/recipes. Return array of recipes for logged in user", async ()=>{
      const res = await request(server)
      .get("/api/recipes")
      expect(res.type).toBe("application/json");
      expect(res.status).toBe(200);
  })