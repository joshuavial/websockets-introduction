const WebSocket = require("ws")
const readline = require("readline")

const url = process.env.CHAT_SERVER || 'localhost'
const port = process.env.PORT || 8080

const ws = new WebSocket(`ws://${url}:${port}`)

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

console.log("Welcome to tech-gym chat")

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
})
