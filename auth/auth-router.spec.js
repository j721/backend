const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())

})

//POST  Register
test("POST /api/auth/register   Check if register working", async () => {
    const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
        // expect(res.body.username).toBe("flavor")
    expect(res.body.data).toMatchObject({ username: "flavor", email: "flavor456@email.com" })
    expect(res.body.password).not.toBe("password")
    expect(res.status).toBe(201)
})



//POST Login  
test("POST /api/auth/login   Check if login successful", async () => {
    const register = await request(server)
        .post('/api/auth/register')
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })

    const login = await request(server)
        .post('/api/auth/login')
        .send({ username: "flavor", password: "vanilla" })
    expect(login.body).toHaveProperty("token")
    expect(login.body).toMatchObject({ message: "Welcome to our Secret Family Recipes API" })
    expect(login.status).toBe(200);
})