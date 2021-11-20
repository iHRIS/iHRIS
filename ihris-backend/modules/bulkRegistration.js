const fs = require('fs')
const util = require('util')
const isEmpty = require('is-empty')
const fhirSecurity = require("../modules/fhirSecurity");
const winston = require("winston");
const fhirAxios = require("./fhirAxios");

const userDataIsValid = (user) => {
    return !(isEmpty(user) || isEmpty(user.FirstName));
}

let bundle = {
    resourceType: "Bundle",
    type: "transaction",
}

const practitionerTemplate = (users) => (
       users.filter(user => userDataIsValid(user)).map(user => ({
        "resource": {
            "resourceType": "Practitioner",
            "meta": {
                "profile": ["http://ihris.org/fhir/StructureDefinition/ihris-practitioner"]
            },
            "extension": [
                {
                    "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-familynames",
                    "extension": [
                        {
                            "url": "fathers",
                            "valueString": user.MiddleName
                        },
                        {
                            "url": "fathers",
                            "valueString": user.MiddleName
                        },
                        {
                            "url": "grandfatherslastname",
                            "valueString": user.LastName
                        },
                    ]
                }, {
                    "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence",
                    "valueReference": {
                        "reference": "Location/ET.R1.Z110"
                    }
                },
                {
                    "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-marital-status",
                    "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-marital-status-codesystem",
                        "code": user.MartialStatus
                    }
                },],
            "identifier": [{
                "type": {
                    "coding": [{
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-identifier",
                        "code": "employeeId"
                    }]
                },
                "value": user.EmployId
            }, {
                "type": {
                    "coding": [{
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-identifier",
                        "code": "fileNo"
                    }]
                },
                "value": user.FileNumber
            }],
            "name": [
                {
                    "extension": [{
                        "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-prefix",
                        "valueCoding": {
                            "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-prefix-codesystem",
                            "code": "mr",
                            "display": "Mr"
                        }
                    }],
                    "use": "official",
                    "given": user.FirstName
                }],
            "gender": user.Gender,
            "birthDate": user.BrithDate,

        },
        "request": {
            "method": "POST",
            "url": "Practitioner"
        }
    }))
)

function processJobs(usersData) {
    let practioner = practitionerTemplate(usersData)
    bundle.entry = practioner
    console.log(util.inspect(bundle, {depth: null}))
    return bundle
    // fhirAxios.create( bundle ).then( (results) => {
    //     console.log("it works")
    //     console.log(results)
    // } ).catch( (err) => {
    //     winston.error(err.message)
    //     console.log("error hapened")
    //     //return res.status( err.response.status ).json( err.response.data )
    //     // return res.status( 500 ).json( { err: err.message } )
    //     console.log(util.inspect(err, {depth: null}))
    //     // console.log(err)
    // } )
}

module.exports = processJobs


