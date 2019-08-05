const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const request = require('request-promise-native')
const ParseConformance = require('./parseConformance').ParseConformance

const parser = new ParseConformance( true )

var structureDefinition = ( server, main, callback ) => {

  var promises = []

  request( {uri: server + "StructureDefinition/"+ main, json: true } )
  .then( (ip) => {
    let extensions = {}

    for( let ele of ip.snapshot.element ) {
      if ( ele.type ) {
        for( let type of ele.type ) {
          if ( type.profile ) {
            for( let profile of type.profile ) {
              extensions[profile] = true
            }
          }
        }
      }
    }

    for( let ext in extensions ) {
      let pieces = ext.split('/')
      let sd = pieces[pieces.length-1]
      promises.push( request( { uri: server + "StructureDefinition/"+ sd, json: true } ) )

    }

    Promise.all( promises ).then( (results) => {
      for( let res of results ) {
        parser.parseStructureDefinition( res )
      }
      callback( null, parser.parseStructureDefinition( ip ) )
    } ).catch( (err) => {
      callback( err )
    })

  }).catch( (err) => {
    callback( err )
  } )

}

module.exports = structureDefinition
