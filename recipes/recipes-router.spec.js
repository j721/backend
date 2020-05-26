const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
    .then(()=>db.seed.run())

})

//needs authentication from register and login for all crud testing. 
//Token auth needed

//GET

// test("GET /api/recipes. Return array of recipes for logged in user", async () => {
//     const register = await request(server)
//         .post("/api/auth/register")
//         .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })

//     const login = await request(server)
//         .post("/api/auth/login")
//         .send({ username: "flavor", password: "vanilla" })

//     const res = await request(server)
//         .get("/api/recipes")
//         .set("authorization", login.body.token);
//     expect(res.type).toBe("application/json");
//     expect(res.body).toHaveLength(2);
//     expect(res.body[0]).toHaveProperty("id");
//     expect(res.body[0]).toMatchObject({ id: 1 });
//     expect(res.status).toBe(200);
// })

// test("GET /api/recipes/:id  Get recipe by id", async () => {
//     const register = await request(server)
//         .post("/api/auth/register")

//         .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
//     const login = await request(server)
//         .post("/api/auth/login")

//         .send({ username: "flavor", password: "vanilla" })
//     const res = await request(server)
//         .get("/api/recipes/1")
//         .set("authorization", login.body.token);
//     expect(res.body[0]).toHaveProperty("id");
//     expect(res.body).toHaveLength(1);
//     expect(res.type).toBe("application/json");
//     expect(res.status).toBe(200);
// })

test("GET /api/recipes/:id/user. Recipe created specifically by the user.", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })

    const res = await request(server)
        .get("/api/recipes/1/user")
        .set("authorization", login.body.token);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("category");
    expect(res.body[0]).toHaveProperty("ingredients");
    expect(res.body[0]).toHaveProperty("instructions");
    expect(res.body[0]).toHaveProperty("source");
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//Post

test("POST /api/recipes/:id/user  Create new recipe from logged in user", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })

    const res = await request(server)
        .post("/api/recipes/1/user")
        .set("authorization", login.body.token);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("category");
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//Update

test("PUT /api/recipes/:id  Updates recipe by id from specific user's recipe list", async () => {
    // const register = await request(server)
    //     .post("/api/auth/register")
    //     .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "lambda", password: "password" })

    const res = await request(server)
        .put("/api/recipes/1")
        .set("authorization", login.body.token);
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//Delete

test("DELETE /api/recipes:id   Deletes recipe by id from specific user's recipe list", async () => {
    // const register = await request(server)
    //     .post("/api/auth/register")
    //     .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "lambda", password: "password" })

    const res = await request(server)
        .put("/api/recipes/1")
        .set("authorization", login.body.token);
    expect(res.type).toBe("application/json");
    expect(res.body[0]).toHaveProperty("id");
    expect(res.status).toBe(200);
})