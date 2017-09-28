const WebSocket = require("ws")

const port = process.env.PORT || 8080
const wss = new WebSocket.Server({ port })

console.log(`Tech gym slack server running on ws://localhost:${port}`)
wss.on("connection", (ws) => {
  console.log("Oh! Let's go!")
  ws.on("message", (message) => {
    console.log(`received: ${message}`)
  })
  ws.on("close", () => {
    console.log("Another one bites the dust")
  })
})
