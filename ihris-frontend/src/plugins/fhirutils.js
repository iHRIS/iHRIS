import 'whatwg-fetch'

const fhirutils = {
  _code_cache: {},
  _code_loading: {},
  _setCache: ( lookup, value ) => {
    fhirutils._code_cache[lookup] = value
    fhirutils._code_loading[lookup] = false
    return value
  },
  resourceLookup: ( reference ) => {
    return new Promise( (resolve) => {
      let lookup = reference
      if ( fhirutils._code_loading[lookup] ) {
        setTimeout( () => {
          resolve( fhirutils.resource( reference ) )
        }, 200 )
      } else if ( !fhirutils._code_cache[lookup] ) {
        fhirutils._code_loading[lookup] = true
        fetch( "/fhir/$short-name?reference="+reference ).then( response => {
          if ( response.status === 200 ) {
            response.json().then( data => {
              if ( data.display ) {
                resolve( fhirutils._setCache( lookup, data.display ) )
              } else {
                console.log("No display data from reference found ",lookup,data)
                resolve( fhirutils._setCache( lookup, reference ) )
              }
            } ).catch( err => {
              console.log(err)
              resolve( fhirutils._setCache( lookup, reference ) )
            } )
          } else {
            console.log( "Invalid status from reference $short-name for ",lookup)
            resolve( fhirutils._setCache( lookup, reference ) )
          }
        } ).catch( err => {
          console.log(err)
          resolve( fhirutils._setCache( lookup, reference ) )
        } )
      } else {
        resolve( fhirutils._code_cache[lookup] )
      }
    } )
  },
  codeLookup: ( system, code, binding ) => {
    return new Promise( (resolve) => {
      let lookup = system + "#" + code
      if ( fhirutils._code_loading[lookup] ) {
        setTimeout( () => {
          resolve( fhirutils.codeLookup( system, code, binding ) )
        }, 200 )
      } else if ( !fhirutils._code_cache[lookup] ) {
        fhirutils._code_loading[lookup] = true
        fetch( "/fhir/$short-name?system="+system+"&code="+code+"&valuset="+binding ).then( response => {
          if ( response.status === 200 ) {
            response.json().then( data => {
              if ( data.display ) {
                resolve( fhirutils._setCache( lookup, data.display ) )
              } else {
                console.log("No display data from codesystem found ",lookup,data)
                resolve( fhirutils._setCache( lookup, code ) )
              }
            } ).catch( err => {
              console.log(err)
              resolve( fhirutils._setCache( lookup, code ) )
            } )
          } else {
            console.log( "Invalid status from codesystem $short-name for ",lookup)
            resolve( fhirutils._setCache( lookup, code ) )
          }
        } ).catch( err => {
          console.log(err)
          resolve( fhirutils._setCache( lookup, code ) )
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
