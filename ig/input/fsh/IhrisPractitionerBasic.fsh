Profile:        IhrisPractitionerBasic
Parent:         Basic
Id:             ihris-practitioner-basic
Title:          "NHWR Practitioner Basic"
Description:    "NHWR Profile of the Basic resource to refer to a Practitioner."
* code = IhrisResourceCodeSystem#practitioner-link
* extension contains
      IhrisPractitionerReference named practitioner 1..1 MS

Extension:      IhrisPractitionerReference
Id:             ihris-practitioner-reference
Title:          "NHWR Practitioner Reference"
Description:    "NHWR Practitioner Reference to link Basic resource to a Practitioner."
* ^context[0].type = #element
* ^context[0].expression = "Basic"
* value[x] only Reference 
* valueReference only Reference(IhrisPractitioner) 
* valueReference ^label = "Heallth Worker"
