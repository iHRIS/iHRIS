const fs = require('fs')
const nconf = require('nconf')

/**
 * node displayStatic.js --doc /path/to/doc.json
 * Need to add more options for additional fields like author/email
 */

nconf.argv()

const docString = fs.readFileSync( nconf.get("doc") )
const doc = JSON.parse( docString )

let doc64 = Buffer.from( doc.content[0].attachment.data, 'base64' )
console.log( doc64.toString('ascii') )
