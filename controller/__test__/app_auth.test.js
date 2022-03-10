const app = require("../../app")
let request = require("supertest")
const {nanoid} = require("nanoid")

request = request(app)

describe("Login", () => {
    it("Returns status code 200 if user is logged in successfully", async () => {
        const res = await request.post("/api/auth/app/login").send({
            email: "jest.test.user",
            password: "password"
        })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("username")
        expect(res.body).toHaveProperty("message")
        expect(res.body).toHaveProperty("profile_pic_url")
        expect(res.body.message).toEqual("Login successful")
    })

    it("Returns status 404 if user is not found", async () => {
        const res = await request.post("/api/auth/app/login").send(JSON.stringify({
            email: nanoid(),
            password: nanoid()
        })).set("Content-Type", "application/json")

        expect(res.statusCode).toEqual(404)
    })
})

describe("Sign Up", () => {
    it("Returns error 400 when email is not valid", async () => {
        const res = await request.post("/api/auth/app/signup").send({
            email: "unlinked.test.user",
            password:  nanoid(),
            username: nanoid(),
            name: nanoid()
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty("message")
        expect(res.body.message).toEqual("Email is not valid")
    })

    it("Returns error 400 when username contains forbidden characters", async () => {
        const res = await request.post("/api/auth/app/signup").send({
            email: "unlinked.test.user" + nanoid() + "@gmail.com",
            password: nanoid(0),
            username: "o*sssIII",
            name: nanoid()
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty("message")
        expect(res.body.message).toEqual("Usernames can only contain a-z, underscore, periods and numbers")
    })

    it("Returns error 409 when username or email already exists", async () => {
        const res = await request.post("/api/auth/app/signup").send({
            email: "unlinked.test.user@gmail.com",
            password: nanoid(),
            username: "nabil",
            name: nanoid()
        })

        expect(res.statusCode).toEqual(409)
        expect(res.body).toHaveProperty("message")
        expect(res.body.message).toEqual("User already exists!")
    })
})