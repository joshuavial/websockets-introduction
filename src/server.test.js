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

test('broadcasts message to other clients', (done) => {
  const otherClient = new WebSocket(`ws://localhost:${TEST_PORT}`)
  this.ws.on('open', () => {
    otherClient.on('open', () => {
      this.ws.send('hello world')
      otherClient.on('message', (message) => {
        if (message == 'anon: hello world') done()
      })
    })
  })
})

test('broadcasts message includes name', (done) => {
  const otherClient = new WebSocket(`ws://localhost:${TEST_PORT}`)
  this.ws.on('open', () => {
    otherClient.on('open', () => {
      this.ws.send('/i test')
      this.ws.send('hello world')
      otherClient.on('message', (message) => {
        if (message == 'test: hello world') done()
      })
    })
  })
})

test('user sets username with /i', (done) => {
  this.ws.on('open', () => {
    this.ws.send('/i test-user')
    this.ws.send('/whoami')
    this.ws.on('message', (message) => {
      if (message == 'test-user') done( )
    })
  })
})

test('/user can se help with /i', (done) => {
  this.ws.on('open', () => {
    this.ws.send('/h')
    this.ws.on('message', (message) => {
      if (message.match(/\/whoami/i)) done( )
    })
  })

})

test('send private message to a user', (done) => {
  const friend = new WebSocket(`ws://localhost:${TEST_PORT}`)
  const otherClient = new WebSocket(`ws://localhost:${TEST_PORT}`)
  this.ws.on('open', () => {
    friend.on('open', () => {
      friend.send('/i friend')
      this.ws.send('/i test')
      this.ws.send('/d friend private message')
      otherClient.on('message', (message) => {
        if (message.match(/private message/)) done('private message sent to third party')
      })
      friend.on('message', (message) => {
        if (message == 'test(dm): private message') done()
      })
    })
  })
})
