const express = require('express')
const redis = require('redis')
const session = require('express-session')
const path = require('path')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const fhirConfig = require('./modules/fhirConfig')
const nconf = require('./modules/config')
const requireFromString = require('require-from-string')
const fhirModules = require('./modules/fhirModules')

const RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

const app = express()

var configLoaded = false

async function startUp() {
  await nconf.loadRemote()
  console.log(nconf.get())

  const indexRouter = require('./routes/index')
  const configRouter = require('./routes/config')
  const authRouter = require('./routes/auth')
  const fhirRouter = require('./routes/fhir')
  const questionnaireRouter = require('./routes/questionnaire')
  const mheroRouter = require('./routes/mhero')

  app.use(logger('dev'))
  app.use(express.json({
    type: ["application/json", "application/fhir+json"]
  }))
  app.use(express.urlencoded({
    extended: false
  }))
  app.use(cookieParser())
  app.use(session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: nconf.get("session:secret") || crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false
  }))
  app.use(express.static(path.join(__dirname, 'public')))


  app.use('/', indexRouter)

  app.use('/auth', authRouter)
  app.use(authRouter.passport.initialize())
  app.use(authRouter.passport.session())

  app.use('/config', configRouter)
  app.use('/mhero', mheroRouter)
  app.get('/test',
    (req, res) => {
      res.status(200).json({
        "user": req.user
      })
    }
  )

  app.use('/fhir', questionnaireRouter)
  app.use('/fhir', fhirRouter)

  const loadModules = nconf.get("modules")
  if (loadModules) {
    const modPaths = Object.keys(loadModules)
    for (let mod of modPaths) {
      try {
        let reqMod = await fhirModules.require(loadModules[mod])
        if (reqMod) {
          console.log("Loading " + mod + " (" + loadModules[mod] + ") to app.")
          app.use("/" + mod, reqMod)
        }
      } catch (err) {
        console.log("Failed to load module " + mod + " (" + loadModules[mod] + ")")
      }
    }
  }
  /*
  testMod = fhirModules.require()
  if ( testMod ) app.use( '/mod', testMod )
  */

  /*
  let testStr = `
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({"string": true, "user":req.user})
} )

module.exports = router
`

  const testModule = requireFromString(testStr, "ihris-module-test")
  app.use( '/mod', testModule )
  */

  configLoaded = true
}

startUp()

app.whenReady = () => {
  return new Promise((resolve) => {
    let idx = setInterval(() => {
      if (configLoaded === true) {
        clearInterval(idx)
        resolve()
      }
    }, 100)
  })
}

module.exports = app