Profile:        IhrisBasicSalary
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-salary
Title:          "Salary Information"
Description:    "iHRIS Profile of the Basic resource for Salary."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisSalary named salary 1..1 MS
* extension[salary] ^label = "Salary Information"
* extension[salary].extension[salaryScale].valueCoding MS
* extension[salary].extension[bsalary].valueString MS
* extension[salary].extension[allowance].valueString MS
* extension[salary].extension[benefits].valueString MS
* extension[salary].extension[period].valuePeriod MS
* extension[salary].extension[period].valuePeriod.start MS
* extension[salary].extension[period].valuePeriod.end MS
* extension[salary].extension[remark].valueString MS
* extension[salary].extension[salarySource].valueCoding MS
* extension[salary].extension[frequency].valueCoding MS
* extension[salary].extension[current].valueBoolean MS
    
Extension:      IhrisSalary
Id:             ihris-salary
Title:          "Salary details"
* extension contains salaryladder 0..1 MS and
    salaryScale 0..1 MS and
    bsalary 0..1 MS and
    allowance 0..1 MS and
    benefits 0..1 MS and
    period 1..1 MS and
    remark 0..1 MS and
    salarySource 0..1 MS and
    frequency 0..1 MS and
    current 0..1 MS
* extension[salaryScale].value[x] only Coding
* extension[salaryScale].valueCoding MS
* extension[salaryScale].valueCoding ^label = "Pay Grade"
* extension[salaryScale].valueCoding from http://ihris.org/fhir/ValueSet/ihris-salary-grade (required)
* extension[bsalary].value[x] only string
* extension[bsalary].valueString MS
* extension[bsalary].valueString ^label = "Basic Salary"
* extension[allowance].value[x] only string
* extension[allowance].valueString MS
* extension[allowance].valueString ^label = "Allowance"
* extension[benefits].value[x] only string
* extension[benefits].valueString MS
* extension[benefits].valueString ^label = "Benefits"
* extension[period].value[x] only Period
* extension[period].valuePeriod ^constraint[0].key = "ihris-period-start-end"
* extension[period].valuePeriod ^constraint[0].severity = #error
* extension[period].valuePeriod ^constraint[0].human = "The end date must be after the start date"
* extension[period].valuePeriod ^constraint[0].expression = "end.empty() or end = '' or end >= start"
* extension[period].valuePeriod ^label = "Effective Period"
* extension[period].valuePeriod.start 1..1 MS
* extension[period].valuePeriod.start ^label = "Effective Start Date"
* extension[period].valuePeriod.end MS
* extension[period].valuePeriod.end ^label = "End Date"
* extension[remark].value[x] only string
* extension[remark].valueString MS
* extension[remark].valueString ^label = "Remark"
* extension[salarySource].value[x] only Coding
* extension[salarySource].valueCoding MS
* extension[salarySource].valueCoding ^label = "Salary Source"
* extension[salarySource].valueCoding from IhrisSalarySourceValueSet (required)
* extension[frequency].value[x] only Coding
* extension[frequency].valueCoding MS
* extension[frequency].valueCoding ^label = "Pay Frequency"
* extension[frequency].valueCoding from IhrisFrequencyValueSet (required)
* extension[current].value[x] only boolean
* extension[current].valueBoolean MS
* extension[current].valueBoolean ^label = "Is Current"

CodeSystem:      IhrisSalarySource
Id:              ihris-salary-source-codesystem
Title:           "Salary Source"
* ^date = "2020-10-20T08:41:04.362Z"

ValueSet:         IhrisSalarySourceValueSet
Id:               ihris-salary-source-valueset
Title:            "iHRIS Salary Source ValueSet"
* ^date = "2020-10-20T08:41:04.362Z"
* ^version = "0.2.0"
* codes from system IhrisSalarySource

CodeSystem:      IhrisFrequency
Id:              ihris-frequency-codesystem
Title:           "Frequency"
* ^date = "2020-10-20T08:41:04.362Z"
* #daily "Daily"
* #weekly "Weekly"
* #monthly "Monthly"
* #quaterly "Quaterly"
* #biannually "Bi-Annually"
* #annualy "Annually/Yearly"

ValueSet:         IhrisFrequencyValueSet
Id:               ihris-frequency-valueset
Title:            "iHRIS Frequency ValueSet"
* ^date = "2020-10-20T08:41:04.362Z"
* ^version = "0.2.0"
* codes from system IhrisFrequency

Instance:       IhrisPractitionerWorkflowSalary
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Salary Workflow"
* description = "iHRIS workflow to record a Salary"
* id = "ihris-salary"
* url = "http://ihris.org/fhir/Questionnaire/ihris-salary"
* name = "ihris-salary"
* status = #active
* date = 2020-09-02
* purpose = "Workflow page for recording a Salary information."

* item[0].linkId = "Basic"
* item[0].text = "Salary Information"
* item[0].type = #group
* item[0].extension[constraint].extension[key].valueId = "ihris-start-end-date"
* item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].extension[constraint].extension[expression].valueString = "where(linkId='Basic.extension[0].extension[7]').answer.first().valueDate.empty() or where(linkId='Basic.extension[0].extension[7]').answer.first().valueDate >= where(linkId='Basic.extension[0].extension[6]').answer.first().valueDate"
* item[0].extension[constraint].extension[human].valueString = "The end date must be after the start date."

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Pay Grade"
* item[0].item[0].type = #choice
* item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-salary-scale-valueset"
* item[0].item[0].required = false
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Basic Salary"
* item[0].item[1].type = #string
* item[0].item[1].required = false
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Allowance"
* item[0].item[2].type = #string
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Benefits"
* item[0].item[3].type = #string
* item[0].item[3].required = false
* item[0].item[3].repeats = false

* item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[0].item[4].text = "Effective Start date"
* item[0].item[4].type = #date
* item[0].item[4].required = true
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Basic.extension[0].extension[5]"
* item[0].item[5].text = "End Date"
* item[0].item[5].type = #date
* item[0].item[5].required = false
* item[0].item[5].repeats = false

* item[0].item[6].linkId = "Basic.extension[0].extension[6]"
* item[0].item[6].text = "Remark"
* item[0].item[6].type = #text
* item[0].item[6].required = false
* item[0].item[6].repeats = false

* item[0].item[7].linkId = "Basic.extension[0].extension[7]"
* item[0].item[7].text = "Salary Source"
* item[0].item[7].type = #choice
* item[0].item[7].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-salary-source-valueset"
* item[0].item[7].required = false
* item[0].item[7].repeats = false

* item[0].item[8].linkId = "Basic.extension[0].extension[8]"
* item[0].item[8].text = "Pay Frequency"
* item[0].item[8].type = #choice
* item[0].item[8].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-frequency-valueset"
* item[0].item[8].required = false
* item[0].item[8].repeats = false

* item[0].item[9].linkId = "Basic.extension[0].extension[9]"
* item[0].item[9].text = "Is Current"
* item[0].item[9].type = #boolean
* item[0].item[9].required = false
* item[0].item[9].repeats = false

Instance:       ihris-page-salary
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Salary Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-salary)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Salary|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-salary').extension.where(url='bsalary').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Employee Salary Information"
* extension[section][0].extension[description].valueString = "Employee Salary details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:salary.extension:salaryladder.value[x]:valueCoding"
* extension[section][0].extension[field][2].valueString = "Basic.extension:salary.extension:salaryScale.value[x]:valueCoding"
* extension[section][0].extension[field][3].valueString = "Basic.extension:salary.extension:salaryStep.value[x]:valueCoding"
* extension[section][0].extension[field][4].valueString = "Basic.extension:salary.extension:bsalary.value[x]:valueString"
* extension[section][0].extension[field][5].valueString = "Basic.extension:salary.extension:allowance.value[x]:valueString"
* extension[section][0].extension[field][6].valueString = "Basic.extension:salary.extension:benefits.value[x]:valueString"
* extension[section][0].extension[field][7].valueString = "Basic.extension:salary.extension:total.value[x]:valueString"
* extension[section][0].extension[field][8].valueString = "Basic.extension:salary.extension:period.value[x]:valuePeriod"
* extension[section][0].extension[field][9].valueString = "Basic.extension:salary.extension:reviewed.value[x]:valueBoolean"
* extension[section][0].extension[field][10].valueString = "Basic.extension:salary.extension:remark.value[x]:valueString"
* extension[section][0].extension[field][11].valueString = "Basic.extension:salary.extension:salarySource.value[x]:valueCoding"
* extension[section][0].extension[field][12].valueString = "Basic.extension:salary.extension:frequency.value[x]:valueCoding"
* extension[section][0].extension[field][13].valueString = "Basic.extension:salary.extension:current.value[x]:valueBoolean"

Instance:       ihris-page-salary-ladder
InstanceOf:     IhrisPage
Title:          "iHRIS Salary Ladder CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-salary-ladder-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Pay Grade Ladder"
* extension[section][0].extension[description].valueString = "Pay Grade Ladder"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-salary-step
InstanceOf:     IhrisPage
Title:          "iHRIS Salary Step CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-salary-step-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Pay Grade Step"
* extension[section][0].extension[description].valueString = "Pay Grade Step"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-salary-source
InstanceOf:     IhrisPage
Title:          "iHRIS Salary source CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-salary-source-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Salary Fund Source Type"
* extension[section][0].extension[description].valueString = "Salary Fund Source Type"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-frequency
InstanceOf:     IhrisPage
Title:          "iHRIS Pay Frequency CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-frequency-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Pay Frequency"
* extension[section][0].extension[description].valueString = "Pay Frequency"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"