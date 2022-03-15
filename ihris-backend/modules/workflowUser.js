const nconf = require("./config");
const user = require("./user");
const winston = require("winston");
const crypto = require("crypto");
const outcomes = require("../config/operationOutcomes");
const fhirAxios = nconf.fhirAxios;

const ROLE_EXTENSION =
  "http://ihris.org/fhir/StructureDefinition/ihris-assign-role";
const TASK_EXTENSION = "http://ihris.org/fhir/StructureDefinition/ihris-task";

let locationRoleID = undefined;

let userEmail = undefined;
let userName = undefined;
let location = undefined;
let practitioner = undefined;
let password = undefined;
let role = undefined;

let filteredResources = [
  "Practitioner",
  "PractitionerRole",
  "Person",
  "Basic",
];
let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: [],
};

const workflowUser = {
  process: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userObj;
        

        /*if ( req.body && req.body.item 
          && req.body.item && req.body.item[0].linkId === "Person"
          && req.body.item[0].item && req.body.item[0].item[0].linkId === "Person.name[0].text" 
          && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0] 
          && req.body.item[0].item[0].answer[0].valueString
          && req.body.item[0].item[3].linkId === "Person.telecom[0].value" 
          && req.body.item[0].item[3].answer 
          && req.body.item[0].item[3].answer[0] 
          && req.body.item[0].item[3].answer[0].valueString) {*/
        //let userEmail = req.body.item[0].item[3].answer[0].valueString;
        let userRoles = undefined;
        let constraint = undefined;
        let hasLocation = false;
        let userRoleId = undefined;
        let extensions = [];

        req.body.item[0].item.forEach(async (itm) => {
          if (
            itm.linkId === "location" &&
            itm.answer &&
            itm.answer[0] &&
            itm.answer[0].valueReference.reference != ""
          ) {
            location = itm.answer[0].valueReference.reference;
          }

          if (
            itm.linkId === "Person.telecom[0].value" &&
            itm.answer &&
            itm.answer[0] &&
            itm.answer[0].valueString != ""
          ) {
            userEmail = itm.answer[0].valueString;
          }

          if (
            itm.linkId === "password" &&
            itm.answer &&
            itm.answer[0] &&
            itm.answer[0].valueString != ""
          ) {
            password = itm.answer[0].valueString;
          }

          if (
            itm.linkId === "role" &&
            itm.answer &&
            itm.answer[0] &&
            itm.answer[0].valueReference.reference != ""
          ) {
            role = itm.answer[0].valueReference.reference;
          }

          if (
            itm.linkId === "Person.name[0].text" &&
            itm.answer &&
            itm.answer[0] &&
            itm.answer[0].valueString != ""
          ) {
            userName = itm.answer[0].valueString;
          }

          if (
            itm.linkId === "practitioner" &&
            itm.answer &&
            itm.answer[0] &&
            itm.answer[0].valueReference.reference != ""
          ) {
            practitioner = itm.answer[0].valueReference.reference;
          }
        });
        user
          .lookupByEmail(userEmail)
          .then(async (userObj) => {
            if (!userObj) {
              /**TO DO */
              //If role contains (location Based) then location should be mandatory(maybe on frontend)
              //Health worker field field only for self service role(maybe do this on frontend)
              if (location && location != undefined) {
                
                let locationID = location.split("/");
                let locationName
                let locationResource = await fhirAxios.search("Location", { _id: locationID[1] })
                locationName = locationResource.entry[0].resource.name;
                
                try {
                  //CHeck if the correct role has been selected!!!!
                  userRoles = await fhirAxios.search("Basic", {
                    _id:  "ihris-role-location-based-" +locationName.replace(/\s/g, "").toLowerCase(),
                  });
                } catch (err) {
                  console.log(err);
                  winston.error("Error Getting user roles for user" + userName);
                  resolve(
                    await workflowUser.outcome(
                      "Error Getting user roles for user " + userName
                    )
                  );
                }
                let locationValueReference = location;
                if (userRoles && userRoles !== undefined && userRoles.total > 0) {
                  userRoleId = "ihris-role-location-based-" +locationName.replace(/\s/g, "").toLowerCase()
                 
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                    valueReference: { reference: "Basic/" + userRoleId },
                  });
                } else {
                  let filteredTasks = undefined;
                  try {
                    filteredTasks =
                      await workflowUser.createLocationFilterTasks(
                        locationValueReference
                      );
                
                  } catch (error) {
                    console.log(error);
                    winston.error(
                      "Error creating filtered tasks for " +
                        locationValueReference
                    );
                    resolve(
                      await workflowUser.outcome(
                        "Error filtered tasks for " + locationValueReference
                      )
                    );
                  }

                  let newRole = undefined;
                  try {
                    newRole = await workflowUser.createLocationRole(
                      locationValueReference
                    );
                  } catch (error) {
                    console.log(error);
                    winston.error(
                      "Error creating new role for " + locationName
                    );
                    resolve(
                      await workflowUser.outcome(
                        "Error creating new role for " + locationName
                      )
                    );
                  }
                  /*bundle.entry.push({
                    resource:filteredTasks,
                  });*/
                  let roleURL = "Basic/" + newRole.id
                  bundle.entry.push({
                    resource: newRole,
                    request: {
                      method: "PUT",
                      url: roleURL,
                    },
                  });

                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                    valueReference: { reference: "Basic/" + newRole.id },
                  });
                }
                extensions.push({
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-user-location",
                  valueReference: { reference: location },
                });
                let primaryLocationID = locationValueReference.split("/");

                let relatedExt = [];

                try {
                  let relatedLocationsBundle = await fhirAxios.search(
                    "Location",
                    {
                      _id: primaryLocationID[1],
                      status: "active",
                      "_include:iterate": "Location:partof",
                    }
                  );
                  for (let entry of relatedLocationsBundle.entry) {
                    relatedExt.push({
                      url: "location",
                      valueString: "Location/" + entry.resource.id,
                    });
                  }
                } catch (err) {
                  console.log(err);
                  winston.error(
                    "Failed to get related locations for ",
                    primaryLocationID[1]
                  );
                  resolve(
                    await workflowUser.outcome(
                      "Failed to Find location " + primaryLocationID[1]
                    )
                  );
                }
                extensions.push({
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
                  extension: relatedExt,
                });
              } else {
                if (role && role != undefined) {
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                    valueReference: {
                      reference: role,
                    },
                  });
                }
              }
              if (practitioner && practitioner != undefined) {
                extensions.push({
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-user-practitioner",
                  valueReference: {
                    reference: practitioner,
                  },
                });
              }
              if (password && password != undefined) {
                try {
                  let passwordExt = [];
                  let salt = crypto.randomBytes(16).toString("hex");
                  let hash = crypto
                    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                    .toString("hex");
                  passwordExt.push({ url: "password", valueString: hash });
                  passwordExt.push({ url: "salt", valueString: salt });
                  extensions.push({
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-password",
                    extension: passwordExt,
                  });
                  // })
                } catch (err) {
                  console.log(err);
                  winston.error("Error setting Password ");
                  reject(err);
                }
              } else {
                winston.info("NO PASSWORD SET ");
                resolve(
                  await workflowUser.outcome("No Password set for this User")
                );
              }
              let _userName = userEmail.split("@");
              let newUser = {
                resourceType: "Person",
                id: "ihris-user-" + _userName[0],
                meta: {
                  profile: [
                    "http://ihris.org/fhir/StructureDefinition/ihris-person-user",
                  ],
                },
                extension: extensions,
                name: [
                  {
                    use: "official",
                    text: userName,
                  },
                ],
                telecom: [
                  {
                    system: "email",
                    value: userEmail,
                  },
                ],
              };
              let url = "Person/ihris-user-" + _userName[0];
              bundle.entry.push({
                resource: newUser,
                request: {
                  method: "PUT",
                  url: url,
                },
              });
              /**/
            } else {
              winston.error("User " + userEmail + " Exist");
              resolve(
                await workflowUser.outcome("User " + userEmail + " Exist")
              );
              //reject(err.message)
            }
            winston.error("BUNDLE ", bundle)
            resolve(bundle);
          })
          .catch((err) => {
            winston.error("ERROR ",err);
          });
        //winston.info("Bundle")
        //winston.info(JSON.stringify( bundle,null,2))
      } catch (err) {
        winston.error("ERR ",err);
      }
    });
  },
  postProcess: (req, results) => {
    return new Promise((resolve, reject) => {
      if (
        results.entry &&
        results.entry.length === 1 &&
        results.entry[0].response.location
      ) {
        if (!req.body.meta) req.body.meta = {};
        if (!req.body.meta.tag) req.body.meta.tag = [];
        req.body.meta.tag.push({
          system: "http://ihris.org/fhir/tags/resource",
          code: results.entry[0].response.location,
        });
        resolve(req);
      } else if (results.entry && results.entry.length > 1) {
        for (let entry of results.entry) {
          if (entry.response.location.includes("Person/")) {
            if (!req.body.meta) req.body.meta = {};
            if (!req.body.meta.tag) req.body.meta.tag = [];
            req.body.meta.tag.push({
              system: "http://ihris.org/fhir/tags/resource",
              code: entry.response.location,
            });
            resolve(req);
          }
        }
      }
    });
  },
  createLocationRole: async (locationReference) => {
    let locBasedRole = undefined;
    let locBasedTasks = undefined;
    return new Promise(async (resolve, reject) => {
      try {
        locBasedRole = await fhirAxios.search(role);
        if (locBasedRole && locBasedRole !== undefined) {
          locBasedTasks = locBasedRole.extension.filter(
            (task) =>
              task.url ===
              "http://ihris.org/fhir/StructureDefinition/ihris-assign-task"
          );
        }
      } catch (err) {
        console.log(err);
        winston.error("Error Getting location based role");
        resolve(
          await workflowUser.outcome("Error Getting location based role")
        );
      }

      try {
        let locationID = locationReference.split("/");
        fhirAxios
          .search("Location", { _id: locationID[1] })
          .then((locationResource) => {
            let locationName = locationResource.entry[0].resource.name;
            let extensions = [];
            extensions.push(
              {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                valueString: "Location Based Role "+locationName,
              },
              {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-role-primary",
                valueBoolean: false,
              },

              {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
                valueReference: {
                  reference: "Basic/ihris-role-open",
                },
              }
            );

            locBasedTasks.forEach((task) => {
              extensions.push(task);
            });
            //Adding filter tasks
            filteredResources.forEach((rs) =>{
              extensions.push({
                url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-task",
                valueReference: {
                  reference: "Basic/ihris-task-filter-"+rs.toLowerCase()+"-"+locationName.replace(/\s/g, "").toLowerCase()
                },
              })
            })
            locationRoleID =
              "ihris-role-location-based-" +
              locationName.replace(/\s/g, "").toLowerCase();
            let newRole = {
              resourceType: "Basic",
              id: locationRoleID,
              meta: {
                profile: [
                  "http://ihris.org/fhir/StructureDefinition/ihris-role",
                ],
              },
              extension: extensions,
              code: {
                coding: [
                  {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem",
                    code: "role",
                  },
                ],
              },
            };
            //winston.error('NEW ROLE :::: ', newRole);
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
  },

  createLocationFilterTasks: async (locationReference) => {

    return new Promise(async (resolve, reject) => {
      try {
        
        let locationID = locationReference.split("/");
        fhirAxios
          .search("Location", { _id: locationID[1] })
          .then((locationResource) => {
            let locationName = locationResource.entry[0].resource.name

            filteredResources.forEach((rs) => {
              let ext = [];
              let taskID =
                "ihris-task-filter-" +rs.toLowerCase()+"-"+
                locationName.replace(/\s/g, "").toLowerCase();

              ext.push(
                {
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
                  valueString: "iHRIS Task to filter "+rs+" "+locationName,
                },
                {
                  url: "http://ihris.org/fhir/StructureDefinition/task-attributes",
                  extension: [
                    {
                      url: "permission",
                      valueCode: "filter",
                    },
                    {
                      url: "resource",
                      valueCode: rs,
                    },
                    {
                      url: "constraint",
                      valueString: "related-location=" + locationReference,
                    },
                  ],
                }
              );
              let newTask = {
                resourceType: "Basic",
                id: taskID,
                meta: {
                  profile: [
                    "http://ihris.org/fhir/StructureDefinition/ihris-task",
                  ],
                },
                extension: ext,
                code: {
                  coding: [
                    {
                      system:
                        "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem",
                      code: "task",
                    },
                  ],
                },
              };

              let url = "Basic/"+taskID;
              bundle.entry.push({
                resource: newTask,
                request: {
                  method: "PUT",
                  url: url,
                },
              });
            });

            resolve(bundle);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      } catch (err) {
        winston.error(
          "Error creating filterd tasks for location" + locationReference
        );
        reject(err.message);
      }
    });
  },
  outcome: (message) => {
    return new Promise((resolve, reject) => {
      let outcomeBundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            resource: {
              resourceType: "OperationOutcome",
              issue: [
                {
                  severity: "error",
                  code: "exception",
                  diagnostics: message,
                },
              ],
            },
            request: {
              method: "POST",
              url: "OperationOutcome",
            },
          },
        ],
      };
      winston.info(JSON.stringify(outcomeBundle, null, 2));
      resolve(outcomeBundle);
    });
  },
};
module.exports = workflowUser;
