const {
    Client
} = require('pg')


require("dotenv").config()

const client = new Client()
client.connect()

module.exports = client