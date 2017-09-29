const WebSocket = require("ws")

function startServer(port, log) {
  const wss = new WebSocket.Server({ port })
  log(`Tech gym slack server running on ws://localhost:${port}`)
  wss.on("connection", (ws) => {
    ws.send("Oh! Let's go!")
    ws.on("message", (message) => { respondToMessage(message, ws, wss, log) })
    ws.on("close", () => { log("Another one bites the dust") })
  })
  return wss
}

function respondToMessage(message, ws, wss, log) {
  log(`received: ${message}`)
  if (message[0] == '/') {
    respondToCommand(message, ws, wss)
  } else {
    wss.clients.forEach((client) => {
      if (client != ws && client.readyState === WebSocket.OPEN) {
        client.send(`${ws.name || 'anon'}: ${message}`)
      }
    })
  }
}

function respondToCommand(message, ws, wss) {
  if (message.match(/^\/i\s(.*)/i)) {
    const name = message.match(/^\/i\s(.*)/i)[1]
    ws.name = name
  } else if (message == '/whoami') {
    ws.send(ws.name)
  }
}

module.exports = startServer
