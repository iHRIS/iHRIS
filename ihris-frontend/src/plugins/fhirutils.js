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
  codeLookup: ( system, code ) => {
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
                  console.log("No display parameter found ",lookup,data)
                  resolve( fhirutils._setCache( lookup, FHIRUTILS_UNKNOWN ) )
                }
              } else {
                console.log("No display data found ",lookup,data)
                resolve( fhirutils._setCache( lookup, FHIRUTILS_UNKNOWN ) )
              }
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
      } else {
        resolve( fhirutils._code_cache[lookup] )
      }
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
