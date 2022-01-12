const fs = require("fs");
const util = require("util");
const isEmpty = require("is-empty");
const fhirSecurity = require("../modules/fhirSecurity");
const winston = require("winston");
const fhirAxios = require("./fhirAxios");
const { v4: uuidv4 } = require("uuid");

const searchLocationReference = async (name) => {
  let location = "Location/ET";
  let bundle = await fhirAxios.search("Location", {
    name: name,
  });
  if (bundle.entry.length > 0) {
    location = `Location/${bundle.entry[0].resource.id}`;
  }
  return location;
};

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
    console.log(user);
    let requiredFieldKeys = [
      "EmployeeId",
      "FileNumber",
      "FirstName",
      "FatherName",
      "Sex",
      "Resident",
      "Grand_Father_Name",
      "Date_of_Birth",
      "Marital_Status",
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

let practitionerBundle = {
  resourceType: "Bundle",
  type: "transaction",
};
let practitionerRoleBundle = {
  resourceType: "Bundle",
  type: "transaction",
};

const practitionerTemplate = (users) => {
  let practitioner = [];
  let practitionerRole = [];

  users.map((user) => {
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
    if (user["Education_level"]) {
      practitionerRole.push({
        resource: {
          resourceType: "Basic",
          meta: {
            profile: [
              "http://ihris.org/fhir/StructureDefinition/ihris-basic-education-history",
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
              url: "http://ihris.org/fhir/StructureDefinition/ihris-education-history",
              extension: [
                {
                  url: "level",
                  valueCoding: {
                    system:
                      "http://ihris.org/fhir/CodeSystem/ihris-education-level",
                    display: user["Education_level"],
                  },
                },
              ],
            },
          ],
        },
        request: {
          method: "POST",
          url: "Basic",
        },
      });
    }
    if (
      user["Facility_Name"] &&
      user["Hired_Date"] &&
      user["Job_title"] &&
      user["Employment_status"]
    ) {
      practitioner.push({
        resource: {
          resourceType: "PractitionerRole",
          meta: {
            profile: [
              "http://ihris.org/fhir/StructureDefinition/ihris-job-description",
            ],
          },
          extension: [
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status",
              valueCoding: {
                system:
                  "http://ihris.org/fhir/CodeSystem/ihris-employment-status-codesystem",
                code: user["Employment_status"],
              },
            },
          ],
          period: {
            start: user["Hired_Date"],
          },
          practitioner: {
            reference: `Practitioner/${userId}`,
          },
          code: [
            {
              coding: [
                {
                  system: "http://ihris.org/fhir/CodeSystem/ihris-job-ethiopia",
                  display: user["Job_title"],
                },
              ],
            },
          ],
        },
        request: {
          method: "POST",
          url: "PractitionerRole",
        },
      });
    }
    practitioner.push({
      resource: {
        resourceType: "Practitioner",
        meta: {
          profile: [
            "http://ihris.org/fhir/StructureDefinition/ihris-personal-information",
          ],
        },
        extension: [
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-familynames",
            extension: [
              {
                url: "fathers",
                valueString: user["FatherName"],
              },
              {
                url: "fathersalternativelanguage",
                valueString: user["Father_Name_Alternate_Language(Amharic)"],
              },
              {
                url: "grandfatherslastname",
                valueString: user["Grand_Father_Name"],
              },
              {
                url: "grandfathersalternativelanguage",
                valueString:
                  user["Grand_Father_Name_Alternate_Language(Amharic)"],
              },
              {
                url: "mothers",
                valueString: user["Mother_Name"],
              },
              {
                url: "mothersalternativelanguage",
                valueString: user["Mother_Name_Alternate_Language(Amharic)"],
              },
            ],
          },
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-nationality",
            valueCoding: {
              system: "urn:iso:std:iso:3166",
              display: user["Nationality"],
            },
          },
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-marital-status",
            valueCoding: {
              system:
                "http://ihris.org/fhir/CodeSystem/ihris-marital-status-codesystem",
              display: user["Marital_Status"],
            },
          },
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence",
            valueReference: {
              reference: user["Resident"],
            },
          },
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-personal-information-phone",
            valueString: user["Phone_number"],
          },
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-personal-Information-category",
            valueCoding: {
              system:
                "http://ihris.org/fhir/CodeSystem/ihris-category-codesystem",
              display: user["Profession"],
            },
          },
        ],
        identifier: [
          {
            type: {
              coding: [
                {
                  system:
                    "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                  code: "employeeId",
                },
              ],
            },
            value: user["EmployeeId"],
          },
          {
            type: {
              coding: [
                {
                  system:
                    "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                  code: "fileNo",
                },
              ],
            },
            value: user["FileNumber"],
          },
        ],
        active: true,
        name: [
          {
            extension: [
              {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-prefix",
                valueCoding: {
                  system:
                    "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-prefix-codesystem",
                  display: user["Prefix"],
                },
              },
              {
                url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-givenAltLang",
                valueString: user["Firs_Name_Alternate_Language(Amharic)"],
              },
            ],
            use: "official",
            given: [user["FirstName"]],
          },
        ],
        gender: user["Sex"],
        birthDate: user["Date_of_Birth"],
      },
      request: {
        method: "PUT",
        url: `Practitioner/${userId}`,
      },
    });
  });
  return { practitioner, practitionerRole };
};

function processJobs(usersData) {
  const validation = userDataIsValidation(usersData);
  if (!validation.isValid) {
    return validation;
  } else {
    let practitioner = practitionerTemplate(usersData);
    practitionerBundle.entry = practitioner.practitioner;
    practitionerRoleBundle.entry = practitioner.practitionerRole;
    return {
      isValid: true,
      data: {
        practitionerBundle,
        practitionerRoleBundle,
      },
    };
  }
}

module.exports = processJobs;
