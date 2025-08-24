Profile:        IhrisPractitionerRole
Parent:         PractitionerRole
Id:             ihris-practitioner-role
Title:          "iHRIS Practitioner Role"
Description:    "iHRIS profile of Practitioner Role."

* identifier 0..* MS
* identifier ^label = "Identifier"
* identifier.use MS
* identifier.use ^label = "Use"
* identifier.type MS
* identifier.type ^label = "Type"
* identifier.type.coding ^label = "Type"
* identifier.type.coding 1..1 MS
* identifier.system MS
* identifier.system ^label = "System"
* identifier.value MS
* identifier.value ^label = "Value"
* active 1..1 MS
* active ^label = "Active"
* period 1..1 MS
* period ^label = "Period of Employment"
* period ^constraint[0].key = "ihris-period-start-end"
* period ^constraint[0].severity = #error
* period ^constraint[0].human = "The end date must be after the start date"
* period ^constraint[0].expression = "end.empty() or end = '' or end >= start"
* period.start 1..1 MS
* period.start ^label = "Start Date"
* period.start ^minValueDateTime = "1950-01-01"
* period.start ^maxValueDateTime = "2030-01-01"
* period.end 0..1 MS
* period.end ^label = "End Date"
* period.end ^minValueDateTime = "1950-01-01"
* period.end ^maxValueDateTime = "2030-01-01"
* practitioner 0..1 MS
* practitioner ^label = "Health Worker"
* practitioner.reference ^label = "Health Worker"
* practitioner only Reference(IhrisPractitioner)
* code 1..1 MS
* code ^label = "Job"
* code from http://ihris.org/fhir/ValueSet/ihris-job
* code.coding 1..1 MS
* code.coding ^label = "Job"
* specialty 0..* MS
* specialty ^label = "Specialty"
* specialty.coding 1..1 MS
* specialty.coding ^label = "Specialty"
* location 1..1 MS 
* location ^label = "Facility"
* location only Reference(IhrisFacility)
* extension contains
    IhrisPractitionerRoleReasonDeparture named reasonForDepature 0..1 MS
* extension[reasonForDepature].valueCoding MS
* extension[reasonForDepature] ^label = "Reason for Departure"

Extension:      IhrisPractitionerRoleSalaryScale
Id:             ihris-practitionerrole-salary-scale
Title:          "iHRIS Salary Scale"
Description:    "iHRIS extension for Job Description Salary Scale."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 0..1 MS
* valueCoding ^label = "Salary Scale"
* valueCoding from http://ihris.org/fhir/CodeSystem/ihris-salary-grade (required)

Extension:      IhrisPractitionerRoleSalary
Id:             ihris-practitionerrole-salary
Title:          "iHRIS Job Description salary"
Description:    "iHRIS extension for Job Information Salary."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Money
* valueMoney 0..1 MS
* valueMoney ^label = "Salary"

Extension:      IhrisPractitionerRoleEmploymentStatus
Id:             ihris-practitionerrole-employment-status
Title:          "iHRIS Job Description Employment Status"
Description:    "iHRIS extension for Job Description Employment Status."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Employment Status"
* valueCoding from IhrisEmploymentStatusValueSet (required)

CodeSystem:      IhrisEmploymentStatusCodeSystem
Id:              ihris-employment-status-codesystem
Title:           "iHRIS Employment Status CodeSystem"
* #contract "Contract" "Contract"
* #fullTime "Full-time" "Full-time"
* #partTime "Part-Time" "Part-Time"
* #volunteer  "Volunteer"

ValueSet:         IhrisEmploymentStatusValueSet
Id:               ihris-employment-status-valueset
Title:            "iHRIS Employment Status ValueSet"
* codes from system IhrisEmploymentStatusCodeSystem

Extension:      IhrisPractitionerRolePositionStatus
Id:             ihris-practitionerrole-position-status
Title:          "iHRIS Job Description Position Status"
Description:    "iHRIS extension for Job Description Position Status."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Position Status"
* valueCoding from IhrisPositionStatusValueSet (required)

CodeSystem:      IhrisPositionStatusCodeSystem
Id:              ihris-position-status
Title:           "Position Status"
* ^date = "2020-10-29T08:41:04.362Z"
* ^version = "0.2.0"
* #vacant "Vacant" "Vacant"
* #occupied "Occupied" "Occupied" 
* #closed "Closed" "Closed"

ValueSet:         IhrisPositionStatusValueSet
Id:               ihris-position-status
Title:            "iHRIS position Status"
* ^date = "2020-10-29T08:41:04.362Z"
* ^version = "0.2.0"
* codes from system IhrisPositionStatusCodeSystem

Extension:      IhrisPractitionerRoleReasonDeparture
Id:             ihris-practitionerrole-reason-departure
Title:          "iHRIS Job Description Reason for Departure"
Description:    "iHRIS extension for Job Description Reason for Departure."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 0..1 MS
* valueCoding ^label = "Reason for Change/Departure"
* valueCoding from IhrisReasonDepartureValueSet (required)

CodeSystem:      IhrisReasonDepartureCodeSystem
Id:              ihris-reason-departure-codesystem
Title:           "Reason For Change/Departure"
* ^date = "2020-11-14T08:41:04.362Z"
* ^version = "0.3.0"
* #transfer "Transfer" "Transfer"
* #promotion "Promotion" "Promotion"
* #death "Death" "death"
* #redeployment  "Redeployment" "Redeployment"
* #earlyRetirement "Early Retirement" "Early Retirement"
* #mandatoryRetirement "Mandatory Retirement" "Mandatory Retirement"
* #resignation "Resignation" "Resignation"
* #health "Health Related" "Health Related"
* #quit "Quit" "Quit"

ValueSet:         IhrisReasonDepartureValueSet
Id:               ihris-reason-departure-valueset
Title:            "iHRIS Reason Departure ValueSet"
* ^date = "2020-11-14T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisReasonDepartureCodeSystem

Extension:      IhrisPractitionerRoleJobType
Id:             ihris-practitionerrole-job-type
Title:          "iHRIS Job Description Job Type"
Description:    "iHRIS extension for Job Description Job Type."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Job Type"
* valueCoding from IhrisJobTypeValueSet (required)

CodeSystem:      IhrisJobTypeCodeSystem
Id:              ihris-job-type-codesystem
Title:           "iHRIS Job Type CodeSystem"
* #transfer "Transfer" "Transfer"
* #newHire "New Hire" "New Hire"
* #redeployment  "Redeployment" "Redeployment"

ValueSet:         IhrisJobTypeValueSet
Id:               ihris-job-type-valueset
Title:            "iHRIS Job Type ValueSet"
* codes from system IhrisJobTypeCodeSystem

Extension:      IhrisPractitionerRoleFirstEmploymentDate
Id:             ihris-practitionerrole-first-employment-date
Title:          "iHRIS Job Description First Employment Date"
Description:    "iHRIS extension for First Employment Date."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only date
* valueDate 1..1 MS
* valueDate ^label = "First Employment Date"

Instance:       ihris-page-practitionerrole
InstanceOf:     IhrisPage
Title:          "iHRIS PractitionerRole Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-practitioner-role)
* extension[display].extension[link].extension[field].valueString = "PractitionerRole.practitioner.reference"
* extension[display].extension[link].extension[text].valueString = "View Practitioner"
* extension[display].extension[link].extension[button].valueBoolean = true
* extension[display].extension[link].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Job|PractitionerRole.code.coding[0]"
* extension[display].extension[search][1].valueString = "Start Date|PractitionerRole.period.start"
* extension[display].extension[search][2].valueString = "Practitioner|PractitionerRole.practitioner"
* extension[display].extension[search][3].valueString = "Facility|PractitionerRole.location"
* extension[display].extension[search][4].valueString = "Specialty|PractitionerRole.specialty"
* extension[display].extension[filter][0].valueString = "Job|role|http://ihris.org/fhir/ValueSet/ihris-job"
* extension[section][0].extension[title].valueString = "Position"
* extension[section][0].extension[description].valueString = "Position details"
* extension[section][0].extension[name].valueString = "PractitionerRole"
* extension[section][0].extension[field][0].valueString = "PractitionerRole.code"
* extension[section][0].extension[field][1].valueString = "PractitionerRole.practitioner"
* extension[section][0].extension[field][2].valueString = "PractitionerRole.location"
* extension[section][0].extension[field][3].valueString = "PractitionerRole.period"
* extension[section][0].extension[field][4].valueString = "PractitionerRole.specialty"
* extension[section][0].extension[field][5].valueString = "PractitionerRole.identifier"

Instance:       ihris-page-job
InstanceOf:     IhrisPage
Title:          "iHRIS Job CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-job)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[search][2].valueString = "Cadre|cadre"
* extension[display].extension[search][3].valueString = "Classification|classification"
* extension[section][0].extension[title].valueString = "Job"
* extension[section][0].extension[description].valueString = "Job Titles"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.code"
* extension[section][0].extension[field][1].valueString = "CodeSystem.definition"
* extension[section][0].extension[field][2].valueString = "CodeSystem.display"
* extension[section][0].extension[field][3].valueString = "CodeSystem.cadre"
* extension[section][0].extension[field][4].valueString = "CodeSystem.classification"
* extension[section][0].extension[field][4].valueString = "CodeSystem.salary-grade"

Instance:       ihris-page-salary-grade
InstanceOf:     IhrisPage
Title:          "iHRIS Salary Scale CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-salary-grade)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[section][0].extension[title].valueString = "Salary Grade"
* extension[section][0].extension[description].valueString = "Salary Grade"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-classification
InstanceOf:     IhrisPage
Title:          "iHRIS Classification CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-classification)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[section][0].extension[title].valueString = "Classification"
* extension[section][0].extension[description].valueString = "Classification"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-cadre
InstanceOf:     IhrisPage
Title:          "iHRIS Cadre CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-cadre)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[section][0].extension[title].valueString = "Cadre"
* extension[section][0].extension[description].valueString = "Cadre"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-employment-status
InstanceOf:     IhrisPage
Title:          "iHRIS Employment Status CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-employment-status-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Employment Status"
* extension[section][0].extension[description].valueString = "Employment Status"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-job-type
InstanceOf:     IhrisPage
Title:          "iHRIS Job Type CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-job-type-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Job Type"
* extension[section][0].extension[description].valueString = "Job Type"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-salary-scale
InstanceOf:     IhrisPage
Title:          "iHRIS Salary Scale CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-salary-grade)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Salary Scale"
* extension[section][0].extension[description].valueString = "Salary Scale"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-reason-departure
InstanceOf:     IhrisPage
Title:          "iHRIS Reason for Departure CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-reason-departure-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Reason for Departure"
* extension[section][0].extension[description].valueString = "Reason for Departure"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-shift
InstanceOf:     IhrisPage
Title:          "iHRIS Shift CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-shift-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Shift"
* extension[section][0].extension[description].valueString = "Shift"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       IhrisPractitionerWorkflowEndRole
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS End Role Workflow"
* description = "iHRIS workflow to end a current role/job"
* id = "ihris-endrole"
* url = "http://ihris.org/fhir/Questionnaire/ihris-endrole"
* name = "ihris-endrole"
* status = #active
* date = 2020-08-09
* purpose = "Workflow page for ending a role/job."

* item[0].linkId = "PractitionerRole"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role"
* item[0].text = "End Appointment"
* item[0].type = #group

* item[0].item[0].linkId = "PractitionerRole.period.end"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#PractitionerRole.period.end"
* item[0].item[0].text = "End Date"
* item[0].item[0].type = #date
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "PractitionerRole.extension[0]"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#PractitionerRole.extension:reasonForDepature.value[x]"
* item[0].item[1].text = "Reason For Departure"
* item[0].item[1].type = #choice
* item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-reason-departure-valueset"
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "PractitionerRole.active"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#PractitionerRole.active"
* item[0].item[2].text = "Status"
* item[0].item[2].type = #boolean
* item[0].item[2].required = true
* item[0].item[2].repeats = false

Instance:       IhrisPractitionerWorkflowPromotion
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS End Role Workflow"
* description = "iHRIS workflow to record a promotion"
* id = "ihris-promotion"
* url = "http://ihris.org/fhir/Questionnaire/ihris-promotion"
* name = "ihris-promotion"
* status = #active
* date = 2020-08-09
* purpose = "Workflow page for recording a promotion."

* item[0].linkId = "PractitionerRole"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role"
* item[0].text = "Promotion Details"
* item[0].type = #group

* item[0].item[0].linkId = "PractitionerRole.code"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#PractitionerRole.code"
* item[0].item[0].text = "Job Title"
* item[0].item[0].type = #choice
* item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job"
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "PractitionerRole.period.start"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#PractitionerRole.period.start"
* item[0].item[1].text = "Start Date"
* item[0].item[1].type = #dateTime
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "PractitionerRole.location[0]"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#PractitionerRole.location"
* item[0].item[2].text = "Facility"
* item[0].item[2].type = #reference
* item[0].item[2].required = true
* item[0].item[2].repeats = false

* item[1].linkId = "Basic"
* item[1].text = "Salary Information"
* item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary"
* item[1].type = #group

* item[1].item[0].linkId = "Basic.extension[0]"
* item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary"
* item[1].item[0].text = "Details"
* item[1].item[0].type = #group

* item[1].item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[1].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:salaryScale.value[x]:valueCoding"
* item[1].item[0].item[0].text = "Pay Grade"
* item[1].item[0].item[0].type = #choice
* item[1].item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-salary-grade"
* item[1].item[0].item[0].required = false
* item[1].item[0].item[0].repeats = false

* item[1].item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[1].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:bsalary.value[x]:valueString"
* item[1].item[0].item[1].text = "Basic Salary"
* item[1].item[0].item[1].type = #string
* item[1].item[0].item[1].required = false
* item[1].item[0].item[1].repeats = false

* item[1].item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[1].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:allowance.value[x]:valueString"
* item[1].item[0].item[2].text = "Allowance"
* item[1].item[0].item[2].type = #string
* item[1].item[0].item[2].required = false
* item[1].item[0].item[2].repeats = false

* item[1].item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[1].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:benefits.value[x]:valueString"
* item[1].item[0].item[3].text = "Benefits"
* item[1].item[0].item[3].type = #string
* item[1].item[0].item[3].required = false
* item[1].item[0].item[3].repeats = false

* item[1].item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[1].item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:startDate.value[x]:valueDate"
* item[1].item[0].item[4].text = "Effective Start date"
* item[1].item[0].item[4].type = #date
* item[1].item[0].item[4].required = true
* item[1].item[0].item[4].repeats = false

* item[1].item[0].item[5].linkId = "Basic.extension[0].extension[5]"
* item[1].item[0].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:endDate.value[x]:valueDate"
* item[1].item[0].item[5].text = "End Date"
* item[1].item[0].item[5].type = #date
* item[1].item[0].item[5].required = false
* item[1].item[0].item[5].repeats = false

* item[1].item[0].item[6].linkId = "Basic.extension[0].extension[6]"
* item[1].item[0].item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:remark.value[x]:valueString"
* item[1].item[0].item[6].text = "Remark"
* item[1].item[0].item[6].type = #text
* item[1].item[0].item[6].required = false
* item[1].item[0].item[6].repeats = false

* item[1].item[0].item[7].linkId = "Basic.extension[0].extension[7]"
* item[1].item[0].item[7].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:salarySource.value[x]:valueCoding"
* item[1].item[0].item[7].text = "Salary Source"
* item[1].item[0].item[7].type = #choice
* item[1].item[0].item[7].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-salary-source-valueset"
* item[1].item[0].item[7].required = false
* item[1].item[0].item[7].repeats = false

* item[1].item[0].item[8].linkId = "Basic.extension[0].extension[8]"
* item[1].item[0].item[8].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:frequency.value[x]:valueCoding"
* item[1].item[0].item[8].text = "Pay Frequency"
* item[1].item[0].item[8].type = #choice
* item[1].item[0].item[8].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-frequency-valueset"
* item[1].item[0].item[8].required = false
* item[1].item[0].item[8].repeats = false

* item[1].item[0].item[9].linkId = "Basic.extension[0].extension[9]"
* item[1].item[0].item[9].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary#Basic.extension:salary.extension:current.value[x]:valueBoolean"
* item[1].item[0].item[9].text = "Is Current"
* item[1].item[0].item[9].type = #boolean
* item[1].item[0].item[9].required = false
* item[1].item[0].item[9].repeats = false