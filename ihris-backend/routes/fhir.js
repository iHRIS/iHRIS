const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirFilter = require('../modules/fhirFilter')
const isEmpty = require('is-empty')

router.get("/", (req, res, next) => {
  res.status(200).json( { user: req.user } )
} )

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
const NOTLOGGEDIN_OUTCOME = {
  resourceType: "OperationOutcome",
  issue: [
    {
      severity: "error",
      code: "forbidden",
      diagnostics: "Not logged in"
    }
  ]
}
const ERROR_OUTCOME = {
  resourceType: "OperationOutcome",
  issue: [
    {
      severity: "error",
      code: "exception",
      diagnostics: ""
    }
  ]
}

router.get("/:resource/:id?", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( NOTLOGGEDIN_OUTCOME )
  }
  let allowed = false
  if ( req.params.id ) {
    allowed = req.user.hasPermissionByName( "read", req.params.resource, req.params.id )
  } else {
    allowed = req.user.hasPermissionByName( "read", req.params.resource )
  }
  if ( !allowed ) {
    return res.status(401).json( DENIED_OUTCOME )
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
          return res.status(401).json( DENIED_OUTCOME )
        } else {
          return res.status(200).json( fhirFilter.filter( resource, fieldList ) )
        }
      }
    } ).catch( (err) => {
      /* return response from FHIR server */
      return res.status( err.response.status ).json( err.response.data )
      /* for custom responses
      let outcome = { ...ERROR_OUTCOME }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
      */
    } )
  } else {
    fhirAxios.search( req.params.resource, req.query ).then( (resource) => {
      // Need to do deeper checking due to possibility of includes
      fhirFilter.filterBundle( "read", resource, req.user )
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
      return res.status( err.response.status ).json( err.response.data )
      /* for custom responses
      let outcome = { ...ERROR_OUTCOME }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
      */
    } )
  }
} )

router.post("/:resource", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( NOTLOGGEDIN_OUTCOME )
  }
  let allowed = req.user.hasPermissionByObject( "write", req.body )

  let resource
  if ( allowed === true ) {
    resource = req.body
  } else if ( !allowed ) {
    return res.status(401).json( DENIED_OUTCOME )
  } else {
    resource = fhirFilter.filter( req.body, allowed )
  }

  fhirAxios.create( resource ).then( (resource) => {
    return res.status(201).json(resource)
  } ).catch( (err) => {
    /* return response from FHIR server */
    console.log(err)
    return res.status( err.response.status ).json( err.response.data )
    /* for custom responses
    let outcome = { ...ERROR_OUTCOME }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
    */
  } )
} )

router.put("/:resource/:id", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( NOTLOGGEDIN_OUTCOME )
  }
  let update = req.body
  let allowed = req.user.hasPermissionByObject( "write", update )
  if ( !allowed ) {
    return res.status(401).json( DENIED_OUTCOME )
  }

  if ( allowed !== true ) {
    // Not allowed at this time because it's complicated to combine the filtered
    // results with the original data.  Due to arrays in FHIR elements.
    // Should instead use patching with this access level to update one field at a time.
    return res.status(401).json( DENIED_OUTCOME )
  }

  fhirAxios.update( update ).then( (resource) => {
    return res.status(200).json(resource)
  } ).catch( (err) => {
    /* return response from FHIR server */
    return res.status( err.response.status ).json( err.response.data )
    /* for custom responses
    let outcome = { ...ERROR_OUTCOME }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
    */
  } )
} )

router.get("/ValueSet/:id/\\$expand", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( NOTLOGGEDIN_OUTCOME )
  }
  let allowed = false
  if ( req.params.id ) {
    allowed = req.user.hasPermissionByName( "read", "ValueSet", req.params.id )
  } else {
    allowed = req.user.hasPermissionByName( "read", "ValueSet" )
  }
  if ( !allowed ) {
    return res.status(401).json( DENIED_OUTCOME )
  }
  fhirAxios.expand( req.params.id, req.query ).then( (resource) => {
    if ( allowed === true ) {
      return res.status(200).json(resource)
    } else {
      // Field level access to ValueSets doesn't really make sense so don't do expansions if not full access
      return res.status(402).json( DENIED_OUTCOME )
    }
  } ).catch( (err) => {
    /* return response from FHIR server */
    return res.status( err.response.status ).json( err.response.data )
    /* for custom responses
    let outcome = { ...ERROR_OUTCOME }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
    */
  } )
} )

module.exports = router
