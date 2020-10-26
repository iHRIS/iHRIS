const http = require('http')
const axios = require('axios')
const nconf = require('nconf')
const fs = require('fs')
const URI = require('urijs');
const Fhir = require('fhir').Fhir

http.globalAgent.maxSockets = 8

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
      if ( fhir.resourceType === "Bundle" &&
        ( fhir.type === "transaction" || fhir.type === "batch" ) ) {
        console.log( "Saving " + fhir.type )
        let dest = URI(server).toString()
        axios.post( dest, fhir ).then( ( res ) => {
          console.log( dest+": "+ res.status )
          console.log( JSON.stringify( res.data, null, 2 ) )
        } ).catch( (err) => {
          console.error(err)
        } )
      } else {
        console.log( "Saving " + fhir.resourceType +" - "+fhir.id )
        let dest = URI(server).segment(fhir.resourceType).segment(fhir.id).toString()
        axios.put( dest, fhir ).then( ( res ) => {
          console.log( dest+": "+ res.status )
          console.log( res.headers['content-location'] )
        } ).catch( (err) => {
          console.error(err)
          console.error(JSON.stringify(err.response.data,null,2))
        } )
      }

    })
}
