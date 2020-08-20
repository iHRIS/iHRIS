const express = require('express')
const redis = require('redis')
const session = require('express-session')
const path = require('path')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const winston = require('winston')
const fs = require('fs')
const fhirConfig = require('./modules/fhirConfig')
const nconf = require('./modules/config')
const requireFromString = require('require-from-string')
const fhirModules = require('./modules/fhirModules')

const RedisStore = require('connect-redis')(session)

const app = express()

var configLoaded = false

async function startUp() {
  await nconf.loadRemote()

  let runEnv = process.env.NODE_ENV || "production"
  let logOpts = nconf.get("logs:"+runEnv)
  if ( !logOpts ) {
    winston.add( new winston.transports.Console( { 
      level: "error",
      format: winston.format.prettyPrint()
    } ) )
  } else {
    for( let transport of Object.keys(logOpts) ) {
      if ( transport === "console" ) {
        winston.add( new winston.transports.Console( { 
          level: logOpts[transport].level || "error",
          format: winston.format.prettyPrint()
        } ) )
      } else if ( transport === "file" ) {
        for( let type of Object.keys(logOpts[transport]) ) {
          if ( !logOpts[transport][type].file ) {
            console.log("Logging by file for "+type+" config needs a file set.")
          } else {
            winston.add( new winston.transports.File( { 
              level: logOpts[transport][type].level || "error", 
              file: logOpts[transport][type].file
            } ) )
          }
        }
      }
    }
  }


  winston.verbose(nconf.get())
  let redisClient = redis.createClient( nconf.get("redis:url") )

  app.use(logger('dev'))

  //const indexRouter = require('./routes/index')
  const configRouter = require('./routes/config')
  const authRouter = require('./routes/auth')
  const fhirRouter = require('./routes/fhir')
  const questionnaireRouter = require('./routes/questionnaire')
  const mheroRouter = require('./routes/mhero')

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


  //app.use('/', indexRouter)

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
          winston.info("Loading " + mod + " (" + loadModules[mod] + ") to app.")
          app.use("/" + mod, reqMod)
        }
      } catch (err) {
        winston.error("Failed to load module " + mod + " (" + loadModules[mod] + ")",err)
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

  // Fallback for the vue router using history mode
  // If this causes issues, would need to either 
  // server the ui from a subdirectory or change to hash mode
  app.use( (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  } )

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
