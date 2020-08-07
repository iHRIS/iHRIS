import 'whatwg-fetch'

const FHIRUTILS_ERROR = "Error"
const FHIRUTILS_UNKNOWN = "Unknown"

const fhirutils = {
  _code_cache: {},
  _code_loading: {},
  _setCache: ( lookup, value ) => {
    fhirutils._code_cache[lookup] = value
    fhirutils._code_loading[lookup] = false
    return value
  },
  codeLookup: ( system, code, binding ) => {
    return new Promise( (resolve) => {
      let lookup = system + "#" + code
      if ( fhirutils._code_loading[lookup] ) {
        setTimeout( () => {
          resolve( fhirutils.codeLookup( system, code ) )
        }, 200 )
      } else if ( !fhirutils._code_cache[lookup] ) {
        fhirutils._code_loading[lookup] = true
        fetch( "/fhir/CodeSystem/$lookup?system="+system+"&code="+code ).then( response => {
          if ( response.status === 200 ) {
            response.json().then( data => {
              if ( data.parameter ) {
                let display = data.parameter.find( param => param.name === "display" )
                if ( display ) {
                  resolve( fhirutils._setCache( lookup, display.valueString ) )
                } else {
                  console.log("No display parameter from codesystem found ",lookup,data)
                  resolve( fhirutils._vsCodeLookup( binding, system, code ) )
                }
              } else {
                console.log("No display data from codesystem found ",lookup,data)
                resolve( fhirutils._vsCodeLookup( binding, system, code ) )
              }
            } ).catch( err => {
              console.log(err)
              resolve( fhirutils._vsCodeLookup( binding, system, code ) )
            } )
          } else {
            console.log( "Invalid status from codesystem for ",lookup)
            resolve( fhirutils._vsCodeLookup( binding, system, code ) )
          }
        } ).catch( err => {
          console.log(err)
          resolve( fhirutils._vsCodeLookup( binding, system, code ) )
        } )
      } else {
        resolve( fhirutils._code_cache[lookup] )
      }
    } )
  },
  _vsCodeLookup: ( valueset, system, code ) => {
    return new Promise( (resolve) => {
      let lookup = system + "#" + code
      fetch( "/fhir/ValueSet" + valueset.substring( valueset.lastIndexOf('/') ) ).then( response => {
        if ( response.status === 200 ) {
          response.json().then( data => {
            if ( data.compose && data.compose.include ) {
              let included = data.compose.include.find( include => include.system === system )
              if ( included.concept ) {
                let display = included.concept.find( concept => concept.code === code )
                if ( display.display ) {
                  return resolve( fhirutils._setCache( lookup, display.display ) )
                }
              }
            }
            console.log("Unable to find lookup in valueset definition",lookup,data)
            resolve( fhirutils._setCache( lookup, FHIRUTILS_UNKNOWN ) )
          } ).catch( err => {
            console.log(err)
            resolve( fhirutils._setCache( lookup, FHIRUTILS_ERROR ) )
          } )
        } else {
          console.log( "Invalid status for ",lookup)
          resolve( fhirutils._setCache( lookup, FHIRUTILS_ERROR ) )
        }
      } ).catch( err => {
        console.log(err)
        resolve( fhirutils._setCache( lookup, FHIRUTILS_ERROR ) )
      } )
    } )
  },
  pathFieldExpression: (field) => {
    let expression = field.substring( field.indexOf(':')+1 )
    if ( expression.includes('-') || expression.includes('.') ) {
      return '`'+expression+'`'
    } else {
      return expression
    }
  }
}

export default fhirutils
