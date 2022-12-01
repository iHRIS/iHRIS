Profile:        IhrisBasicEducation
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-education
Title:          "Basic Education Information"
Description:    "iHRIS Profile of the Basic resource for Education."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisEducation named education 1..1 MS
* extension[education].extension[institution].valueCoding 1..1 MS
* extension[education].extension[institution].valueCoding ^label = "Secondary School/Institution"
* extension[education].extension[academicLevel].valueCoding ^label = "Academic Level"
* extension[education].extension[academicLevel].valueCoding 1..1 MS
* extension[education].extension[year].valueDate ^label = "Year"
* extension[education].extension[year].valueDate 1..1 MS
    
Extension:      IhrisEducation
Id:             ihris-education
Title:          "Education Information"
* extension contains
      institution 1..1 MS and
      academicLevel 0..1 MS and
      year 0..1 MS
* extension[institution].value[x] only Coding
* extension[institution].valueCoding from IhrisInstitutionValueSet
* extension[institution].valueCoding ^label = "Secondary School/Institution"
* extension[academicLevel].value[x] only Coding
* extension[academicLevel].valueCoding ^label = "Academic Level"
* extension[academicLevel].valueCoding from IhrisEducationLevelValueSet (required)
* extension[year].value[x] only date
* extension[year].valueDate ^label = "Year"

CodeSystem:      IhrisEducationLevel
Id:              ihris-education-level
Title:           "Education Level"
* ^date = "2020-09-29T08:41:04.362Z"
* #Primary "Primary School" "Primary School"
* #Secondary "Secondary School" "Secondary School"
* #Cerifiticate "Cerifiticate" "Cerifiticate"
* #Others "Others" "Others"

ValueSet:         IhrisEducationLevelValueSet
Id:               ihris-education-level-valueset
Title:            "iHRIS Education Level ValueSet"
* ^date = "2020-09-29T08:41:04.362Z"
* ^version = "0.2.0"
* codes from system IhrisEducationLevel

CodeSystem:      IhrisInstitution
Id:              ihris-institution
Title:           "Institution"
* ^date = "2020-11-10T08:41:04.362Z"
* ^version = "0.3.0"

ValueSet:         IhrisInstitutionValueSet
Id:               ihris-institution-valueset
Title:            "iHRIS Institution Value Set"
* ^date = "2020-11-10T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisInstitution


/*Profile:        IhrisInstitution
Parent:         Location
Id:             ihris-institution
Title:          "Education Institution"
Description:    "iHRIS profile of Education Institution."
* identifier 0..0 
* status 1..1 MS
* status ^label = "Status"
* operationalStatus 0..0
* hoursOfOperation 0..0
* physicalType 0..0
* type 0..0
* mode 0..0
* name 1..1 MS
* name ^label = "Institution Name"
* telecom 0..* MS
* telecom ^label = "Institution Contact"
* telecom.system MS
* telecom.system ^label = "Type"
* telecom.value MS
* telecom.value ^label = "Value"
* telecom.use MS
* telecom.use ^label = "Use"
* address 0..1 MS
* address ^label = "Institution Address"
* address.type MS
* address.type ^label = "Address Type"
* address.use MS
* address.use ^label = "Use"
* address.line 0..1 MS
* address.line ^label = "Street name, number & P.O. Box etc."
* address.city MS
* address.city ^label = "Name of city, town etc"
* address.district MS
* address.district ^label = "District"
* address.country MS
* address.country ^label = "Country"
* partOf 0..1 MS
* partOf ^label = "Institution Location"
* extension contains
    IhrisInstitutionType named institutionType 1..1 MS 
* extension[institutionType].valueCoding MS
* extension[institutionType] ^label = "Institution Type"

Extension:      IhrisInstitutionType
Id:             ihris-institution-type
Title:          "Institution Type"
Description:    "iHRIS extension for Institution Type."
* ^context.type = #element
* ^context.expression = "Location"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Type"
* valueCoding from IhrisInstitutionTypeValueSet (required)

CodeSystem:      IhrisInstitutionType
Id:              ihris-institution-type
Title:           "Institution Type"
* #university "University" "University"
* #technical "Technical Institute" "Technical Institute"
* #college "College" "College"
* #other "other" "other"

ValueSet:         IhrisInstitutionTypeValueSet
Id:               ihris-institution-type-valueset
Title:            "iHRIS Institution Type Value Set"
* codes from system IhrisInstitutionType*/

Instance:       IhrisPractitionerWorkflowEducation
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS Education History Workflow"
* description = "iHRIS workflow to record a Education History"
* id = "ihris-education"
* url = "http://ihris.org/fhir/Questionnaire/ihris-education"
* name = "ihris-education"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a Education Information."

* item[0].linkId = "Basic"
* item[0].text = "Education Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-institution-valueset"
* item[0].item[0].text = "Institution"
* item[0].item[0].type = #choice
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Academic Level"
* item[0].item[1].type = #choice
* item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-education-level-valueset"
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]#year"
* item[0].item[2].text = "Year"
* item[0].item[2].type = #date
* item[0].item[2].required = false
* item[0].item[2].repeats = false

Instance:       ihris-page-basic-education
InstanceOf:     IhrisPage
Title:          "Basic Education History"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-education)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[link][1].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][1].extension[text].valueString = "Add Another"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/questionnaire/ihris-education/basic-education?practitioner=FIELD"
* extension[display].extension[search][0].valueString = "Institution|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-education').extension.where(url='institution').valueReference.reference"
* extension[display].extension[search][1].valueString = "Academic Level|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-education').extension.where(url='academicLevel').valueCoding.display"
* extension[display].extension[search][2].valueString = "Year|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-education').extension.where(url='year').valueDate"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[display].extension[field][1].extension[path].valueString = "Basic.extension:education.extension:year.value[x]:valueDate"
* extension[display].extension[field][1].extension[type].valueString = "year"
* extension[section][0].extension[title].valueString = "Basic Education Information"
* extension[section][0].extension[description].valueString = "Basic Education Information details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:education.extension:institution.value[x]:valueCoding"
* extension[section][0].extension[field][2].valueString = "Basic.extension:education.extension:academicLevel.value[x]:valueCoding"
* extension[section][0].extension[field][3].valueString = "Basic.extension:education.extension:year.value[x]:valueDate"


Instance:       ihris-page-institution
InstanceOf:     IhrisPage
Title:          "iHRIS Institution CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-institution)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[search][2].valueString = "Region|region"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Education Institution"
* extension[section][0].extension[description].valueString = "Education Institution"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.code"
* extension[section][0].extension[field][1].valueString = "CodeSystem.definition"
* extension[section][0].extension[field][2].valueString = "CodeSystem.display"

Instance:       ihris-page-academiclevel
InstanceOf:     IhrisPage
Title:          "iHRIS academiclevel CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-education-level)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Education level"
* extension[section][0].extension[description].valueString = "Education Level"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.code"
* extension[section][0].extension[field][1].valueString = "CodeSystem.definition"
* extension[section][0].extension[field][2].valueString = "CodeSystem.display"

Instance:       ihris-page-degree
InstanceOf:     IhrisPage
Title:          "iHRIS Degree CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-degree)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Degree"
* extension[section][0].extension[description].valueString = "Degree"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-education-level
InstanceOf:     IhrisPage
Title:          "iHRIS Education Level CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-education-level)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Degree"
* extension[section][0].extension[description].valueString = "Degree"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

Instance:       ihris-page-institution-type
InstanceOf:     IhrisPage
Title:          "iHRIS Institution Type CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-institution-type)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Institution Type"
* extension[section][0].extension[description].valueString = "Institution Type"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"