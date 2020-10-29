Alias: $QuestionnaireConstraint = http://hl7.org/fhir/StructureDefinition/questionnaire-constraint
Profile:          IhrisQuestionnaire
Parent:           Questionnaire
Id:               ihris-questionnaire
Title:            "iHRIS Questionnaire"
Description:      "iHRIS Profile of the Questionnaire resource for data entry and validation."
* item.extension contains
    $QuestionnaireConstraint named constraint 0..1 MS
