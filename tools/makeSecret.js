const http = require('http')
const crypto = require('crypto')

const start = () => {
  console.log(crypto.randomBytes(64).toString('hex'))
}

start()


