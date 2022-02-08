const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const user = require('../modules/user')
const logger = require('../winston')
const fhirAudit = require('../modules/fhirAudit')
const jwt = require('jsonwebtoken');

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const CustomStrategy = require('passport-custom').Strategy

const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"

passport.use(new GoogleStrategy(
  {
    clientID: nconf.get("auth:google:clientId") || "not set",
    clientSecret: nconf.get("auth:google:clientSecret") || "not set",
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {

    user.lookupByProvider('google', profile.id).then((userObj) => {
      if (userObj) {
        fhirAudit.login(userObj, req.ip, true)
        done(null, userObj)
      } else {
        logger.debug(profile.id + " not found in current users, checking by email.")
        let email = profile.emails.find(em => em.verified === true)
        if (email && email.value) {
          user.lookupByEmail(email.value).then((userObj) => {
            if (!userObj.resource.identifier) userObj.resource.identifier = []
            userObj.resource.identifier.push({ system: 'google', value: profile.id })
            fhirAudit.login(userObj, req.ip, true, email.value)
            userObj.update().then((response) => {
              done(null, userObj)
            }).catch((err) => {
              logger.info("Failed to update user with provider id for google.")
              logger.error(err.message)
              done(null, userObj)
            })
          }).catch((err) => {
            fhirAudit.login({}, req.ip, false, email.value)
            done(err)
          })
        } else {
          logger.info("Couldn't find verified email in profile.")
          fhirAudit.login({}, req.ip, false)
          done(null, false)
        }
      }
    }).catch((err) => {
      fhirAudit.login({}, req.ip, false)
      done(err)
    })
  }
))

passport.use('local', new LocalStrategy({ passReqToCallback: true },
  (req, email, password, done) => {
    user.lookupByEmail(email).then((userObj) => {
      if (!userObj) {
        fhirAudit.login(userObj, req.ip, false, email)
        done(null, false)
      } else {
        if (userObj.checkPassword(password)) {
          fhirAudit.login(userObj, req.ip, true, email)
          done(null, userObj)
        } else {
          fhirAudit.login(userObj, req.ip, false, email)
          done(null, false)
        }
      }
    }).catch((err) => {
      fhirAudit.login({}, req.ip, false, email)
      done(err)
    })
  }
))

passport.use('custom-loggedout', new CustomStrategy(
  (req, done) => {

    fhirAudit.logout(req.user, req.ip, true)
    user.find(defaultUser).then((userObj) => {
      if (!userObj) {
        done(null, false)
      } else {
        done(null, userObj)
      }
    }).catch((err) => {
      done(err)
    })
  }
))

passport.serializeUser((obj, callback) => {
  //callback(null, user.id)
  callback(null, obj)
})
passport.deserializeUser((obj, callback) => {
  let userObj = user.restoreUser(obj)
  callback(null, userObj)
})
/*
passport.deserializeUser( (id,callback) => {
user.find( id ).then( (userObj) => {
 callback(null, userObj.resource)
} ).catch( (err) => {
 callback( err )
} )
} )
*/

router.use(passport.initialize())
router.use(passport.session())

router.passport = passport

router.get('/',
  (req, res, next) => {
    if (req.user) {
      res.status(200).json({ ok: true })
    } else {
      next()
    }
  },
  passport.authenticate('custom-loggedout', {}), (req, res) => {
    if (req.user) {
      res.status(200).json({ ok: true })
    } else {
      res.status(200).json({ ok: false })
    }
  }
)
router.get('/logout', passport.authenticate('custom-loggedout', {}), (req, res) => {
  if (req.user) {
    res.status(200).json({ ok: true })
  } else {
    res.status(200).json({ ok: false })
  }
})

router.get('/google', passport.authenticate('google', { scope: ['email'] }))
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' })
)

router.post("/login", passport.authenticate('local', {}), (req, res) => {
  let name = "Unknown"

  try {
    name = req.user.resource.name[0].text
  } catch (err) {
  }
  res.status(200).json({ ok: true, name: name })
})

router.post('/token', (req, res) => {
  // For API Access only
  logger.info('Generating token');
  const secret = nconf.get('auth:secret');
  const tokenDuration = nconf.get('auth:tokenDuration');
  const { email, password } = req.body;

  user.lookupByEmail(email).then((userObj) => {
    if (!userObj) {
      logger.error('User not found');
      fhirAudit.login(userObj, req.ip, false, email);
      return res.status(401).send();
    }
    if (userObj.checkPassword(password)) {
      fhirAudit.login(userObj, req.ip, true, email);
      const token = jwt.sign({ user: userObj }, secret, { expiresIn: tokenDuration });
      res.status(200).json({ access_token: token });
    } else {
      logger.error('Invalid password');
      fhirAudit.login(userObj, req.ip, false, email);
      return res.status(401).send();
    }
  }).catch((err) => {
    fhirAudit.login({}, req.ip, false, email);
    return res.status(500).send();
  });
});

router.get('/test',
  (req, res) => {
    if (!req.user.accesses) req.user.accesses = 0
    req.user.accesses++
    res.status(200).json({ user: req.user })
  }
)

module.exports = router
