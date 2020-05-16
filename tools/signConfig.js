const fs = require('fs')
const crypto = require('crypto')
const nconf = require('nconf')

/**
 * node signConfig.js --key /path/to/private.key --config /path/to/Parameters.json 
 */

var valueSignature = {
  "type": [
    {
      "system": "urn:iso-astm:E1762-95:2013",
      "code": "1.2.840.10065.1.12.1.14"
    }
  ],
  "when": new Date().toISOString(),
  "who": {
    "reference": "http://ihris.org/fhir/Organization/ihris"
  },
  "data": ""
}

nconf.argv()

const privateKey = fs.readFileSync( nconf.get("key") )
const configString = fs.readFileSync( nconf.get("config") )

var params = JSON.parse( configString )
var signer = crypto.createSign( 'sha256' )
signer.update( JSON.stringify( params.parameter[1].part ) )
valueSignature.data = signer.sign( privateKey, 'base64' )
params.parameter[0].valueSignature = valueSignature

console.log( JSON.stringify( params, null, 2 ) )

