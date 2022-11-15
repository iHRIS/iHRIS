Profile:        IhrisTrainingBasic
Parent:         Basic
Id:             ihris-training-basic
Title:          "iHRIS Training Basic"
Description:    "iHRIS Profile of the Basic resource to refer to a Practitioner."
* code = IhrisResourceCodeSystem#practitioner-link
* extension contains
      IhrisTrainingReference named training-basic 1..1 MS

Extension:      IhrisTrainingReference
Id:             ihris-training-reference
Title:          "iHRIS Training Reference"
Description:    "iHRIS Training Reference to link Basic resource to a Training."
* ^context[0].type = #element
* ^context[0].expression = "Basic"
* value[x] only Reference 
* valueReference only Reference(IhrisBasicTraining) 
* valueReference 1..1 MS
* valueReference ^label = "Training"
