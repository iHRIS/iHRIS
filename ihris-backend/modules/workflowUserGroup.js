const nconf = require('./config')
const user = require('./user')
const winston = require('winston')
const crypto = require('crypto')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const { response } = require('express')
const fhirAxios = nconf.fhirAxios

const workflowUserGroup = {
    process: (req) => {

        console.log("resqquest", JSON.stringify(req.body.item[0], null, 2))


        return new Promise(async (resolve, reject) => {

            let groupName = undefined
            let userRoles = undefined

            let extensions = []


            try {
                let bundle = {
                    resourceType: "Bundle",
                    type: "transaction",
                    entry: []
                }

                // values check
                if (req.body && req.body.item
                    && req.body.item[0].linkId === "Group"
                    && req.body.item[0].item[0].linkId === "groupname"
                    && req.body.item[0].item[0].answer[0].valueString
                ) {

                    // get groupname
                    if (req.body.item[0].item[0].linkId == "groupname") {

                        groupName = req.body.item[0].item[0].answer[0].valueString
                        let name = {
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                            valueString: groupName
                        }
                        extensions.push(name)
                    }
                    // get roles
                    if (req.body.item[0].item.find((item) => item.linkId == "roles")) {
                        //role roles
                        userRoles = req.body.item[0].item.find((item) => item.linkId == "roles").answer
                        let roles = {}
                        userRoles.forEach(element => {
                            roles = {
                                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                                valueReference: {
                                    reference: element.valueReference.reference
                                }

                            }
                        });
                        extensions.push(roles)
                    }

                } else {
                    winston.error("Group name not provided")
                    resolve(await workflowUserGroup.outcome("Group name not provided"))
                }



                // formalaise the user group
                let newGroup = {
                    resourceType: "Basic",
                    id: "nhwr-group-" + groupName.replace(/ /g, "").toLowerCase(),
                    meta: {
                        profile: ["http://ihris.org/fhir/StructureDefinition/ihris-group"]
                    },
                    extension: extensions,
                    code: {
                        coding: [
                            {
                                code: "group",
                                system: "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem"
                            }
                        ]
                    },
                }

                // create  the group id
                let url = "Basic/nhwr-group-" + groupName.replace(/ /g, "").toLowerCase()

                bundle.entry.push({
                    resource: newGroup,
                    request: {
                        method: "PUT",
                        url: url
                    }
                })
                winston.info(JSON.stringify(bundle, null, 2))
                resolve(bundle)

            } catch (err) {
                winston.error(err.message)
                resolve(await workflowUserGroup.outcome(err.message))
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

module.exports = workflowUserGroup