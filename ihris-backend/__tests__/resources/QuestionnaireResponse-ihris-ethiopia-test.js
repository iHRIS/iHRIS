module.exports = {
  "resourceType": "QuestionnaireResponse",
  "questionnaire": "http://ihris.org/fhir/Questionnaire/ihris-personal-information",
  "status": "completed",
  "item": [
    {
      "linkId": "Practitioner",
      "text": "Basic Information",
      "item": [
        {
          "linkId": "Practitioner.name[0]",
          "text": "Name",
          "item": [
            {
              "linkId": "Practitioner.name[0].extension[0]",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-pefix-codesystem",
                    "code": "mr",
                    "display": "Mr"
                  }
                }
              ]
            },
            {
              "linkId": "Practitioner.name[0].given[0]",
              "answer": [
                {
                  "valueString": "Tom"
                }
              ]
            },
            {
              "linkId": "Practitioner.name[0].use",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://hl7.org/fhir/name-use",
                    "code": "official"
                  }
                }
              ]
            }
          ]
        },
        {
          "linkId": "Practitioner.extension[0].extension[0]",
          "answer": [
            {
              "valueString": "Johns"
            }
          ]
        },
        {
          "linkId": "Practitioner.extension[0].extension[1]",
          "answer": [
            {
              "valueString": "asF"
            }
          ]
        },
        {
          "linkId": "Practitioner.extension[0].extension[2]",
          "answer": [
            {
              "valueString": ""
            }
          ]
        },
        {
          "linkId": "Practitioner.extension[0].extension[3]",
          "answer": [
            {
              "valueString": ""
            }
          ]
        },
        {
          "linkId": "Practitioner.extension[0].extension[4]",
          "answer": [
            {
              "valueString": "dfg"
            }
          ]
        },
        {
          "linkId": "Practitioner.extension[1]",
          "answer": [
            {
              "valueCoding": {
                "code": "UG",
                "display": "Uganda",
                "system": "urn:iso:std:iso:3166"
              }
            }
          ]
        },
        {
          "linkId": "__Practitioner:demographic",
          "text": "Demographic Information",
          "item": [
            {
              "linkId": "Practitioner.gender",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://hl7.org/fhir/administrative-gender",
                    "code": "male",
                    "display": "Male"
                  }
                }
              ]
            },
            {
              "linkId": "Practitioner.extension[3]",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                    "code": "M",
                    "display": "Married"
                  }
                }
              ]
            },
            {
              "linkId": "Practitioner.birthDate",
              "answer": [
                {
                  "valueDate": "2020-01-01"
                }
              ]
            }
          ]
        },
        {
          "linkId": "__Practitioner:identifier",
          "text": "Identifiers",
          "item": [
            {
              "linkId": "Practitioner.identifier[0]",
              "text": "Employee Id",
              "item": [
                {
                  "linkId": "Practitioner.identifier[0].type",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                        "code": "employeeId"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[0].value",
                  "answer": [
                    {
                      "valueString": "DGFSG"
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[0].system",
                  "answer": [
                    {
                      "valueString": "DSGSF"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[1]",
              "text": "Pension Number",
              "item": [
                {
                  "linkId": "Practitioner.identifier[1].type",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                        "code": "pensionNumber"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[1].value",
                  "answer": [
                    {
                      "valueString": "ZDG"
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[1].system",
                  "answer": [
                    {
                      "valueString": "zxcgfx"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[2]",
              "text": "Tin Number",
              "item": [
                {
                  "linkId": "Practitioner.identifier[2].type",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                        "code": "tinNumber"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[2].value",
                  "answer": [
                    {
                      "valueString": ""
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[2].system",
                  "answer": [
                    {
                      "valueString": ""
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[3]",
              "text": "Driving License",
              "item": [
                {
                  "linkId": "Practitioner.identifier[3].type",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                        "code": "drivingLicenseId"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[3].value",
                  "answer": [
                    {
                      "valueString": "zxcf"
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[3].system",
                  "answer": [
                    {
                      "valueString": "zxfb"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[4]",
              "text": "Civil Service Id",
              "item": [
                {
                  "linkId": "Practitioner.identifier[4].type",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                        "code": "civilServiceId"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[4].value",
                  "answer": [
                    {
                      "valueString": ""
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[4].system",
                  "answer": [
                    {
                      "valueString": ""
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[5]",
              "text": "License Id",
              "item": [
                {
                  "linkId": "Practitioner.identifier[5].type",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier",
                        "code": "licenseId"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[5].value",
                  "answer": [
                    {
                      "valueString": ""
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.identifier[5].system",
                  "answer": [
                    {
                      "valueString": ""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "linkId": "__Practitioner:telecom",
          "text": "Contacts",
          "item": [
            {
              "linkId": "Practitioner.telecom[0]",
              "text": "Mobile Phone",
              "item": [
                {
                  "linkId": "Practitioner.telecom[0].use",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://hl7.org/fhir/contact-point-use",
                        "code": "mobile"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.telecom[0].system",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://hl7.org/fhir/contact-point-system",
                        "code": "phone"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.telecom[0].value",
                  "answer": [
                    {
                      "valueString": "9193139100"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner.telecom[1]",
              "text": "Work Email",
              "item": [
                {
                  "linkId": "Practitioner.telecom[1].use",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://hl7.org/fhir/contact-point-use",
                        "code": "work"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.telecom[1].system",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://hl7.org/fhir/contact-point-system",
                        "code": "email"
                      }
                    }
                  ]
                },
                {
                  "linkId": "Practitioner.telecom[1].value",
                  "answer": [
                    {
                      "valueString": "dacciavatti@intrahealth.org"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "linkId": "__Practitioner:communication",
          "text": "Language Details",
          "item": [
            {
              "linkId": "Practitioner.communication[0]",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://ihris.org/fhir/CodeSystem/ihris-ethiopia-language",
                    "code": "en",
                    "display": "English"
                  }
                }
              ]
            }
          ]
        },
        {
          "linkId": "__Practitioner:trainining",
          "text": "Education Details",
          "item": [
            {
              "linkId": "Practitioner:educationalMajor",
              "text": "Education Details",
              "item": [
                {
                  "linkId": "Practitioner.extension[4]",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-educational-major-codesystem",
                        "code": "medicine",
                        "display": "Medicine"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner:professionalLicenseCategory",
              "text": "License Details",
              "item": [
                {
                  "linkId": "Practitioner.extension[5]",
                  "answer": [
                    {
                      "valueString": "gzxfGxf"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner:specialTraining",
              "text": "Training Details",
              "item": [
                {
                  "linkId": "Practitioner.extension[6]",
                  "answer": [
                    {
                      "valueString": "sadgasf"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "Practitioner:category",
              "text": "Category Details",
              "item": [
                {
                  "linkId": "Practitioner.extension[8]",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://ihris.org/fhir/CodeSystem/ihris-category-codesystem",
                        "code": "administrative",
                        "display": "Administrative"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "linkId": "__Practitioner:remarkNote",
          "text": "Remarks",
          "item": []
        },
        {
          "linkId": "__Practitioner:photo",
          "text": "Photo",
          "item": []
        },
        {
          "linkId": "Practitioner.extension[2]",
          "answer": [
            {
              "valueReference": {
                "reference": "Location/3206"
              }
            }
          ]
        }
      ]
    },
    {
      "linkId": "PractitionerRole",
      "text": "Position Informatiom",
      "item": [
        {
          "linkId": "PractitionerRole.code",
          "answer": [
            {
              "valueCoding": {
                "system": "http://ihris.org/fhir/CodeSystem/ihris-job-ethiopia",
                "code": "CHOIV",
                "display": "Community Health Organization (HO) IV",
                "designation": [
                  {
                    "language": "urn:ietf:bcp:47#am",
                    "value": "ህብረተሰብ ጤና አጠባበቅ (HO) IV"
                  }
                ]
              }
            }
          ]
        },
        {
          "linkId": "PractitionerRole.extension[0]",
          "answer": [
            {
              "valueCoding": {
                "system": "http://ihris.org/fhir/CodeSystem/ihris-shift-codesystem",
                "code": "duty",
                "display": "Duty"
              }
            }
          ]
        },
        {
          "linkId": "PractitionerRole.extension[1]",
          "answer": [
            {
              "valueCoding": {
                "system": "http://ihris.org/fhir/CodeSystem/ihris-employment-status-codesystem",
                "code": "fullTime",
                "display": "Full-time"
              }
            }
          ]
        },
        {
          "linkId": "PractitionerRole.extension[2]",
          "answer": [
            {
              "valueCoding": {
                "system": "http://ihris.org/fhir/CodeSystem/ihris-job-type-codesystem",
                "code": "redeployment",
                "display": "Redeployment"
              }
            }
          ]
        },
        {
          "linkId": "PractitionerRole.practitioner",
          "answer": [
            {
              "valueString": "__REPLACE__Practitioner"
            }
          ]
        },
        {
          "linkId": "PractitionerRole.location",
          "answer": [
            {
              "valueReference": {
                "reference": "Location/3206"
              }
            }
          ]
        },
        {
          "linkId": "PractitionerRole.extension[3]",
          "answer": [
            {
              "valueDate": "2020-01-01"
            }
          ]
        },
        {
          "linkId": "PractitionerRole.period.start",
          "answer": [
            {
              "valueDate": "2020-01-01"
            }
          ]
        },
        {
          "linkId": "PractitionerRole.period.end",
          "answer": [
            {
              "valueDate": null
            }
          ]
        }
      ]
    }
  ]
}
