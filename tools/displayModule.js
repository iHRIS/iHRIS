const fs = require('fs')
const crypto = require('crypto')
const nconf = require('nconf')

/**
 * node createModule.js --module /path/to/module.json
 * Need to add more options for additional fields like author/email
 */

nconf.argv()

const moduleString = fs.readFileSync( nconf.get("module") )
const library = JSON.parse( moduleString )

let module64 = Buffer.from( library.content[1].data, 'base64' )
console.log( module64.toString('ascii') )
