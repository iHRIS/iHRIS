const express = require('express')
const fileUpload = require('express-fileupload');
const redis = require('redis')
const session = require('express-session')
const path = require('path')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const logger = require('./winston')
const fs = require('fs')
const user = require('./modules/user');
const generalMixin = require('./mixin/generalMixin')
const defaultSetups = require('./defaultSetup.js');
const nconf = require('./modules/config')
const requireFromString = require('require-from-string')
const fhirModules = require('./modules/fhirModules')
const fhirReports = require('./modules/fhirReports')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const RedisStore = require('connect-redis')(session)

const app = express()
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var configLoaded = false

async function startUp() {
  const fs = require('fs')

  /*if ( process.env.AUTOLOAD_RESOURCE_DIR ) {
    const axios = require('axios')
    const URI = require('urijs')
    const path = require('path')

    logger.info( "Loading Autoload resource directory: " + process.env.AUTOLOAD_RESOURCE_DIR )
    let files = fs.readdirSync( process.env.AUTOLOAD_RESOURCE_DIR )
    let server = nconf.get("fhir:base")
    for ( let file of files ) {
      if ( file.endsWith('.json') ) {
        let fullFile = path.format( { dir: process.env.AUTOLOAD_RESOURCE_DIR, base: file } )
        let data = fs.readFileSync( fullFile )
        let fhir = JSON.parse( data )
        if ( fhir.resourceType === "Bundle" &&
          ( fhir.type === "transaction" || fhir.type === "batch" ) ) {
          logger.info( "Saving " + fhir.type )
          let dest = URI(server).toString()
          axios.post( dest, fhir ).then( ( res ) => {
            logger.info( dest+": "+ res.status )
            logger.info( JSON.stringify( res.data, null, 2 ) )
          } ).catch( (err) => {
            logger.error(err.message)
          } )
        } else {
          logger.info( "Saving " + fhir.resourceType +" - "+fhir.id )
          let dest = URI(server).segment(fhir.resourceType).segment(fhir.id).toString()
          axios.put( dest, fhir ).then( ( res ) => {
            logger.info( dest+": "+ res.status )
            logger.info( res.headers['content-location'] )
          } ).catch( (err) => {
            logger.error(err.message)
            logger.error(JSON.stringify(err.response.data,null,2))
          } )
        }
      }
    }
  }*/


  await nconf.loadRemote()

  generalMixin.removeDir(`${__dirname}/tmp`)

  try {
    let reportsRunning = await fhirReports.setup()
    if ( reportsRunning ) {
      fhirReports.runReports()
    } else {
      logger.error("Failed to start up reports to ElasticSearch.")
    }
  } catch( err ) {
    logger.error( err )
  }

  let redisClient = redis.createClient( nconf.get("redis:url") )
  const store = new RedisStore({
    client: redisClient
  })

  let keycloak;
  if (nconf.get('app:idp') === 'keycloak') {
    keycloak = require('./modules/keycloakConnect').initKeycloak(store);
  }

  const isLoggedIn = (req, res, next) => {
    let unauthenticatedRoutes = ["/config/app", "/auth", "/fhir/DocumentReference/page-home/$html", "/config/site"]
    if(unauthenticatedRoutes.includes(req.path)){
      return next()
    }
    if (nconf.get('app:idp') === 'keycloak') {
      if (req.cookies && req.cookies.userObj) {
        req.user = user.restoreUser(JSON.parse(req.cookies.userObj));
        return keycloak.protect()(req, res, next);
      }
      if (req.headers.authorization) {
        axios({
          url: `http://localhost:${nconf.get('server:port')}/auth`,
          method: 'POST',
          headers: {
            Authorization: req.headers.authorization,
          },
        }).then((resp) => {
          if (resp.data.resource) {
            req.user = user.restoreUser(resp.data);
            return keycloak.protect()(req, res, next);
          }
        }).catch((err) => {
          logger.error(err);
          return res.status(500).send();
        });
      }
    } else if (nconf.get('app:idp') === 'ihris') {
      if (!req.user && req.headers.authorization && req.headers.authorization.split(' ').length === 2) {
        // Only for API Access when using ihris as IDP
        const token = req.headers.authorization.split(' ')[1];
        let decoded;
        jwt.verify(token, config.get('auth:secret'), (err, dec) => {
          if (!err) {
            decoded = dec;
          }
        });
        if (decoded && decoded.user) {
          req.user = user.restoreUser(decoded.user);
        }
      }
      if (!req.user) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Credentials', true);
        return res.status(401).json(outcomes.NOTLOGGEDIN);
      }
      return next();
    } else {
      return next()
    }
  };

  app.use(morgan('dev'))

  // This has to be before the body parser or it won't proxy a POST body
  app.use('/kibana', createProxyMiddleware( {
    target: nconf.get('kibana:base') || "http://localhost:5601"
    //headers: { 'kbn-xsrf': true },
    //changeOrigin: true,
    //ws: true,
    //followRedirects: true
  } ) )


  //const indexRouter = require('./routes/index')
  const configRouter = require('./routes/config')
  const authRouter = require('./routes/auth')
  const esRouter = require('./routes/es')
  const questionnaireRouter = require('./routes/questionnaire')
  const fhirRouter = require('./routes/fhir')
  const ihrisApps = require('./routes/apps')
  const mheroRouter = require('./routes/mhero')

  const limit = nconf.get("express:limit") || "50mb"
  app.use(express.json({
    type: ["application/json", "application/fhir+json"],
    limit: limit
  }))
  app.use(express.urlencoded({
    extended: false,
    limit: limit
  }))
  app.use(cookieParser())
  app.use(session({
    store,
    secret: nconf.get("session:secret") || crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false
  }))

    app.use(express.static(path.join(__dirname, 'public')))


    //app.use('/', indexRouter)

    app.use('/auth', authRouter)
    if (keycloak) {
      app.use(keycloak.middleware());
    } else {
      app.use(authRouter.passport.initialize())
      app.use(authRouter.passport.session())
    }
    app.use(isLoggedIn);
    app.use('/config', configRouter)
    app.use('/mhero', mheroRouter)
    app.use("/tmp", express.static("tmp"));
    app.get('/test', (req, res) => {
      res.status(200).json({
        "user": req.user
      })
    })

    app.use('/fhir', questionnaireRouter)
    app.use('/fhir', fhirRouter)
    app.use('/apps', ihrisApps)
    app.use('/es', esRouter)

    const loadModules = nconf.get("modules")
    if (loadModules) {
      const modPaths = Object.keys(loadModules)
      for (let mod of modPaths) {
        try {
          let reqMod = await fhirModules.require(loadModules[mod])
          if (reqMod) {
            logger.info("Loading " + mod + " (" + loadModules[mod] + ") to app.")
            app.use("/" + mod, reqMod)
          }
        } catch (err) {
          logger.error("Failed to load module " + mod + " (" + loadModules[mod] + ")",err)
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

  app.use('/apps', express.static('apps'))

  app.use( (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  } )

  configLoaded = true
}

defaultSetups.initialize().then(() => {
  startUp();
}).catch(() => {
  logger.warn('iHRIS may have issues running because of above error(s)');
  startUp();
});





//startUp()

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
