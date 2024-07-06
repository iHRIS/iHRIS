const express = require('express');
const fileUpload = require('express-fileupload');
const redis = require('redis');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const winston = require('winston');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const RedisStore = require('connect-redis')(session);
const axios = require('axios');
const ihrissmartrequire = require('ihrissmartrequire')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const logger = require('./winston');
const user = require('./modules/user');
const generalMixin = require('./mixin/generalMixin');
const defaultSetups = require('./defaultSetup');
const nconf = require('./modules/config');
const fhirModules = require('./modules/fhir/fhirModules');
const fhirReports = require('./modules/fhir/fhirReports');

const appsitepath =  global["appsitepath" + process.pid]
//const appcorepath =  global["appcorepath" + process.pid]

const app = express();
app.use(fileUpload({
  createParentPath: true,
}));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let configLoaded = false;

async function startUp() {

  await nconf.loadRemote();

  generalMixin.removeDir(`${__dirname}/tmp`);
  try {
    const reportsRunning = await fhirReports.setup();
    if (reportsRunning) {
      // fhirReports.runReports();
    } else {
      logger.error('Failed to start up reports to ElasticSearch.');
    }
  } catch (err) {
    logger.error(err);
  }

  const redisClient = redis.createClient(nconf.get('redis:url'));
  const store = new RedisStore({
    client: redisClient,
  });

  let keycloak;
  if (nconf.get('app:idp') === 'keycloak') {
    keycloak = require('./modules/keycloakConnect').initKeycloak(store);
  }

  const isLoggedIn = (req, res, next) => {
    if (nconf.get('app:idp') === 'keycloak') {
      const unauthenticatedRoutes = ['/config/app', '/apps/install', '/translator/getTranslatedLanguages', '/translator/getLocale/en'];
      if (unauthenticatedRoutes.includes(req.path)) {
        return next();
      }
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
      } else {
        return res.status(401).json()
      }
    } else if (nconf.get('app:idp') === 'ihris') {
      const unauthenticatedRoutes = ['/', 'favicon.ico', '/flag_en.svg', '/config/app', '/auth', '/fhir/DocumentReference/page-home/$html', '/config/site', '/translator/getTranslatedLanguages'];
      if (unauthenticatedRoutes.includes(req.path) || req.path.startsWith('/css') || req.path.startsWith('/js')) {
        return next();
      }
      if (!req.user && req.headers.authorization && req.headers.authorization.split(' ').length === 2) {
        // Only for API Access when using ihris as IDP
        const token = req.headers.authorization.split(' ')[1];
        let decoded;
        jwt.verify(token, nconf.get('auth:secret'), (err, dec) => {
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
      return next();
    }
  };

  app.use(morgan('dev'));

  // This has to be before the body parser or it won't proxy a POST body
  app.use('/dashboards', createProxyMiddleware({
    target: nconf.get('kibana:base') || 'http://localhost:5601',
    // headers: { 'kbn-xsrf': true },
    // changeOrigin: true,
    // ws: true,
    // followRedirects: true
  }));
  // const indexRouter = require('./routes/index')
  const configRouter = require('./routes/config');
  const authRouter = require('./routes/auth');
  const fhir2esRouter = require('./routes/fhir2es');
  let fhir2sqlRouter
  if(nconf.get("fhir:flattener") === "fhir2sql") {
    fhir2sqlRouter = require('./routes/fhir2sql');
  }
  const questionnaireRouter = require('./routes/questionnaire');
  const fhirRouter = require('./routes/fhir');
  const ihrisApps = require('./routes/apps');
  const mheroRouter = require('./routes/mhero');
  const translatorRouter = require('./routes/core-apps/ihris-google-translator/index');
  const taskAndRoleRouter = require('./routes/core-apps/ihris-task-and-role/index')

  const limit = nconf.get('express:limit') || '50mb';
  app.use(express.json({
    type: ['application/json', 'application/fhir+json'],
    limit,
  }));
  app.use(express.urlencoded({
    extended: false,
    limit,
  }));
  app.use(cookieParser());
  app.use(session({
    store,
    secret: nconf.get('session:secret') || crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false,
  }));

  // app.use(express.static(path.join(__dirname, 'public')))

  // app.use('/', indexRouter)

  app.use('/auth', authRouter);
  if (keycloak) {
    app.use(keycloak.middleware());
  } else {
    app.use(authRouter.passport.initialize());
    app.use(authRouter.passport.session());
  }
  // mounting site routes that dont require authentication
  mountCustomRoute("false")
  // end of mounting site routes that dont require authentication
  app.use(isLoggedIn);
  // mounting site routes that must be authenticated
  mountCustomRoute("true")
  // end of mounting site routes that must be authenticated

  app.use('/config', configRouter);
  app.use('/mhero', mheroRouter);
  app.use('/translator', translatorRouter);
  app.use('/taskAndRole', taskAndRoleRouter);
  app.use('/tmp', express.static('tmp'));
  app.get('/test', (req, res) => {
    res.status(200).json({
      user: req.user,
    });
  });

  app.use('/fhir', questionnaireRouter);
  app.use('/fhir', fhirRouter);
  app.use('/apps', ihrisApps);
  app.use('/es', fhir2esRouter);
  if(nconf.get("fhir:flattener") === "fhir2sql") {
    app.use('/fhir2sql', fhir2sqlRouter);
  }

  const loadModules = nconf.get('modules');
  if (loadModules) {
    const modPaths = Object.keys(loadModules);
    for (const mod of modPaths) {
      try {
        const reqMod = await fhirModules.require(loadModules[mod]);
        if (reqMod) {
          logger.info(`Loading ${mod} (${loadModules[mod]}) to app.`);
          app.use(`/${mod}`, reqMod);
        }
      } catch (err) {
        logger.error(`Failed to load module ${mod} (${loadModules[mod]})`, err);
      }
    }
  }

  function mountCustomRoute(authenticate) {
    const siteRoutes = nconf.get('app:site:routes');
    for (const route in siteRoutes) {
      //this ensures that everything is authenticated unless the authenticate parameter is set and its values is false
      if(siteRoutes[route].hasOwnProperty("authenticate") && siteRoutes[route].authenticate !== authenticate) {
        continue
      } else if(!siteRoutes[route].hasOwnProperty("authenticate") && authenticate === "false") {
        continue
      }
      const routePath = path.join(nconf.get('app:site:path'), `routes/${siteRoutes[route].path}`);
      let mountPoint = `/${siteRoutes[route].mount}`;
      mountPoint = mountPoint.replace('//', '/');
      if (fs.existsSync(routePath)) {
        const siteRoute = require(routePath);
        try {
          app.use(mountPoint, siteRoute);
        } catch (error) {
          console.log(error);
        }
      } else {
        winston.error(`Route file defined with mount point ${mountPoint} was not found`);
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
  app.use('/ihrisapp', express.static(path.join(__dirname, 'apps')));

  app.use(express.static(path.join(appsitepath, 'public')));
  app.use((req, res) => {
    res.sendFile(path.join(appsitepath, 'public/index.html'));
  });
  configLoaded = true;
}

defaultSetups.initialize().then(() => {
  startUp();
}).catch(() => {
  logger.warn('iHRIS may have issues running because of above error(s)');
  startUp();
});

// startUp()

app.whenReady = () => new Promise((resolve) => {
  const idx = setInterval(() => {
    if (configLoaded === true) {
      clearInterval(idx);
      resolve();
    }
  }, 100);
});

module.exports = app;
