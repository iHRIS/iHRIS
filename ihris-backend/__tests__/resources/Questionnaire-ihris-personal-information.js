module.exports = {
  "resourceType": "Questionnaire",
  "id": "ihris-personal-information",
  "meta": {
    "profile": [
      "http://ihris.org/fhir/StructureDefinition/ihris-questionnaire"
    ]
  },
  "item": [
    {
      "item": [
        {
          "item": [
            {
              "linkId": "Practitioner.name[0].extension[0]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.extension:ethiopiaPrefix.value[x]:valueCoding",
              "text": "Prefix",
              "type": "choice",
              "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-ethiopia-prefix-valueset",
              "required": false,
              "repeats": false
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-given-name-check"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "matches('^[A-Za-z ]*$')"
                    },
                    {
                      "url": "human",
                      "valueString": "First Name must be only text."
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.name[0].given[0]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.given",
              "text": "First Name",
              "type": "string",
              "required": true,
              "repeats": false
            },
            {
              "linkId": "Practitioner.name[0].use",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.use",
              "text": "Use",
              "type": "choice",
              "required": true,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "official",
                    "system": "http://hl7.org/fhir/name-use"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "linkId": "Practitioner.name[0].extension[1]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.extension:givenAlternativeLang.value[x]:valueString",
              "text": "First Name Alternative Language",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.name[0]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name",
          "text": "Name",
          "type": "group"
        },
        {
          "extension": [
            {
              "extension": [
                {
                  "url": "key",
                  "valueId": "ihris-fathers-name-check"
                },
                {
                  "url": "severity",
                  "valueCode": "error"
                },
                {
                  "url": "expression",
                  "valueString": "matches('^[A-Za-z ]*$')"
                },
                {
                  "url": "human",
                  "valueString": "Father's Name must be only text."
                }
              ],
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
            }
          ],
          "linkId": "Practitioner.extension[0].extension[0]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:fathers.value[x]:valueString",
          "text": "Father's Name",
          "type": "string",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "Practitioner.extension[0].extension[1]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:fathersalternativelanguage.value[x]:valueString",
          "text": "Father's Name Alternative Language",
          "type": "string",
          "required": false,
          "repeats": false
        },
        {
          "extension": [
            {
              "extension": [
                {
                  "url": "key",
                  "valueId": "ihris-grandfather-name-check"
                },
                {
                  "url": "severity",
                  "valueCode": "error"
                },
                {
                  "url": "expression",
                  "valueString": "matches('^[A-Za-z ]*$')"
                },
                {
                  "url": "human",
                  "valueString": "Grandfather's Name must be only text."
                }
              ],
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
            }
          ],
          "linkId": "Practitioner.extension[0].extension[2]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:grandfatherslastname.value[x]:valueString",
          "text": "Grandfather's Lastname",
          "type": "string",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "Practitioner.extension[0].extension[3]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:grandfathersalternativelanguage.value[x]:valueString",
          "text": "Grand Father's Name Alternative Language",
          "type": "string",
          "required": false,
          "repeats": false
        },
        {
          "extension": [
            {
              "extension": [
                {
                  "url": "key",
                  "valueId": "ihris-mothers-name-check"
                },
                {
                  "url": "severity",
                  "valueCode": "error"
                },
                {
                  "url": "expression",
                  "valueString": "matches('^[A-Za-z ]*$')"
                },
                {
                  "url": "human",
                  "valueString": "Mother's Name must be only text."
                }
              ],
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
            }
          ],
          "linkId": "Practitioner.extension[0].extension[4]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:mothers.value[x]:valueString",
          "text": "Mother's Full Name",
          "type": "string",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "Practitioner.extension[0].extension[5]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:mothersalternativelanguage.value[x]:valueString",
          "text": "Mother's Name Alternative Language",
          "type": "string",
          "required": false,
          "repeats": false
        }
      ],
      "linkId": "Practitioner",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information",
      "text": "Basic Information|Basic health worker details",
      "type": "group"
    },
    {
      "item": [
        {
          "extension": [
            {
              "extension": [
                {
                  "url": "key",
                  "valueId": "ihris-age-18-check"
                },
                {
                  "url": "severity",
                  "valueCode": "error"
                },
                {
                  "url": "expression",
                  "valueString": "$this < today() - 18 years"
                },
                {
                  "url": "human",
                  "valueString": "BirthDate must be more than 18 years ago."
                }
              ],
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
            }
          ],
          "linkId": "Practitioner.birthDate",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.birthDate",
          "text": "Date of Birth",
          "type": "date",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "Practitioner.gender",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.gender",
          "text": "Gender",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-gender-valueset",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "Practitioner.extension[3]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:maritalStatus.value[x]:valueCoding",
          "text": "Marital Status",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-marital-status-valueset",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "Practitioner.extension[1]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:nationality.value[x]:valueCoding",
          "text": "Nationality",
          "type": "choice",
          "answerValueSet": "http://hl7.org/fhir/ValueSet/iso3166-1-2",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "Practitioner.extension[8]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:ethnicity.value[x]:valueCoding",
          "text": "Ethnicity",
          "type": "choice",
          "answerValueSet": "http://hl7.org/fhir/ValueSet/ihris-Ethnicity-valueset",
          "required": false,
          "repeats": false
        }
      ],
      "linkId": "Practitioner:demographic",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information",
      "text": "Demographic Information",
      "type": "group"
    },
    {
      "item": [
        {
          "item": [
            {
              "linkId": "Practitioner.identifier[0].type",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type",
              "text": "Type",
              "type": "choice",
              "required": false,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "employeeId",
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-search-identifier"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
                    },
                    {
                      "url": "human",
                      "valueString": "The identifier must be unique and another record has this identifier"
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.identifier[0].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value",
              "text": "Value",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.identifier[0]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier",
          "text": "Employee Id",
          "type": "group"
        },
        {
          "item": [
            {
              "linkId": "Practitioner.identifier[1].type",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type",
              "text": "Type",
              "type": "choice",
              "required": false,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "pensionNumber",
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-search-identifier"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
                    },
                    {
                      "url": "human",
                      "valueString": "The identifier must be unique and another record has this identifier"
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.identifier[1].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value",
              "text": "Value",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.identifier[1]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier",
          "text": "Pension Number",
          "type": "group"
        },
        {
          "item": [
            {
              "linkId": "Practitioner.identifier[2].type",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type",
              "text": "Type",
              "type": "choice",
              "required": false,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "tinNumber",
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-search-identifier"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
                    },
                    {
                      "url": "human",
                      "valueString": "The identifier must be unique and another record has this identifier"
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.identifier[2].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value",
              "text": "Value",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.identifier[2]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier",
          "text": "Tin Number",
          "type": "group"
        },
        {
          "item": [
            {
              "linkId": "Practitioner.identifier[3].type",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type",
              "text": "Type",
              "type": "choice",
              "required": false,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "civilServiceId",
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-search-identifier"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
                    },
                    {
                      "url": "human",
                      "valueString": "The identifier must be unique and another record has this identifier"
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.identifier[3].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value",
              "text": "Value",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.identifier[3]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier",
          "text": "Civil Service Id",
          "type": "group"
        },
        {
          "item": [
            {
              "linkId": "Practitioner.identifier[4].type",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type",
              "text": "Type",
              "type": "choice",
              "required": false,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "licenseId",
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-search-identifier"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
                    },
                    {
                      "url": "human",
                      "valueString": "The identifier must be unique and another record has this identifier"
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.identifier[4].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value",
              "text": "Value",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.identifier[4]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier",
          "text": "License Id",
          "type": "group"
        },
        {
          "item": [
            {
              "linkId": "Practitioner.identifier[5].type",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type",
              "text": "Type",
              "type": "choice",
              "required": false,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "fileNo",
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-search-identifier"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
                    },
                    {
                      "url": "human",
                      "valueString": "The identifier must be unique and another record has this identifier"
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.identifier[5].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value",
              "text": "Value",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.identifier[5]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier",
          "text": "File Number",
          "type": "group"
        },
        {
          "linkId": "Practitioner:License",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.extension:drivingLicense",
          "text": "Driving License",
          "type": "group",
          "item": [
            {
              "linkId": "Practitioner.extension[9].extension[0]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:drivingLicense.extension:licenseType.value[x]:valueCoding",
              "text": "Driving Licence Type",
              "type": "choice",
              "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-driving-license-type-valueset",
              "required": false,
              "repeats": false
            },
            {
              "linkId": "Practitioner.extension[9].extension[1]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:drivingLicense.extension:license.value[x]:valueString",
              "text": "Driving Licence ID",
              "type": "string",
              "required": false,
              "repeats": false
            }
          ]
        }
      ],
      "linkId": "Practitioner:identifier",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information",
      "text": "Identifiers|Personal Identifiers",
      "type": "group"
    },
    {
      "item": [
        {
          "item": [
            {
              "linkId": "Practitioner.telecom[0].use",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.use",
              "text": "Telecom Use",
              "type": "choice",
              "required": true,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "mobile",
                    "system": "http://hl7.org/fhir/contact-point-use"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "linkId": "Practitioner.telecom[0].system",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.system",
              "text": "Telecom System",
              "type": "choice",
              "required": true,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "phone",
                    "system": "http://hl7.org/fhir/contact-point-system"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-phone-check"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "matches('^(([+][2][5][1][1-9][0-9]{8})|([0][1-9][0-9]{8}))')"
                    },
                    {
                      "url": "human",
                      "valueString": "Phone Number is not properly formatted."
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.telecom[0].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.value",
              "text": "Mobile Phone",
              "type": "string",
              "required": true,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.telecom[0]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom",
          "text": "Mobile Phone",
          "type": "group"
        },
        {
          "item": [
            {
              "linkId": "Practitioner.telecom[1].use",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.use",
              "text": "Telecom Use",
              "type": "choice",
              "required": true,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "work",
                    "system": "http://hl7.org/fhir/contact-point-use"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "linkId": "Practitioner.telecom[1].system",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.system",
              "text": "Telecom System",
              "type": "choice",
              "required": true,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "email",
                    "system": "http://hl7.org/fhir/contact-point-system"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "extension": [
                {
                  "extension": [
                    {
                      "url": "key",
                      "valueId": "ihris-email-check"
                    },
                    {
                      "url": "severity",
                      "valueCode": "error"
                    },
                    {
                      "url": "expression",
                      "valueString": "matches('^[0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4}$')"
                    },
                    {
                      "url": "human",
                      "valueString": "Email Address is not properly formatted."
                    }
                  ],
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
                }
              ],
              "linkId": "Practitioner.telecom[1].value",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.value",
              "text": "Work Email",
              "type": "string",
              "required": true,
              "repeats": false
            }
          ],
          "linkId": "Practitioner.telecom[1]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom",
          "text": "Work Email",
          "type": "group"
        },
        {
          "linkId": "Practitioner.extension[2]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:residence.value[x]:valueReference",
          "text": "Residence",
          "type": "reference",
          "required": false,
          "repeats": false
        }
      ],
      "linkId": "Practitioner:telecom",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom",
      "text": "Contacts|Person's Contact Information",
      "type": "group"
    },
    {
      "linkId": "Practitioner:communication",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication",
      "text": "Language Details|Languages spoken",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner:communication[0]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication",
          "text": "Language",
          "type": "group",
          "repeats": true,
          "item": [
            {
              "linkId": "Practitioner.communication[0]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication",
              "text": "Language",
              "type": "choice",
              "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-ethiopia-language-valueset",
              "required": false,
              "repeats": false
            }
          ]
        }
      ]
    },
    {
      "linkId": "__Practitioner:trainining",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:educationalMajor",
      "text": "Training Details|Training information",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner:specialTraining",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:specialTraining",
          "text": "Special training information",
          "type": "group",
          "item": [
            {
              "linkId": "Practitioner.extension[4]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:specialTraining.value[x]:valueString",
              "text": "Special Training",
              "type": "string",
              "required": false,
              "repeats": true
            }
          ]
        },
        {
          "linkId": "Practitioner:category",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:category",
          "text": "Category Details|Category information",
          "type": "group",
          "item": [
            {
              "linkId": "Practitioner.extension[5]",
              "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:category.value[x]:valueCoding",
              "text": "Category",
              "type": "choice",
              "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-category-valueset",
              "required": false,
              "repeats": false
            }
          ]
        }
      ]
    },
    {
      "linkId": "__Practitioner:remarkNote",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:remarkNote",
      "text": "Remarks|Remarks or notes",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner.extension[6]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:remarkNote.value[x]:valueString",
          "text": "Remark Note",
          "type": "text",
          "required": false,
          "repeats": true
        }
      ]
    },
    {
      "linkId": "__Practitioner:photo",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.photo",
      "text": "Photo|Person's Passport Photo",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner.extension[7]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.photo",
          "text": "Photo",
          "type": "attachment",
          "required": false,
          "repeats": false
        }
      ]
    },
    {
      "extension": [
        {
          "extension": [
            {
              "url": "key",
              "valueId": "ihris-start-end-date"
            },
            {
              "url": "severity",
              "valueCode": "error"
            },
            {
              "url": "expression",
              "valueString": "where(linkId='PractitionerRole.period.end').answer.first().valueDateTime.empty() or where(linkId='PractitionerRole.period.end').answer.first().valueDateTime > where(linkId='PractitionerRole.period.start').answer.first().valueDateTime"
            },
            {
              "url": "human",
              "valueString": "The end date must be after the start date."
            }
          ],
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
        },
        {
          "extension": [
            {
              "url": "key",
              "valueId": "ihris-first-emp-date"
            },
            {
              "url": "severity",
              "valueCode": "error"
            },
            {
              "url": "expression",
              "valueString": "where(linkId='PractitionerRole.extension[3]').answer.first().valueDate <= where(linkId='PractitionerRole.period.start').answer.first().valueDateTime"
            },
            {
              "url": "human",
              "valueString": "The First Appointment Date must be before or Equal to the start date."
            }
          ],
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint"
        }
      ],
      "linkId": "PractitionerRole",
      "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description",
      "text": "Position Informatiom|Health worker position informatiom",
      "type": "group",
      "item": [
        {
          "linkId": "PractitionerRole.code",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.code",
          "text": "Job Title",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-job-ethiopia",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.location",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.location",
          "text": "Duty Post",
          "type": "reference",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.extension[0]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:shift.value[x]:valueCoding",
          "text": "Shift",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-shift-valueset",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.extension[1]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:employmentStatus.value[x]:valueCoding",
          "text": "Employment Status",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-employment-status-valueset",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.extension[2]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:jobType.value[x]:valueCoding",
          "text": "Job Type",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-job-type-valueset",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.extension[3]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:firstEmploymentDate.value[x]:valueDate",
          "text": "First Employment Date",
          "type": "date",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.period.start",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.period.start",
          "text": "Hire Date",
          "type": "dateTime",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.period.end",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.period.end",
          "text": "End Date",
          "type": "dateTime",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.extension[4]",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:jobInformationRemark.value[x]:valueString",
          "text": "Remark",
          "type": "text",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.practitioner",
          "definition": "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.practitioner",
          "text": "Practitioner",
          "type": "string",
          "required": true,
          "repeats": false,
          "readOnly": true,
          "answerOption": [
            {
              "valueString": "__REPLACE__Practitioner",
              "initialSelected": true
            }
          ]
        }
      ]
    }
  ],
  "title": "iHRIS Practitioner Ethiopia Questionnaire",
  "description": "iHRIS Practitioner Ethiopia initial data entry questionnaire.",
  "url": "http://ihris.org/fhir/Questionnaire/ihris-personal-information",
  "name": "ihris-personal-information",
  "status": "active",
  "date": "2020-06-29",
  "purpose": "Data entry page for practitioners."
}
