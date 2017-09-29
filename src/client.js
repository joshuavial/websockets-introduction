const WebSocket = require("ws")
const readline = require("readline")

function startClient(url, port, log) {
  const ws = new WebSocket(`ws://${url}:${port}`)

  const rl = readline.createInterface({input: process.stdin, output: process.stdout})

  log("Welcome to tech-gym chat")

  ws.on("open", () => {
    rl.prompt()
    rl.on("line", (input) => {
      if (["bye", "exit", "/q"].indexOf(input) != -1) {
        rl.close()
        ws.close()
      } else {
        ws.send(input)
        rl.prompt()
      }
    })
    ws.on('message', (message) => {
      log(`\n${message}`)
      rl.prompt()
    })
  })
}

module.exports = startClient
