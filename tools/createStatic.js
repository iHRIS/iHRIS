const fs = require('fs')
const nconf = require('nconf')

/**
 * node createStatic.js --doc /path/to/template.json --content /path/to/content --title "TITLE" --type Content-Type
 * Need to add more options for additional fields like author/email
 */

nconf.argv()

const docString = fs.readFileSync( nconf.get("doc") )
const contentString = fs.readFileSync( nconf.get("content") )
const doc = JSON.parse( docString )

doc.content[0].attachment = {
  contentType: nconf.get("type") || "text/markdown",
  data: contentString.toString('base64'),
  title: nconf.get("title")
}

//let doc64 = Buffer.from( doc.content[0].attachment.data, 'base64' )
console.log( JSON.stringify(doc,null,2) )
