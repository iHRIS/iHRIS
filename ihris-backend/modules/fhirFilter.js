const fhirpath = require('fhirpath')
const isEmpty = require('is-empty')

const isObject = (obj) => {
  return (!!obj) && (obj.constructor === Object)
}

const DENIED_OUTCOME = {
  resourceType: "OperationOutcome",
  issue: [
    {
      severity: "error",
      code: "forbidden",
      diagnostics: "Access Denied"
    }
  ]
}

const filterLevel = ( prefix, level, allowed ) => {
  prefix = (prefix ? prefix + "." : "")
  let fields = Object.keys( level )
  for( let field of fields ) {
    // Check to see if the entire element is allowed
    if ( allowed.includes( prefix + field ) ) {
      continue
    }
    if ( Array.isArray( level[field] ) ) {
      noObjects = true
      for( let entry of level[field] ) {
        if ( isObject( entry ) ) {
          filterLevel( prefix + field, entry, allowed )
          noObjects = false
        }
      }
      if ( noObjects ) {
        // No objects in the array, so check to see if the field is allowed in the filter
        // if not, delete it
        if ( !allowed.includes( prefix+field ) ) {
          delete level[field]
        }
      } else {
        /*
        if ( level[field].reduce( (acc, curr) => isEmpty(curr) && acc, true ) ) {
          delete level[field]
        }
        */
        level[field] = level[field].filter( obj => !isEmpty(obj) )
        if ( level[field].length === 0 ) {
          delete level[field]
        }
      }
    } else if ( isObject( level[field] ) ) {
      filterLevel( prefix + field, level[field], allowed )
      if ( isEmpty( level[field] ) ) {
        delete level[field]
      }
    } else {
      // Not an array or object, so check to see if it's allowed and delete if not
      if ( !allowed.includes( prefix+field ) ) {
        delete level[field]
      }
    }
  }
}

const runFilter = ( resource, fields, ignoreDefaults ) => {
  let allowed = [ "resourceType", "id", "meta" ]
  if ( ignoreDefaults ) {
    allowed = fields
  } else {
    allowed = allowed.concat(fields)
  }
  filterLevel( null, resource, allowed )
  if ( !ignoreDefaults ) {
    if ( !resource.meta.hasOwnProperty("tag") ) {
      resource.meta.tag = []
    }
    resource.meta.tag.push( {
      "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationValue",
      "code": "SUBSETTED",
    } )
  }
}

const fhirFilter = {
  meetsConstraint: ( resource, constraint ) => {
    let query = "exists("+constraint+")"
    // Since it starts with exists, should return a single value in an array
    let match = fhirpath.evaluate( resource, query )
    let meets = false
    if ( match.length > 0 ) {
      meets = match.reduce( (accumulator, currentValue) => accumulator && currentValue )
    }
    return meets
  },
  filter: ( resource, fields, ignoreDefaults ) => {
    let copy = JSON.parse(JSON.stringify(resource))
    runFilter( copy, fields, ignoreDefaults )
    return copy
  },
  filterInline: ( resource, fields, ignoreDefaults ) => {
    runFilter( resource, fields, ignoreDefaults )
  },
  filterBundle: ( permission, bundle, user ) => {
    // if full access to the resource is allowed then cache and reuse it
    let typeCache = {}
    for ( let entry of bundle.entry ) {
      let resource = entry.resource
      let fullAccess = false
      if ( typeCache.hasOwnProperty( resource.resourceType ) ) {
        fullAccess = typeCache[resource.resourceType]
      } else {
        fullAccess = user.hasPermissionByName( permission, resource.resourceType )
        if ( fullAccess === true ) {
          typeCache[resource.resourceType] === true
        } else {
          typeCache[resource.resourceType] === false
          fullAccess = false
        }
      }
      if ( fullAccess ) {
        continue
      } else {
        let fieldList = user.hasPermissionByObject( permission, resource )
        if ( fieldList === true ) {
          continue
        } else if ( !fieldList ) {
          entry.resource = DENIED_OUTCOME
          entry.search = { mode: "outcome" }
        } else {
          fhirFilter.filterInline( resource, fieldList, permission !== 'read' )
        }
      }
    }
  }
  

}

module.exports = fhirFilter
