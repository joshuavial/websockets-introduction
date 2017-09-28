const WebSocket = require('ws')
const readline = require('readline')

const ws = new WebSocket('ws://127.0.0.1:8080')

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

console.log('Welcome to tech-gym chat')

let exit = false
ws.on('open', () => {
  rl.prompt()
  rl.on('line', (input) => {
    ws.send(input)
    if (['bye', 'exit'].indexOf(input) != -1) {
      rl.close()
      ws.close()
    } else {
      rl.prompt()
    }
  })
})
