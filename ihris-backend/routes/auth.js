const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const user = require('../modules/user')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy


passport.use( new GoogleStrategy( 
  {
    clientID: nconf.get("auth:google:clientId"),
    clientSecret: nconf.get("auth:google:clientSecret"),
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile)

    user.lookupByProvider( 'google', profile.id ).then( (userObj) => {
      if ( userObj ) {
        done(null, userObj.resource)
      } else {
        console.log(profile.id+" not found in current users, checking by email.")
        let email = profile.emails.find( em => em.verified === true )
        if ( email && email.value ) {
          console.log( "looking for "+email.value )
          user.lookupByEmail( email.value ).then( (userObj) => {
            if ( !userObj.resource.identifier ) userObj.resource.identifier = []
            userObj.resource.identifier.push( { system: 'google', value: profile.id } )
            userObj.update().then( (response) => {
              done( null, response )
            } ).catch( (err) => {
              console.log("Failed to update user with provider id for google.")
              console.error(err)
              done( null, userObj.resource )
            } )
          } ).catch( (err) => {
            done( err )
          } )
        } else {
          console.log("Couldn't find verified email in profile.")
          done( null, false )
        }
      }
    } ).catch( (err) => {
      done( err )
    } )
  }
) )

passport.use( new LocalStrategy(
  ( email, password, done ) => {
    console.log(email)

    user.lookupByEmail( email ).then( (userObj) => {
      if ( !userObj ) {
        done( null, false )
      } else {
        if ( userObj.checkPassword( password ) ) {
          done( null, userObj.resource )
        } else {
          done( null, false )
        }
      }
    } ).catch( (err) => {
      done( err )
    } )
  }
) )

passport.serializeUser( (user,callback) => {
  callback(null, user.id)
} )
passport.deserializeUser( (id,callback) => {
  user.find( id ).then( (userObj) => {
    callback(null, userObj.resource)
  } ).catch( (err) => {
    callback( err )
  } )
} )

router.use(passport.initialize())
router.use(passport.session())

router.passport = passport

router.get('/google', passport.authenticate('google', { scope: ['email'] } ) )
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
