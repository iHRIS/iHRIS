const nconf = require('./config')
const user = require('./user')
const winston = require('winston')
const crypto = require('crypto')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const { response } = require('express')
const fhirAxios = nconf.fhirAxios

const workflowAddUserRole = {
    process: (req) => {


        console.log("req", JSON.stringify(req.body, null, 2))



        return new Promise((resolve, reject) => {

            let bundle = {
                resourceType: "Bundle",
                type: "transaction",
                entry: []
            }

            let roleName = undefined
            let roleTask = undefined
            let roleIsPrimary = undefined

            let extensions = []

            if (req.body !== "") {

                // role names
                roleName = req.body.item[0].item.find((item) => item.linkId == "rolename").answer[0].valueString

                let name = {
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                    valueString: roleName
                }

                extensions.push(name)

                // is primary
                roleIsPrimary = req.body.item[0].item.find((item) => item.linkId == "primary").answer[0].valueBoolean

                let primary = {
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-role-primary",
                    valueBoolean: roleIsPrimary
                }
                extensions.push(primary)


                // role tasks
                roleTask = req.body.item[0].item.find((item) => item.linkId == "tasks").answer

                let tasks = {}

                roleTask.forEach(element => {
                    tasks = {
                        url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-task",
                        valueReference: {
                            reference: element.valueReference.reference
                        }

                    }
                });

                extensions.push(tasks)


                let newRole = {
                    resourceType: "Basic",
                    id: "ihris-role-" + roleName.replace(/ /g, "").toLowerCase(),
                    meta: {
                        profile: ["http://ihris.org/fhir/StructureDefinition/ihris-role"]
                    },
                    extension: extensions,
                    code: {
                        coding: [
                            {
                                code: "role",
                                system: "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem"
                            }
                        ]
                    }
                }
                let url = "Basic/ihris-role-" + roleName.replace(/ /g, "").toLowerCase()
                bundle.entry.push({
                    resource: newRole,
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

module.exports = workflowAddUserRole