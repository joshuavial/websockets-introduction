const startClient = require('../src/client.js')
const readline = require("readline")

const url = process.env.CHAT_SERVER_URL || 'localhost'
const port = process.env.PORT || 8080

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

startClient(url, port, console.log, rl)
