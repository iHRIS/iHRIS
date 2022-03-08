Alias: $QuestionnaireConstraint = http://hl7.org/fhir/StructureDefinition/questionnaire-constraint
Profile:          IhrisQuestionnaire
Parent:           Questionnaire
Id:               ihris-questionnaire
Title:            "NHWR Questionnaire"
Description:      "NHWR Profile of the Questionnaire resource for data entry and validation."
* item.extension contains
    $QuestionnaireConstraint named constraint 0..* MS
* item.item.extension contains
    $QuestionnaireConstraint named constraint 0..* MS
* item.item.item.extension contains
    $QuestionnaireConstraint named constraint 0..* MS
* item.item.item.item.extension contains
    $QuestionnaireConstraint named constraint 0..* MS
* item.item.item.item.item.extension contains
    $QuestionnaireConstraint named constraint 0..* MS
