Profile:        IhrisPage
Parent:         Basic
Id:             ihris-page
Title:          "iHRIS Page"
Description:    "iHRIS Profile of the Basic resource to manage pages."
* code = IhrisResourceCodeSystem#page
* extension contains
      IhrisPageDisplay named display 1..1 MS

Extension:      IhrisPageDisplay
Id:             ihris-page-display
Title:          "iHRIS Page Display"
Description:    "iHRIS Page Display details."
* ^context.type = #element
* ^context.expression = IhrisPage
* extension contains
      resource 1..1 MS and
      search 1..* MS and
      filter 1..* MS and
      order 0..* MS 
* extension[resource].value[x] only Reference
* extension[resource].valueReference only Reference(StructureDefinition)
* extension[search].value[x] only string
* extension[search].valueString MS
* extension[filter].value[x] only string
* extension[filter].valueString MS
* extension[order].value[x] only string
* extension[order].valueString MS

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
* extension[display].extension[order][0].valueString = "Practitioner.name"
* extension[display].extension[order][1].valueString = "Practitioner.name.given"
* extension[display].extension[order][2].valueString = "Practitioner.name.family"
* extension[display].extension[order][3].valueString = "Practitioner.birthDate"
* extension[display].extension[order][4].valueString = "Practitioner.gender"
* extension[display].extension[order][5].valueString = "Practitioner.extension:residence"
