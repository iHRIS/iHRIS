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
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-marital-status",
              valueCoding: {
                system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                code: user["MaritalStatus"],
              }
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-dependents",
              valueInteger: user["Dependents"],
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-identification-number",
              valueString: user["IdentificationNumber"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-institution-category",
              valueString: user["InstitutionCategory"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-institution-type",
              valueString: user["InstitutionType"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-facility",
              valueString: user["Facility"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-facility-type",
              valueString: user["FacilityType"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-region",
              valueString: user["Region"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-registration-board",
              valueString: user["RegistrationBoard"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-category",
              valueString: user["HealthCategory"]
            }, {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-submitting-system",
              valueString: user["SubmittingSystem"]
            }
          ],
          identifier: [
            {
              type: {
                coding: [
                  {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-identifier-codesystem",
                    code: "nin",
                    display: "National Identification Number",
                  },
                ],
              },
              value: user["NationalID"].toString(),
            },
            {
              type: {
                coding: [
                  {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-identifier-codesystem",
                    code: "Passport",
                    display: "Passport",
                  },
                ],
              },
              value: user["Passport"].toString(),
            }
          ],
          active: true,
          name: [
            {
              use: "official",
              text: user["KnownAs"],
              family: user["Surname"],
              given: [user["GivenName"]],
            },
          ],
          telecom: [
            {
              system: "email",
              value: user["Email"],
              use: "work",
              rank: 1
            },
            {
              system: "phone",
              value: user["PhoneNumber"],
              use: "home",
              rank: 2
            }
          ],
          address: [
            {
              use: "home",
              type: "physical",
              line: user["StreetAddress"],
              city: user["CityTown"],
              district: user["District"],
            }
          ],
          gender: user["Gender"].toLowerCase(),
          birthDate: user["BirthDate"],
        },
        request: {
          method: "PUT",
          url: `Practitioner/${userId}`,
        }
      },

    ];
  });
  return bundleData;
};

function processJobs(usersData) {
  return new Promise((resolve, reject) => {
    const validation = userDataIsValidation(usersData);
    if (!validation.isValid) {
      resolve(validation)
    } else {
      template(usersData).then(practitionerDetails => {
        bundle.entry = practitionerDetails;
      }).then(() => {
        validation.isValid = true
        validation.data = { bundle }
      }).then(() => {
        resolve(validation)
      })
    }
  })
}

module.exports = processJobs;