const nconf = require("../config");
const user = require("../user");
const winston = require("winston");
const crypto = require("crypto");
const ihrissmartrequire = require("ihrissmartrequire")
const outcomes = ihrissmartrequire('config/operationOutcomes')
const sendEmail = require("../sendEmail");
const fhirAxios = nconf.fhirAxios;
const {v4: uuidv4} = require("uuid");
const clientUrl = nconf.get('auth:CLIENT_URL')

function hashPassword(password1, userId, resetToken) {
  const password = password1.toString().trim()
  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  let hash = crypto.pbkdf2Sync(userId, resetToken, 1000, 64, 'sha512').toString('hex')
  let expireTime = new Date(Date.now() + (60 * 60 * 1000))
  return {
    "url": "http://ihris.org/fhir/StructureDefinition/ihris-password", "extension": [{
      "url": "password", "valueString": passwordHash
    }, {
      "url": "salt", "valueString": salt
    }, {
      "url": "resetPasswordToken", "valueString": hash
    }, {
      "url": "resetPasswordExpiry", "valueString": expireTime
    }]
  };
}

const ROLE_EXTENSION = "http://ihris.org/fhir/StructureDefinition/ihris-assign-role";
const TASK_EXTENSION = "http://ihris.org/fhir/StructureDefinition/ihris-task";

let locationRoleID = undefined;

const workflowUser = {
  process: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bundle = {
          resourceType: "Bundle", type: "transaction", entry: [],
        };
        /*if ( req.body && req.body.item
          && req.body.item && req.body.item[0].linkId === "Person"
          && req.body.item[0].item && req.body.item[0].item[0].linkId === "Person.name[0].text"
          && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0]
          && req.body.item[0].item[0].answer[0].valueString
          && req.body.item[0].item[3].linkId === "Person.telecom[0].value"
          && req.body.item[0].item[3].answer
          && req.body.item[0].item[3].answer[0]
          && req.body.item[0].item[3].answer[0].valueString) {*/
        let userEmail = req.body.item[0].item[3].answer[0].valueString;
        let userRoles = undefined;
        let userRoleId = undefined;
        let status = true;
        let extensions = [];
        let userId = uuidv4()
        user
            .lookupByEmail(userEmail,false)
            .then(async (userObj) => {
              if (!userObj) {
                if (req.body.item[0].item[5].linkId === "location" && req.body.item[0].item[5].answer && req.body.item[0].item[5].answer[0] && req.body.item[0].item[5].answer[0].valueReference.reference !== "") {
                  try {
                    userRoles = await fhirAxios.search("Basic", {
                      locationconstraint: "related-location=" + req.body.item[0].item[5].answer[0].valueReference,
                    });
                  } catch (err) {
                    winston.error("Error Getting user roles for user" + req.body.item[0].item[3].answer[0].valueString);
                    resolve(await workflowUser.outcome("Error Getting user roles for user " + req.body.item[0].item[3].answer[0].valueString));
                  }
                  let locationValueReference = req.body.item[0].item[5].answer[0].valueReference.reference;
                  if (userRoles.entry) {
                    userRoleId = userRoles.entry[0].resource.id;
                    extensions.push({
                      url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                      valueReference: {reference: "Basic/" + userRoleId},
                    });
                  } else {
                    let newRole = undefined;
                    try {
                      newRole = await workflowUser.createLocationRole(locationValueReference);
                    } catch (error) {
                      winston.error("Error creating new role for " + locationValueReference);
                      resolve(await workflowUser.outcome("Error creating new role for " + locationValueReference));
                    }
                    let roleURL = "Basic/" + locationRoleID;
                    bundle.entry.push({
                        resource: newRole,
                        request: {
                            method: "PUT",
                            url: roleURL,
                        },
                    });

                    extensions.push({
                        url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                        valueReference: {reference: "Basic/" + locationRoleID},
                    });
                  }
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-user-location",
                    valueReference: req.body.item[0].item[5].answer[0].valueReference,
                  });
                  let primaryLocationID = locationValueReference.split("/");
                  //winston.info("PRIMARY ID",primaryLocationID )
                  let relatedExt = [];
                  //let relatedLocations = []
                  try {
                    let relatedLocationsBundle = await fhirAxios.search("Location", {
                      _id: primaryLocationID[1],
                      status: "active",
                      "_include:iterate": "Location:partof",
                    });
                    for (let entry of relatedLocationsBundle.entry) {
                      relatedExt.push({
                        url: "location", valueString: "Location/" + entry.resource.id,
                      });
                    }
                  } catch (err) {
                    winston.error("Failed to get related locations for ", primaryLocationID[1]);
                    resolve(await workflowUser.outcome("Failed to Find location " + primaryLocationID[1]));
                  }
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
                    extension: relatedExt,
                  });
                }
                if (req.body.item[0].item[4].linkId === "role" && req.body.item[0].item[4].answer && req.body.item[0].item[4].answer[0] && req.body.item[0].item[4].answer[0].valueReference) {
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                    valueReference: req.body.item[0].item[4].answer[0].valueReference,
                  });
                }
                let practitioner = req.body.item[0].item.find(x => x.linkId === "practitioner")
                if (practitioner && practitioner.answer && practitioner.answer[0] && practitioner.answer[0].valueReference.reference != null) {
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-user-practitioner",
                    valueReference: {reference: practitioner.answer[0].valueReference.reference}
                  })
                }
                let password = req.body.item[0].item.find(x => x.linkId === "password")?.answer[0]?.valueString
                if(password){
                  try {
                    let passwordExt = []
                    let salt = crypto.randomBytes(16).toString('hex')
                    let hash = crypto.pbkdf2Sync( password, salt, 1000, 64, 'sha512' ).toString('hex')
                    passwordExt.push({ url:"password",
                              valueString: hash
                              })
                    passwordExt.push({ url:"salt",
                              valueString: salt
                              })
                    extensions.push({ url: "http://ihris.org/fhir/StructureDefinition/ihris-password",
                              extension : passwordExt
                            })
                  } catch (err) {
                      winston.error("Error setting Password ")
                      reject(err)
                  }
                }else {
                  winston.info("NO PASSWORD SET ")
                  resolve(await workflowUser.outcome("No Password set for this User")) 
                }
                extensions.push({
                  "url": "http://ihris.org/fhir/StructureDefinition/ihris-first-time-login",
                  "valueBoolean": true
                })
                let name = "";
                if (req.body.item[0].item.find(x => x.linkId === "Person.name[0].text")) {
                  name = req.body.item[0].item.find(x => x.linkId === "Person.name[0].text").answer[0].valueString
                } else {
                  winston.info("NO NAME ");
                  resolve(await workflowUser.outcome("No Name for this User"));
                }
                if (req.body.item[0].item.find(x => x.linkId === "Person.active")) {
                  status = req.body.item[0].item.find(x => x.linkId === "Person.active")?.answer[0].valueString
                }
                let newUser = {
                  resourceType: "Person", id: userId, meta: {
                    profile: ["http://ihris.org/fhir/StructureDefinition/ihris-person-user",],
                  }, extension: extensions, name: [{
                    use: "official", text: name,
                  },], telecom: [{
                    system: "email", value: userEmail,
                  },],
                  "active": status
                };
                let url = `Person/${userId}`;
                bundle.entry.push({
                  resource: newUser, request: {
                    method: "PUT", url: url,
                  },
                });
              } else {
                winston.error("User " + req.body.item[0].item[3].answer[0].valueString + " Exist");
                resolve(await workflowUser.outcome("User " + req.body.item[0].item[3].answer[0].valueString + " Exist"));
                //reject(err.message)
              }
              resolve(bundle);
            })
            .catch((err) => {
              console.log("ERROR", err)
              reject(err.message);
            });
        //}
      } catch (err) {
        winston.error(err);
        reject(err.message);
      }
    });
  }, postProcess: (req, results) => {
    return new Promise((resolve, reject) => {
      if (results.entry && results.entry.length === 1 && results.entry[0].response.location) {
        if (!req.body.meta) req.body.meta = {};
        if (!req.body.meta.tag) req.body.meta.tag = [];
        req.body.meta.tag.push({
          system: "http://ihris.org/fhir/tags/resource", code: results.entry[0].response.location,
        });
        resolve(req);
      } else if (results.entry && results.entry.length > 1) {
        for (let entry of results.entry) {
          if (entry.response.location.includes("Person/")) {
            if (!req.body.meta) req.body.meta = {};
            if (!req.body.meta.tag) req.body.meta.tag = [];
            req.body.meta.tag.push({
              system: "http://ihris.org/fhir/tags/resource", code: entry.response.location,
            });
            resolve(req);
          }
        }
      }
    });
  }, createLocationRole: (locationReference) => {
    return new Promise((resolve, reject) => {
      try {
        let locationID = locationReference.split("/");
        fhirAxios
            .search("Location", {_id: locationID[1]})
            .then((locationResource) => {
              let locationName = locationResource.entry[0].resource.name;
              let extensions = [];
              extensions.push({
                url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                valueString: locationName,
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-role-primary", valueBoolean: false,
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "read",
                }, {
                  url: "resource", valueCode: "Location",
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "read",
                }, {
                  url: "resource", valueCode: "Basic",
                }, {
                  url: "instance", valueId: "ihris-page-practitioner",
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "read",
                }, {
                  url: "resource", valueCode: "Basic",
                }, {
                  url: "instance", valueId: "ihris-page-practitionerrole",
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "read",
                }, {
                  url: "resource", valueCode: "Questionnaire",
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "write",
                }, {
                  url: "resource", valueCode: "QuestionnaireResponse",
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "*",
                }, {
                  url: "resource", valueCode: "*",
                }, {
                  url: "constraint",
                  valueString: "extension.where(url = 'http://ihris.org/fhir/StructureDefinition/ihris-related-group' ).extension.exists( url = 'location' and valueString = '" + locationReference + "')",
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "filter",
                }, {
                  url: "resource", valueCode: "Person",
                }, {
                  url: "constraint", valueString: "related-location=" + locationReference,
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "filter",
                }, {
                  url: "resource", valueCode: "Practitioner",
                }, {
                  url: "constraint", valueString: "related-location=" + locationReference,
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-task", extension: [{
                  url: "permission", valueCode: "filter",
                }, {
                  url: "resource", valueCode: "PractitionerRole",
                }, {
                  url: "constraint", valueString: "related-location=" + locationReference,
                },],
              }, {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role", valueReference: {
                  reference: "Basic/ihris-role-open",
                },
              });
              locationRoleID = "ihris-role-location-based-" + locationName.replace(/\s/g, "").replace(/[^a-zA-Z ]/g, "").toLowerCase();
              let newRole = {
                resourceType: "Basic", id: locationRoleID, meta: {
                  profile: ["http://ihris.org/fhir/StructureDefinition/ihris-role",],
                }, extension: extensions,
              };
              resolve(newRole);
            })
            .catch((err) => {
              console.error(err);
              reject(err);
            });
      } catch (err) {
        winston.error("Error creating location role for " + locationReference);
        reject(err.message);
      }
    });
  }, outcome: (message) => {
    return new Promise((resolve, reject) => {
      let outcomeBundle = {
        resourceType: "Bundle", type: "transaction", entry: [{
          resource: {
            resourceType: "OperationOutcome", issue: [{
              severity: "error", code: "exception", diagnostics: message,
            },],
          }, request: {
            method: "POST", url: "OperationOutcome",
          },
        },],
      };

      resolve(outcomeBundle);
    });
  },
};
module.exports = workflowUser;
