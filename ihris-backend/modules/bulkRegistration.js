const fs = require("fs");
const util = require("util");
const isEmpty = require("is-empty");
const fhirSecurity = require("./fhirSecurity");
const winston = require("winston");
const fhirAxios = require("./fhirAxios");
const { v4: uuidv4 } = require("uuid");
const { Console } = require("console");

const userDataIsValidation = (userData) => {
  const validation = {
    isValid: true,
    data: "",
    message: [],
    rows: [],
  };
  userData.map((user, index) => {
    let errors = [];
    let oldKeys = Object.keys(user);
    let newKeys = Object.keys(user).map((ol) => ol.split(" ").join("_"));

    for (let i = 0; i < oldKeys.length; i++) {
      user[newKeys[i]] = user[oldKeys[i]];
      if (newKeys[i] === oldKeys[i]) {
        continue;
      } else {
        delete user[oldKeys[i]];
      }
    }
    //console.log(user);
    let requiredFieldKeys = [
      "Surname",
      "GivenName",
      "Gender",
      "BirthDate",
      "PhoneNumber",
      "Email",
      "Organization",
      "JobTitle",
      "EmploymentTerms",
      "PayGrade"
    ];
    requiredFieldKeys.forEach((key, index) => {
      if (isEmpty(user[`${key}`])) {
        validation.isValid = false;
        user.index = index + 1;
        validation.data = user;
        errors.push(`user ${key} is missing`);
        if (
          validation.rows.length === 0 ||
          validation.rows[validation.rows.length - 1] !== index
        ) {
          validation.rows.push(index);
        }
        console.log(errors);
      }
    });
    if (errors.length > 0) {
      validation.message.push({
        index: index + 2,
        errors: errors,
      });
    }
  });
  return validation;
};

let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
};

const template = async (users) => {
  let bundleData = [];
  users.map(async (user) => {
    let userId = uuidv4();
    let oldKeys = Object.keys(user);
    let newKeys = Object.keys(user).map((ol) => ol.split(" ").join("_"));

    for (let i = 0; i < oldKeys.length; i++) {
      user[newKeys[i]] = user[oldKeys[i]];
      if (newKeys[i] === oldKeys[i]) {
        continue;
      } else {
        delete user[oldKeys[i]];
      }
    }
    bundleData = [
      ...bundleData, {
        resource: {
          resourceType: "Practitioner",
          meta: {
            profile: [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitioner",
            ],
          },
          extension: [
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-nationality",
              valueCoding: user["nationalityCoding"]
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-phone",
              valueString: user["PhoneNumber"]
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-email",
              valueString: user["Email"]
            },
          ],
          identifier: [
            {
              type: {
                coding: [
                  {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-identifier-codesystem",
                    code: "NationalID",
                  },
                ],
              },
              value: user["NationalID"],
            },
            {
              type: {
                coding: [
                  {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-identifier-codesystem",
                    code: "WorkID",
                  },
                ],
              },
              value: user["EmployeeNumber"],
            },
            {
              type: {
                coding: [
                  {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-identifier-codesystem",
                    code: "Passport",
                  },
                ],
              },
              value: user["Passport"],
            }
          ],
          active: true,
          name: [
            {
              extension: [
                {
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-prefix",
                  valueCoding: user["prefixCoding"]
                },
                {
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-maiden-name",
                  valueString: user["MaidenName"],
                },
              ],
              use: "official",
              text: user["KnownAs"],
              family: user["Surname"],
              given: [user["GivenName"]],
            },
          ],
          address: [
            {
              use: "home",
              type: "physical",
              line: user["StreetAddress"],
              city: user["City/Town"],
              district: user["District"],
              state: user["Province"],
            }
          ],
          gender: user["Gender"],
          birthDate: user["BirthDate"],
        },
        request: {
          method: "PUT",
          url: `Practitioner/${userId}`,
        }
      },
      {
        resource: {
          resourceType: "PractitionerRole",
          meta: {
            profile: [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role",
            ],
          },
          extension: [
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-employment-terms",
              valueCoding: user["empTermsCoding"]
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-position-type",
              valueCoding: user["postTypeCoding"]
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-function",
              valueCoding: user["positionFunctionCoding"]
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-hours",
              valueInteger: user["HoursPerWeek"]
            }
          ],
          period: {
            start: user["StartDate"],
            end: user["EndDate"]
          },
          practitioner: {
            reference: `Practitioner/${userId}`
          },
          organization: {
            reference: `Organization/${user["organizationID"]}`
          },
          location: [
            {
              reference: `Location/${user["locationID"]}`
            }
          ],
          active: true,
          code: [
            {
              coding: [
                user["jobCoding"]
              ],
            },
          ],
        },
        request: {
          method: "POST",
          url: "PractitionerRole",
        }
      },
      {
        resource: {
          resourceType: "Basic",
          meta: {
            profile: [
              "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary",
            ],
          },
          extension: [
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
              valueReference: {
                reference: `Practitioner/${userId}`,
              },
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-salary",
              extension: [
                {
                  url: "salaryScale",
                  valueCoding: user["payGradeCoding"]
                },
                {
                  url: "bsalary",
                  valueString: user["CTC"]
                }
              ],
            },
          ],
        },
        request: {
          method: "POST",
          url: "Basic",
        }
      },
      {
        resource: {
          resourceType: "Basic",
          meta: {
            profile: [
              "http://ihris.org/fhir/StructureDefinition/ihris-basic-training",
            ],
          },
          extension: [
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
              valueReference: {
                reference: `Practitioner/${userId}`,
              },
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-training",
              extension: [
                {
                  url: "level",
                  valueCoding: user["trainingCoding"]
                },
                {
                  url: "degree",
                  valueString: user["HighestTrainingName"]
                }
              ],
            },
          ],
        },
        request: {
          method: "POST",
          url: "Basic",
        }
      }
    ];
  });
  return bundleData;
};

function processJobs(usersData) {
  return new Promise((resolve, reject) => {
    const validation =  userDataIsValidation(usersData);
    if (!validation.isValid) {
      resolve(validation)
    } else {
      template(usersData).then(practitionerDetails => {
        bundle.entry = practitionerDetails;
      }).then(() => {
        validation.isValid = true
        validation.data = { bundle }
      }).then(()=>{
        resolve(validation)
      })
    }
  })
}

module.exports = processJobs;