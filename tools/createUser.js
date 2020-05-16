const fs = require('fs')
const crypto = require('crypto')
const nconf = require('nconf')

/**
 * node createUser.js --id id --name "Full Name" --email user@email.com --password /path/to/file/with/password
 */

nconf.argv()

const id = nconf.get("id")
const fullName = nconf.get("name")
const email = nconf.get("email")

var user = {
  "resourceType" : "Person",
  "id" : id,
  "meta" : {
    "profile" : [
      "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
    ]
  },
  "extension" : [
    {
      "url" : "http://ihris.org/fhir/StructureDefinition/ihris-user-role",
      "valueReference" : {
        "reference" : "Basic/ihris-role-admin"
      }
    },
  ],
  "name" : [
    {
      "use" : "official",
      "text" : fullName
    }
  ],
  "telecom" : [
    {
      "system" : "email",
      "value" : email
    }
  ]
}


if ( nconf.get("password") ) {
  const password = fs.readFileSync( nconf.get("password") ).toString().trim()
  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = crypto.pbkdf2Sync( password, salt, 1000, 64, 'sha512').toString('hex')
  var passwordExtension = {
    "url" : "http://ihris.org/fhir/StructureDefinition/ihris-password",
    "extension" : [
      {
        "url" : "password",
        "valueString" : passwordHash
      },
      {
        "url" : "salt",
        "valueString" : salt
      }
    ]
  }
  user.extension.push( passwordExtension )
}

console.log( JSON.stringify( user, null, 2 ) )
