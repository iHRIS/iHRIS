const isEmpty = require("is-empty");
const {v4: uuidv4} = require("uuid");

const validateDate = (input) => {
    return new Date(input).toString() !== 'Invalid Date';
}
const userDataValidation = (userData) => {
    const validation = {
        isValid: true,
        data: "",
        message: [],
    };

    userData.map((user, index) => {
        let errors = [];
        let oldKeys = Object.keys(user);
        let newKeys = Object.keys(user).map((ol) => ol.split(" ").join("_"));
        /*if (user.practitionerIsExist === true) {
            validation.isValid = false;
            errors.push(`User at row ${index + 2}  is already exist in the system`);
        }*/
        for (let i = 0; i < oldKeys.length; i++) {
            user[newKeys[i]] = user[oldKeys[i]];
            if (newKeys[i] === oldKeys[i]) {
              continue;
            } else {
                delete user[oldKeys[i]];
            }
        }

        let reference = [
          {Gender: "genderCoding"},
          {Nationality: "nationalityCoding"},
          {JobTitle: "jobCoding"},
          {EmploymentTerms: "employmentCoding"},
          {PayGrade: "gradeCoding"},
          {FacilityName: "facilityId"},
          {EducationLevel: "educationCoding"},
          {EducationMajor: "majorCoding"},
          {Emergency_contact_relation: "relationCoding"},
          {ScoreAttained: "scoreCoding"},
          {LeaveType: "leaveCoding"}
        ];

        let dateType = [
            "BirthDate",
            "StartDate",
            "EndDate",
            "LeaveStartDate",
            "LeaveEndDate",
            "LeaveRequestDate",
            "EvaluationStartDate",
            "EvaluationEndDate",
            "PreviousWorkStartDate",
            "PreviousWorkEndDate",
            "Year"
        ]

        dateType.forEach((key, index) => {
          if(user[`${key}`] != null ){
            if (!validateDate(user[`${key}`])) {
              console.log(user[`${key}`])
              validation.isValid = false;
              errors.push(`${key} is not a valid date please enter in YYYY-MM-DD format`);
            } else {
                user[`${key}`] = new Date(user[`${key}`])
                user[`${key}`].setDate(user[`${key}`].getDate())
            }
          }
        })

        reference.forEach((data, index) => {
            if (
                !isEmpty(user[`${Object.keys(data)[0]}`]) &&
                user[`${Object.values(data)[0]}`] === undefined
            ) {
                validation.isValid = false;
                user.index = index + 1;
                validation.data = user;
                errors.push(
                    `Please check if ${Object.values(data)[0]} ${
                        user[`${Object.keys(data)[0]}`]
                    } exists in a system or check the spelling.`
                );
            }
        });

        /* let requiredFieldKeys = [
            "PMIS",
            "FileNumber",
            "FirstName",
            "FatherName",
            "Grand_Father_Name",
            "Sex",
            "Date_of_Birth",
            "Marital_Status",
        ];

        requiredFieldKeys.forEach((key, index) => {
            if (isEmpty(user[`${key}`])) {
                validation.isValid = false;
                user.index = index + 1;
                validation.data = user;
                errors.push(`user ${key} is missing`);
            }
        });*/

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
    entry: [],
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
            ...bundleData,
            {
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
                            url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
                            extension: [
                                {
                                    url: "practitioner",
                                    valueString: `Practitioner/${userId}`,
                                },
                                ...user["relatedGroup"],
                            ],
                        },
                    ],
                    identifier: [
                        {
                            type: {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                        code: "PRN",
                                        display: "Provider number"
                                    },
                                ],
                            },
                            value: user["NationalID"],
                        },
                        {
                            type: {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                        code: "PPN",
                                        display: "Passport number"
                                    },
                                ],
                            },
                            value: user["Passport"],
                        },
                        {
                          type: {
                              coding: [
                                  {
                                      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                      code: "EN",
                                      display: "Employer number"
                                  },
                              ],
                          },
                          value: user["EmployeeNumber"],
                      }
                    ],
                    telecom: [
                      {
                          use: "work" ,
                          system : "phone",
                          value: "+" + user["PhoneNumber"],
                      },
                      {
                        use: "work" ,
                        system : "email",
                        value: user["Email"],
                      }, 
                    ],
                    address: [
                      {
                          use: "home" ,
                          line : user["StreetAddress"],
                          city: user["Town"],
                          district: user["District"],
                          state: user["Province"],
                      },
                    ],
                    active: true,
                    name: [
                        {
                            use: "official",
                            text: user["GivenName"] + " " + user["Surname"] + " " + user["MaidenName"],
                            given: [user["GivenName"], user["MaidenName"] ],
                            family: user["Surname"],
                            prefix: [user["Prefix"]],
                            suffix: [user["Suffix"]]
                        }
                    ],
                    gender: user["genderCoding"].code,
                    birthDate: user["BirthDate"],
                },
                request: {
                    method: "PUT",
                    url: `Practitioner/${userId}`,
                },
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
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-first-employment-date",
                    valueDate: user["StartDate"]
                  },
                  {
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status",
                    valueCoding: user["employmentCoding"]
                  },
                  {
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-salary-scale",
                    valueCoding: user["gradeCoding"]
                  },
                  {
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-salary",
                    valueMoney: { value : user["Salary"] , currency : "USD" }
                  },
                  {
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-position-status",
                    valueCoding: {
                      system: "http://ihris.org/fhir/CodeSystem/ihris-position-status",
                      version: "0.2.0",
                      code: "occupied",
                      display: "Occupied"
                    }
                  }
                ],
                period: {
                  start: user["StartDate"]
                },
                practitioner: {
                  reference: `Practitioner/${userId}`
                },
                location: [
                  {
                    reference: `Location/${user["facilityId"]}`
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
                        valueCoding: user["educationCoding"]
                      },
                      {
                        url: "institution",
                        valueString: user["EducationInstitution"]
                      },
                      {
                        url: "educationalMajor",
                        valueCoding: user["majorCoding"]
                      },
                      {
                        url: "year",
                        valueDate: user["Year"]
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
                    "http://ihris.org/fhir/StructureDefinition/ihris-basic-emergency",
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
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-emergency",
                    extension: [
                      {
                        url: "name",
                        valueString: user["Emergency_contact_name"]
                      },
                      {
                        url: "mobile",
                        valueString: user["Emergency_contact_mobile_phone"]
                      },
                      {
                        url: "relation",
                        valueCoding: user["relationCoding"]
                      },
                      {
                        url: "otherEmail",
                        valueString: user["Emergency_contact_email"]
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
                    "http://ihris.org/fhir/StructureDefinition/ihris-basic-performance",
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
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-performance",
                    extension: [
                      {
                        url: "evaluator",
                        valueString: user["EvaluatorName"]
                      },
                      {
                        url: "period",
                        valuePeriod: { start: user["EvaluationStartDate"] , end: user["EvaluationEndDate"]}
                      },
                      {
                        url: "score",
                        valueCoding: user["scoreCoding"]
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
                    "http://ihris.org/fhir/StructureDefinition/ihris-basic-leave",
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
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-leave",
                    extension: [
                      {
                        url: "leave-type",
                        valueCoding: user["leaveCoding"]
                      },
                      {
                        url: "period",
                        valuePeriod: { start: user["LeaveStartDate"],
                                       end: user["LeaveEndDate"]
                                     }
                      },
                      {
                        url: "dateRequested",
                        valueDate: user["LeaveRequestDate"]
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
                    "http://ihris.org/fhir/StructureDefinition/ihris-basic-employment-history",
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
                    url: "http://ihris.org/fhir/StructureDefinition/ihris-employment-history",
                    extension: [
                      {
                        url: "organization",
                        valueString: user["OrganizationName"]
                      },
                      {
                        url: "address",
                        valueString: user["OrganizationAddress"]
                      },
                      {
                        url: "startingPosition",
                        valueString: user["Position"]
                      },
                      {
                        url: "startingSalary",
                        valueMoney:{ value : user["PPSalary"] , currency : "USD" }
                      },
                      {
                        url: "period",
                        valuePeriod: { start: user["PreviousWorkStartDate"], end: user["PreviousWorkEndDate"]}
                      },
                      {
                        url: "responsibilities",
                        valueString: user["Jobdescription"]
                      },
                      {
                        url: "reasonLeaving",
                        valueString: user["Reasonforleaving"]
                      }
                    ],
                  }
                ]
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
        const validation = userDataValidation(usersData);
        if (!validation.isValid) {
            resolve(validation);
        } else {
            template(usersData)
                .then((practitionerDetails) => {
                    bundle.entry = practitionerDetails
                })
                .then(() => {
                    validation.isValid = true;
                    validation.data = {bundle};
                })
                .then(() => {
                    resolve(validation);
                });
        }
    });
}

module.exports = processJobs; 