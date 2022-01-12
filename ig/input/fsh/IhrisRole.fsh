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
      IhrisAssignTask named task 0..*
* extension[name].valueString 1..1 MS
* extension[task].value[x] only Reference(Basic)
* extension[task].valueReference 1..1 MS
* extension[task].valueReference ^label = "Task"

Profile:        IhrisTask
Parent:         Basic
Id:             ihris-task
Title:          "iHRIS Task"
Description:    "iHRIS Profile of the Basic resource to manage tasks."
* code = IhrisResourceCodeSystem#task
* extension contains
      IhrisBasicName named name 1..1 MS and
      TaskAttributes named attributes 0..1 and
      CompositeTask named compositeTask 0..*
* extension[name].valueString 1..1 MS
* extension[compositeTask].value[x] only Reference(Basic)
* extension[compositeTask].valueReference 1..1 MS
* extension[compositeTask].valueReference ^label = "Composite Task"

Invariant:      ihris-task-instance-constraint
Description:    "Only one of extension[instance].valueCode or extension[constraint].valueReference SHALL be present."
Expression:     "extension(url = instance).exists() xor extension(url = constraint).exists()"
Severity:       #error
XPath:          "exists(f:extension(url = instance)) != exists(f:extension(url = constraint))"

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

Extension:      IhrisAssignTask
Id:             ihris-assign-task
Title:          "iHRIS Assign Task"
Description:    "iHRIS Assign Task to a user or other task."
* ^context[0].type = #element
* ^context[0].expression = "IhrisRole"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference ^label = "Task"
* valueReference only Reference(IhrisTask)
* valueReference.reference ^label = "Task"

Extension:      CompositeTask
Id:             composite-task
Title:          "Composite Task"
Description:    "Tasks Inheritance"
* ^context[0].type = #element
* ^context[0].expression = "IhrisTask"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference ^label = "Task"
* valueReference only Reference(IhrisTask)
* valueReference.reference ^label = "Task"

Extension:      TaskAttributes
Id:             task-attributes
Title:          "Task Attributes"
Description:    "Task attributes."
* ^context.type = #element
* ^context.expression = "IhrisTask"
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
* #Organization         "Organization"
* #Questionnaire        "Questionnaire"
* #QuestionnaireResponse "QuestionnaireResponse"
* #PractitionerRole     "PractitionerRole"
* #Location             "Location"
* #Person               "Person"
* #navigation           "Navigation"

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
* extension[task][0].valueReference = Reference(Basic/ihris-task-read-structure-definition)
* extension[task][1].valueReference = Reference(Basic/ihris-task-read-code-system)
* extension[task][2].valueReference = Reference(Basic/ihris-task-read-value-set)
* extension[task][3].valueReference = Reference(Basic/ihris-task-read-document-reference)

Instance:       ihris-role-admin
InstanceOf:     IhrisRole
Title:          "iHRIS Admin Role"
Usage:          #example
* code = IhrisResourceCodeSystem#role
* extension[name].valueString = "Admin Role"
* extension[primary].valueBoolean = true
* extension[task][0].valueReference = Reference(Basic/ihris-task-all-permissions-to-everything)
* extension[role][0].valueReference = Reference(Basic/ihris-role-open)

Instance:       ihris-task-all-permissions-to-everything
InstanceOf:     IhrisTask
Title:          "iHRIS Task With All Permissions To Everything"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "all-permissions-to-everything"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#*
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#*

Instance:       ihris-task-read-structure-definition
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read StructureDefinition Resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-structure-definition"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#StructureDefinition

Instance:       ihris-task-read-basic-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Basic resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-basic-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Basic

Instance:       ihris-task-read-person-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Person resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-person-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Person

Instance:       ihris-task-read-practitioner-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Practitioner resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-practitioner-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Practitioner

Instance:       ihris-task-read-practitioner-role-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read PractitionerRole resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-practitioner-role-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#PractitionerRole

Instance:       ihris-task-read-location-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Location resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-location-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Location

Instance:       ihris-task-read-organization-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Organization resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-organization-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Organization

Instance:       ihris-task-read-questionnaire-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Questionnaire resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-questionnaire-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Questionnaire

Instance:       ihris-task-read-questionnaire-response-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Questionnaire Response resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-questionnaire-response-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#QuestionnaireResponse

Instance:       ihris-task-read-code-system
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read CodeSystem resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-code-system"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#CodeSystem

Instance:       ihris-task-read-value-set
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Valueset Resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-value-set"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#ValueSet

Instance:       ihris-task-read-document-reference
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read DocumentReference"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-document-reference"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#DocumentReference
* extension[attributes][0].extension[constraint].valueString = "category.exists(coding.exists(code = 'open'))"

Instance:       ihris-task-write-structure-definition
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write StructureDefinition Resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-structure-definition"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#StructureDefinition
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-structure-definition)

Instance:       ihris-task-write-basic-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Basic resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-basic-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Basic
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-basic-resource)

Instance:       ihris-task-write-person-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Person resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-person-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Person
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-person-resource)

Instance:       ihris-task-write-practitioner-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Practitioner resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-practitioner-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Practitioner
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-practitioner-resource)

Instance:       ihris-task-write-practitioner-role-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write PractitionerRole resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-practitioner-role-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#PractitionerRole
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-practitioner-role-resource)

Instance:       ihris-task-write-location-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Location resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-location-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Location
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-location-resource)

Instance:       ihris-task-write-organization-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Organization resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-organization-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Organization
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-organization-resource)

Instance:       ihris-task-write-questionnaire-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Questionnaire resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-questionnaire-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Questionnaire
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-questionnaire-resource)

Instance:       ihris-task-write-questionnaire-response-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Questionnaire Response resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-questionnaire-response-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#QuestionnaireResponse
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-questionnaire-response-resource)

Instance:       ihris-task-write-code-system
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write CodeSystem resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-code-system"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#CodeSystem
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-code-system)

Instance:       ihris-task-write-value-set
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Valueset Resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-value-set"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#ValueSet
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-value-set)

Instance:       ihris-task-write-document-reference
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write DocumentReference"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-document-reference"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#DocumentReference
* extension[attributes][0].extension[constraint].valueString = "category.exists(coding.exists(code = 'open'))"
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-document-reference)