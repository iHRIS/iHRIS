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
const save = nconf.get("save")

if ( !server ) {
    console.log("invalid arguments")
    process.exit(0)
}


// First get all locations and set the location extension.  Cache the hierarchies for later use by practitioners
// This is very memory intensive right now for development speed
//

const processLocation = async (dest, hierarchy, locations) => {
  try {
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      if ( entry.resource.partOf && entry.resource.partOf.reference ) {
        hierarchy["Location/"+entry.resource.id] = entry.resource.partOf.reference
      } else {
        hierarchy["Location/"+entry.resource.id] = false
      }
      locations.push(entry.resource)
    }
    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processLocation(next.url, hierarchy, locations)
    }
  } catch (err) {
    console.log("FAILED TO GET Location",err)
  }
}

const lookupHierarchy = ( begin, hierarchy ) => {
  let results = [ begin ]
  let loc = begin
  while ( hierarchy[loc] ) {
    loc = hierarchy[loc]
    results.unshift( loc )
  }
  return results
}

const resourceSave = (fhir) => {
  let dest = URI(server).segment(fhir.resourceType).segment(fhir.id).toString()
  axios.put( dest, fhir ).then( ( res ) => {
    console.log( dest+": "+ res.status )
    console.log( res.headers['content-location'] )
  } ).catch( (err) => {
    console.error(err)
    console.error(JSON.stringify(err.response.data,null,2))
  } )
}


const roleActive = (period) => {
  let now = new Date( new Date().toISOString().substring(0, 10 ) )
  let start, end
  if ( period.start ) {
    start = new Date( period.start )
  }
  if ( period.end ) {
    end = new Date( period.end )
  }
  return (start ? start <= now : true) && (end ? end >= now : true )
}

const processPractitionerRole = async (dest, hierarchy, locCache, roles) => {
  try {
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      if ( roleActive( entry.resource.period ) && entry.resource.location && entry.resource.location.length > 0 ) {
        let roleHier = []
        for( let loc of entry.resource.location ) {
          let hier = lookupHierarchy( loc.reference, hierarchy )
          for( let loc of hier ) {
            if ( !roleHier.includes(loc) ) {
              roleHier.push( loc )
            }
          }
        }
        if ( entry.resource.practitioner && entry.resource.practitioner.reference ) {
          if ( !locCache[ entry.resource.practitioner.reference ] ) {
            locCache[ entry.resource.practitioner.reference ] = roleHier
          }
        } else {
          if ( !locCache[ "PractitionerRole/" + entry.resource.id ] ) {
            locCache[ "PractitionerRole/" + entry.resource.id ] = roleHier
          }
        }
      }
      roles.push( entry.resource )
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processPractitionerRole(next.url, hierarchy, locCache, roles)
    }

  } catch (err) {
    console.log("FAILED TO GET PractitionerRole",err)
  }
}
const processPractitioner = async (dest, pracs) => {
  try {
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      pracs.push( entry.resource )
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processPractitioner(next.url, pracs)
    }

  } catch (err) {
    console.log("FAILED TO GET Practitioner",err)
  }
}
const processBasic = async (dest, basics) => {
  try {
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      if ( entry.resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ) ) {
        basics.push( entry.resource )
      }
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processBasic(next.url, basics)
    }

  } catch (err) {
    console.log("FAILED TO GET Practitioner",err)
  }
}



const start = async() => {
  let hierarchy = {}
  let locations = []
  let locLookup = URI(server).segment("Location").toString()
  await processLocation( locLookup, hierarchy, locations )
  console.log(Object.keys(hierarchy).length,locations.length)
  for( let loc of locations ) {
    let security = lookupHierarchy( "Location/"+loc.id, hierarchy )
    security = security.map( sec => { return { url: "location", valueString: sec } } )
    if ( !loc.extension ) {
      loc.extension = []
    }
    let current = loc.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-related-group" )
    if ( !current ) {
      current = {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
        extension: []
      } 
      loc.extension.push( current )
    }
    current.extension = current.extension.filter( ext => ext.url !== "location" )
    current.extension = current.extension.concat(security)
    //console.log(JSON.stringify(loc.extension,null,2))
    //console.log( lookupHierarchy( "Location/TF.CC.CAP", hierarchy ) )

    if ( save ) {
      resourceSave( loc )
    } else {
      console.log(JSON.stringify(loc,null,2))
    }


  }
  let roles = []
  let roleLookup = URI(server).segment("PractitionerRole").toString()
  let locCache = {}
  await processPractitionerRole( roleLookup, hierarchy, locCache, roles )
  for( let role of roles ) {
    if ( !role.extension ) {
      role.extension = []
    }
    let current = role.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-related-group" )
    if ( !current ) {
      current = {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
        extension: []
      } 
      role.extension.push( current )
    }
    current.extension = current.extension.filter( ext => ext.url !== "location" && ext.url !== "practitioner" )
    let security = []
    //console.log(role.id,role.practitioner,locCache[ "PractitionerRole/"+role.id])
    if ( role.practitioner && role.practitioner.reference ) {
      current.extension.push( {
        url: "practitioner",
        valueString: role.practitioner.reference
      } )
      if ( locCache[ role.practitioner.reference ] ) {
        security = locCache[ role.practitioner.reference ].map( loc => { return { url: "location", valueString: loc } } )
      }
    } else {
      if ( locCache[ "PractitionerRole/" + role.id ] ) {
        security = locCache[ "PractitionerRole/" + role.id ].map( loc => { return { url: "location", valueString: loc } } )
      }
    }

    current.extension = current.extension.concat(security)
    //console.log(role.id,JSON.stringify(role.extension,null,2))

    if ( save ) {
      resourceSave( role )
    } else {
      console.log(JSON.stringify(role,null,2))
    }

  }

  let pracs = []
  let pracLookup = URI(server).segment("Practitioner").toString()
  await processPractitioner( pracLookup, pracs )
  for( let prac of pracs ) {
    if ( !prac.extension ) {
      prac.extension = []
    }
    let current = prac.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-related-group" )
    if ( !current ) {
      current = {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
        extension: []
      } 
      prac.extension.push( current )
    }
    current.extension = current.extension.filter( ext => ext.url !== "location" && ext.url !== "practitioner" )
    current.extension.push( {
      url: "practitioner",
      valueString: "Practitioner/"+prac.id
    } )
    let security = []
    if ( locCache[ "Practitioner/"+prac.id ] ) {
      security = locCache[ "Practitioner/"+prac.id ].map( loc => { return { url: "location", valueString: loc } } )
    }
 
    current.extension = current.extension.concat(security)
    //console.log(prac.id,JSON.stringify(prac.extension,null,2))

    if ( save ) {
      resourceSave( prac )
    } else {
      console.log(JSON.stringify(prac,null,2))
    }
  }

  let basics = []
  let basicLookup = URI(server).segment("Basic").toString()
  await processBasic( basicLookup, basics )
  for( let basic of basics ) {
    if ( !basic.extension ) {
      basic.extension = []
    }
    let pracId = entry.resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ).valueReference.reference
    let current = basic.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-related-group" )
    if ( !current ) {
      current = {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
        extension: []
      } 
      basic.extension.push( current )
    }
    current.extension = current.extension.filter( ext => ext.url !== "location" && ext.url !== "practitioner" )
    current.extension.push( {
      url: "practitioner",
      valueString: pracId
    } )
    let security = []
    if ( locCache[ pracId ] ) {
      security = locCache[ "Practitioner/"+pracId ].map( loc => { return { url: "location", valueString: loc } } )
    }
 
    current.extension = current.extension.concat(security)
    //console.log(basic.id,JSON.stringify(basic.extension,null,2))
    if ( save ) {
      resourceSave( basic )
    } else {
      console.log(JSON.stringify(basic,null,2))
    }

  }

}

start()


