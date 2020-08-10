const nconf = require('./config')
const fhirAxios = nconf.fhirAxios
const fhirpath = require('fhirpath')
const util = require('util')

const DEFAULT_DETAILS = { fhirpath: "name" }
const INPROGRESS_DELAY = 300

const _cache = {}
const _cache_loading = {}

const fhirShortName = {
  _setCache: ( lookup, value ) => {
    _cache[ lookup ] = value
    _cache_loading[ lookup ] = false
    return value
  },
  _invalidateCache( lookup, all ) {
    if ( all ) {
      _cache = {}
      _cache_loading = {}
    } else if ( lookup ) {
      delete _cache[ lookup ]
      delete _cache_loading[ lookup ]
    }
  },
  lookup: ( parameters ) => {
    return new Promise( (resolve) => {
      let isCode = false
      let lookup
      if ( parameters.reference ) {
        lookup = parameters.reference
        isCode = false
      } else if ( parameters.system && parameters.code ) {
        lookup = parameters.system + "#" + parameters.code
        isCode = true
      }
      if ( _cache_loading[ lookup ] ) {
        setTimeout( () => {
          resolve( fhirShortName.lookup( parameters ) )
        }, INPROGRESS_DELAY )
      } else if ( !_cache[ lookup ] ) {
        if ( isCode ) {
          resolve( fhirShortName._codeLookup( parameters.system, parameters.code, parameters.valueset ) )
        } else {
          resolve( fhirShortName._resourceLookup( parameters.reference ) )
        }
      } else {
        resolve( _cache[ lookup ] )
      }
    } )
  },
  /**
   * reference is a relative FHIR Resource: Resource/ID (e.g. Practitioner/1234)
   */
  _resourceLookup: (reference) => {
    return new Promise( (resolve) => {
      let refData = reference.split('/')
      if ( refData.length !== 2 ) {
        resolve( fhirShortName._setCache( reference, "Invalid Reference" ) )
      } else {
        fhirAxios.read( refData[0], refData[1] ).then( (resource) => {
          let details = nconf.get("shortname:"+refData[0])
          if ( !details ) {
            details = DEFAULT_DETAILS
          }
          let format = details.format || "%s"
          let output = []
          if ( details.fhirpath ) {
            output.push( fhirpath.evaluate( resource, details.fhirpath ).join( details.join || " " ) )
          } else if ( details.paths ) {
            let order = details.order ? details.order.split(',') : Object.keys( details.path )
            for ( let ord of order ) {
              output.push( fhirpath.evaluate( resource, details.paths[ ord ].fhirpath ).join( details.paths[ord].join || " " ) )
            }
          }
          resolve( fhirShortName._setCache( reference, util.format( format, ...output ) ) )
        } ).catch( (err) => {
          console.log( "Failed to lookup ", reference, err )
          resolve( fhirShortName._setCache( reference, reference ) )
        } )
      }
    } )
  },
  /**
   * Lookup a code from a codesystem with valueset fallback.
   */
  _codeLookup: ( system, code, valueset ) => {
    return new Promise( (resolve) => {
      let lookup = system + "#" + code
      _cache_loading[ lookup ] = true
      let params = { system: system, code: code }
      fhirAxios.lookup( params ).then( (resource) => {
        if ( resource.parameter ) {
          let display = resource.parameter.find( param => param.name === "display" )
          if ( display ) {
            return resolve( fhirShortName._setCache( lookup, display.valueString ) )
          } else {
            console.log("Failed to find display parameter for ", lookup)
          }
        } else {
          console.log("No display data from codesystem found ", lookup)
        }
        if ( valueset ) {
          resolve( fhirShortName._vsCodeLookup( valueset, system, code ) )
        } else {
          resolve( fhirShortName._setCache( lookup, code ) )
        }
      } ).catch( (err) => {
        console.log("Failed to retrive codesystem ", lookup, err)
        if ( valueset ) {
          resolve( fhirShortName._vsCodeLookup( valueset, system, code ) )
        } else {
          resolve( fhirShortName._setCache( lookup, code ) )
        }
      } )
    } )
  },
  _vsCodeLookup: ( valueset, system, code ) => {
    return new Promise( (resolve) => {
      let lookup = system + "#" + code
      fhirAxios.read( "ValueSet", valueset.substring( valueset.lastIndexOf('/') ) ).then( (resource) => {
        if ( resource.compose && resource.compose.include ) {
          let included = resource.compose.include.find( include => include.system === system )
          if ( included && included.concept ) {
            let display = included.concept.find( concept => concept.code === code )
            if ( display.display ) {
              return resolve( fhirShortName._setCache( lookup, display.display ) )
            }
          }
        }
        console.log( "Unable to find lookup in valueset definition ", valueset, lookup )
        resolve( fhirShortName._setCache( lookup, code ) )
      } ).catch( (err) => {
        console.log("Failed to lookup code by valueset ", valueset, lookup, err )
        resolve( fhirShortName._setCache( lookup, code ) )
      } )
    } )
  }
}

module.exports = fhirShortName
