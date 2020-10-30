const express = require('express')
const fs = require('fs')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirFilter = require('../modules/fhirFilter')
const fhirQuestionnaire = require('../modules/fhirQuestionnaire')
const fhirModules = require('../modules/fhirModules')
const isEmpty = require('is-empty')
const outcomes = require('../config/operationOutcomes')
const winston = require('winston')

let workflowModules = {}

/**
 * This route will process a QuestionnaireReponse and parse
 * it into the underlying resources and save them.  
 */
router.post("/QuestionnaireResponse", (req, res, next) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }

  let workflowQuestionnaires = nconf.get("workflow:questionnaire")
  let workflow = Object.keys(workflowQuestionnaires).find( wf => workflowQuestionnaires[wf].url === req.body.questionnaire )
  if ( workflow ) {

    let processor = workflow
    if ( workflowQuestionnaires[workflow].hasOwnProperty('processor') ) {
      processor = workflowQuestionnaires[workflow].processor
    }

    let details = nconf.get('workflow:processor:'+processor)

    if ( !details || (!details.file && !details.library) ) {
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = "Unable to find processor for this questionnaire: "+req.body.questionnaire +" ("+processor+")"
      return res.status(500).json( outcome )
    }

    fhirModules.requireWorkflow( workflow, details.library, details.file ).then( (module) => {
        module.process( req ).then( (bundle) => {
          fhirFilter.filterBundle( "write", bundle, req.user )

          fhirAxios.create( bundle ).then ( (results) => {
            if ( module.postProcess ) {
              module.postProcess( req, results ).then( () => {
                next()
              } ).catch( (err) => {
                winston.error(err.message)
                return res.status( 400 ).json( { err: err.message } )
              } )
            } else {
              next()
            }
          } ).catch( (err) => {
            winston.error(err.message)
            //return res.status( err.response.status ).json( err.response.data )
            return res.status( 400 ).json( { err: err.message } )
          } )

        } ).catch( (err) => {
          winston.error(err)
          if ( err === "Invalid input" ) {
            return res.status( 400 ).json( err )
          } else {
            return res.status( 500 ).json( err )
          }
        } )

      } ).catch( (err) => {
        winston.error(err)
        let outcome = { ...outcomes.ERROR }
        outcome.issue[0].diagnostics = "Unable to find processor module for this questionnaire: "+req.body.questionnaire +" ("+processor+")"
        return res.status(500).json( outcome )
      } )

  } else {

    fhirQuestionnaire.processQuestionnaire( req.body ).then( (bundle) => {
      winston.debug(JSON.stringify(bundle,null,2))
      fhirFilter.filterBundle( "write", bundle, req.user )

      fhirAxios.create( bundle ).then ( (results) => {
        if ( results.entry && results.entry.length > 0 && results.entry[0].response.location ) {
          req.body.subject = { reference: results.entry[0].response.location }
        }
        next()
      } ).catch( (err) => {
        winston.error(err.message)
        //return res.status( err.response.status ).json( err.response.data )
        return res.status( 400 ).json( { err: err.message } )
      } )

    } ).catch( (err) => {
      winston.error(err)
      return res.status( 500 ).json( err )
    } )

  }

} )

module.exports = router
