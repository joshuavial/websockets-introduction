const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Tech gym slack server running on ws://localhost:8080')
wss.on('connection', (ws) => {
  console.log("Oh! Let's go!")
  ws.on('message', (message) => {
    console.log(`received: ${message}`)
  })
  ws.on('close', () => {
    console.log('Another one bites the dust')
  })
});
