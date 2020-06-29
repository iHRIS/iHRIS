const nconf = require('./config')
const fhirAxios = nconf.fhirAxios

var cache = {}

const fhirStructureDefinition = {
  getFieldDefinition: (expression) => {
    return new Promise( (resolve,reject) => {
      let exp = expression.split("#")
      let defId = exp[0].substring( exp[0].lastIndexOf('/')+1 )

      if ( !cache.hasOwnProperty( exp[0] ) ) {
        fhirAxios.read( "StructureDefinition", defId ).then( (resource) => {
          cache[ exp[0] ] = resource
          fhirStructureDefinition._getFieldDefinition( exp[1], cache[ exp[0] ] ).then( (field) => {
            resolve( field )
          } )
        } ).catch( (err) => {
          reject( err )
        } )
      } else {
        fhirStructureDefinition._getFieldDefinition( exp[1], cache[ exp[0] ] ).then( (field) => {
          resolve( field )
        } )
      }

    } )

  },
  _getFieldDefinition: ( fieldId, structureDef ) => {
    return new Promise( (resolve, reject) => {
      // take [#] off of fieldId here
      fieldId = fieldId.replace( /\[\d+\]/g, '' )
      let field = structureDef.snapshot.element.find( element => element.id === fieldId )
      if ( field ) {
        resolve( field )
      } else {
        let found = false
        let fieldSplit = fieldId.split('.')
        let remainder = []
        let count = 0
        while ( !found ) {
          if ( count++ > 50 ) reject("Failed to find "+fieldId+" in "+structureDef.url)
          remainder.unshift( fieldSplit.pop() )
          field = structureDef.snapshot.element.find( element => element.id === fieldSplit.join('.') )
          if ( field ) found = true
        }
        let subExpression = "http://hl7.org/fhir/StructureDefinition/" + field.type[0].code 
          + "#" + field.type[0].code +"."+ remainder.join('.')
        fhirStructureDefinition.getFieldDefinition( subExpression ).then( (field) => {
          resolve(field)
        } ).catch( (err) => {
          reject(err)
        } )
      }
    } )
  },
  resetCache: () => {
    cache = {}
  }
}

module.exports = fhirStructureDefinition
