const request = require('request')
const nconf = require('nconf')
const fs = require('fs')
const Fhir = require('fhir').Fhir

nconf.argv()

const convert = new Fhir()
const server = nconf.get('server')

if ( !server ) {
    console.log("invalid arguments")
    process.exit(0)
}

for ( let file of nconf.get('_') ) {
    console.log("Reading "+file+"...")
    fs.readFile( file, ( err, data ) => {
      if ( err ) throw err
      let fhir
      if ( file.substring( file.length - 3 ) === 'xml' ) {
        fhir = convert.xmlToObj( data )
      } else {
        fhir = JSON.parse( data )
      }
      let dest = ""
      if ( fhir.resourceType === "Bundle" &&
        ( fhir.type === "transaction" || fhir.type === "batch" ) ) {
        console.log( "Saving " + fhir.type )
        dest = server
        request.post( dest, {
          json: fhir
        }, ( err, res, body ) => {
          if ( err ) throw err
          console.log( dest+": "+ res.statusCode )
          console.log( JSON.stringify( res.body, null, 2 ) )
        } )
      } else {
        console.log( "Saving " + fhir.resourceType +" - "+fhir.id )
        dest = server + fhir.resourceType + "/" + fhir.id
        request.put( dest, {
          json: fhir
        }, ( err, res, body ) => {
          if ( err ) throw err
          console.log( dest+": "+ res.statusCode )
          console.log( res.headers['content-location'] )
        } )
      }

    })
}
