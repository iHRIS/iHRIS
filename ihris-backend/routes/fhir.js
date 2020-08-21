const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirFilter = require('../modules/fhirFilter')
const fhirShortName = require('../modules/fhirShortName')
const isEmpty = require('is-empty')
const marked = require('marked')
const { JSDOM } = require('jsdom')
const createDOMPurify = require('dompurify')
const outcomes = require('../config/operationOutcomes')
const winston = require('winston')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

router.get("/", (req, res, next) => {
  res.status(200).json( { user: req.user } )
} )

router.get("/:resource/:id?", (req, res, next) => {
  if ( req.params.resource.startsWith('$') || ( req.params.id && req.params.id.startsWith('$') ) ) {
    return next()
  }
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let allowed = false
  if ( req.params.id ) {
    allowed = req.user.hasPermissionByName( "read", req.params.resource, req.params.id )
  } else {
    allowed = req.user.hasPermissionByName( "read", req.params.resource )
  }
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }
  if ( req.params.id ) {
    fhirAxios.read( req.params.resource, req.params.id ).then( (resource) => {
      if ( allowed === true ) {
        return res.status(200).json(resource)
      } else {
        // Check permissions against the specific resource and return list
        // of allowed fields
        let fieldList = req.user.hasPermissionByObject( "read", resource )
        if ( fieldList === true ) {
          return res.status(200).json(resource)
        } else if ( !fieldList ) {
          return res.status(401).json( outcomes.DENIED )
        } else {
          return res.status(200).json( fhirFilter.filter( resource, fieldList ) )
        }
      }
    } ).catch( (err) => {
      /* return response from FHIR server */
      //return res.status( err.response.status ).json( err.response.data )
      /* for custom responses */
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } else {
    fhirAxios.search( req.params.resource, req.query ).then( (resource) => {
      // Need to do deeper checking due to possibility of includes
      if ( resource && resource.entry && resource.entry.length > 0 ) {
        fhirFilter.filterBundle( "read", resource, req.user )
      }
      return res.status(200).json(resource)

      // DELETE THE FOLLOWING, ALL NEED TO BE FILTERED
      /*
      if ( allowed === true ) {
        return res.status(200).json(resource)
      } else {
        return res.status(200).json({"msg":"more to do filtering object from search"})
      }
      */
    } ).catch( (err) => {
      /* return response from FHIR server */
      //return res.status( err.response.status ).json( err.response.data )
      /* for custom responses */
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  }
} )

router.post("/:resource", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let allowed = req.user.hasPermissionByObject( "write", req.body )

  let resource
  if ( allowed === true ) {
    resource = req.body
  } else if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  } else {
    resource = fhirFilter.filter( req.body, allowed )
  }

  fhirAxios.create( resource ).then( (output) => {
    return res.status(201).json(output)
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
    let outcome = { ...outcomes.ERROR }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
  } )
} )

router.patch("/CodeSystem/:id/:code", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let allowed = req.user.hasPermissionByName( "write", "CodeSystem", req.params.id )
  if ( allowed !== true ) {
    return res.status(401).json( outcomes.DENIED )
  }
  let update = req.body
  fhirAxios.read( "CodeSystem", req.params.id ).then( (resource) => {
    if ( resource.concept ) {
      let codeIdx = resource.concept.findIndex( concept => concept.code === update.code )
      if ( codeIdx === -1 ) {
        resource.concept.push( update )
      } else {
        resource.concept[codeIdx] = update
      }
    } else {
      resource.concept = [ update ]
    }
    fhirAxios.update( resource ).then( (resource) => {
      winston.debug("UPDATED",resource)
      return res.status(200).json({ok:true})
    } ).catch( (err) => {
      /* return response from FHIR server */
      //return res.status( err.response.status ).json( err.response.data )
      /* for custom responses */
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
  } )
} )

router.put("/:resource/:id", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let update = req.body
  let allowed = req.user.hasPermissionByObject( "write", update )
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }

  if ( allowed !== true ) {
    // Not allowed at this time because it's complicated to combine the filtered
    // results with the original data.  Due to arrays in FHIR elements.
    // Should instead use patching with this access level to update one field at a time.
    return res.status(401).json( outcomes.DENIED )
  }

  fhirAxios.update( update ).then( (resource) => {
    return res.status(200).json(resource)
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
    let outcome = { ...outcomes.ERROR }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
  } )
} )

router.get("/ValueSet/:id/\\$expand", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let allowed = req.user.hasPermissionByName( "read", "ValueSet", req.params.id )
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }
  fhirAxios.expand( req.params.id, req.query ).then( (resource) => {
    if ( allowed === true ) {
      return res.status(200).json(resource)
    } else {
      // Field level access to ValueSets doesn't really make sense so don't do expansions if not full access
      return res.status(401).json( outcomes.DENIED )
    }
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
    let outcome = { ...outcomes.ERROR }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
  } )
} )

router.get("/CodeSystem/\\$lookup", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let allowed = req.user.hasPermissionByName( "read", "CodeSystem" )
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }
  fhirAxios.lookup( req.query ).then( (resource) => {
    if ( allowed === true ) {
      return res.status(200).json(resource)
    } else {
      // Field level access to CodeSystems doesn't really make sense so don't do lookups if not full access
      return res.status(401).json( outcomes.DENIED )
    }
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
    let outcome = { ...outcomes.ERROR }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
  } )
} )

router.get("/DocumentReference/:id/\\$html", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }

  let allowed = req.user.hasPermissionByName( "read", "DocumentReference", req.params.id )
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }
  fhirAxios.read( "DocumentReference", req.params.id ).then( (resource) => {

    const docToHTML = ( resource ) => {
      try {
        let html = ""
        let data64 = Buffer.from( resource.content[0].attachment.data, 'base64' )
        let data = data64.toString('utf8')
        if ( resource.content[0].attachment.contentType === "text/markdown" ) {
          html = marked( data )
        } else {
          html = data
        }
        return { 
          title: resource.content[0].attachment.title, 
          html: DOMPurify.sanitize("<div>" + html + "</div>") 
        }
      } catch( err ) {
        return "Failed to get HTML from DocumentReference"
      }
    }

    if ( allowed === true ) {
      let content = docToHTML( resource )
      return res.status(200).json(content)
    } else {
      // Check permissions against the specific resource and return list
      // of allowed fields
      let fieldList = req.user.hasPermissionByObject( "read", resource )
      if ( fieldList === true ) {
        let content = docToHTML( resource )
        return res.status(200).json(content)
      } else if ( !fieldList ) {
        return res.status(401).json( outcomes.DENIED )
      } else {
        // Field level access to ValueSets doesn't really make sense so don't do expansions if not full access
        return res.status(401).json( outcomes.DENIED )
      }
    }
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
    let outcome = { ...outcomes.ERROR }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
  } )

} )

router.get("/\\$short-name", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let allowed = false
  if ( req.query.reference ) {
    let refData = req.query.reference.split('/')
    if ( refData.length !== 2 ) {
      winston.debug("invalid",req.query)
      return res.status(401).json( outcomes.DENIED )
    }
    allowed = req.user.hasPermissionByName( "read", refData[0] )

    // Any read access will give short names
    if ( allowed === false ) {
      winston.debug("not allowed",allowed,req.query)
      return res.status(401).json( outcomes.DENIED )
    }
    fhirShortName.lookup( req.query ).then ( (display) => {
      return res.status(200).json( { display: display } )
    } )
  } else {
    // can add more complexity later, but for now just check for access to CodeSystems and ValueSets
    allowed = req.user.hasPermissionByName( "read", "CodeSystem" ) 
    if ( req.query.valueset ) {
      allowed = allowed && req.user.hasPermissionByName( "read", "ValueSet" ) 
    }
    if ( allowed !== true ) {
      winston.debug("not allowed",allowed,req.query)
      return res.status(401).json( outcomes.DENIED )
    }
    fhirShortName.lookup( req.query ).then ( (display) => {
      return res.status(200).json( { display: display } )
    } )

  }

} )

module.exports = router
