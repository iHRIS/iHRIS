const winston = require('winston')
const ihrissmartrequire = require("ihrissmartrequire")
const fhirQuestionnaire = ihrissmartrequire('modules/fhir/fhirQuestionnaire')
const fhirAxios = ihrissmartrequire("fhirAxios")

const workflowTask = {
    process: (req) => {
        return new Promise(async (resolve, reject) => {
            await fhirQuestionnaire.processQuestionnaire(req.body).then(async(bundle) => {
							console.error(JSON.stringify(bundle, 0, 2));
							let attributes = bundle.entry[0].resource.extension.find((ext) => {
								return ext.url === "http://ihris.org/fhir/StructureDefinition/task-attributes"
							})
							if(!attributes) {
								return reject({message: "Task has no attributes"})
							}
							let taskResource = attributes.extension.find((ext) => {
								return ext.url === "resource"
							})?.valueCode
							let taskInstance = attributes.extension.find((ext) => {
								return ext.url === "instance"
							})?.valueString
							let taskPermission = attributes.extension.find((ext) => {
								return ext.url === "permission"
							})?.valueCode
							let resourceId
							if (taskResource && taskInstance) {
								resourceId = taskPermission + "-" + taskInstance
							} else if (taskResource && !taskInstance) {
								resourceId = taskPermission + "-" + taskResource + "-" + "resource"
							}
							bundle.entry[0].resource.extension.push({
								url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
								valueString: resourceId
							})
							bundle.entry[0].resource.id = "ihris-task-" + resourceId
							bundle.entry[0].request = {
								method: "PUT",
								url: "Basic/ihris-task-" + resourceId
							}
							return resolve(bundle)
						})
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