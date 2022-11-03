Profile:        IhrisPractitionerBasic
Parent:         Basic
Id:             ihris-practitioner-basic
Title:          "iHRIS Practitioner Basic"
Description:    "iHRIS Profile of the Basic resource to refer to a Practitioner."
* code = IhrisResourceCodeSystem#practitioner-link
* extension contains
      IhrisPractitionerReference named practitioner 1..1 MS

Extension:      IhrisPractitionerReference
Id:             ihris-practitioner-reference
Title:          "iHRIS Practitioner Reference"
Description:    "iHRIS Practitioner Reference to link Basic resource to a Practitioner."
* ^context[0].type = #element
* ^context[0].expression = "Basic"
* value[x] only Reference 
* valueReference only Reference(IhrisPractitioner) 
* valueReference ^label = "Practitioner"
