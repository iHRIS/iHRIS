const fs = require('fs')
const crypto = require('crypto')
const nconf = require('nconf')

/**
 * node createModule.js --key /path/to/private.key --module /path/to/module.js
 * Need to add more options for additional fields like author/email
 */

var moduleLibrary = {
  "resourceType": "Library",
  "id": "ihris-module-example",
  "meta": {
    "profile": [
      "http://ihris.org/fhir/StructureDefinition/ihris-module"
    ]
  },
  "type": {
    "coding": [
      {
        "code": "logic-library"
      }
    ]
  },
  "content": [
    {
      "title": "module-signature",
      "contentType": "text/x-sig",
      "data": "TEST"
    },
    {
      "title": "module-code",
      "contentType": "application/javascript",
      "data": "TEST"
    }
  ],
  "status": "active",
  "name": "ihris-example",
  "title": "iHRIS Example Module",
  "author": [
    {
      "name": "Test Author",
      "telecom": [
        {
          "system": "email",
          "value": "test@ihris.org"
        }
      ]
    }
  ]
}

nconf.argv()

const privateKey = fs.readFileSync( nconf.get("key") )
const moduleString = fs.readFileSync( nconf.get("module") )

var signer = crypto.createSign( 'sha256' )
signer.update( moduleString )
moduleLibrary.content[0].data = signer.sign( privateKey, 'base64' )
moduleLibrary.content[1].data = moduleString.toString( 'base64' )

console.log( JSON.stringify( moduleLibrary, null, 2 ) )
