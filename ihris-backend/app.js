const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const fhirConfig = require('./modules/fhirConfig')
const nconf = require('./modules/config')

const app = express()

var configLoaded = false

async function startUp() {
  await nconf.loadRemote()
  console.log(nconf.get())

  const indexRouter = require('./routes/index')
  const usersRouter = require('./routes/users')

  
  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
  
  app.use('/', indexRouter)
  app.use('/users', usersRouter)

  configLoaded = true
}

startUp()

app.whenReady = () => {
  return new Promise( (resolve) => {
    let idx = setInterval( () => {
      if ( configLoaded === true ) {
        clearInterval(idx)
        resolve()
      }
    }, 100 )
  } )
}

module.exports = app

