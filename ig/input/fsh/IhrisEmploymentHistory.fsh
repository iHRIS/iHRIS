Profile:        IhrisBasicEmploymentHistory
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-employment-history
Title:          "Work Experience Information"
Description:    "iHRIS Profile of the Basic resource for Work Experience."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisEmploymentHistory named employmentHistory 1..1 MS
* extension[employmentHistory].extension[organization].valueString 1..1 MS
* extension[employmentHistory].extension[organization] ^label = "Organization Name"
* extension[employmentHistory].extension[address].valueString MS
* extension[employmentHistory].extension[address] ^label = "Organization Address"
* extension[employmentHistory].extension[telephone].valueString MS
* extension[employmentHistory].extension[telephone] ^label = "Organization Telephone"
* extension[employmentHistory].extension[startingPosition].valueString 1..1  MS
* extension[employmentHistory].extension[startingPosition] ^label = "Starting Position"
* extension[employmentHistory].extension[startingSalary].valueMoney MS
* extension[employmentHistory].extension[startingSalary] ^label = "Starting Salary"
* extension[employmentHistory].extension[period].valuePeriod MS
* extension[employmentHistory].extension[period].valuePeriod.start 1..1 MS
* extension[employmentHistory].extension[period].valuePeriod.start ^label = "Date Started"
* extension[employmentHistory].extension[period].valuePeriod.end 1..1 MS
* extension[employmentHistory].extension[period].valuePeriod.end ^label = "Date Ended"
* extension[employmentHistory].extension[responsibilities].valueString MS
* extension[employmentHistory].extension[responsibilities] ^label = "Job Description"
* extension[employmentHistory].extension[reasonLeaving].valueString MS
* extension[employmentHistory].extension[reasonLeaving] ^label = "Reason For Leaving"

Extension:      IhrisEmploymentHistory
Id:             ihris-employment-history
Title:          "Work Experience details"
* extension contains
      organization 1..1 MS and
      address 0..1 MS and
      telephone 0..* MS and
      startingPosition 0..1 MS and
      startingSalary 0..1 MS and
      period 0..1 MS and
      responsibilities 0..1 MS and
      reasonLeaving 0..1 MS
* extension[organization].value[x] only string
* extension[organization].valueString ^label = "Organization Name"
* extension[address].value[x] only string
* extension[address].valueString ^label = "Organization Address"
* extension[telephone].value[x] only string
* extension[telephone].valueString ^label = "Organization Telephone"
* extension[startingPosition].value[x] only string
* extension[startingPosition].valueString ^label = "Position"
* extension[startingSalary].value[x] only Money
* extension[startingSalary].valueMoney ^label = "Salary"
* extension[period].value[x] only Period
* extension[period].valuePeriod ^constraint[0].key = "ihris-period-start-end"
* extension[period].valuePeriod ^constraint[0].severity = #error
* extension[period].valuePeriod ^constraint[0].human = "The end date must be after the start date"
* extension[period].valuePeriod ^constraint[0].expression = "end.empty() or end = '' or end >= start"
* extension[period].valuePeriod ^label = "Period"
* extension[period].valuePeriod.start 1..1 MS
* extension[period].valuePeriod.start ^label = "Date Started"
* extension[period].valuePeriod.start ^constraint[0].key = "ihris-period-start-date-check"
* extension[period].valuePeriod.start ^constraint[0].severity = #error
* extension[period].valuePeriod.start ^constraint[0].human = "The Start date must be less than now."
* extension[period].valuePeriod.start ^constraint[0].expression = "$this < today() + 1 day"
* extension[period].valuePeriod.end 1..1 MS
* extension[period].valuePeriod.end ^label = "Date Ended"
* extension[period].valuePeriod.end ^constraint[0].key = "ihris-period-start-date-check"
* extension[period].valuePeriod.end ^constraint[0].severity = #error
* extension[period].valuePeriod.end ^constraint[0].human = "The end date must be less than now."
* extension[period].valuePeriod.end ^constraint[0].expression = "$this < today() + 1 day"
* extension[responsibilities].value[x] only string
* extension[responsibilities].valueString ^label = "Job Description"
* extension[reasonLeaving].value[x] only string
* extension[reasonLeaving].valueString ^label = "Reason For Leaving"

Instance:       IhrisPractitionerWorkflowEmploymentHistory
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Work Experience Workflow"
* description = "iHRIS workflow to record a Work Experience"
* id = "ihris-employment-history"
* url = "http://ihris.org/fhir/Questionnaire/ihris-employment-history"
* name = "ihris-employment-history"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a Work Experience information."

* item[0].linkId = "Basic"
* item[0].text = "Work Experience"
* item[0].type = #group
* item[0].extension[constraint].extension[key].valueId = "ihris-start-end-date"
* item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].extension[constraint].extension[expression].valueString = "where(linkId='Basic.extension[0].extension[6]').answer.first().valueDateTime.empty() or where(linkId='Basic.extension[0].extension[6]').answer.first().valueDateTime >= where(linkId='Basic.extension[0].extension[5]').answer.first().valueDateTime"
* item[0].extension[constraint].extension[human].valueString = "The end date must be after the start date."

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Organization Name"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Organization Address"
* item[0].item[1].type = #text
* item[0].item[1].required = false
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Organization Telephone"
* item[0].item[2].type = #string
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Position"
* item[0].item[3].type = #string
* item[0].item[3].required = true
* item[0].item[3].repeats = false

* item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[0].item[4].text = "Salary"
* item[0].item[4].type = #string
* item[0].item[4].required = false
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Basic.extension[0].extension[5]"
* item[0].item[5].text = "Date Started"
* item[0].item[5].type = #dateTime
* item[0].item[5].required = true
* item[0].item[5].repeats = false
* item[0].item[5].extension[constraint].extension[key].valueId = "ihris-date-lessthantoday-check"
* item[0].item[5].extension[constraint].extension[severity].valueCode = #error
* item[0].item[5].extension[constraint].extension[expression].valueString = "$this < today() + 1 day"
* item[0].item[5].extension[constraint].extension[human].valueString = "Start Date must not be in the future."

* item[0].item[6].linkId = "Basic.extension[0].extension[6]"
* item[0].item[6].text = "Date Ended"
* item[0].item[6].type = #dateTime
* item[0].item[6].required = true
* item[0].item[6].repeats = false
* item[0].item[6].extension[constraint].extension[key].valueId = "ihris-date-lessthantoday-check"
* item[0].item[6].extension[constraint].extension[severity].valueCode = #error
* item[0].item[6].extension[constraint].extension[expression].valueString = "$this < today() + 1 day"
* item[0].item[6].extension[constraint].extension[human].valueString = "ENd Date must not be in the future."


* item[0].item[7].linkId = "Basic.extension[0].extension[7]"
* item[0].item[7].text = "Job Description"
* item[0].item[7].type = #text
* item[0].item[7].required = false
* item[0].item[7].repeats = false

* item[0].item[8].linkId = "Basic.extension[0].extension[8]"
* item[0].item[8].text = "Reason For Leaving"
* item[0].item[8].type = #string
* item[0].item[8].required = false
* item[0].item[8].repeats = false

Instance:       ihris-page-employment-history
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Work Experience Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-employment-history)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[link][1].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][1].extension[text].valueString = "Add Another"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/questionnaire/ihris-employment-history/employment-history?practitioner=FIELD"
* extension[display].extension[search][0].valueString = "Organization|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-employment-history').extension.where(url='organization').valueString"
* extension[display].extension[search][1].valueString = "Starting Position|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-employment-history').extension.where(url='startingPosition').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Work Experience"
* extension[section][0].extension[description].valueString = "Work Experience details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:employmentHistory.extension:organization.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:employmentHistory.extension:address.value[x]:valueString"
* extension[section][0].extension[field][3].valueString = "Basic.extension:employmentHistory.extension:telephone.value[x]:valueString"
* extension[section][0].extension[field][4].valueString = "Basic.extension:employmentHistory.extension:startingPosition.value[x]:valueString"
* extension[section][0].extension[field][5].valueString = "Basic.extension:employmentHistory.extension:startingSalary.value[x]:valueMoney"
* extension[section][0].extension[field][6].valueString = "Basic.extension:employmentHistory.extension:period.value[x]:valuePeriod"
* extension[section][0].extension[field][7].valueString = "Basic.extension:employmentHistory.extension:responsibilities.value[x]:valueString"
* extension[section][0].extension[field][8].valueString = "Basic.extension:employmentHistory.extension:reasonLeaving.value[x]:valueString"