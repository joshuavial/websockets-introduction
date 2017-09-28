# Introduction to Websockets

We will be using websockets to build our own chat server

## Step 1: create a websockets server

```
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Tech gym slack server running on ws://localhost:8080')
wss.on('connection', (ws) => {
  console.log('connected')
  ws.on('message', (message) => {
    console.log(`received: ${message}`)
  })
});
```

## Step 2: connect a websockets client

## Step 3: broadcast message to all clients

## Step 4: identify each client so we know who is speaking

## Step 5: send a list of commands when a user sends /h, help or ?

## Step 6: send a private message to a user using /d [username] [message\


## Resources

* [Overview of websockets](https://en.wikipedia.org/wiki/WebSocket)
* [ws npm package](https://www.npmjs.com/package/ws)
* [readline](https://nodejs.org/api/readline.html)
