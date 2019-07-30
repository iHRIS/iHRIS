const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const request = require('request-promise-native')
const structureDefinition = require('./structureDefinition')
const Fhir = require('fhir').Fhir

const fhir = new Fhir()

const flattenComplex = ( extension ) => {
  let results = {}
  for( let ext of extension ) {
    let value = ""
    for( let key of Object.keys(ext) ) {
      if ( key !== "url" ) {
        value = ext[key]
      }
    }
    if ( results[ ext.url ] ) {
      if ( Array.isArray( results[ ext.url ] ) ) {
        results[ext.url].push( value )
      } else {
        results[ext.url] = [ results[ext.url], value ]
      }
    } else {
      results[ext.url] = value
    }
  }
  return results
}

const matchQuery = ( query, obj ) => {
  if ( query === "" ) return true
  let queries = query.split( '&' )
  var result = true
  for( let qry of queries ) {
    let match = qry.split('=')
    if ( match.length !== 2 ) {
      console.error( "INVALID query: " +query )
      return false
    } else {
      result = result && obj[ match[0] ] === match[1]
    }
  }
  return result
}

const singleDeterminate = ( val1, val2, func ) => {
  if ( func === "" ) {
    return true
  } else if ( func === 'max' ) {
    if ( val1 >= val2 ) return true
  } else if ( func === 'min' ) {
    if ( val1 <= val2 ) return true
  }
  return false
}

var promises = []

request( { uri: config.fhir.server + "Basic/staff", json: true } )
.then( (relationship ) => {

  let sd = relationship.subject.reference.substring( relationship.subject.reference.lastIndexOf( '/' ) )

  structureDefinition( config.fhir.server, sd, ( err, subject ) => {
    if ( err ) {
      console.error( err )
      return
    }
    //console.log(JSON.stringify(relationship,null,2))
    let details = relationship.extension.find( ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' )
    let links = relationship.extension.filter( ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportLink' )

    //console.log( details )

    let reportDetails = flattenComplex( details.extension )

    let uri = config.fhir.server + subject._type + "?_count=10000&_total=accurate&_profile=" + subject._url +"&"+ reportDetails.query
    console.log( uri )

    //let elastic = []
    let reLinks = []

    for( let link of links ) {
      let linkInfo = flattenComplex( link.extension )
      reLinks.push( linkInfo )
      //console.log(linkInfo)
      promises.push( request( { uri: config.fhir.server + "StructureDefinition/" + linkInfo.resource, json: true } ) )
    }

    Promise.all( promises ).then ( (results) => {
      let mainResource = {}
      let incResource = {}
      for( let idx in results ) {
        let res = results[idx]
        let linkInfo = reLinks[idx]
        //console.log(res.kind)
        if ( res.kind === 'complex-type' && linkInfo.linkTo === undefined ) {
          element = linkInfo.linkElement.substring( subject._type.length + 1 )
          mainResource[element] = linkInfo
        } else {
          incResource[ linkInfo.name ] = linkInfo
        }
      }
      //console.log(mainResource)

      request( { uri, json: true } ).then( (results) => {
        const matches = results.entry.filter( entry => entry.search.mode === 'match' )
        const includes = results.entry.filter( entry => entry.search.mode === 'include' )
        for( let entry of matches ) {
          //console.log( entry.resource )
          let record = { id: entry.resource.id }
          for( let ele of reportDetails.element ) {
            record[ele] = entry.resource[ele]
          }


          // manual role
          // Need to convert this to read from resource, but getting something working for now.
          const refId = entry.resource.resourceType + "/" + entry.resource.id
          const roleRes = includes.find( inc => inc.resource.resourceType === "PractitionerRole" && inc.resource.practitioner.reference === refId && inc.resource.active === true && inc.resource.period.end === undefined )
        
          if ( roleRes ) {
            let role = {}
  
            if ( !Array.isArray( incResource["role"].element ) ) {
              incResource["role"].element = [ incResource["role"].element ]
            }
            for( let sub of incResource["role"].element ) {
              role[sub] = fhir.evaluate( roleRes.resource, sub )
            }
            record["role"] = role

            const locId = fhir.evaluate( roleRes.resource, "location.reference" ).substring( incResource["location"].resource.length+1 )
            const locRes = includes.find( inc => inc.resource.resourceType === "Location" && inc.resource.id === locId )
            if ( locRes ) {
              let loc = {}
              if ( !Array.isArray( incResource["location"].element ) ) {
                incResource["location"].element = [ incResource["location"].element ]
              }
              for( let sub of incResource["location"].element ) {
                loc[sub] = fhir.evaluate( locRes.resource, sub )
              }
              record["role"]["location"] = loc
            }

            const posId = fhir.evaluate( roleRes.resource, "extension.where(url='http://ihris.org/fhir/StructureDefinition/iHRISPractitionerRoleDetails').extension.where(url='position').valueReference.reference" )[0].substring( incResource["position"].resource.length+1 )
            const posRes = includes.find( inc => inc.resource.resourceType === "Basic" && inc.resource.id === posId )
            if ( posRes ) {
              let pos = {}
              if ( !Array.isArray( incResource["position"].element ) ) {
                incResource["position"].element = [ incResource["position"].element ]
              }
              for( let sub of incResource["position"].element ) {
                pos['title'] = fhir.evaluate( posRes.resource, sub )[0]
              }
              record["role"]["position"] = pos
            }

          }
          // end of need to convert


          for ( let ele of Object.keys(mainResource) ) {

            let matched = []
            let matchedIdx = 0
            for( complex of entry.resource[ele] ) {
              if ( matchQuery( mainResource[ele].query, complex ) ) {
                let subEle = {}
                for( let sub of mainResource[ele].element ) {
                  subEle[sub] = fhir.evaluate( complex, sub )
                }
                if ( mainResource[ele].uniqueElement ) {
                  let uniques = mainResource[ele].uniqueElement.split(',')
                  let idx = ""
                  for( let unique of uniques ) {
                    idx += complex[unique]
                  }
                  subEle.__idx = idx
                } else {
                  subEle.__idx = matchedIdx++
                }
                matched.push(subEle)
              }
            }

            if ( mainResource[ele].multiple ) {
              for ( let match of matched ) {
                let idx = match.__idx
                delete( match.__idx )
                record[ele+idx] = match
              }
            } else {
              let single
              for( let match of matched ) {
                if ( !single ) {
                  single = match
                } else {
                  if ( mainResource[ele].singleDeterminateFunction ) {
                    if ( !singleDeterminate( single.__idx, match.__idx, mainResource[ele].singleDeterminateFunction ) ) {
                      single = match
                    }
                  } else {
                    break
                  }
                }
              }
              delete( single.__idx )
              record[ele] = single
              break
            }


          }
          request( { uri: config.elastic.server + "staff/_doc/" + record.id, method: "POST", json: record } ).then( (results) => {
            console.log(" saved " + record.id)
            console.log(results)
          }).catch( (err) => {
            console.error( err )
          })
          //elastic.push( record )
        }
        //console.log( JSON.stringify(elastic,null,2) )
      }).catch( (err) => {
        console.error( err )
      })


    }).catch( (err) => {
      console.error( err )
    })




    //console.log(reportDetails)
    //console.log( JSON.stringify(links,null,2) )
    //console.log( flattenComplex( links[0].extension ) )
  })


}).catch( (err) => {
  console.error( err )
})
