const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirFilter = require('../modules/fhirFilter')
const fhirQuestionnaire = require('../modules/fhirQuestionnaire')
const isEmpty = require('is-empty')
const outcomes = require('../config/operationOutcomes')

/**
 * This route will process a QuestionnaireReponse and parse
 * it into the underlying resources and save them.  
 */
router.post("/QuestionnaireResponse", (req, res, next) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }

  let workflowModules = {}
  const workflowConfig = {
    processor: {
      endrole: '../modules/workflowEndRole'
    },
    questionnaire: {
      'http://ihris.org/fhir/Questionnaire/ihris-endrole': 'endrole'
    }
  }
  // Need to move this processing to loaded modules and add to the config
  // But for now this is here for testing

  if ( workflowConfig.questionnaire.hasOwnProperty( req.body.questionnaire ) ) {
    let processor = workflowConfig.questionnaire[ req.body.questionnaire ]
    if ( !workflowModules.hasOwnProperty( processor ) ) {
      workflowModules[processor] = require( workflowConfig.processor[processor] )
    }

    workflowModules[processor].process( req ).then( (bundle) => {
      fhirFilter.filterBundle( "write", bundle, req.user )

      fhirAxios.create( bundle ).then ( (results) => {
        next()
      } ).catch( (err) => {
        console.log(err)
        console.log(JSON.stringify(err.response.data,null,2))
        return res.status( err.response.status ).json( err.response.data )
      } )

    } ).catch( (err) => {
      console.log(err)
      if ( err === "Invalid input" ) {
        return res.status( 400 ).json( err )
      } else {
        return res.status( 500 ).json( err )
      }
    } )

  } else {

    fhirQuestionnaire.processQuestionnaire( req.body ).then( (bundle) => {
      console.log(JSON.stringify(bundle,null,2))
      fhirFilter.filterBundle( "write", bundle, req.user )

      fhirAxios.create( bundle ).then ( (results) => {
        if ( results.entry && results.entry.length > 0 && results.entry[0].response.location ) {
          req.body.subject = { reference: results.entry[0].response.location }
        }
        next()
      } ).catch( (err) => {
        console.log(err)
        console.log(JSON.stringify(err.response.data,null,2))
        return res.status( err.response.status ).json( err.response.data )
      } )

    } ).catch( (err) => {
      console.log(err)
      return res.status( 500 ).json( err )
    } )

  }

} )

module.exports = router
