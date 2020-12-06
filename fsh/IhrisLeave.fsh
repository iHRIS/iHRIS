Profile:        IhrisBasicLeave
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-leave
Title:          "Leave Information"
Description:    "iHRIS Profile of the Basic resource for Leave."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisLeave named leave 1..1 MS
* extension[leave].extension[leave-type].valueCoding MS
* extension[leave].extension[period].valuePeriod MS
* extension[leave].extension[period].valuePeriod.start MS
* extension[leave].extension[period].valuePeriod.start ^label = "Leave Start Date"
* extension[leave].extension[period].valuePeriod.start ^minValueDateTime = "1950-01-01"
* extension[leave].extension[period].valuePeriod.start ^maxValueDateTime = "2030-01-01"
* extension[leave].extension[period].valuePeriod.end MS
* extension[leave].extension[period].valuePeriod.end ^label = "Leave End Date"
* extension[leave].extension[period].valuePeriod.end ^minValueDateTime = "1950-01-01"
* extension[leave].extension[period].valuePeriod.end ^maxValueDateTime = "2030-01-01"
* extension[leave].extension[dateRequested].valueDate MS
* extension[leave].extension[daysRequested].valueInteger MS
    
Extension:      IhrisLeave
Id:             ihris-leave
Title:          "Leave details"
* extension contains
      leave-type 1..1 MS and
      period 1..1 MS and
      daysRequested 0..1 MS and
      dateRequested 0..1 MS
* extension[leave-type].value[x] only Coding
* extension[leave-type].valueCoding from IhrisLeaveTypeValueSet (required)
* extension[leave-type].valueCoding ^label = "Leave Type"
* extension[period].value[x] only Period
* extension[period].valuePeriod ^label = "Leave Period"
* extension[period].valuePeriod ^constraint[0].key = "ihris-period-start-end"
* extension[period].valuePeriod ^constraint[0].severity = #error
* extension[period].valuePeriod ^constraint[0].expression = "end.empty() or end = '' or end >= start"
* extension[period].valuePeriod ^constraint[0].human = "End date must be after the start date."
* extension[period].valuePeriod.start 1..1 MS
* extension[period].valuePeriod.start ^label = "Leave Start Date"
* extension[period].valuePeriod.start ^minValueDateTime = "1950-01-01"
* extension[period].valuePeriod.start ^maxValueDateTime = "2030-01-01"
* extension[period].valuePeriod.end ^minValueDateTime = "1950-01-01"
* extension[period].valuePeriod.end ^maxValueDateTime = "2030-01-01"
* extension[period].valuePeriod.end ^label = "Leave End Date"
* extension[period].valuePeriod.end 1..1 MS
* extension[daysRequested].value[x] only integer
* extension[daysRequested].valueInteger ^label = "Days Requested"
* extension[dateRequested].value[x] only date
* extension[dateRequested].valueDate ^label = "Requested Date"

CodeSystem:      IhrisLeaveTypeCodeSystem
Id:              ihris-leave-type-codesystem
Title:           "Leave Type"
* ^version = "0.2.0"
* #annual "Annual Leave" "Annual Leave"
* #maternity "Maternity Leave" "Maternity Leave"
* #paternity "Paternity Leave" "Paternity Leave"
* #sick  "Sick Leave" "Sick Leave"
* #special  "Special Leave" "Special Leave"
* #forced  "Forced Leave" "Forced Leave"
* #educational "Educational Leave" "Educational Leave"
* #prenatal "Prenatal Leave" "Prenatal Leave"
* #postnatal "Postnatal Leave" "Postnatal Leave"
* #medical  "Medical Leave" "Medical Leave"

ValueSet:         IhrisLeaveTypeValueSet
Id:               ihris-leave-type-valueset
Title:            "iHRIS leave Type ValueSet"
* ^version = "0.2.0"
* codes from system IhrisLeaveTypeCodeSystem

Instance:       IhrisPractitionerWorkflowLeave
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS Leave Workflow"
* description = "iHRIS workflow to record a leave"
* id = "ihris-leave"
* url = "http://ihris.org/fhir/Questionnaire/ihris-leave"
* name = "ihris-leave"
* status = #active
* date = 2020-08-20
* purpose = "Workflow page for recording a leave information."

* item[0].linkId = "Basic"
* item[0].text = "Leave Details"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Leave Type"
* item[0].item[0].type = #choice
* item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-leave-type-valueset"
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Start Date"
* item[0].item[1].type = #dateTime
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "End Date"
* item[0].item[2].type = #dateTime
* item[0].item[2].required = true
* item[0].item[2].repeats = false

* item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[0].item[4].text = "Date Requested"
* item[0].item[4].type = #date
* item[0].item[4].required = true
* item[0].item[4].repeats = false

Instance:       ihris-page-leave
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Leave Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-leave)
* extension[display].extension[link].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link].extension[text].valueString = "View Health Worker"
* extension[display].extension[link].extension[button].valueBoolean = true
* extension[display].extension[link].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Leave Type|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='leave-type').valueCoding"
* extension[display].extension[search][1].valueString = "Start Date|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='period').valuePeriod.start"
* extension[display].extension[search][2].valueString = "End Date|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='period').valuePeriod.end"
* extension[display].extension[search][3].valueString = "Practitioner|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[search][4].valueString = "Days Requested|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='daysRequested').valuePositiveInt"
* extension[display].extension[search][5].valueString = "Date Requested|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='dateRequested').valueDate"
* extension[display].extension[filter][0].valueString = "Leave Type|code|http://ihris.org/fhir/ValueSet/ihris-leave-type-valueset"
* extension[section][0].extension[title].valueString = "Leave"
* extension[section][0].extension[description].valueString = "Leave details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:leave.extension:leave-type.value[x]:valueCoding"
* extension[section][0].extension[field][2].valueString = "Basic.extension:leave.extension:daysRequested.value[x]:valueInteger"
* extension[section][0].extension[field][3].valueString = "Basic.extension:leave.extension:period.value[x]:valuePeriod"
* extension[section][0].extension[field][4].valueString = "Basic.extension:leave.extension:dateRequested.value[x]:valueDate"
