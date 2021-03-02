const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirFilter = require('../modules/fhirFilter')
const fhirShortName = require('../modules/fhirShortName')
const fhirReports = require('../modules/fhirReports')
const fhirSecurity = require('../modules/fhirSecurity')
const fhirAudit = require('../modules/fhirAudit')
const isEmpty = require('is-empty')
const marked = require('marked')
const { JSDOM } = require('jsdom')
const createDOMPurify = require('dompurify')
const outcomes = require('../config/operationOutcomes')
const winston = require('winston')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

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
      winston.error(err.message)
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } else {
    let userFilters = req.user.getFilter( req.params.resource )
    if ( userFilters ) {
      for( let filter of userFilters ) {
        let keyVal = filter.split('=',2)
        if ( keyVal.length === 2 ) {
          req.query[keyVal[0]] = keyVal[1]
        } else {
          winston.error("Unable to process filter constraing for "+req.params.resource+" "+filter)
        }
      }
    }
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
      winston.error(err.message)
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
  fhirSecurity.preProcess( req.body ).then( (uuid) => {
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
      fhirAudit.create( req.user, req.ip, output.resourceType + "/" + output.id 
        + (output.meta.versionId ? "/_history/"+output.meta.versionId : ""), true)
      fhirSecurity.postProcess( output, uuid ).then( (results) => {
        fhirReports.delayedRun()
        return res.status(201).json(output)
      } ).catch( (err) => {
        winston.error("Failed to postprocess security metadata ON POST"+err.message)
        let outcome = { ...outcomes.ERROR }
        outcome.issue[0].diagnostics = err.message
        return res.status(500).json( outcome )
      } )
    } ).catch( (err) => {
      /* return response from FHIR server */
      //return res.status( err.response.status ).json( err.response.data )
      /* for custom responses */
      fhirAudit.create( req.user, req.ip, null, false, { resource: resource, err: err } )
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } ).catch( (err) => {
    winston.error("Failed to preprocess security metadata ON POST"+err.message)
    fhirAudit.create( req.user, req.ip, null, false, { resource: resource, err: err } )
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

  const incrementValueSetVersion = ( codeSystem ) => {
    const increment = (version) => {
      if ( !version ) return "0.0.1"
      try {
        let parts = version.split(".")
        if ( parts.length > 2 ) {
          let last = Number(parts.pop())
          parts.push( ++last )
        } else if ( parts.length === 2 ) {
          parts.push(1)
        } else if ( parts.length === 1 ) {
          parts.push(0)
          parts.push(1)
        }
        return parts.join(".")
      } catch (err) {
        return version + ".1"
      }
    }
    fhirAxios.search( "ValueSet", { reference: codeSystem, _count: "200" } ).then ( (bundle) => {
      if ( bundle.entry ) {
        for( let entry of bundle.entry ) {
          if ( !entry.resource ) continue
          entry.resource.version = increment( entry.resource.version )
          fhirAxios.update( entry.resource ).catch( (err) => {
            winston.error("Failed to update valueset to increment version: "+entry.resource.id)
          } )
        }
      }
    } ).catch( (err) => {
      winston.error("Unable to find valuesets to increment for "+codeSystem+": "+err.message)
    } )
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
    resource.date = new Date().toISOString()
    fhirAxios.update( resource ).then( (response) => {
      fhirAudit.patch( req.user, req.ip, "CodeSystem/" + resource.id
        + (response.meta.versionId ? "/_history/"+response.meta.versionId : ""), true, { code: req.params.code } )
      incrementValueSetVersion( resource.url )
      fhirReports.delayedRun()
      return res.status(200).json({ok:true})
    } ).catch( (err) => {
      /* return response from FHIR server */
      //return res.status( err.response.status ).json( err.response.data )
      /* for custom responses */
      //console.log(err)
      fhirAudit.patch( req.user, req.ip, "CodeSystem/" + resource.id, false, { resource: resource, err: err, code: req.params.code } )
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } ).catch( (err) => {
    /* return response from FHIR server */
    //return res.status( err.response.status ).json( err.response.data )
    /* for custom responses */
      //console.log(err)
      fhirAudit.patch( req.user, req.ip, "CodeSystem/" + req.params.id, false, { resource: update, err: err, code: req.params.code } )
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
  fhirSecurity.preProcess( update ).then( (uuid) => {
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
      fhirAudit.update( req.user, req.ip, resource.resourceType + "/" + resource.id
        + (resource.meta.versionId ? "/_history/"+resource.meta.versionId : ""), true )
      fhirSecurity.postProcess( resource, uuid ).then( (results) => {
        fhirReports.delayedRun()
        return res.status(200).json(resource)
      } ).catch( (err) => {
        winston.error("Failed to postprocess security metadata on PUT "+err.message)
        let outcome = { ...outcomes.ERROR }
        outcome.issue[0].diagnostics = err.message
        return res.status(500).json( outcome )
      } )
    } ).catch( (err) => {
      /* return response from FHIR server */
      //return res.status( err.response.status ).json( err.response.data )
      /* for custom responses */
      fhirAudit.update( req.user, req.ip, update.resourceType + "/" + update.id, false, { resource: update, err: err } )
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = err.message
      return res.status(500).json( outcome )
    } )
  } ).catch( (err) => {
    fhirAudit.update( req.user, req.ip, update.resourceType + "/" + update.id, false, { resource: update, err: err } )
    winston.error("Failed to preprocess security metadata on PUT "+err.message)
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
