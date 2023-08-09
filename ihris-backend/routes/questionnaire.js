const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const ihrissmartrequire = require('ihrissmartrequire')
const fhirFilter = require('../modules/fhir/fhirFilter')
const fhirSecurity = require('../modules/fhir/fhirSecurity')
const fhirQuestionnaire = require('../modules/fhir/fhirQuestionnaire')
const fhirModules = require('../modules/fhir/fhirModules')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const logger = require('../winston')

/**
 * This route will process a QuestionnaireReponse and parse
 * it into the underlying resources and save them.
 */
router.post("/QuestionnaireResponse", (req, res, next) => {
    req.query.editing = JSON.parse(req.query.editing)
    if (!req.user) {
        return res.status(401).json(outcomes.NOTLOGGEDIN)
    }

    const checkBundleForError = (bundle) => {
        if (bundle.entry) {
            for (let entry of bundle.entry) {
                if (entry.resource && entry.resource.resourceType === "OperationOutcome") {
                    return entry.resource
                }
            }
        }
        return false
    }

    const setResourceIds = (bundle) => {
        if(!bundle.entry || bundle.entry <= 0) {
            return
        }
        let editingResources = JSON.parse(req.query.editingResources)
        for(let entry of bundle.entry) {
            let edit = editingResources.find((editingResource) => {
                return entry.resource.meta.profile.includes(editingResource.profile)
            })
            if(edit) {
                entry.resource.id = edit.id
                entry.request = {
                    method: "PUT",
                    url: entry.resource.resourceType + '/' + edit.id
                }
            }
        }
    }

    let workflowQuestionnaires = nconf.get("workflow:questionnaire")
    let workflow = Object.keys(workflowQuestionnaires).find(wf => workflowQuestionnaires[wf].url === req.body.questionnaire)

    if (workflow) {

        let processor = workflow
        if (workflowQuestionnaires[workflow].hasOwnProperty('processor')) {
            processor = workflowQuestionnaires[workflow].processor
        }

        let details = nconf.get('workflow:processor:' + processor)

        if (!details || (!details.file && !details.library)) {
            let outcome = {...outcomes.ERROR}
            outcome.issue[0].diagnostics = "Unable to find processor for this questionnaire: " + req.body.questionnaire + " (" + processor + ")"
            return res.status(500).json(outcome)
        }
        fhirModules.requireWorkflow(workflow, details.library, details.file).then((module) => {
            module.process(req).then((bundle) => {
                if(req.query.editing) {
                    setResourceIds(bundle)
                }
                fhirSecurity.preProcess(bundle).then((uuid) => {
                    fhirFilter.filterBundle("write", bundle, req.user)
                    let errorCheck = checkBundleForError(bundle)
                    if (errorCheck) {
                        return res.status(401).json(errorCheck)
                    }
                    fhirAxios.create(bundle).then((results) => {
                        if (module.postProcess) {
                            module.postProcess(req, results).then(() => {
                                fhirSecurity.postProcess(results, uuid).then((results) => {
                                    next()
                                }).catch((err) => {
                                    logger.error(err.message)
                                    return res.status(500).json({err: err.message})
                                })
                            }).catch((err) => {
                                logger.error(err.message)
                                return res.status(500).json({err: err.message})
                            })
                        } else {
                            fhirSecurity.postProcess(results, uuid).then((results) => {
                                next()
                            }).catch((err) => {
                                logger.error(err.message)
                                return res.status(500).json({err: err.message})
                            })
                        }
                    }).catch((err) => {
                        logger.error(err.message)
                        //return res.status( err.response.status ).json( err.response.data )
                        return res.status(500).json({err: err.message})
                    })
                }).catch((err) => {
                    logger.error(err.message)
                    return res.status(500).json(err)
                })
            }).catch((err) => {
                if (err === "Invalid input") {
                    logger.error(err)
                    return res.status(400).json(err)
                } else {
                    logger.error(err.message)
                    return res.status(500).json(err)
                }
            })
        }).catch((err) => {
            logger.error(err.message)
            let outcome = {...outcomes.ERROR}
            outcome.issue[0].diagnostics = "Unable to find processor module for this questionnaire: " + req.body.questionnaire + " (" + processor + ")"
            return res.status(500).json(outcome)
        })

    } else {
        fhirQuestionnaire.processQuestionnaire(req.body).then((bundle) => {
            if(req.query.editing) {
                setResourceIds(bundle)
            }
            fhirSecurity.preProcess(bundle).then((uuid) => {
                fhirFilter.filterBundle("write", bundle, req.user)
                let errorCheck = checkBundleForError(bundle)
                if (errorCheck) {
                    return res.status(401).json(errorCheck)
                }

                fhirAxios.create(bundle).then((results) => {
                    console.log(JSON.stringify(results,null,2))
                    if (results.entry && results.entry.length > 0 && results.entry[0].response.location) {
                        req.body.subject = {reference: results.entry[0].response.location}
                    }
                    fhirSecurity.postProcess(results, uuid).then((results) => {
                        next()
                    }).catch((err) => {
                        logger.error(err.message)
                        return res.status(500).json({err: err.message})
                    })
                }).catch((err) => {
                    logger.error(err.message)
                    //return res.status( err.response.status ).json( err.response.data )
                    return res.status(500).json({err: err.message})
                })


            }).catch((err) => {
                logger.error(err.message)
                return res.status(500).json(err)
            })


        }).catch((err) => {
            logger.error(err.message)
            return res.status(500).json(err)
        })

    }

})

module.exports = router
