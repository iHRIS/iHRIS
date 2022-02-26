const nconf = require('./config')
const user = require('./user')
const winston = require('winston')
const crypto = require('crypto')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const { response } = require('express')
const fhirAxios = nconf.fhirAxios

const workflowTask = {
    process: (req) => {
        return new Promise(async (resolve, reject) => {

            let bundle = {
                resourceType: "Bundle",
                type: "transaction",
                entry: []
            }

            let taskname = undefined
            let resourceId = undefined
            let taskResource = undefined
            let taskInstance = undefined
            let taskPermission = undefined
            let extensions = []
            let attributesExtension = []

            try {
                if (req.body && req.body.item
                    && req.body.item[0].linkId === "Task"
                ) {
                    if ((req.body.item[0].item[0].item[0].linkId === "permission"
                        && req.body.item[0].item[0].item[0].answer[0].valueCoding
                        && req.body.item[0].item[0].item[1].linkId === "resource"
                        && req.body.item[0].item[0].item[1].answer[0].valueCoding) ||
                        (req.body.item[1].item[0].linkId === "permission"
                            && req.body.item[1].item[0].answer[0].valueCoding
                            && req.body.item[1].item[2].linkId === "instance"
                            && req.body.item[1].item[2].answer[0].valueString)) {

                        taskPermission = req.body.item[0].item[0].item[0].answer[0].valueCoding.code
                        if (taskPermission === "*") {
                            taskPermission = "all"
                        }
                        attributesExtension.push({
                            url: "permission",
                            valueCode: taskPermission
                        })
                        if (req.body.item[0].item[0].item[2].linkId === "instance"
                            && req.body.item[0].item[0].item[2].answer[0].valueString) {
                            taskInstance = req.body.item[0].item[0].item[2].answer[0].valueString
                            attributesExtension.push({
                                url: "instance",
                                valueString: taskInstance
                            })
                        }
                        if (req.body.item[0].item[0].item[1].linkId === "resource"
                            && req.body.item[0].item[0].item[1].answer[0].valueCoding) {
                            taskResource = req.body.item[0].item[0].item[1].answer[0].valueCoding.code

                            if (taskResource === "*") {
                                taskResource = "all"
                            }

                            attributesExtension.push({
                                url: "resource",
                                valueCode: taskResource
                            })
                        } else {
                            winston.error("No Resource attribute found")
                            resolve(await workflowTask.outcome("No Resource attribute found"))
                        }

                        if (req.body.item[0].item[0].item[3].linkId === "constraint"
                            && req.body.item[0].item[0].item[3].answer[0].valueString) {
                            attributesExtension.push({
                                url: "constraint",
                                valueString: req.body.item[0].item[0].item[3].answer[0].valueString
                            })
                        }
                        if (req.body.item[0].item[0].item[4].linkId === "field"
                            && req.body.item[0].item[0].item[4].answer[0].valueString) {
                            attributesExtension.push({
                                url: "field",
                                valueString: req.body.item[0].item[0].item[4].answer[0].valueString
                            })
                        }
                        extensions.push({
                            url: "http://ihris.org/fhir/StructureDefinition/task-attributes",
                            extension: attributesExtension
                        })
                    } else {
                        winston.error("Task permission has to be selected with either 'resource' or 'instance'")
                        resolve(await workflowTask.outcome("Task permission has to be selected with either 'resource' or 'instance'"))
                    }
                    if (taskResource && taskInstance) {
                        resourceId = taskPermission + "-" + taskInstance

                    } else if (taskResource && !taskInstance) {
                        resourceId = taskPermission + "-" + taskResource + "-" + "resource"
                        extensions.push({
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                            valueString: resourceId
                        })
                    }
                    let newTask = {
                        resourceType: "Basic",
                        id: "ihris-task-" + resourceId,
                        meta: {
                            profile: ["http://ihris.org/fhir/StructureDefinition/ihris-task"]
                        },
                        extension: extensions,
                        code: {
                            coding: [
                                {
                                    code: "task",
                                    system: "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem"
                                }
                            ]
                        },
                    }
                    bundle.entry.push({
                        resource: newTask,
                        request: {
                            method: "PUT",
                            url: "Basic/ihris-task-" + resourceId
                        }
                    })
                    winston.info(JSON.stringify(bundle, null, 2))
                    resolve(bundle)
                } else {
                    winston.error("Task Questionnaire not found")
                    resolve(await workflowTask.outcome("Task Questionnaire not found"))
                }
            } catch (err) {
                winston.error(err)
                resolve(await workflowTask.outcome(err.message))
            }
        })
    },

    postProcess: (req, results) => {
        return new Promise((resolve, reject) => {
            if (results.entry && results.entry.length > 0 && results.entry[0].response.location) {
                if (!req.body.meta) req.body.meta = {}
                if (!req.body.meta.tag) req.body.meta.tag = []
                req.body.meta.tag.push({ system: "http://ihris.org/fhir/tags/resource", code: results.entry[0].response.location })
                resolve(req)
            }
        })
    },

    outcome: (message) => {
        return new Promise((resolve, reject) => {
            let outcomeBundle = {
                resourceType: "Bundle",
                type: "transaction",
                entry: [{
                    resource: {
                        resourceType: "OperationOutcome",
                        issue: [
                            {
                                severity: "error",
                                code: "exception",
                                diagnostics: message
                            }]
                    },
                    request: {
                        method: "POST",
                        url: "OperationOutcome"
                    }
                }]
            }
            winston.info(JSON.stringify(outcomeBundle, null, 2))
            resolve(outcomeBundle)
        })
    }

};

module.exports = workflowTask