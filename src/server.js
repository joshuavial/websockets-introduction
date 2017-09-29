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
  const args = message.match(/^\/([^\s]+)\s*(.*)/i)
  const command = args[1]
  const params = args[2]
  const commands = {
    'i': () => { ws.name = params },
    'h': () => { helpCommand(ws) },
    'd': () => { privateMessage(params, wss, ws) },
    'whoami': () => { ws.send(ws.name) }
  }
  if (commands[command]) commands[command]()
}

function privateMessage(params, wss, ws) {
  const matches = params.match(/^([^\s]+)\s(.*)/i)
  const recipient = matches[1]
  const msg = matches[2]
  wss.clients.forEach((client) => {
    if (client.name == recipient) {
      client.send(`${ws.name || 'anon'}(dm): ${msg}`)
    }
  })
}

function helpCommand(ws) {
  ws.send([
    '/h : see this help message',
    '/i [name] : set your name for the chat',
    '/whoami : display your current name',
    '[message] : send a message to other participants'
  ].join('\n'))
}

module.exports = startServer
