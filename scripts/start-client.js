const startClient = require('../src/client.js')

const url = process.env.CHAT_SERVER_URL || 'localhost'
const port = process.env.PORT || 8080

startClient(url, port, console.log)
