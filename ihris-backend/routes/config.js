var express = require('express')
var router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = require('../config/operationOutcomes')
const fhirConfig = require('../modules/fhirConfig')

/* GET home page. */
router.get('/site', function(req, res) {
  const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"
  let site = nconf.get("site")
  if ( req.user ) {
    site.user = {}
    if ( req.user.resource.id === defaultUser ) {
      site.user.loggedin = false
    } else {
      site.user.loggedin = true
      site.user.name = req.user.resource.name[0].text
    }
  } else {
    site.user = { loggedin: false }
  }
  //site.updated = new Date().toISOString()
  res.status(200).json( site )
})

const camelToKebab = (code) => {
  return code.replace(/([a-z0-9]|[A-Z]+)([A-Z])/g, '$1-$2').toLowerCase()
}

const processFields = ( fields, base ) => {
  let output = ""
  for( let field of Object.keys( fields ) ) {
    if ( fields[field]["max"] === "0" ) {
      continue
    }
    let eleName = camelToKebab( fields[field].code )
    let attrs = [ "field", "sliceName", "targetProfile", "profile", "min", "max", "base-min", 
      "base-max", "label", "path", "binding" ]
    let isArray = false
    if ( fields[field]["max"] !== "1" ) {
      isArray = true
      output += "<fhir-array"
      let arr_attrs = [ "label", "min", "max", "id", "path" ]
      for ( let attr of arr_attrs ) {
        output += " "+attr+"=\""+fields[field][attr]+"\""
      }
      output += ">\n<template #default=\"slotProps\">\n"
    } else {
      attrs.unshift("id")
    }
    output += "<fhir-"+eleName
    if ( isArray ) {
      output += " :slotProps=\"slotProps\""
    }
    for( let attr of attrs ) {
      if ( fields[field].hasOwnProperty(attr) ) {
        output += " "+attr+"=\""+fields[field][attr]+"\""
      }
    }
    output += ">\n"


    if ( fields[field].hasOwnProperty("fields") ) {
      output += processFields( fields[field].fields, fields[field] )
    }

    output += "</fhir-"+eleName+">\n" 
    if ( isArray ) {
      output += "</template>\n</fhir-array>\n"
    }
  }
  return output
}

router.get('/page/:page', function(req, res) {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let allowed = req.user.hasPermissionByName( "read", "StructureDefinition", req.params.page )
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }
  fhirAxios.read( "StructureDefinition", req.params.page ).then( (resource) => {
    if ( allowed !== true ) {
      // Can't think of a reason to have this level of permissions for 
      // StructureDefinitions, but just in case...
      let objAllowed = req.user.hasPermissionByObject( "read", resource )
      if ( objAllowed !== true ) {
        // But don't allow field level restrictions.  It will complicated the requirements
        return res.status(401).json( outcomes.DENIED )
      }
    }
    if ( !resource.hasOwnProperty("snapshot") ) {
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = "StructureDefinitions must be saved with a snapshop."
      return res.status(404).json( outcome )
    }

    const structure = fhirConfig.parseStructureDefinition( resource )
    let vueOuput = ""
    for ( let fhir of Object.keys( structure ) ) {
      vueOutput = '<fhir-resource field="'+fhir+'"><template #default>'+"\n"

        if ( structure[fhir].hasOwnProperty("fields") ) {
          vueOutput += processFields( structure[fhir].fields, structure )
        }
      
      vueOutput += '</template></fhir-resource>'+"\n"
    }
    console.log(vueOutput)
    return res.status(200).send(vueOutput)
  } ).catch( (err) => {
    console.log(err)
    return res.status( err.response.status ).json( err.response.data )
  } )
  
} )

module.exports = router;
