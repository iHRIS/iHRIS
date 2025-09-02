CodeSystem:       DependentRelationshipCodeSystem
Id:               dependent-relationship-codesystem
Title:            "Dependent Relationship Code System"
* ^date = "2023-11-11T07:42:00.000Z"
* ^version = "0.1.0"
* #nephew "Nephew"
* #father "Father"
* #spouse "Spouse"
* #uncle "Uncle"
* #niece "Niece"
* #stepdaughter "Stepdaughter"
* #sister "Sister"
* #mother "Mother"
* #daughter "Daughter"
* #brother "Brother"
* #stepson "Stepson"
* #son "Son"
* #grandchild "Grandchild"
* #aunt "Aunt"

ValueSet:         DependentRelationshipValueSet
Id:               dependent-relationship-valueset
Title:            "Dependent Relationship ValueSet"
* ^date = "2023-11-11T07:42:00.000Z"
* ^version = "0.1.0"
* codes from system DependentRelationshipCodeSystem

CodeSystem:       DependentStatusCodeSystem
Id:               dependent-status-codesystem
Title:            "Dependent Status Code System"
* ^date = "2023-11-11T07:42:00.000Z"
* ^version = "0.1.0"
* #dependent_status|active "Active"
* #dependent_status|inactive "Inactive"

ValueSet:         DependentStatusValueSet
Id:               dependent-status-valueset
Title:            "Dependent Status ValueSet"
* ^date = "2023-11-11T07:42:00.000Z"
* ^version = "0.1.0"
* codes from system DependentStatusCodeSystem

ValueSet:         MWGenderValueSet
Id:               mw-gender-valueset
Title:            "MW Gender ValueSet"
* ^date = "2023-03-28T05:55:04.362Z"
* ^version = "0.1.0"
* include http://hl7.org/fhir/administrative-gender#male
* include http://hl7.org/fhir/administrative-gender#female

CodeSystem:      IhrisPerformanceScore
Id:              ihris-performance-score
Title:           "Performance Score"
* ^version = "0.2.0"
* #1 "Improvement Required" "Improvement Required"
* #2 "Development Required" "Development Required"
* #3 "Meets Expectations" "Meets Expectations"
* #4 "Exceeds Expectations" "Exceeds Expectations"
* #5 "Far Exceeds Expectations" "Far Exceeds Expectations"

ValueSet:         IhrisPerformanceScoreValueSet
Id:               ihris-performance-score-valueset
Title:            "iHRIS Performance Score ValueSet"
* ^version = "0.2.0"
* codes from system IhrisPerformanceScore

CodeSystem:      IhrisDisciplinaryActionType
Id:              ihris-discipline-action-type-codesystem
Title:           "Disciplinary Action Type"
* ^date = "2020-11-10T08:41:04.362Z"
* ^version = "0.3.0"
* #judicial "Judicial"
* #administrative "Administrative"
* #demotion "Demotion"

ValueSet:         IhrisDisciplinaryActionTypeValueSet
Id:               ihris-discipline-action-type-valueset
Title:            "iHRIS Disciplinary Action Type ValueSet"
* ^date = "2020-11-10T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisDisciplinaryActionType