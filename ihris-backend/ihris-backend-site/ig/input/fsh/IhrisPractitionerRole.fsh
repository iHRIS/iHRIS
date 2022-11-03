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
* extension[display].extension[search][0].valueString = "Job|PractitionerRole.code[0].coding[0]"
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
* item[0].text = "Job End Date"
* item[0].type = #group

* item[0].item[0].linkId = "period.end"
* item[0].item[0].text = "End Date"
* item[0].item[0].type = #date
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "departure"
* item[0].item[1].text = "Reason For Departure"
* item[0].item[1].type = #choice
* item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-reason-departure-valueset"
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "status"
* item[0].item[2].text = "Position Status"
* item[0].item[2].type = #choice
* item[0].item[2].required = true
* item[0].item[2].repeats = false
* item[0].item[2].readOnly = true
* item[0].item[2].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-position-status#closed
* item[0].item[2].answerOption.initialSelected = true

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
* item[0].text = "Promotion Details"
* item[0].type = #group

* item[0].item[0].linkId = "OldPractitionerRole"
* item[0].item[0].text = "Old Position Details"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "period.end"
* item[0].item[0].item[0].text = "Position Change Date"
* item[0].item[0].item[0].type = #dateTime
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false

* item[0].item[0].item[1].linkId = "reasonfordepature"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:reasonForDepature.value[x]:valueCoding"
* item[0].item[0].item[1].text = "Reason For Change"
* item[0].item[0].item[1].type = #choice
* item[0].item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-reason-departure-valueset"
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "oldPositionStatus"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:positionStatus.value[x]:valueCoding"
* item[0].item[0].item[2].text = "Position Status"
* item[0].item[0].item[2].type = #choice
* item[0].item[0].item[2].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-position-status"
* item[0].item[0].item[2].required = true
* item[0].item[0].item[2].repeats = false
* item[0].item[0].item[2].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-position-status#closed
* item[0].item[0].item[2].answerOption.initialSelected = true

* item[0].item[1].linkId = "NewPractitionerRole"
* item[0].item[1].text = "New Position Details"
* item[0].item[1].type = #group

* item[0].item[1].item[0].linkId = "code"
* item[0].item[1].item[0].text = "New Job Title"
* item[0].item[1].item[0].type = #choice
* item[0].item[1].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job"
* item[0].item[1].item[0].required = true
* item[0].item[1].item[0].repeats = false

* item[0].item[1].item[1].linkId = "salaryScale"
* item[0].item[1].item[1].text = "New Salary Scale"
* item[0].item[1].item[1].type = #choice
* item[0].item[1].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-salary-grade"
* item[0].item[1].item[1].required = false
* item[0].item[1].item[1].repeats = false

* item[0].item[1].item[2].linkId = "salary"
* item[0].item[1].item[2].text = "New Salary"
* item[0].item[1].item[2].type = #string
* item[0].item[1].item[2].required = true
* item[0].item[1].item[2].repeats = false

* item[0].item[1].item[3].linkId = "location"
* item[0].item[1].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.location"
* item[0].item[1].item[3].text = "Duty Post/Location"
* item[0].item[1].item[3].type = #reference
* item[0].item[1].item[3].required = true
* item[0].item[1].item[3].repeats = false

/* item[0].item[1].item[4].linkId = "PractitionerRole.extension[1]"
* item[0].item[1].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:shift.value[x]:valueCoding"
* item[0].item[1].item[4].text = "Shift"
* item[0].item[1].item[4].type = #choice
* item[0].item[1].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-shift-valueset"
* item[0].item[1].item[4].required = true
* item[0].item[1].item[4].repeats = false*/

* item[0].item[1].item[4].linkId = "employmentStatus"
* item[0].item[1].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:employmentStatus.value[x]:valueCoding"
* item[0].item[1].item[4].text = "Employment Status"
* item[0].item[1].item[4].type = #choice
* item[0].item[1].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-employment-status-valueset"
* item[0].item[1].item[4].required = true
* item[0].item[1].item[4].repeats = false

* item[0].item[1].item[5].linkId = "jobType"
* item[0].item[1].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:jobType.value[x]:valueCoding"
* item[0].item[1].item[5].text = "Job Type"
* item[0].item[1].item[5].type = #choice
* item[0].item[1].item[5].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job-type-valueset"
* item[0].item[1].item[5].required = true
* item[0].item[1].item[5].repeats = false

* item[0].item[1].item[6].linkId = "newPositionStatus"
* item[0].item[1].item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-job-description#PractitionerRole.extension:positionStatus.value[x]:valueCoding"
* item[0].item[1].item[6].text = "Position Status"
* item[0].item[1].item[6].type = #choice
* item[0].item[1].item[6].required = true
* item[0].item[1].item[6].repeats = false
* item[0].item[1].item[6].readOnly = true
* item[0].item[1].item[6].answerOption.valueCoding = http://ihris.org/fhir/CodeSystem/ihris-position-status#occupied
* item[0].item[1].item[6].answerOption.initialSelected = true