const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const user = require('../modules/user')
const winston = require('winston')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const fhirAxios = nconf.fhirAxios
const fhirAudit = require('../modules/fhir/fhirAudit')
const sendEmail = require('../modules/sendEmail')
const clientUrl = nconf.get('auth:CLIENT_URL')

const passport = require('passport')
const logger = require("fhir2es/winston");
const {v4: uuidv4} = require("uuid");
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
          winston.debug(profile.id + " not found in current users, checking by email.")
          let email = profile.emails.find(em => em.verified === true)
          if (email && email.value) {
            user.lookupByEmail(email.value).then((userObj) => {
              if (!userObj.resource.identifier) userObj.resource.identifier = []
              userObj.resource.identifier.push({system: 'google', value: profile.id})
              fhirAudit.login(userObj, req.ip, true, email.value)
              userObj.update().then((response) => {
                done(null, userObj)
              }).catch((err) => {
                winston.info("Failed to update user with provider id for google.")
                winston.error(err.message)
                done(null, userObj)
              })
            }).catch((err) => {
              fhirAudit.login({}, req.ip, false, email.value)
              done(err)
            })
          } else {
            winston.info("Couldn't find verified email in profile.")
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

passport.use('local', new LocalStrategy({passReqToCallback: true},
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

router.use(passport.initialize())
router.use(passport.session())

router.passport = passport

router.get('/',
    (req, res, next) => {
      if (req.user) {
        res.status(200).json({ok: true})
      } else {
        next()
      }
    },
    passport.authenticate('custom-loggedout', {}),
    (req, res) => {
      if (req.user) {
        res.status(200).json({ok: true})
      } else {
        res.status(200).json({ok: false})
      }
    }
)

router.get('/logout',
    passport.authenticate('custom-loggedout', {}),
    (req, res) => {
      if (req.user) {
        res.status(200).json({ok: true})
      } else {
        res.status(200).json({ok: false})
      }
    }
)

router.get('/google', passport.authenticate('google', {scope: ['email']}))
router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/', successRedirect: '/'})
)

router.post("/signup", (req, res) => {
  user
      .lookupByEmail(req.body.username)
      .then(async (userObj) => {
        if (userObj) {
          return res.status(409).send("User already exists");
        } else {
          fhirAxios.search('Practitioner', {
            "birthDate:exact" : req.body.birthDate,
            "employeeNumber:exact": req.body.employeeNumber
          }).then((usersRes) => {
            if (!usersRes.entry || (usersRes.entry && usersRes.entry.length === 0)) {
              res.status(404).json({ok: false, name: req.body.name})
            } else {
              let userEmail = usersRes.entry[0].resource.telecom.find((x) => x.system === "email")
              if (userEmail && userEmail.value) {
                if (userEmail.value.toLowerCase() !== req.body.username.toLowerCase()) {
                  res.status(402).send("Email does not match");
                } else {
                  let userId = uuidv4()
                  let givenName = usersRes.entry[0].resource.name[0].given[0]
                  let familyName = usersRes.entry[0].resource.name[0].family
                  let fullName = familyName + " " + givenName
                  const entryTemplate = {
                    resource: {
                      "resourceType": "Person",
                      "id": "ihris-user-",
                      "meta": {
                        "profile": ["http://ihris.org/fhir/StructureDefinition/ihris-person-user"]
                      },
                      "extension": [{
                        "url": "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                        "valueReference": {
                          "reference": "Basic/ihris-role-self"
                        }
                      }, {
                        "url": "http://ihris.org/fhir/StructureDefinition/ihris-user-practitioner",
                        "valueReference": {
                          "reference": "Practitioner/"
                        }
                      }, {
                        "url": "http://ihris.org/fhir/StructureDefinition/ihris-first-time-login",
                        "valueBoolean": true
                      }
                      ],
                      "name": [{
                        "use": "official",
                        "text": ""
                      }],
                      "telecom": [{
                        "system": "email",
                        "value": ""
                      }]
                    },
                    request: {
                      method: "PUT",
                      url: "Person/ihris-user-"
                    }
                  }
                  let entry = JSON.parse(JSON.stringify(entryTemplate))
                  entry.resource.telecom[0].value = req.body.username
                  entry.resource.extension[1].valueReference.reference += usersRes.entry[0].resource.id
                  entry.resource.name[0].text = fullName
                  let password = uuidv4()
                  let resetToken = crypto.randomBytes(64).toString('hex')
                  let passwordExtension = hashPassword(password, userId, resetToken)
                  entry.resource.extension.push(passwordExtension)
                  let user = {
                    resourceType: "Person",
                    meta: {
                      profile: ["http://ihris.org/fhir/StructureDefinition/ihris-person-user"]
                    },
                    name: [{
                      "use": "official",
                      "text": fullName
                    }],
                    telecom: [{
                      "system": "email",
                      "value": req.body.username
                    }],
                    extension: entry.resource.extension,
                  }
                  let bundle = {
                    resourceType: "Bundle",
                    type: "transaction",
                    entry: [],
                  };
                  bundle.entry.push({
                    resource: user,
                    request: {
                      method: "PUT",
                      url: `Person/${userId}`
                    }
                  })
                  let email = req.body.username;
                  let subject = `New Account for ${fullName}!`
                  const link = `${clientUrl}/change-password?token=${resetToken}&userId=${userId}`;
                  fhirAxios.create(bundle).then((response) => {
                    res.status(200).json({ok: true, name: fullName,link:link})
                    sendEmail(email, subject, {
                      name: fullName,
                      link: link
                    }, "../emailTemplate/createAccount.handlebars").then(res => console.log(JSON.stringify(res,null,2)))
                  }).catch((err) => {
                    console.log("ERROR", err)
                    logger.error(err)
                  })
                }
              } else {
                return res.status(403).send("Register your email in first");
              }
            }
          })
        }
      })
})

router.post("/login", passport.authenticate('local', {}), (req, res) => {
      let name = "Unknown"
      let location = ""
      let role = ""
      let reference = ""
      try {
        req.user.resource.extension.forEach(ext => {
          if (ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-location") {
            location = ext.valueReference.reference
          }

          if (ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-practitioner") {
            reference = ext.valueReference.reference
          }

          if (ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-assign-role") {
            let _role = ext.valueReference.reference.split("/")
            role = _role.pop()
          }
        })
        name = req.user.resource.name[0].text
      } catch (err) {
        console.error("Error ", err)
      }
      res.status(200).json({ok: true, user: {name: name, location: location, role: role, reference: reference}})
    }
)
router.post("/password-reset-request", async (req, res) => {
  let resetEmail = req.body.email

  if (resetEmail === undefined) {
    logger.error("No email provided.")
    return res.status(400).send();
  }

  try {
    user.lookupByEmail(resetEmail.toString()).then((userObj) => {
      if (userObj) {
        let resetToken = crypto.randomBytes(64).toString('hex')
        let hash = crypto.pbkdf2Sync(userObj.resource.id, resetToken, 1000, 64, 'sha512').toString('hex')
        if(userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken") === undefined){
          userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.push({
            "url": "resetPasswordToken",
            "valueString": ""
          })
        }
        if(userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry") === undefined){
          userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.push({
            "url": "resetPasswordExpiry",
            "valueString": ""
          })
        }
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString = hash
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString = new Date(Date.now() + (60 * 60 * 1000))
        userObj.update().then((response) => {
          let link = `${clientUrl}/reset-password?token=${resetToken}&userId=${userObj.resource.id}`;
          let name = response.name[0].text;
          let email = response.telecom[0].value;
          let subject = "Password Reset Request";

          res.status(200).json({
            "ok": true,
            "message": "Password reset request sent successfully",
            "link": link
          })

          sendEmail(email, subject, {
            name: name,
            link: link
          }, "../emailTemplate/passwordReset.handlebars").then(res => console.log(res))

        }).catch((err) => {
          logger.error(err.message)
          res.status(500).json({
            "ok": false,
            "message": "Failed to update user object"
          })
        })
      } else {
        res.status(500).json({
          "ok": false,
          "message": "No Account found with this email"
        })
      }
    }).catch((err) => {
      logger.error(err.message)
      res.status(500).json({
        "ok": false,
        "message": "Failed to lookup user object"
      })

    });
  } catch (err) {
    logger.error(err.message)
    return res.status(500).send();

  }


})

router.post("/reset-password", async (req, res) => {
  let token = req.query.token;
  let userId = req.query.userId
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;
  user.find(userId).then((userObj) => {
    let resetPasswordToken = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString
    let resetPasswordExpiry = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString

    if (!resetPasswordToken) {
      logger.error("Invalid or expired password reset token")
      return res.status(400).json({ok: false, message: "Invalid or expired password reset token"})
    }

    if (newPassword !== confirmPassword) {
      logger.error("New password and confirm password do not match")
      return res.status(400).json({ok: false, message: "New password and confirm password do not match"})
    }
    let hashedToken = crypto.pbkdf2Sync(userId, token, 1000, 64, 'sha512').toString('hex')
    if (hashedToken === resetPasswordToken) {
      if (new Date(resetPasswordExpiry) < new Date()) {
        logger.error("Invalid or expired password reset token")
        return res.status(400).json({
          "ok": false,
          "message": "Invalid or expired password reset token"
        });
      } else {
        let newPasswordSalt = crypto.randomBytes(16).toString('hex')
        let newHashedPassword = crypto.pbkdf2Sync(newPassword, newPasswordSalt, 1000, 64, 'sha512').toString('hex')
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "password").valueString = newHashedPassword
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "salt").valueString = newPasswordSalt
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString = ""
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString = ""

        userObj.update().then((resp) => {
          let name = resp.name[0].text;
          let email = resp.telecom[0].value;
          let subject = "Password Reset Successfully"

          res.status(200).json({
            "ok": true,
            "message": "Password reset successfully"
          });

          sendEmail(email, subject, {
            name: name,
          }, "../emailTemplate/resetPassword.handlebars")

        }).catch((err) => {
          logger.error(err.message)
          return res.status(500).json({
            "ok": false,
            "message": "Failed to update user object" + err.message
          });
        })
      }
    } else {
      logger.error("Invalid or expired password reset token")
      return res.status(400).json({
        "ok": false,
        "message": "Invalid or expired password reset token"
      });
    }
    // hash the new password

  }).catch((err) => {
    logger.error(err.message)
    return res.status(500).json({
      "ok": false,
      "message": "Failed to lookup user object" + err.message
    });
  })
})

router.post("/change-password", async (req, res) => {
  let token = req.query.token;
  let userId = req.query.userId
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;
  user.find(userId).then((userObj) => {
    let resetPasswordToken = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString
    let resetPasswordExpiry = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString
    let isFirstTime = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-first-time-login").valueBoolean
    if (!resetPasswordToken) {
      logger.error("Invalid or expired password reset token")
      return res.status(400).json({ok: false, message: "Invalid or expired password reset token"})
    }

    if (newPassword !== confirmPassword) {
      logger.error("New password and confirm password do not match")
      return res.status(400).json({ok: false, message: "New password and confirm password do not match"})
    }
    let hashedToken = crypto.pbkdf2Sync(userId, token, 1000, 64, 'sha512').toString('hex')
    if (hashedToken === resetPasswordToken && isFirstTime) {
      if (new Date(resetPasswordExpiry) < new Date()) {
        logger.error("Invalid or expired password reset token")
        return res.status(400).json({
          "ok": false,
          "message": "Invalid or expired password reset token"
        });
      } else {
        let newPasswordSalt = crypto.randomBytes(16).toString('hex')
        let newHashedPassword = crypto.pbkdf2Sync(newPassword, newPasswordSalt, 1000, 64, 'sha512').toString('hex')
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "password").valueString = newHashedPassword
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "salt").valueString = newPasswordSalt
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString = ""
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString = ""
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-first-time-login").valueBoolean = false

        userObj.update().then((resp) => {
          let email = resp.telecom[0].value;
          let subject = "Password Changed Successfully";
          let name = resp.name[0].text;

          sendEmail(email, subject, {
            name:name
          }, "../emailTemplate/changePassword.handlebars")

          return res.status(200).json({
            "ok": true,
            "message": "Password changed successfully"
          });

        }).catch((err) => {
          logger.error(err.message)
          return res.status(500).json({
            "ok": false,
            "message": "Failed to update user object" + err.message
          });
        })
      }
    } else {
      logger.error("Invalid or expired password reset token")
      return res.status(400).json({
        "ok": false,
        "message": "Invalid or expired password reset token"
      });
    }
    // hash the new password

  }).catch((err) => {
    logger.error(err.message)
    return res.status(500).json({
      "ok": false,
      "message": "Failed to lookup user object" + err.message
    });
  })
})


router.post('/token', (req, res) => {
  // For API Access only
  logger.info('Generating token');
  const secret = nconf.get('auth:secret');
  const tokenDuration = nconf.get('auth:tokenDuration');
  const {email, password} = req.body;

  user.lookupByEmail(email).then((userObj) => {
    if (!userObj) {
      winston.error('User not found');
      fhirAudit.login(userObj, req.ip, false, email);
      return res.status(401).send();
    }
    if (userObj.checkPassword(password)) {
      fhirAudit.login(userObj, req.ip, true, email);
      const token = jwt.sign({user: userObj}, secret, {expiresIn: tokenDuration});
      res.status(200).json({access_token: token});
    } else {
      winston.error('Invalid password');
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
      res.status(200).json({user: req.user})
    }
)

function hashPassword(password1, userId, resetToken) {
  const password = password1.toString().trim()
  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  let hash = crypto.pbkdf2Sync(userId, resetToken, 1000, 64, 'sha512').toString('hex')
  let expireTime = new Date(Date.now() + (60 * 60 * 1000))
  return {
    "url": "http://ihris.org/fhir/StructureDefinition/ihris-password",
    "extension": [
      {
        "url": "password",
        "valueString": passwordHash
      },
      {
        "url": "salt",
        "valueString": salt
      },
      {
        "url": "resetPasswordToken",
        "valueString": hash
      }, {
        "url": "resetPasswordExpiry",
        "valueString": expireTime
      }
    ]
  };
}


module.exports = router
