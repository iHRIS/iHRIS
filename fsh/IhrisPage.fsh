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
* ^context.expression = IhrisPage
* extension contains
      resource 1..1 MS and
      search 1..* MS and
      filter 1..* MS
* extension[resource].value[x] only Reference
* extension[resource].valueReference only Reference(StructureDefinition)
* extension[resource].valueReference 1..1 MS
* extension[resource].valueReference ^label = "Primary Resource"
* extension[search].value[x] only string
* extension[search].valueString 1..1 MS
* extension[search].valueString ^label = "Search Headers"
* extension[filter].value[x] only string
* extension[filter].valueString 1..1 MS
* extension[filter].valueString ^label = "Search Filters"

Extension:      IhrisPageSection
Id:             ihris-page-section
Title:          "iHRIS Page Section"
Description:    "iHRIS Page Section information."
* ^context.type = #element
* ^context.expression = IhrisPage
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
* extension[field].valueString ^label = "Name"
* extension[resource].extension contains
      resource 1..1 MS and
      linkfield 1..1 MS and
      searchfield 0..1 MS and
      column 1..* MS
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


Extension:      IhrisPageSectionResource
Id:             ihris-page-section-resource
Title:          "iHRIS Page Section Resource"
Description:    "iHRIS Page Section Resource information."
* ^context.type = #element
* ^context.expression = IhrisPageSection

Instance:       ihris-page-practitioner
InstanceOf:     IhrisPage
Title:          "iHRIS Practitioner Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-practitioner)
* extension[display].extension[search][0].valueString = "Surname|name.where(use='official').family"
* extension[display].extension[search][1].valueString = "Given Name(s)|name.where(use='official').given"
* extension[display].extension[search][2].valueString = "Birth Date|birthDate"
* extension[display].extension[search][3].valueString = "Gender|gender"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Gender|gender"
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
