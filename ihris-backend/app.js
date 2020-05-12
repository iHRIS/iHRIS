const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const fhirConfig = require('./modules/fhirConfig')
var nconf = require('nconf')

nconf.argv().env( {
  separator: '__',
  lowerCase: true,
  parseValues: true,
  transform: (obj) => {
    if ( obj.key.match( /^ihris_/ ) ) {
      obj.key = obj.key.substring(6)
      return obj
    } else {
      return
    }
  }
} )

let defaults = fhirConfig.parseFile( './config/baseConfig.json' )

nconf.add('base', { type: 'literal', store: defaults } )

let newdef = { abc: 'def' }
nconf.add('new', { type: 'literal', store: newdef } )

console.log(nconf.get())

process.exit(0)

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app
