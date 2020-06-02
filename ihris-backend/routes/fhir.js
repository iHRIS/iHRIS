const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirpath = require('fhirpath')

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
    let outcome = { ...DENIED_OUTCOME }
    outcome.issue[0].diagnostics = "Not logged in."
    return res.status(401).json( outcome )
  }
  let allowed = false
  if ( req.params.id ) {
    allowed = req.user.hasPermission( "read", req.params.resource, req.params.id )
  } else {
    allowed = req.user.hasPermission( "read", req.params.resource )
  }
  if ( !allowed ) {
    return res.status(401).json( DENIED_OUTCOME )
  }
  if ( req.params.id ) {
    fhirAxios.read( req.params.resource, req.params.id ).then( (resource) => {
      if ( allowed === true ) {
        return res.status(200).json(resource)
      } else {
        return res.status(200).json({"msg":"more to do filtering object"})
      }
    } ).catch( (err) => {
      let outcome = { ...ERROR_OUTCOME }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } else {
    fhirAxios.search( req.params.resource, req.query ).then( (resource) => {
      if ( allowed === true ) {
        return res.status(200).json(resource)
      } else {
        return res.status(200).json({"msg":"more to do filtering object from search"})
      }
    } ).catch( (err) => {
      let outcome = { ...ERROR_OUTCOME }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  }
} )

router.get("/ValueSet/:id/\\$expand", (req, res) => {
  if ( !req.user ) {
    let outcome = { ...DENIED_OUTCOME }
    outcome.issue[0].diagnostics = "Not logged in."
    return res.status(401).json( outcome )
  }
  let allowed = false
  if ( req.params.id ) {
    allowed = req.user.hasPermission( "read", "ValueSet", req.params.id )
  } else {
    allowed = req.user.hasPermission( "read", "ValueSet" )
  }
  if ( !allowed ) {
    return res.status(401).json( DENIED_OUTCOME )
  }
  fhirAxios.expand( req.params.id, req.query ).then( (resource) => {
    if ( allowed === true ) {
      return res.status(200).json(resource)
    } else {
      return res.status(200).json({"msg":"more to do filtering object"})
    }
  } ).catch( (err) => {
    let outcome = { ...ERROR_OUTCOME }
    outcome.issue[0].diagnostics = err.message
    return res.status(500).json( outcome )
  } )
} )

module.exports = router;
