Instance:       IhrisPractitionerEthiopiaQuestionnaire
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Practitioner Ethiopia Questionnaire"
* description = "iHRIS Practitioner Ethiopia initial data entry questionnaire."
* id = "ihris-personal-information"
* url = "http://ihris.org/fhir/Questionnaire/ihris-personal-information"
* name = "ihris-personal-information"
* status = #active
* date = 2020-06-29
* purpose = "Data entry page for practitioners."

* item[0].linkId = "Practitioner"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information"
* item[0].text = "Basic Information|Basic health worker details"
* item[0].type = #group

* item[0].item[0].linkId = "Practitioner.name[0]"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name"
* item[0].item[0].text = "Name"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "Practitioner.name[0].extension[0]"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.extension:ethiopiaPrefix.value[x]:valueCoding"
* item[0].item[0].item[0].text = "Prefix"
* item[0].item[0].item[0].type = #choice
* item[0].item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-ethiopia-prefix-valueset"
* item[0].item[0].item[0].required = false
* item[0].item[0].item[0].repeats = false

* item[0].item[0].item[1].linkId = "Practitioner.name[0].given[0]"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.given"
* item[0].item[0].item[1].text = "First Name"
* item[0].item[0].item[1].type = #string
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false
* item[0].item[0].item[1].extension[constraint].extension[key].valueId = "ihris-given-name-check"
* item[0].item[0].item[1].extension[constraint].extension[severity].valueCode = #error
* item[0].item[0].item[1].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[0].item[1].extension[constraint].extension[human].valueString = "First Name must be only text."

* item[0].item[0].item[2].linkId = "Practitioner.name[0].use"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.use"
* item[0].item[0].item[2].text = "Use"
* item[0].item[0].item[2].type = #choice
* item[0].item[0].item[2].required = true
* item[0].item[0].item[2].repeats = false
* item[0].item[0].item[2].readOnly = true
* item[0].item[0].item[2].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[0].item[2].answerOption.initialSelected = true

* item[0].item[0].item[3].linkId = "Practitioner.name[0].extension[1]"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.name.extension:givenAlternativeLang.value[x]:valueString"
* item[0].item[0].item[3].text = "First Name Alternative Language"
* item[0].item[0].item[3].type = #string
* item[0].item[0].item[3].required = false
* item[0].item[0].item[3].repeats = false

* item[0].item[1].linkId = "Practitioner.extension[0].extension[0]"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:fathers.value[x]:valueString"
* item[0].item[1].text = "Father's Name"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = false
* item[0].item[1].extension[constraint].extension[key].valueId = "ihris-fathers-name-check"
* item[0].item[1].extension[constraint].extension[severity].valueCode = #error
* item[0].item[1].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[1].extension[constraint].extension[human].valueString = "Father's Name must be only text."

* item[0].item[2].linkId = "Practitioner.extension[0].extension[1]"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:fathersalternativelanguage.value[x]:valueString"
* item[0].item[2].text = "Father's Name Alternative Language"
* item[0].item[2].type = #string
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Practitioner.extension[0].extension[2]"
* item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:grandfatherslastname.value[x]:valueString"
* item[0].item[3].text = "Grandfather's Lastname"
* item[0].item[3].type = #string
* item[0].item[3].required = true
* item[0].item[3].repeats = false
* item[0].item[3].extension[constraint].extension[key].valueId = "ihris-grandfather-name-check"
* item[0].item[3].extension[constraint].extension[severity].valueCode = #error
* item[0].item[3].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[3].extension[constraint].extension[human].valueString = "Grandfather's Name must be only text."

* item[0].item[4].linkId = "Practitioner.extension[0].extension[3]"
* item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:grandfathersalternativelanguage.value[x]:valueString"
* item[0].item[4].text = "Grand Father's Name Alternative Language"
* item[0].item[4].type = #string
* item[0].item[4].required = false
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Practitioner.extension[0].extension[4]"
* item[0].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:mothers.value[x]:valueString"
* item[0].item[5].text = "Mother's Full Name"
* item[0].item[5].type = #string
* item[0].item[5].required = true
* item[0].item[5].repeats = false
* item[0].item[5].extension[constraint].extension[key].valueId = "ihris-mothers-name-check"
* item[0].item[5].extension[constraint].extension[severity].valueCode = #error
* item[0].item[5].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[5].extension[constraint].extension[human].valueString = "Mother's Name must be only text."

* item[0].item[6].linkId = "Practitioner.extension[0].extension[5]"
* item[0].item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:familyNames.extension:mothersalternativelanguage.value[x]:valueString"
* item[0].item[6].text = "Mother's Name Alternative Language"
* item[0].item[6].type = #string
* item[0].item[6].required = false
* item[0].item[6].repeats = false

* item[1].linkId = "Practitioner:demographic"
* item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information"
* item[1].text = "Demographic Information"
* item[1].type = #group

* item[1].item[0].linkId = "Practitioner.birthDate"
* item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.birthDate"
* item[1].item[0].text = "Date of Birth"
* item[1].item[0].type = #date
* item[1].item[0].required = true
* item[1].item[0].repeats = false
* item[1].item[0].extension[constraint].extension[key].valueId = "ihris-age-18-check"
* item[1].item[0].extension[constraint].extension[severity].valueCode = #error
* item[1].item[0].extension[constraint].extension[expression].valueString = "$this < today() - 18 years"
* item[1].item[0].extension[constraint].extension[human].valueString = "BirthDate must be more than 18 years ago."

* item[1].item[1].linkId = "Practitioner.gender"
* item[1].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.gender"
* item[1].item[1].text = "Gender"
* item[1].item[1].type = #choice
* item[1].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-gender-valueset"
* item[1].item[1].required = true
* item[1].item[1].repeats = false

* item[1].item[2].linkId = "Practitioner.extension[3]"
* item[1].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:maritalStatus.value[x]:valueCoding"
* item[1].item[2].text = "Marital Status"
* item[1].item[2].type = #choice
* item[1].item[2].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-marital-status-valueset"
* item[1].item[2].required = false
* item[1].item[2].repeats = false

* item[1].item[3].linkId = "Practitioner.extension[1]"
* item[1].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:nationality.value[x]:valueCoding"
* item[1].item[3].text = "Nationality"
* item[1].item[3].type = #choice
* item[1].item[3].answerValueSet = "http://hl7.org/fhir/ValueSet/iso3166-1-2"
* item[1].item[3].required = false
* item[1].item[3].repeats = false

* item[1].item[4].linkId = "Practitioner.extension[8]"
* item[1].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:ethnicity.value[x]:valueCoding"
* item[1].item[4].text = "Ethnicity"
* item[1].item[4].type = #choice
* item[1].item[4].answerValueSet = "http://hl7.org/fhir/ValueSet/ihris-Ethnicity-valueset"
* item[1].item[4].required = false
* item[1].item[4].repeats = false

* item[2].linkId = "Practitioner:identifier"
* item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information"
* item[2].text = "Identifiers|Personal Identifiers"
* item[2].type = #group

* item[2].item[0].linkId = "Practitioner.identifier[0]"
* item[2].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier"
* item[2].item[0].text = "Employee Id"
* item[2].item[0].type = #group

* item[2].item[0].item[0].linkId = "Practitioner.identifier[0].type"
* item[2].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type"
* item[2].item[0].item[0].text = "Type"
* item[2].item[0].item[0].type = #choice
* item[2].item[0].item[0].required = false
* item[2].item[0].item[0].repeats = false
* item[2].item[0].item[0].readOnly = true
* item[2].item[0].item[0].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier#employeeId
* item[2].item[0].item[0].answerOption.initialSelected = true

* item[2].item[0].item[1].linkId = "Practitioner.identifier[0].value"
* item[2].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value"
* item[2].item[0].item[1].text = "Value"
* item[2].item[0].item[1].type = #string
* item[2].item[0].item[1].required = false
* item[2].item[0].item[1].repeats = false
* item[2].item[0].item[1].extension[constraint].extension[key].valueId = "ihris-search-identifier"
* item[2].item[0].item[1].extension[constraint].extension[severity].valueCode = #error
* item[2].item[0].item[1].extension[constraint].extension[expression].valueString = "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
* item[2].item[0].item[1].extension[constraint].extension[human].valueString = "The identifier must be unique and another record has this identifier"

* item[2].item[1].linkId = "Practitioner.identifier[1]"
* item[2].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier"
* item[2].item[1].text = "Pension Number"
* item[2].item[1].type = #group

* item[2].item[1].item[0].linkId = "Practitioner.identifier[1].type"
* item[2].item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type"
* item[2].item[1].item[0].text = "Type"
* item[2].item[1].item[0].type = #choice
* item[2].item[1].item[0].required = false
* item[2].item[1].item[0].repeats = false
* item[2].item[1].item[0].readOnly = true
* item[2].item[1].item[0].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier#pensionNumber
* item[2].item[1].item[0].answerOption.initialSelected = true

* item[2].item[1].item[1].linkId = "Practitioner.identifier[1].value"
* item[2].item[1].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value"
* item[2].item[1].item[1].text = "Value"
* item[2].item[1].item[1].type = #string
* item[2].item[1].item[1].required = false
* item[2].item[1].item[1].repeats = false
* item[2].item[1].item[1].extension[constraint].extension[key].valueId = "ihris-search-identifier"
* item[2].item[1].item[1].extension[constraint].extension[severity].valueCode = #error
* item[2].item[1].item[1].extension[constraint].extension[expression].valueString = "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
* item[2].item[1].item[1].extension[constraint].extension[human].valueString = "The identifier must be unique and another record has this identifier"

* item[2].item[2].linkId = "Practitioner.identifier[2]"
* item[2].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier"
* item[2].item[2].text = "Tin Number"
* item[2].item[2].type = #group

* item[2].item[2].item[0].linkId = "Practitioner.identifier[2].type"
* item[2].item[2].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type"
* item[2].item[2].item[0].text = "Type"
* item[2].item[2].item[0].type = #choice
* item[2].item[2].item[0].required = false
* item[2].item[2].item[0].repeats = false
* item[2].item[2].item[0].readOnly = true
* item[2].item[2].item[0].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier#tinNumber
* item[2].item[2].item[0].answerOption.initialSelected = true

* item[2].item[2].item[1].linkId = "Practitioner.identifier[2].value"
* item[2].item[2].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value"
* item[2].item[2].item[1].text = "Value"
* item[2].item[2].item[1].type = #string
* item[2].item[2].item[1].required = false
* item[2].item[2].item[1].repeats = false
* item[2].item[2].item[1].extension[constraint].extension[key].valueId = "ihris-search-identifier"
* item[2].item[2].item[1].extension[constraint].extension[severity].valueCode = #error
* item[2].item[2].item[1].extension[constraint].extension[expression].valueString = "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
* item[2].item[2].item[1].extension[constraint].extension[human].valueString = "The identifier must be unique and another record has this identifier"

* item[2].item[3].linkId = "Practitioner.identifier[3]"
* item[2].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier"
* item[2].item[3].text = "Civil Service Id"
* item[2].item[3].type = #group

* item[2].item[3].item[0].linkId = "Practitioner.identifier[3].type"
* item[2].item[3].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type"
* item[2].item[3].item[0].text = "Type"
* item[2].item[3].item[0].type = #choice
* item[2].item[3].item[0].required = false
* item[2].item[3].item[0].repeats = false
* item[2].item[3].item[0].readOnly = true
* item[2].item[3].item[0].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier#civilServiceId
* item[2].item[3].item[0].answerOption.initialSelected = true

* item[2].item[3].item[1].linkId = "Practitioner.identifier[3].value"
* item[2].item[3].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value"
* item[2].item[3].item[1].text = "Value"
* item[2].item[3].item[1].type = #string
* item[2].item[3].item[1].required = false
* item[2].item[3].item[1].repeats = false
* item[2].item[3].item[1].extension[constraint].extension[key].valueId = "ihris-search-identifier"
* item[2].item[3].item[1].extension[constraint].extension[severity].valueCode = #error
* item[2].item[3].item[1].extension[constraint].extension[expression].valueString = "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
* item[2].item[3].item[1].extension[constraint].extension[human].valueString = "The identifier must be unique and another record has this identifier"

* item[2].item[4].linkId = "Practitioner.identifier[4]"
* item[2].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier"
* item[2].item[4].text = "License Id"
* item[2].item[4].type = #group

* item[2].item[4].item[0].linkId = "Practitioner.identifier[4].type"
* item[2].item[4].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type"
* item[2].item[4].item[0].text = "Type"
* item[2].item[4].item[0].type = #choice
* item[2].item[4].item[0].required = false
* item[2].item[4].item[0].repeats = false
* item[2].item[4].item[0].readOnly = true
* item[2].item[4].item[0].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier#licenseId
* item[2].item[4].item[0].answerOption.initialSelected = true

* item[2].item[4].item[1].linkId = "Practitioner.identifier[4].value"
* item[2].item[4].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value"
* item[2].item[4].item[1].text = "Value"
* item[2].item[4].item[1].type = #string
* item[2].item[4].item[1].required = false
* item[2].item[4].item[1].repeats = false
* item[2].item[4].item[1].extension[constraint].extension[key].valueId = "ihris-search-identifier"
* item[2].item[4].item[1].extension[constraint].extension[severity].valueCode = #error
* item[2].item[4].item[1].extension[constraint].extension[expression].valueString = "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
* item[2].item[4].item[1].extension[constraint].extension[human].valueString = "The identifier must be unique and another record has this identifier"

* item[2].item[5].linkId = "Practitioner.identifier[5]"
* item[2].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier"
* item[2].item[5].text = "File Number"
* item[2].item[5].type = #group

* item[2].item[5].item[0].linkId = "Practitioner.identifier[5].type"
* item[2].item[5].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.type"
* item[2].item[5].item[0].text = "Type"
* item[2].item[5].item[0].type = #choice
* item[2].item[5].item[0].required = false
* item[2].item[5].item[0].repeats = false
* item[2].item[5].item[0].readOnly = true
* item[2].item[5].item[0].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-ethiopia-identifier#fileNo
* item[2].item[5].item[0].answerOption.initialSelected = true

* item[2].item[5].item[1].linkId = "Practitioner.identifier[5].value"
* item[2].item[5].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.value"
* item[2].item[5].item[1].text = "Value"
* item[2].item[5].item[1].type = #string
* item[2].item[5].item[1].required = false
* item[2].item[5].item[1].repeats = false
* item[2].item[5].item[1].extension[constraint].extension[key].valueId = "ihris-search-identifier"
* item[2].item[5].item[1].extension[constraint].extension[severity].valueCode = #error
* item[2].item[5].item[1].extension[constraint].extension[expression].valueString = "'Practitioner' | 'identifier' | iif(system.exists(), system & '|' & value, value)"
* item[2].item[5].item[1].extension[constraint].extension[human].valueString = "The identifier must be unique and another record has this identifier"

* item[2].item[6].linkId = "Practitioner:License"
* item[2].item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.identifier.extension:drivingLicense"
* item[2].item[6].text = "Driving License"
* item[2].item[6].type = #group

* item[2].item[6].item[0].linkId = "Practitioner.extension[9].extension[0]"
* item[2].item[6].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:drivingLicense.extension:licenseType.value[x]:valueCoding"
* item[2].item[6].item[0].text = "Driving Licence Type"
* item[2].item[6].item[0].type = #choice
* item[2].item[6].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-driving-license-type-valueset"
* item[2].item[6].item[0].required = false
* item[2].item[6].item[0].repeats = false

* item[2].item[6].item[1].linkId = "Practitioner.extension[9].extension[1]"
* item[2].item[6].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:drivingLicense.extension:license.value[x]:valueString"
* item[2].item[6].item[1].text = "Driving Licence ID"
* item[2].item[6].item[1].type = #string
* item[2].item[6].item[1].required = false
* item[2].item[6].item[1].repeats = false

* item[3].linkId = "Practitioner:telecom"
* item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom"
* item[3].text = "Contacts|Person's Contact Information"
* item[3].type = #group

* item[3].item[0].linkId = "Practitioner.telecom[0]"
* item[3].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom"
* item[3].item[0].text = "Mobile Phone"
* item[3].item[0].type = #group

* item[3].item[0].item[0].linkId = "Practitioner.telecom[0].use"
* item[3].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.use"
* item[3].item[0].item[0].text = "Telecom Use"
* item[3].item[0].item[0].type = #choice
* item[3].item[0].item[0].required = true
* item[3].item[0].item[0].repeats = false
* item[3].item[0].item[0].readOnly = true
* item[3].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/contact-point-use#mobile
* item[3].item[0].item[0].answerOption.initialSelected = true

* item[3].item[0].item[1].linkId = "Practitioner.telecom[0].system"
* item[3].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.system"
* item[3].item[0].item[1].text = "Telecom System"
* item[3].item[0].item[1].type = #choice
* item[3].item[0].item[1].required = true
* item[3].item[0].item[1].repeats = false
* item[3].item[0].item[1].readOnly = true
* item[3].item[0].item[1].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#phone
* item[3].item[0].item[1].answerOption.initialSelected = true

* item[3].item[0].item[2].linkId = "Practitioner.telecom[0].value"
* item[3].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.value"
* item[3].item[0].item[2].text = "Mobile Phone"
* item[3].item[0].item[2].type = #string
* item[3].item[0].item[2].required = true
* item[3].item[0].item[2].repeats = false
* item[3].item[0].item[2].extension[constraint].extension[key].valueId = "ihris-phone-check"
* item[3].item[0].item[2].extension[constraint].extension[severity].valueCode = #error
* item[3].item[0].item[2].extension[constraint].extension[expression].valueString = "matches('^(([+][2][5][1][1-9][0-9]{8})|([0][1-9][0-9]{8}))')"
* item[3].item[0].item[2].extension[constraint].extension[human].valueString = "Phone Number is not properly formatted."

* item[3].item[1].linkId = "Practitioner.telecom[1]"
* item[3].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom"
* item[3].item[1].text = "Work Email"
* item[3].item[1].type = #group

* item[3].item[1].item[0].linkId = "Practitioner.telecom[1].use"
* item[3].item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.use"
* item[3].item[1].item[0].text = "Telecom Use"
* item[3].item[1].item[0].type = #choice
* item[3].item[1].item[0].required = true
* item[3].item[1].item[0].repeats = false
* item[3].item[1].item[0].readOnly = true
* item[3].item[1].item[0].answerOption.valueCoding = http://hl7.org/fhir/contact-point-use#work
* item[3].item[1].item[0].answerOption.initialSelected = true

* item[3].item[1].item[1].linkId = "Practitioner.telecom[1].system"
* item[3].item[1].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.system"
* item[3].item[1].item[1].text = "Telecom System"
* item[3].item[1].item[1].type = #choice
* item[3].item[1].item[1].required = true
* item[3].item[1].item[1].repeats = false
* item[3].item[1].item[1].readOnly = true
* item[3].item[1].item[1].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[3].item[1].item[1].answerOption.initialSelected = true

* item[3].item[1].item[2].linkId = "Practitioner.telecom[1].value"
* item[3].item[1].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.telecom.value"
* item[3].item[1].item[2].text = "Work Email"
* item[3].item[1].item[2].type = #string
* item[3].item[1].item[2].required = true
* item[3].item[1].item[2].repeats = false
* item[3].item[1].item[2].extension[constraint].extension[key].valueId = "ihris-email-check"
* item[3].item[1].item[2].extension[constraint].extension[severity].valueCode = #error
* item[3].item[1].item[2].extension[constraint].extension[expression].valueString = "matches('^[0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4}$')"
* item[3].item[1].item[2].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[3].item[2].linkId = "Practitioner.extension[2]"
* item[3].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:residence.value[x]:valueReference"
* item[3].item[2].text = "Residence"
* item[3].item[2].type = #reference
* item[3].item[2].required = false
* item[3].item[2].repeats = false

* item[4].linkId = "Practitioner:communication"
* item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication"
* item[4].text = "Language Details|Languages spoken"
* item[4].type = #group

* item[4].item[0].linkId = "Practitioner:communication[0]"
* item[4].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication"
* item[4].item[0].text = "Language"
* item[4].item[0].type = #group
* item[4].item[0].repeats = true

* item[4].item[0].item[0].linkId = "Practitioner.communication[0]"
* item[4].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication"
* item[4].item[0].item[0].text = "Language"
* item[4].item[0].item[0].type = #choice
* item[4].item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-ethiopia-language-valueset"
* item[4].item[0].item[0].required = false
* item[4].item[0].item[0].repeats = false

/* item[4].item[0].item[0].item[0].linkId = "Practitioner.communication[0].extension[0]"
* item[4].item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication.extension:proficiency"
* item[4].item[0].item[0].item[0].text = "Proficiency"
* item[4].item[0].item[0].item[0].type = #group
* item[4].item[0].item[0].item[0].repeats = true

* item[4].item[0].item[0].item[0].item[0].linkId = "Practitioner.communication[0].extension[0].extension[0]"
* item[4].item[0].item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication.extension:proficiency.extension:level.value[x]:valueCoding"
* item[4].item[0].item[0].item[0].item[0].text = "Proficiency"
* item[4].item[0].item[0].item[0].item[0].type = #choice
* item[4].item[0].item[0].item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-language-proficiency-valueset"
* item[4].item[0].item[0].item[0].item[0].required = false
* item[4].item[0].item[0].item[0].item[0].repeats = false

* item[4].item[0].item[0].item[0].item[1].linkId = "Practitioner.communication[0].extension[0].extension[1]"
* item[4].item[0].item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.communication.extension:proficiency.extension:type.value[x]:valueCoding"
* item[4].item[0].item[0].item[0].item[1].text = "Proficiency Type"
* item[4].item[0].item[0].item[0].item[1].type = #choice
* item[4].item[0].item[0].item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-language-proficiency-type-valueset"
* item[4].item[0].item[0].item[0].item[1].required = false
* item[4].item[0].item[0].item[0].item[1].repeats = true*/

* item[5].linkId = "__Practitioner:trainining"
* item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:educationalMajor"
* item[5].text = "Training Details|Training information"
* item[5].type = #group

* item[5].item[0].linkId = "Practitioner:specialTraining"
* item[5].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:specialTraining"
* item[5].item[0].text = "Special training information"
* item[5].item[0].type = #group

* item[5].item[0].item[0].linkId = "Practitioner.extension[4]"
* item[5].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:specialTraining.value[x]:valueString"
* item[5].item[0].item[0].text = "Special Training"
* item[5].item[0].item[0].type = #string
* item[5].item[0].item[0].required = false
* item[5].item[0].item[0].repeats = true

* item[5].item[1].linkId = "Practitioner:category"
* item[5].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:category"
* item[5].item[1].text = "Category Details|Category information"
* item[5].item[1].type = #group

* item[5].item[1].item[0].linkId = "Practitioner.extension[5]"
* item[5].item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:category.value[x]:valueCoding"
* item[5].item[1].item[0].text = "Category"
* item[5].item[1].item[0].type = #choice
* item[5].item[1].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-category-valueset"
* item[5].item[1].item[0].required = false
* item[5].item[1].item[0].repeats = false

* item[6].linkId = "__Practitioner:remarkNote"
* item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:remarkNote"
* item[6].text = "Remarks|Remarks or notes"
* item[6].type = #group

* item[6].item[0].linkId = "Practitioner.extension[6]"
* item[6].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.extension:remarkNote.value[x]:valueString"
* item[6].item[0].text = "Remark Note"
* item[6].item[0].type = #text
* item[6].item[0].required = false
* item[6].item[0].repeats = true

* item[7].linkId = "__Practitioner:photo"
* item[7].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.photo"
* item[7].text = "Photo|Person's Passport Photo"
* item[7].type = #group

* item[7].item[0].linkId = "Practitioner.extension[7]"
* item[7].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-personal-information#Practitioner.photo"
* item[7].item[0].text = "Photo"
* item[7].item[0].type = #attachment
* item[7].item[0].required = false
* item[7].item[0].repeats = false

* item[8].linkId = "PractitionerRole"
* item[8].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description"
* item[8].text = "Position Informatiom|Health worker position informatiom"
* item[8].type = #group
* item[8].extension[constraint][0].extension[key].valueId = "ihris-start-end-date"
* item[8].extension[constraint][0].extension[severity].valueCode = #error
* item[8].extension[constraint][0].extension[expression].valueString = "where(linkId='PractitionerRole.period.end').answer.first().valueDateTime.empty() or where(linkId='PractitionerRole.period.end').answer.first().valueDateTime > where(linkId='PractitionerRole.period.start').answer.first().valueDateTime"
* item[8].extension[constraint][0].extension[human].valueString = "The end date must be after the start date."
* item[8].extension[constraint][1].extension[key].valueId = "ihris-first-emp-date"
* item[8].extension[constraint][1].extension[severity].valueCode = #error
* item[8].extension[constraint][1].extension[expression].valueString = "where(linkId='PractitionerRole.extension[3]').answer.first().valueDate <= where(linkId='PractitionerRole.period.start').answer.first().valueDateTime"
* item[8].extension[constraint][1].extension[human].valueString = "The First Appointment Date must be before or Equal to the start date."


* item[8].item[0].linkId = "PractitionerRole.code"
* item[8].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.code"
* item[8].item[0].text = "Job Title"
* item[8].item[0].type = #choice
* item[8].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job-ethiopia"
* item[8].item[0].required = true
* item[8].item[0].repeats = false

* item[8].item[1].linkId = "PractitionerRole.location"
* item[8].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.location"
* item[8].item[1].text = "Duty Post"
* item[8].item[1].type = #reference
* item[8].item[1].required = false
* item[8].item[1].repeats = false

* item[8].item[2].linkId = "PractitionerRole.extension[0]"
* item[8].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:shift.value[x]:valueCoding"
* item[8].item[2].text = "Shift"
* item[8].item[2].type = #choice
* item[8].item[2].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-shift-valueset"
* item[8].item[2].required = true
* item[8].item[2].repeats = false

* item[8].item[3].linkId = "PractitionerRole.extension[1]"
* item[8].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:employmentStatus.value[x]:valueCoding"
* item[8].item[3].text = "Employment Status"
* item[8].item[3].type = #choice
* item[8].item[3].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-employment-status-valueset"
* item[8].item[3].required = true
* item[8].item[3].repeats = false

* item[8].item[4].linkId = "PractitionerRole.extension[2]"
* item[8].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:jobType.value[x]:valueCoding"
* item[8].item[4].text = "Job Type"
* item[8].item[4].type = #choice
* item[8].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job-type-valueset"
* item[8].item[4].required = true
* item[8].item[4].repeats = false

* item[8].item[5].linkId = "PractitionerRole.extension[3]"
* item[8].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:firstEmploymentDate.value[x]:valueDate"
* item[8].item[5].text = "First Employment Date"
* item[8].item[5].type = #date
* item[8].item[5].required = true
* item[8].item[5].repeats = false

* item[8].item[6].linkId = "PractitionerRole.period.start"
* item[8].item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.period.start"
* item[8].item[6].text = "Hire Date"
* item[8].item[6].type = #dateTime
* item[8].item[6].required = true
* item[8].item[6].repeats = false

* item[8].item[7].linkId = "PractitionerRole.period.end"
* item[8].item[7].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.period.end"
* item[8].item[7].text = "End Date"
* item[8].item[7].type = #dateTime
* item[8].item[7].required = false
* item[8].item[7].repeats = false

* item[8].item[8].linkId = "PractitionerRole.extension[4]"
* item[8].item[8].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:jobInformationRemark.value[x]:valueString"
* item[8].item[8].text = "Remark"
* item[8].item[8].type = #text
* item[8].item[8].required = false
* item[8].item[8].repeats = false

* item[8].item[9].linkId = "PractitionerRole.practitioner"
* item[8].item[9].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.practitioner"
* item[8].item[9].text = "Practitioner"
* item[8].item[9].type = #string
* item[8].item[9].required = true
* item[8].item[9].repeats = false
* item[8].item[9].readOnly = true
* item[8].item[9].answerOption.valueString = "__REPLACE__Practitioner"
* item[8].item[9].answerOption.initialSelected = true