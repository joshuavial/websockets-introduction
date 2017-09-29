const WebSocket = require("ws")

function startClient(url, port, log, rl) {
  const ws = new WebSocket(`ws://${url}:${port}`)

  log("Welcome to tech-gym chat")

  ws.on("open", () => {
    rl.prompt()
    rl.on("line", (input) => { processLine(input, rl, ws) })

    ws.on('message', (message) => {
      log(`\n${message}`)
      rl.prompt()
    })
  })
  return ws
}

function processLine(input, rl, ws) {
  if (["bye", "exit", "/q"].indexOf(input) != -1) {
    rl.close()
    ws.close()
  } else {
    ws.send(input)
    rl.prompt()
  }
}

module.exports = startClient
