Profile:        IhrisPage
Parent:         Basic
Id:             ihris-page
Title:          "iHRIS Page"
Description:    "iHRIS Profile of the Basic resource to manage pages."
* code = IhrisResourceCodeSystem#page
* extension contains
      IhrisPageDisplay named display 1..1 MS and
      IhrisPageSection named section 0..* MS

Extension:      IhrisPageDisplay
Id:             ihris-page-display
Title:          "iHRIS Page Display"
Description:    "iHRIS Page Display details."
* ^context.type = #element
* ^context.expression = "IhrisPage"
* extension contains
      resource 1..1 MS and
      search 1..* MS and
      filter 0..* MS and
      add 0..1 MS and
      field 0..* MS and
      link 0..* MS 

* extension[resource].value[x] only Reference
* extension[resource].valueReference only Reference(StructureDefinition or CodeSystem)
* extension[resource].valueReference 1..1 MS
* extension[resource].valueReference ^label = "Primary Resource"

* extension[search].value[x] only string
* extension[search].valueString 1..1 MS
* extension[search].valueString ^label = "Search Headers"

* extension[filter].value[x] only string
* extension[filter].valueString 1..1 MS
* extension[filter].valueString ^label = "Search Filters"

* extension[add].extension contains
      url 1..1 MS and
      icon 0..1 MS and
      class 0..1 MS
* extension[add].extension[url].value[x] only url
* extension[add].extension[url].valueUrl MS
* extension[add].extension[url].valueUrl ^label = "Add Link URL"
* extension[add].extension[icon].value[x] only string
* extension[add].extension[icon].valueString MS
* extension[add].extension[icon].valueString ^label = "Add Link Icon"
* extension[add].extension[class].value[x] only string
* extension[add].extension[class].valueString MS
* extension[add].extension[class].valueString ^label = "Add Link Class"

* extension[link].extension contains
      field 0..1 MS and
      text 0..1 MS and
      button 0..1 MS and
      icon 0..1 MS and
      url 1..1 MS
* extension[link].extension[field].value[x] only string
* extension[link].extension[field].valueString MS
* extension[link].extension[field].valueString ^label = "FHIRPath for field in resource"
* extension[link].extension[text].value[x] only string
* extension[link].extension[text].valueString MS
* extension[link].extension[text].valueString ^label = "Text for link"
* extension[link].extension[button].value[x] only boolean
* extension[link].extension[button].valueBoolean MS
* extension[link].extension[button].valueBoolean ^label = "Display as button"
* extension[link].extension[icon].value[x] only string
* extension[link].extension[icon].valueString MS
* extension[link].extension[icon].valueString ^label = "Icon to display in button"
* extension[link].extension[url].value[x] only url
* extension[link].extension[url].valueUrl MS
* extension[link].extension[url].valueUrl ^label = "URL to go to"

* extension[field].extension contains
      path 1..1 MS and
      type 0..1 MS and
      readOnlyIfSet 0..1 MS
* extension[field].extension[path].value[x] only string
* extension[field].extension[path].valueString MS
* extension[field].extension[path].valueString ^label = "Field Path from StructureDefintion"
* extension[field].extension[type].value[x] only string
* extension[field].extension[type].valueString MS
* extension[field].extension[type].valueString ^label = "Display type for the field"
* extension[field].extension[readOnlyIfSet].value[x] only boolean
* extension[field].extension[readOnlyIfSet].valueBoolean MS
* extension[field].extension[readOnlyIfSet].valueBoolean ^label = "Read Only if the value is set"


Extension:      IhrisPageSection
Id:             ihris-page-section
Title:          "iHRIS Page Section"
Description:    "iHRIS Page Section information."
* ^context.type = #element
* ^context.expression = "IhrisPage"
* extension contains
      title 1..1 MS and
      description 1..1 MS and
      name 1..1 MS and
      field 0..* MS and
      resource 0..1 MS
* extension[title].value[x] only string
* extension[title].valueString MS
* extension[title].valueString ^label = "Title"
* extension[description].value[x] only string
* extension[description].valueString 1..1 MS
* extension[description].valueString ^label = "Description"
* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Name"
* extension[field].value[x] only string
* extension[field].valueString 1..1 MS
* extension[field].valueString ^label = "Field"
* extension[resource].extension contains
      resource 1..1 MS and
      linkfield 1..1 MS and
      searchfield 0..1 MS and
      column 1..* MS and
      action 0..* MS
* extension[resource].extension[resource].value[x] only Reference
* extension[resource].extension[resource].valueReference only Reference(StructureDefinition)
* extension[resource].extension[resource].valueReference MS
* extension[resource].extension[resource].valueReference ^label = "Secondary Resource"
* extension[resource].extension[linkfield].value[x] only string
* extension[resource].extension[linkfield].valueString MS
* extension[resource].extension[linkfield].valueString ^label = "Secondary Resource Link Field"
* extension[resource].extension[searchfield].value[x] only string
* extension[resource].extension[searchfield].valueString MS
* extension[resource].extension[searchfield].valueString ^label = "Secondary Resource Search Field (if different from the link field)"
* extension[resource].extension[column].extension contains
      header 1..1 MS and
      field 1..1 MS
* extension[resource].extension[column].extension[header].value[x] only string 
* extension[resource].extension[column].extension[header].valueString MS
* extension[resource].extension[column].extension[header].valueString ^label = "Column Header"
* extension[resource].extension[column].extension[field].value[x] only string 
* extension[resource].extension[column].extension[field].valueString MS
* extension[resource].extension[column].extension[field].valueString ^label = "FHIRPath Expression"
* extension[resource].extension[action].extension contains
      link 1..1 MS and
      text 1..1 MS and
      row 0..1 MS and
      condition 0..1 MS and
      emptyDisplay 0..1 MS and
      class 0..1 MS 
* extension[resource].extension[action].extension[link].value[x] only string
* extension[resource].extension[action].extension[link].valueString MS
* extension[resource].extension[action].extension[link].valueString ^label = "Action Link"
* extension[resource].extension[action].extension[text].value[x] only string
* extension[resource].extension[action].extension[text].valueString MS
* extension[resource].extension[action].extension[text].valueString ^label = "Action Text"
* extension[resource].extension[action].extension[row].value[x] only boolean
* extension[resource].extension[action].extension[row].valueBoolean MS
* extension[resource].extension[action].extension[row].valueBoolean ^label = "Is Row Action?"
* extension[resource].extension[action].extension[condition].value[x] only string
* extension[resource].extension[action].extension[condition].valueString MS
* extension[resource].extension[action].extension[condition].valueString ^label = "FHIRPation Condition do Display"
* extension[resource].extension[action].extension[emptyDisplay].value[x] only boolean
* extension[resource].extension[action].extension[emptyDisplay].valueBoolean MS
* extension[resource].extension[action].extension[emptyDisplay].valueBoolean ^label = "Show when no records?"
* extension[resource].extension[action].extension[class].value[x] only string
* extension[resource].extension[action].extension[class].valueString MS
* extension[resource].extension[action].extension[class].valueString ^label = "Element Class for the Action"


Instance:       ihris-page-practitioner
InstanceOf:     IhrisPage
Title:          "iHRIS Practitioner Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-practitioner)
* extension[display].extension[search][0].valueString = "Surname|Practitioner.name.where(use='official').family"
* extension[display].extension[search][1].valueString = "Given Name(s)|Practitioner.name.where(use='official').given"
* extension[display].extension[search][2].valueString = "Birth Date|Practitioner.birthDate"
* extension[display].extension[search][3].valueString = "Gender|Practitioner.gender|http://hl7.org/fhir/administrative-gender"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Gender|gender|http://hl7.org/fhir/ValueSet/administrative-gender"
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-practitioner/practitioner"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[section][0].extension[title].valueString = "Health Worker"
* extension[section][0].extension[description].valueString = "Primary demographic details"
* extension[section][0].extension[name].valueString = "Practitioner"
* extension[section][0].extension[field][0].valueString = "Practitioner.name"
* extension[section][0].extension[field][1].valueString = "Practitioner.name.given"
* extension[section][0].extension[field][2].valueString = "Practitioner.name.family"
* extension[section][0].extension[field][3].valueString = "Practitioner.birthDate"
* extension[section][0].extension[field][4].valueString = "Practitioner.gender"
* extension[section][0].extension[field][5].valueString = "Practitioner.extension:residence"
* extension[section][1].extension[title].valueString = "Identifiers"
* extension[section][1].extension[description].valueString = "Personal identifiers"
* extension[section][1].extension[name].valueString = "identifiers"
* extension[section][1].extension[field][0].valueString = "Practitioner.identifier"
* extension[section][1].extension[field][1].valueString = "Practitioner.identifier.use"
* extension[section][1].extension[field][2].valueString = "Practitioner.identifier.type"
* extension[section][1].extension[field][3].valueString = "Practitioner.identifier.value"
* extension[section][1].extension[field][4].valueString = "Practitioner.identifier.system"
* extension[section][2].extension[title].valueString = "Contact Details"
* extension[section][2].extension[description].valueString = "Address, email, phone numbers"
* extension[section][2].extension[name].valueString = "contact"
* extension[section][2].extension[field][0].valueString = "Practitioner.address"
* extension[section][2].extension[field][1].valueString = "Practitioner.telecom"
* extension[section][3].extension[title].valueString = "Language Details"
* extension[section][3].extension[description].valueString = "Languages spoken"
* extension[section][3].extension[name].valueString = "language"
* extension[section][3].extension[field][0].valueString = "Practitioner.communication"
* extension[section][4].extension[title].valueString = "Position"
* extension[section][4].extension[description].valueString = "Position the person holds"
* extension[section][4].extension[name].valueString = "position"
* extension[section][4].extension[field][0].valueString = "PractitionerRole.code"
* extension[section][4].extension[resource].extension[resource].valueReference = Reference(StructureDefinition/ihris-practitioner-role)
* extension[section][4].extension[resource].extension[linkfield].valueString = "PractitionerRole.practitioner"
* extension[section][4].extension[resource].extension[column][0].extension[header].valueString = "Job"
* extension[section][4].extension[resource].extension[column][0].extension[field].valueString = "PractitionerRole.code.coding[0]"
* extension[section][4].extension[resource].extension[column][1].extension[header].valueString = "Start Date"
* extension[section][4].extension[resource].extension[column][1].extension[field].valueString = "PractitionerRole.period.start"
* extension[section][4].extension[resource].extension[column][2].extension[header].valueString = "End Date"
* extension[section][4].extension[resource].extension[column][2].extension[field].valueString = "PractitionerRole.period.end"
* extension[section][4].extension[resource].extension[column][3].extension[header].valueString = "Actions"
* extension[section][4].extension[resource].extension[column][3].extension[field].valueString = "_action"
* extension[section][4].extension[resource].extension[action][0].extension[link].valueString = "/resource/add/practitionerrole?PractitionerRole.practitioner.reference=Practitioner/FHIRID"
* extension[section][4].extension[resource].extension[action][0].extension[text].valueString = "Assign Job"
* extension[section][4].extension[resource].extension[action][0].extension[row].valueBoolean = false
* extension[section][4].extension[resource].extension[action][0].extension[emptyDisplay].valueBoolean = true
* extension[section][4].extension[resource].extension[action][0].extension[condition].valueString = "PractitionerRole.period.end.exists()"
* extension[section][4].extension[resource].extension[action][0].extension[class].valueString = "primary"
* extension[section][4].extension[resource].extension[action][1].extension[link].valueString = "/resource/view/practitionerrole/ITEMID"
* extension[section][4].extension[resource].extension[action][1].extension[text].valueString = "View"
* extension[section][4].extension[resource].extension[action][1].extension[row].valueBoolean = true
* extension[section][4].extension[resource].extension[action][1].extension[class].valueString = "primary"
* extension[section][4].extension[resource].extension[action][2].extension[link].valueString = "/questionnaire/ihris-endrole/practitioner?practitionerrole=ITEMID"
* extension[section][4].extension[resource].extension[action][2].extension[text].valueString = "End Job"
* extension[section][4].extension[resource].extension[action][2].extension[row].valueBoolean = true
* extension[section][4].extension[resource].extension[action][2].extension[condition].valueString = "PractitionerRole.period.end.empty()"
* extension[section][4].extension[resource].extension[action][2].extension[class].valueString = "warning"
* extension[section][4].extension[resource].extension[action][3].extension[link].valueString = "/questionnaire/ihris-promotion/practitioner?practitionerrole=ITEMID"
* extension[section][4].extension[resource].extension[action][3].extension[text].valueString = "Enter Promotion"
* extension[section][4].extension[resource].extension[action][3].extension[row].valueBoolean = true
* extension[section][4].extension[resource].extension[action][3].extension[condition].valueString = "PractitionerRole.period.end.empty()"
* extension[section][4].extension[resource].extension[action][3].extension[class].valueString = "accent"
* extension[section][5].extension[title].valueString = "Leave Information"
* extension[section][5].extension[description].valueString = "Leave Details for the Person"
* extension[section][5].extension[name].valueString = "leave"
* extension[section][5].extension[resource].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-leave)
* extension[section][5].extension[resource].extension[searchfield].valueString = "practitioner"
* extension[section][5].extension[resource].extension[linkfield].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[section][5].extension[resource].extension[column][0].extension[header].valueString = "Leave Type"
* extension[section][5].extension[resource].extension[column][0].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='leave-type').valueCoding"
* extension[section][5].extension[resource].extension[column][1].extension[header].valueString = "Days Requested"
* extension[section][5].extension[resource].extension[column][1].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='daysRequested').valueInteger"
* extension[section][5].extension[resource].extension[column][2].extension[header].valueString = "Requested Date"
* extension[section][5].extension[resource].extension[column][2].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='dateRequested').valueDate"
* extension[section][5].extension[resource].extension[column][3].extension[header].valueString = "Start Date"
* extension[section][5].extension[resource].extension[column][3].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='period').valuePeriod.start"
* extension[section][5].extension[resource].extension[column][4].extension[header].valueString = "End Date"
* extension[section][5].extension[resource].extension[column][4].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-leave').extension.where(url='period').valuePeriod.end"
* extension[section][5].extension[resource].extension[column][5].extension[header].valueString = "Actions"
* extension[section][5].extension[resource].extension[column][5].extension[field].valueString = "_action"
* extension[section][5].extension[resource].extension[action][0].extension[link].valueString = "/questionnaire/ihris-leave-ethiopia/practitioner?practitioner=FHIRID"
* extension[section][5].extension[resource].extension[action][0].extension[text].valueString = "Add Leave"
* extension[section][5].extension[resource].extension[action][0].extension[row].valueBoolean = false
* extension[section][5].extension[resource].extension[action][0].extension[emptyDisplay].valueBoolean = true
* extension[section][5].extension[resource].extension[action][0].extension[class].valueString = "primary"
* extension[section][5].extension[resource].extension[action][1].extension[link].valueString = "/resource/view/basicleave/ITEMID"
* extension[section][5].extension[resource].extension[action][1].extension[text].valueString = "View"
* extension[section][5].extension[resource].extension[action][1].extension[row].valueBoolean = true
* extension[section][5].extension[resource].extension[action][1].extension[class].valueString = "primary"
* extension[section][6].extension[title].valueString = "Performance Evaluation Information"
* extension[section][6].extension[description].valueString = "Performance Evaluation for the Person"
* extension[section][6].extension[name].valueString = "performance"
* extension[section][6].extension[resource].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-performance)
* extension[section][6].extension[resource].extension[searchfield].valueString = "practitioner"
* extension[section][6].extension[resource].extension[linkfield].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[section][6].extension[resource].extension[column][0].extension[header].valueString = "Evaluator's Name"
* extension[section][6].extension[resource].extension[column][0].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='evaluator').valueString"
* extension[section][6].extension[resource].extension[column][1].extension[header].valueString = "Score"
* extension[section][6].extension[resource].extension[column][1].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='score').valueCoding.display"
* extension[section][6].extension[resource].extension[column][2].extension[header].valueString = "Start Date"
* extension[section][6].extension[resource].extension[column][2].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='period').valuePeriod.start"
* extension[section][6].extension[resource].extension[column][3].extension[header].valueString = "End Date"
* extension[section][6].extension[resource].extension[column][3].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='period').valuePeriod.end"
* extension[section][6].extension[resource].extension[column][4].extension[header].valueString = "Actions"
* extension[section][6].extension[resource].extension[column][4].extension[field].valueString = "_action"
* extension[section][6].extension[resource].extension[action][0].extension[link].valueString = "/questionnaire/ihris-performance/practitioner?practitioner=FHIRID"
* extension[section][6].extension[resource].extension[action][0].extension[text].valueString = "Add Perfromamce Evaluation"
* extension[section][6].extension[resource].extension[action][0].extension[row].valueBoolean = false
* extension[section][6].extension[resource].extension[action][0].extension[emptyDisplay].valueBoolean = true
* extension[section][6].extension[resource].extension[action][0].extension[class].valueString = "primary"
* extension[section][6].extension[resource].extension[action][1].extension[link].valueString = "/resource/view/performance/ITEMID"
* extension[section][6].extension[resource].extension[action][1].extension[text].valueString = "View"
* extension[section][6].extension[resource].extension[action][1].extension[row].valueBoolean = true
* extension[section][6].extension[resource].extension[action][1].extension[class].valueString = "primary"

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
* extension[display].extension[filter][0].valueString = "Job|code|http://ihris.org/fhir/ValueSet/ihris-job"
* extension[section][0].extension[title].valueString = "Position"
* extension[section][0].extension[description].valueString = "Position details"
* extension[section][0].extension[name].valueString = "Position"
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

Instance:       ihris-page-leave-type
InstanceOf:     IhrisPage
Title:          "iHRIS Leave Type CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-leave-type-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[section][0].extension[title].valueString = "Leave Type"
* extension[section][0].extension[description].valueString = "Leave Type"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"


