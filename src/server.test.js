const WebSocket = require('ws')
const sinon = require('sinon')

const TEST_PORT = 8088
const startServer = require('./server')

beforeEach(() => {
  this.log = sinon.stub()
  this.wss = startServer(TEST_PORT, this.log)
  this.ws = new WebSocket(`ws://localhost:${TEST_PORT}`)
})

afterEach(() => {
  this.ws.close()
  this.wss.close()
})

test('server says hello on connection', (done) => {
  this.ws.on("message", (message) => {
    expect(message).toBe("Oh! Let's go!")
    done()
  })
})

test('server responds to echo', (done) => {
  this.ws.on('open', () => {
    this.ws.send('echo')
    this.ws.on("message", (message) => {
      if ((message) == 'echo') { done() }
    })
  })
})

