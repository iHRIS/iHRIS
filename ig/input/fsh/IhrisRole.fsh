Profile:        IhrisRole
Parent:         Basic
Id:             ihris-role
Title:          "iHRIS Role"
Description:    "iHRIS Profile of the Basic resource to manage roles."
* code = IhrisResourceCodeSystem#role
* extension contains
      IhrisBasicName named name 1..1 MS and
      IhrisRolePrimary named primary 1..1 and
      IhrisAssignRole named role 0..* and
      IhrisTask named task 0..*
* extension[name].valueString 1..1 MS

Invariant:      ihris-task-instance-constraint
Description:    "Only one of extension[instance].valueCode or extension[constraint].valueReference SHALL be present."
Expression:     "extension(url = instance).exists() xor extension(url = constraint).exists()"
Severity:       #error
XPath:          "exists(f:extension(url = instance)) != exists(f:extension(url = constraint))"

Extension:      IhrisTask
Id:             ihris-task
Title:          "iHRIS Task"
Description:    "iHRIS Task to be assigned to task groups or roles."
* ^context.type = #element
* ^context.expression = "IhrisRole"
* obeys ihris-task-instance-constraint
* extension contains
      permission 1..1 MS and
      resource 0..1 MS and
      instance 0..1 MS and
      field 0..1 MS and
      constraint 0..1 MS
* extension[permission].value[x] only code
* extension[permission].valueCode from IhrisTaskPermissionValueSet (required)
* extension[resource].value[x] only code
* extension[resource].valueCode from IhrisTaskResourceValueSet (extensible)
* extension[instance].value[x] only id
* extension[field].value[x] only string
* extension[constraint].value[x] only string

Extension:      IhrisRolePrimary
Id:             ihris-role-primary
Title:          "iHRIS Role Primary"
Description:    "iHRIS flag for roles to indicate a primary role for assignment to users."
* ^context[1].type = #element
* ^context[1].expression = "IhrisRole"
* value[x] only boolean
* valueBoolean 1..1 

Extension:      IhrisAssignRole
Id:             ihris-assign-role
Title:          "iHRIS Assign Role"
Description:    "iHRIS Assign Role to a user or other role."
* ^context[0].type = #element
* ^context[0].expression = "Person"
* ^context[1].type = #element
* ^context[1].expression = "IhrisRole"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference ^label = "Role"
* valueReference only Reference(IhrisRole)
* valueReference.reference ^label = "Role"

CodeSystem:     IhrisTaskPermissionCodeSystem
Id:             ihris-task-permission
Title:          "Code system for task permissions."
* ^date = "2021-03-26T09:25:04.362Z"
* ^version = "0.3.0"
* #*      "All"     "Can do any task."
* #read   "Read"    "Can read the given resource."
* #write  "Write"   "Can write the given resource."
* #delete "Delete"  "Can delete the given resource."
* #filter "Filter"  "Search filter constraints."
* #special "Special"  "Special non-resource permissions."

ValueSet:       IhrisTaskPermissionValueSet
Id:             ihris-task-permission
Title:          "Code system for task permissions."
* ^date = "2021-03-26T09:25:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisTaskPermissionCodeSystem

CodeSystem:     IhrisTaskResourceCodeSystem
Id:             ihris-task-resource
Title:          "Code system for task permissions."
* ^date = "2021-03-26T09:25:04.362Z"
* ^version = "0.3.0"
* #*                    "All"
* #Practitioner         "Practitioner"
* #StructureDefinition  "StructureDefinition"
* #ValueSet             "ValueSet"
* #CodeSystem           "CodeSystem"
* #Basic                "Basic"
* #DocumentReference    "DocumentReference"
* #Questionnaire        "Questionnaire"
* #QuestionnaireResponse "QuestionnaireResponse"
* #PractitionerRole     "PractitionerRole"
* #Location             "Location"
* #Person               "Person"

ValueSet:       IhrisTaskResourceValueSet
Id:             ihris-task-resource
Title:          "Code system for task permissions."
* ^date = "2021-03-26T09:25:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisTaskResourceCodeSystem

Instance:       ihris-role-open
InstanceOf:     IhrisRole
Title:          "iHRIS Open Role"
Usage:          #example
* code = IhrisResourceCodeSystem#role
* extension[name].valueString = "Open Role"
* extension[primary].valueBoolean = true
* extension[task][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[task][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#StructureDefinition
* extension[task][1].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[task][1].extension[resource].valueCode = IhrisTaskResourceCodeSystem#CodeSystem
* extension[task][2].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[task][2].extension[resource].valueCode = IhrisTaskResourceCodeSystem#ValueSet
* extension[task][3].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[task][3].extension[resource].valueCode = IhrisTaskResourceCodeSystem#DocumentReference
* extension[task][3].extension[constraint].valueString = "category.exists(coding.exists(code = 'open'))"

Instance:       ihris-role-admin
InstanceOf:     IhrisRole
Title:          "iHRIS Admin Role"
Usage:          #example
* code = IhrisResourceCodeSystem#role
* extension[name].valueString = "Admin Role"
* extension[primary].valueBoolean = true
* extension[task][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#*
* extension[task][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#*
* extension[role][0].valueReference = Reference(Basic/ihris-role-open)
