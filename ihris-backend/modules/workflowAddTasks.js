const nconf = require('./config')
const user = require('./user')
const winston = require('winston')
const crypto = require('crypto')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const { response } = require('express')
const fhirAxios = nconf.fhirAxios

const workflowAddTasks = {
    process: (req) => {


        console.log("req", JSON.stringify(req.body, null, 2))

        return new Promise((resolve, reject) => {

            let bundle = {
                resourceType: "Bundle",
                type: "transaction",
                entry: []
            }

            let taskResource = undefined
            let taskInstance = undefined
            let taskConstraint = undefined
            let taskField = undefined
            let taskPermission = undefined
            let extensions = []

            if (req.body) {

                if (req.body.item[1] !== "") {

                    taskInstance = req.body.item[1].item.find((item) => item.linkId == "instance").answer[0].valueString

                    taskConstraint = req.body.item[1].item.find((item) => item.linkId == "constraint").answer[0].valueString

                    taskField = req.body.item[1].item.find((item) => item.linkId == "field").answer[0].valueString

                    taskPermission = req.body.item[1].item.find((item) => item.linkId == "permission").answer[0].valueCoding.code

                    taskResource = req.body.item[1].item.find((item) => item.linkId == "resource").answer[0].valueCoding.code


                    if (taskResource === "*") {
                        taskResource = "all"
                    }

                    if (taskPermission === "*") {
                        taskPermission = "all"
                    }

                    let name = {
                        url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                        valueString: taskPermission + "-" + taskResource + "-" + "resource"
                    }

                    extensions.push(name)


                }

                // add task attributes
                let taskAttributes = {
                    url: "http://ihris.org/fhir/StructureDefinition/task-attributes",
                    extension: [
                        {
                            "url": "permission",
                            "valueCode": taskPermission
                        },
                        {
                            "url": "resource",
                            "valueCode": taskResource
                        }, {
                            "url": "constraint",
                            "valueString": taskConstraint
                        }, {
                            "url": "instance",
                            "valueId": taskInstance
                        }, {
                            "url": "field",
                            "valueCode": taskField
                        }

                    ]
                }

                extensions.push(taskAttributes)


                // create basic object
                let newTask = {
                    resourceType: "Basic",
                    id: "ihris-task-" + taskPermission + "-" + taskResource + "-" + "resource",
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
                let url = "Basic/ihris-task-" + taskPermission + "-" + taskResource + "-" + "resource"
                bundle.entry.push({
                    resource: newTask,
                    request: {
                        method: "PUT",
                        url: url
                    }
                })
            }
            winston.info("Bundle")
            winston.info(JSON.stringify(bundle, null, 2))
            resolve(bundle)

        });
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

module.exports = workflowAddTasks