const winston = require('winston')

const workflowUserRole = {
    process: (req) => {

        return new Promise(async (resolve, reject) => {

            let bundle = {
                resourceType: "Bundle",
                type: "transaction",
                entry: []
            }

            let roleName = undefined
            let roleTasks = undefined
            let roleRoles = undefined

            let extensions = []

            try {
                if (req.body && req.body.item
                    && req.body.item[0].linkId === "Role"
                    && req.body.item[0].item[0].linkId === "rolename"
                    && req.body.item[0].item[0].answer[0].valueString
                ) {

                    if (req.body.item[0].item[0].linkId == "rolename") {

                        roleName = req.body.item[0].item[0].answer[0].valueString
                        let name = {
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                            valueString: roleName
                        }
                        extensions.push(name)
                    }


                    if (req.body.item[0].item[2].linkId === "primary"
                        && req.body.item[0].item[2].answer[0]
                        && req.body.item[0].item[2].answer[0].valueBoolean) {
                        extensions.push({
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-role-primary",
                            valueBoolean: req.body.item[0].item[2].answer[0].valueBoolean
                        })
                    }

                    if (req.body.item[0].item.find((item) => item.linkId == "tasks")) {
                        // role tasks
                        roleTasks = req.body.item[0].item.find((item) => item.linkId == "tasks").answer
                        let tasks = {}
                        roleTasks.forEach(element => {
                            tasks = {
                                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-task",
                                valueReference: {
                                    reference: element.valueReference.reference
                                }

                            }
                        });
                        extensions.push(tasks)
                    }
                    if (req.body.item[0].item.find((item) => item.linkId == "roles")) {
                        //role roles
                        roleRoles = req.body.item[0].item.find((item) => item.linkId == "roles").answer
                        let roles = {}
                        roleRoles.forEach(element => {
                            roles = {
                                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                                valueReference: {
                                    reference: element.valueReference.reference
                                }

                            }
                        });
                        extensions.push(roles)
                    }


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