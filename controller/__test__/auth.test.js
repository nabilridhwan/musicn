const app = require("../../app")
let request = require("supertest")
const jwt = require("jsonwebtoken")

request = request(app)

describe("Spotify Authentication", () => {
    it("Returns status code 500 if user cancels the authentication phase", async () => {

        const key = await jwt.sign({
            user_id: 34,
            username: "nabil",
        }, process.env.JWT_KEY)

        // Make a request to the server with cookies jwt
        const res = await request.get("/api/auth/callback?error=rejected")
            .set("Cookie", `jwt=${key}`)

        expect(res.statusCode).toEqual(500)
        expect(res.body.message).toEqual("The user has canceled the authentication")
    })

    it("Returns status code 500 if the token can't be decoded", async () => {
            
            const key = await jwt.sign({
                user_id: 34,
                username: "nabil",
            }, "fake_secret")
    
            // Make a request to the server with cookies jwt
            const res = await request.get("/api/auth/callback?code=fake_code")
                .set("Cookie", `jwt=${key}`)
   
            expect(res.statusCode).toEqual(500)
    })
})