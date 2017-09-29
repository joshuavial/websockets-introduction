const WebSocket = require('ws')
const sinon = require('sinon')

const createClient = require('./client')

const TEST_PORT = 8088

beforeEach(() => {
  this.wss = new WebSocket.Server({port: TEST_PORT})
  this.rl = { prompt: sinon.stub(), on: sinon.stub(), close: sinon.stub() }
  this.log = sinon.stub()
  this.ws = createClient('localhost', TEST_PORT, this.log, this.rl)
})

afterEach(() => {
  this.wss.close()
})

test('sends message from readline to server', (done) => {
  this.wss.on('connection', (server) => {
    this.ws.on('open', () => {
      sendLine(this.rl, 'hello')
      server.on('message', (message) => {
        if (message == 'hello') done()
      })
    })
  })
})

test('close connection with /q', (done) => {
  this.wss.on('connection', (server) => {
    this.ws.on('open', () => {
      sendLine(this.rl, '/q')
      server.on('close', () => {
        done()
      })
    })
  })
})

function sendLine(rl, line) {
  rl.on.callArgWith(1, line)
}
