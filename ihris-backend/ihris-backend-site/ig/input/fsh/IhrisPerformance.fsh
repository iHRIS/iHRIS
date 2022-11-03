Profile:        IhrisBasicPerformance
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-performance
Title:          "Performance Information"
Description:    "iHRIS Profile of the Basic resource for Performance."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisPerformance named performance 1..1 MS
* extension[performance].extension[evaluator].valueString MS
* extension[performance].extension[evaluator].valueString ^label = "Evaluator's Name"
* extension[performance].extension[period].valuePeriod MS
* extension[performance].extension[period].valuePeriod.start MS
* extension[performance].extension[period].valuePeriod.start ^label = "Evaluation Period Start Date"
* extension[performance].extension[period].valuePeriod.end MS
* extension[performance].extension[period].valuePeriod.end ^label = "Evaluation Period End Date"
* extension[performance].extension[score].valueCoding ^label = "Score Attained"
* extension[performance].extension[score].valueCoding MS
    
Extension:      IhrisPerformance
Id:             ihris-performance
Title:          "Performance details"
* extension contains
      evaluator 1..1 MS and
      period 1..1 MS and
      score 1..1 MS 
* extension[evaluator].value[x] only string
* extension[evaluator].valueString ^label = "Evaluator's Name"
* extension[score].value[x] only Coding
* extension[score].valueCoding ^label = "Score Attained"
* extension[score].valueCoding from IhrisPerformanceScoreValueSet (required)
* extension[period].value[x] only Period
* extension[period].valuePeriod ^label = "Evaluation Period"
* extension[period].valuePeriod.start 1..1 MS
* extension[period].valuePeriod.start ^label = "Evaluation Period Start Date"
* extension[period].valuePeriod.end 1..1 MS
* extension[period].valuePeriod.end ^label = "Evaluation Period End Date"

CodeSystem:      IhrisPerformanceScore
Id:              ihris-performance-score
Title:           "Performance Score"
* ^version = "0.2.0"
* #1 "Improvement Required" "Improvement Required"
* #2 "Development Required" "Development Required"
* #3 "Meets Expectations" "Meets Expectations"
* #4 "Exceeds Expectations" "Exceeds Expectations"
* #5 "Far Exceeds Expectations" "Far Exceeds Expectations"

ValueSet:         IhrisPerformanceScoreValueSet
Id:               ihris-performance-score-valueset
Title:            "iHRIS Performance Score ValueSet"
* ^version = "0.2.0"
* codes from system IhrisPerformanceScore

Instance:       IhrisPractitionerWorkflowPerformance
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS Performance Workflow"
* description = "iHRIS workflow to record a Performance"
* id = "ihris-performance"
* url = "http://ihris.org/fhir/Questionnaire/ihris-performance"
* name = "ihris-performance"
* status = #active
* date = 2020-09-02
* purpose = "Workflow page for recording a Performance information."

* item[0].linkId = "Basic"
* item[0].text = "Performance"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Evaluator's Name"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Evaluation Period Start Date"
* item[0].item[1].type = #date
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Evaluation Period End Date"
* item[0].item[2].type = #date
* item[0].item[2].required = true
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Score Attained"
* item[0].item[3].type = #choice
* item[0].item[3].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-performance-score-valueset"
* item[0].item[3].required = true
* item[0].item[3].repeats = false

Instance:       ihris-page-performance
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Performance Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-performance)
* extension[display].extension[link].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link].extension[text].valueString = "View Health Worker"
* extension[display].extension[link].extension[button].valueBoolean = true
* extension[display].extension[link].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Start Date|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='period').valuePeriod.start"
* extension[display].extension[search][1].valueString = "End Date|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='period').valuePeriod.end"
* extension[section][0].extension[title].valueString = "Performance Evaluation"
* extension[section][0].extension[description].valueString = "Performance Evaluation details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:performance.extension:evaluator.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:performance.extension:period.value[x]:valuePeriod"
* extension[section][0].extension[field][3].valueString = "Basic.extension:performance.extension:score.value[x]:valueCoding"
