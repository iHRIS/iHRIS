Extension:      IhrisBasicName
Id:             ihris-basic-name
Title:          "iHRIS Basic Name"
Description:    "iHRIS name field for basic resources."
* ^context[0].type = #element
* ^context[0].expression = "Basic"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Name"
