const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const crypto = require('crypto')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy


passport.use( new GoogleStrategy( 
  {
    clientID: nconf.get("auth:google:clientId"),
    clientSecret: nconf.get("auth:google:clientSecret"),
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, callback) => {
    console.log(profile)
    return callback(null, profile)
  }
) )

passport.use( new LocalStrategy(
  ( email, password, done ) => {
    console.log(email)
    fhirAxios.search( "Person", { telecom: "email|"+email } ).then( (response) => {
      console.log(response)
      if ( response.total == 0 ) {
        done( null, false )
      } else if ( response.total > 1 ) {
        console.error( "Multiple users found for " +email )
        done( null, false )
      }
      var details = response.entry[0].resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password" )
      if ( !details ) {
        console.error( "Couldn't find password hash for user with " +email )
        done( null, false )
      }
      var hash = details.extension.find( ext => ext.url === "password" )
      var salt = details.extension.find( ext => ext.url === "salt" )
      if ( !hash || !hash.valueString || !salt || !salt.valueString ) {
        console.error( "Couldn't find hash or salt for user with " +email )
        done( null, false )
      }
      var compare = crypto.pbkdf2Sync( password, salt.valueString, 1000, 64, 'sha512' ).toString('hex')
      if ( compare !== hash.valueString ) {
        console.error( "Password didn't match for user with "+email )
        done( null, false )
      } else {
        done( null, response.entry[0].resource )
      }
    } ).catch( (err) => {
      console.log(err)
      done( err )
    } )
  }
) )

passport.serializeUser( (user,callback) => {
  callback(null, user)
} )
passport.deserializeUser( (obj,callback) => {
  callback(null, obj)
} )

router.use(passport.initialize())
router.use(passport.session())

router.passport = passport

router.get('/google', passport.authenticate('google', { scope: ['email','profile'] } ) )
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' } ),
  ( req, res ) => {
    res.status(200).json({"user":req.user})
  }
)

router.post("/login",
  passport.authenticate('local', { failureRedirect: '/' } ),
  ( req, res ) => {
    res.status(200).json({"user":req.user})
  }
)


router.get('/test',
  ( req, res ) => {
    res.status(200).json({"user":req.user})
  }
)

module.exports = router
