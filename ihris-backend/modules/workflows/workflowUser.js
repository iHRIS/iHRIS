const winston = require('winston')
const crypto = require("crypto");
const ihrissmartrequire = require("ihrissmartrequire")
const fhirQuestionnaire = ihrissmartrequire('modules/fhir/fhirQuestionnaire')
const user = ihrissmartrequire('modules/user')

const workflowUser = {
<<<<<<< HEAD
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
        let extensions = [];
        let userId = uuidv4()
        user
            .lookupByEmail(userEmail)
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
                let newUser = {
                  resourceType: "Person", id: userId, meta: {
                    profile: ["http://ihris.org/fhir/StructureDefinition/ihris-person-user",],
                  }, extension: extensions, name: [{
                    use: "official", text: name,
                  },], telecom: [{
                    system: "email", value: userEmail,
                  },],
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
=======
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      console.log('here');
      fhirQuestionnaire.processQuestionnaire(req.body).then(async(bundle) => {
        console.error(JSON.stringify(bundle, 0, 2));
        let person = bundle.entry[0].resource
        let userEmail = person.telecom.find((tel) => {
          return tel.system === 'email'
        }).value
        let initialPassword = person.extension.find((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/initial-password'
        })
        let cInitialPassword = person.extension.find((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/confirm-initial-password'
        })
        if(initialPassword && cInitialPassword && initialPassword.valueString !== cInitialPassword.valueString ) {
          return reject({message: "Password missmatch"})
>>>>>>> upstream/master
        }
        await user.lookupByEmail(userEmail).then((userObj) => {
          if(userObj) {
            if(req.query.editing) {
              let editingResources = JSON.parse(req.query.editingResources)
              if(editingResources[0].id !== userObj.resource.id) {
                return reject({message: "User exists into the system"})
              }
            } else {
              return reject({message: "User exists into the system"})
            }
          }
        })
        let salt = crypto.randomBytes(16).toString('hex')
        let hash = crypto.pbkdf2Sync( initialPassword.valueString, salt, 1000, 64, 'sha512' ).toString('hex')
        if(!person.extension) {
          person.extension = []
        }
        let passwdIndex = person.extension.findIndex((ext) => {
          return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password"
        })
        if(passwdIndex === -1) {
          passwdIndex = person.extension.length
        }
        person.extension[passwdIndex] = {
          url: "http://ihris.org/fhir/StructureDefinition/ihris-password",
          extension: [{
            url: "password",
            valueString: hash
          }, {
            url: "salt",
            valueString: salt
          }, {
            url: "passwordChanged",
            valueBoolean: false
          }]
        }
        let iniPassInd = person.extension.findIndex((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/initial-password'
        })
        if(iniPassInd) {
          person.extension.splice(iniPassInd, 1)
        }
        let cIniPassInd = person.extension.findIndex((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/confirm-initial-password'
        })
        if(cIniPassInd) {
          person.extension.splice(cIniPassInd, 1)
        }
        return resolve(bundle)
      })
    } )
  },
  outcome: (message) => {
    return new Promise ((resolve, reject ) => {
      let outcomeBundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [{
          resource:{
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
      winston.info(JSON.stringify(outcomeBundle,null,2))
      resolve(outcomeBundle)
    })
  }
}
 
module.exports = workflowUser
