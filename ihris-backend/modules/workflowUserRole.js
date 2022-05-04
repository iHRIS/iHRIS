const nconf = require('./config')
const user = require('./user')
const winston = require('winston')
const crypto = require('crypto')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const { response } = require('express')
const fhirAxios = nconf.fhirAxios

const workflowUserRole = {
    process: (req) => {
        console.log("resqquest", JSON.stringify(req.body.item[0], null, 2))

        return new Promise(async (resolve, reject) => {

            let bundle = {
                resourceType: "Bundle",
                type: "transaction",
                entry: []
            }

            let roleName = undefined
            let roleDescription = undefined
            let roleTasks = undefined
            let roleRoles = undefined

            let extensions = []

            try {
                if (req.body && req.body.item
                    && req.body.item[0].linkId === "Role"
                    && req.body.item[0].item[0].linkId === "rolename"
                    && req.body.item[0].item[0].answer[0].valueString
                ) {


                    // role name rolename
                    if (req.body.item[0].item.find((item) => item.linkId == "rolename")) {

                        roleName = req.body.item[0].item[0].answer[0].valueString
                        let name = {
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                            valueString: roleName
                        }
                        extensions.push(name)

                    }

                    // role description roledescription
                    if (req.body.item[0].item.find((item) => item.linkId === "roledescription") !== undefined
                        && req.body.item[0].item.find((item) => item.linkId === "roledescription").answer[0]
                        && req.body.item[0].item.find((item) => item.linkId === "roledescription").answer[0].valueString) {

                        roleDescription = req.body.item[0].item.find((item) => item.linkId === "roledescription").answer[0].valueString
                        let description = {
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-role-description",
                            valueString: roleDescription
                        }
                        extensions.push(description)
                    }

                    // is primary role

                    if (req.body.item[0].item.find((item) => item.linkId == "primary")
                        && req.body.item[0].item[2].answer[0]
                        && req.body.item[0].item[2].answer[0].valueBoolean) {
                        extensions.push({
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-role-primary",
                            valueBoolean: req.body.item[0].item[2].answer[0].valueBoolean
                        })
                    }

                    // tasks (needs a different approach)
                    if (req.body.item[0].item.find((item) => item.linkId == "tasks")) {
                        // role tasks
                        roleTasks = req.body.item[0].item.find((item) => item.linkId == "tasks").answer
                        roleTasks.map((roleTask) => {
                            let task = {
                                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-task",
                                valueReference: roleTask.valueReference.reference
                            }
                            extensions.push(task)
                        })
                    }

                    // roles
                    if (req.body.item[0].item.find((item) => item.linkId == "roles")) {
                        //role roles
                        roleRoles = req.body.item[0].item.find((item) => item.linkId == "roles").answer
                        roleRoles.map((roleRole) => {
                            let role = {
                                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                                valueReference: roleRole.valueReference.reference
                            }
                            extensions.push(role)
                        })

                    }


                    let newRole = {
                        resourceType: "Basic",
                        id: "nhwr-role-" + roleName.replace(/ /g, "").toLowerCase(),
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
                    let url = "Basic/nhwr-role-" + roleName.replace(/ /g, "").toLowerCase()
                    bundle.entry.push({
                        resource: newRole,
                        request: {
                            method: "PUT",
                            url: url
                        }
                    })
                    winston.info("Bundle")
                    winston.info(JSON.stringify(bundle, null, 2))
                    resolve(bundle)
                } else {
                    winston.error("Role name not provided")
                    resolve(await workflowUserRole.outcome("Role name not provided"))
                }
            } catch (err) {
                winston.error(err.message)
                resolve(await workflowUserRole.outcome(err.message))
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

module.exports = workflowUserRole