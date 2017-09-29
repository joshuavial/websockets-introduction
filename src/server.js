const WebSocket = require("ws")

function startServer(port, log) {
  const wss = new WebSocket.Server({ port })
  log(`Tech gym slack server running on ws://localhost:${port}`)
  wss.on("connection", (ws) => {
    ws.send("Oh! Let's go!")
    ws.on("message", (message) => {
      log(`received: ${message}`)
      if (message == "echo") {
        ws.send("echo")
      }
    })
    ws.on("close", () => {
      log("Another one bites the dust")
    })
  })

  return wss
}

module.exports = startServer
