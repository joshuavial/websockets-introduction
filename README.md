# Introduction to Websockets

Welcome to websockets, let's build a chat room.

You will need three terminal windows open for this challenge - one for the server and two for the chat clients.

In the server run `npm start` and in the client windows `npm run client` - to exit the server use ^C and read the client.js code to see how to exit the client :)

## Step 0: Skim the docs
Familiarize yourself with the concept of websockets, ws npm package and readline node library

* [Overview of websockets](https://en.wikipedia.org/wiki/WebSocket)
* [ws npm package](https://www.npmjs.com/package/ws)
* [readline](https://nodejs.org/api/readline.html)

## Step 1: create a websockets server

Have a look at the code in server.js, look up anything you are unfamiliar with in the [ws docs](https://github.com/websockets/ws/blob/HEAD/doc/ws.md)

```javascript
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
Now have a look at the clint code - try putting in console.logs or moving code around in the server and client and see if you can predict what will happen.

```javascript
const WebSocket = require('ws')
const readline = require('readline')

const ws = new WebSocket('ws://localhost:8080')

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

console.log('Welcome to tech-gym chat')

ws.on('open', () => {
  rl.prompt()
  rl.on('line', (input) => {
    if (['bye', 'exit', '/q'].indexOf(input) != -1) {
      rl.close()
      ws.close()
    } else {
      ws.send(input)
      rl.prompt()
    }
  })
})
```

## Step 3: broadcast message to all clients
When the server receives a message it should send it to all the clients who are connected except for the client which sent the message.

## Step 4: identify each client so we know who is speaking
Figure out a way that each client can set a username so other people know who a message comes from.

## Step 5: send a list of commands when a user sends /h
Let's make the server a little friendlier and have it send a help message with all the instructions available.

## Step 6: send a private message to a user using /d [username] [message\
Create the ability for a user to send a message to just one other client.

# Stretch Goals

## Start from scratch
From an empty project see if you can build a functioning chat server with tests

## Rebuild the chat using sockets.io instead of websockets, which one do you like more?
Checkout the resource below which explores some of their differences

## Resources

* [Overview of websockets](https://en.wikipedia.org/wiki/WebSocket)
* [ws npm package](https://www.npmjs.com/package/ws)
* [readline](https://nodejs.org/api/readline.html)
* [Difference between socket.io and websockets](https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets)
