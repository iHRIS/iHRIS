const fs = require('fs')
const crypto = require('crypto')
const nconf = require('nconf')

/**
 * node createModule.js --key /path/to/private.key --module /path/to/module.js --template /path/to/template.js
 */

nconf.argv()

const privateKey = fs.readFileSync( nconf.get("key") )
const moduleString = fs.readFileSync( nconf.get("module") )
const moduleTemplate = fs.readFileSync( nconf.get("template") )
var moduleLibrary = JSON.parse( moduleTemplate )

var signer = crypto.createSign( 'sha256' )
signer.update( moduleString )
moduleLibrary.content[0].data = signer.sign( privateKey, 'base64' )
moduleLibrary.content[1].data = moduleString.toString( 'base64' )

console.log( JSON.stringify( moduleLibrary, null, 2 ) )
