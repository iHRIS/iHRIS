const nconf = require('./config')
const user = require('./user')
const winston = require('winston')
const crypto = require('crypto')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const { response } = require('express')
const fhirAxios = nconf.fhirAxios


const TASK_EXTENSION = `${nconf.get('profileBaseUrl')}/StructureDefinition/ihris-task`;
const ROLE_EXTENSION = `${nconf.get('profileBaseUrl')}/StructureDefinition/ihris-role`;
const ASSIGN_ROLE_EXTENSION = `${nconf.get('profileBaseUrl')}/StructureDefinition/ihris-assign-role`;



const workflowAddUserRole = {
    process: (req) => {
        return new Promise((resolve, reject) => {

            let role = {

            }


        });
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