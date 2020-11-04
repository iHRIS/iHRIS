const fhirpath = require('fhirpath')
import 'whatwg-fetch'

const fhirutils = {
  _code_cache: {},
  _code_loading: {},
  _setCache: ( lookup, value ) => {
    fhirutils._code_cache[lookup] = value
    fhirutils._code_loading[lookup] = false
    return value
  },
  checkConstraints: ( constraintList, constraintDetails, element, errors, fhirId ) => {
    return new Promise( (resolve, reject) => {
      let constraints = constraintList.split(",")
      let promises = []
      for( let constraint of constraints ) {
        if ( constraintDetails[constraint] ) {
          let results = fhirpath.evaluate(element, constraintDetails[constraint].expression)
          if ( constraint.startsWith('ihris-search') ) {
            let resource = results.shift()
            let query = [ "_elements=id" ]
            while ( results.length ) {
              query.push( results.shift() + "=" + encodeURI( results.shift() ) )
            }
            promises.push( new Promise( (resolve, reject) => {
              fetch( "/fhir/"+resource+"?"+query.join("&") ).then( response => {
                if ( response.status === 200 ) {
                  response.json().then( bundle => {
                    if ( bundle.total === 0 ) {
                      resolve( true )
                    } else if ( fhirId ) {
                      let ids = fhirpath.evaluate( bundle.entry, "resource.id" )
                      if ( ids.includes( fhirId ) ) {
                        // This is the record that matched
                        resolve( true )
                      } else {
                        errors.push( constraintDetails[constraint].human )
                        resolve( false )
                      }
                    } else {
                      errors.push( constraintDetails[constraint].human )
                      resolve( false )
                    }
                  } ).catch( err => {
                    reject( err )
                  } )
                } else {
                  reject( "Failed to search: "+response.status )
                }
              } ).catch( err => {
                reject( err )
              } )
            } ) )
          } else if ( !results.every(Boolean) ) {
            errors.push( constraintDetails[constraint].human )
            promises.push( false )
          } else {
            promises.push( true )
          }
        }
      }
      Promise.all( promises ).then( results => {
        if ( results.every(Boolean) ) {
          resolve(true)
        } else {
          resolve(false)
        }
      } ).catch( err => {
        reject( err )
      } )
    } )
  },
  lookup: ( display, defaultSystem ) => {
    if ( !display ) {
      return new Promise( resolve => resolve(display) )
    }
    if ( defaultSystem ) {
      return fhirutils.codeLookup( defaultSystem, display )
    } else if ( display.system && display.code ) {
      return fhirutils.codeLookup( display.system, display.code )
    } else if ( display.reference ) {
      return fhirutils.resourceLookup( display.reference )
    } else if ( /([A-Z]\w*)\/([A-Za-z0-9\-.]{1,64})/.test( display ) ) { 
      return fhirutils.resourceLookup( display )
    } else {
      return new Promise( resolve => resolve(display) )
    }
  },
  resourceLookup: ( reference ) => {
    return new Promise( (resolve) => {
      let lookup = reference
      if ( fhirutils._code_loading[lookup] ) {
        setTimeout( () => {
          resolve( fhirutils.resourceLookup( reference ) )
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
  },
  expand: (valueset) => {
    const itemSort = (a,b) => {
      return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
    }
    const populateItemsFromCompose = ( valueset, items ) => {
      if ( valueset.compose.include ) {
        for( let include of valueset.compose.include ) {
          if ( include.concept ) {
            for ( let concept of include.concept ) {
              concept.system = include.system
              items.push( concept )
            }
          }
        }
      }
    }
    return new Promise( (resolve, reject) => {
      let lastSlash = valueset.lastIndexOf('/')
      let lastPipe = valueset.lastIndexOf('|')
      let valueSetId = valueset.slice(lastSlash+1, (lastPipe !== -1 ? lastPipe : valueset.length ))
      let items = []

      fetch("/fhir/ValueSet/"+valueSetId+"/$expand").then(response=> {
        if( response.ok ) {
          response.json().then(data=>{
            try {
              if ( ( !data.expansion || data.expansion.total === 0 ) && data.compose.include ) {
                populateItemsFromCompose( data, items )
              } else {
                items = data.expansion.contains
              }
              items.sort( itemSort )
              resolve( items )
            } catch(err) {
              console.log(err)
              reject( new Error( "Invalid response from server." ) )
            }
          }).catch(err=>{
            reject( err )
          })
        } else {
          fetch("/fhir/ValueSet/"+valueSetId).then(response=> {
            if ( response.ok ) {
              response.json().then(data=> {
                populateItemsFromCompose( data, items )
                /*
                if ( data.compose.include ) {
                  for( let include of data.compose.include ) {
                    if ( include.concept ) {
                      for ( let concept of include.concept ) {
                        concept.system = include.system
                        items.push( concept )
                      }
                    }
                  }
                }
                */
                items.sort( itemSort )
                resolve( items )
              }).catch(err=>{
                reject(err)
              })
            } else {
              reject( new Error( "Invalid response from server." ) )
            }
          }).catch(err=>{
            reject(err)
          })

        }
      }).catch(err=>{
        reject(err)
      })
    } )
  }
}

export default fhirutils
