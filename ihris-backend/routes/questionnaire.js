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
  console.log("MIDDLEWARE",JSON.stringify(req.body,null,2))
  let response = req.body

  fhirQuestionnaire.processQuestionnaire( response ).then( (bundle) => {
    fhirFilter.filterBundle( "write", bundle, req.user )

    fhirAxios.create( bundle ).then ( (results) => {
      console.log(results)
      next()
    } ).catch( (err) => {
      return res.status( err.response.status ).json( err.response.data )
    } )

  } )

} )

module.exports = router
