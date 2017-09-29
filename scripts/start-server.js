const startServer = require('../src/server')
const port = process.env.PORT || 8080

startServer(port, console.log)

