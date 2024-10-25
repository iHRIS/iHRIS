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
* extension[role].value[x] only Reference(IhrisRole)
* extension[role].valueReference 1..1 MS
* extension[role].valueReference ^label = "Role"
* extension[task].value[x] only Reference(IhrisTask)
* extension[task].valueReference 1..1 MS
* extension[task].valueReference ^label = "Task"
* extension[primary].value[x] only boolean
* extension[primary].valueBoolean 1..1 MS

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
* extension[attributes].extension[permission] ^label = "Permission"
* extension[attributes].extension[permission].valueCode 1..1 MS
* extension[attributes].extension[permission].valueCode ^label = "Permission"
* extension[attributes].extension[resource] ^label = "Resource"
* extension[attributes].extension[resource].valueCode 0..1 MS
* extension[attributes].extension[resource].valueCode ^label = "Resource"
* extension[attributes].extension[instance] ^label = "Instance"
* extension[attributes].extension[instance].valueId 0..1 MS
* extension[attributes].extension[instance].valueId ^label = "Instance"
* extension[attributes].extension[field] ^label = "Field"
* extension[attributes].extension[field].valueString 0..1 MS
* extension[attributes].extension[field].valueString ^label = "Field"
* extension[attributes].extension[constraint] ^label = "Constraint"
* extension[attributes].extension[constraint].valueString 0..1 MS
* extension[attributes].extension[constraint].valueString ^label = "Constraint"
* extension[compositeTask].value[x] only Reference(IhrisTask)
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
* ^date = "2024-03-26T09:25:04.362Z"
* ^version = "0.4.0"
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
* #AuditEvent           "AuditEvent"
* #navigation           "Page Navigation"
* #section              "Page Section"
* #special              "Special"

ValueSet:       IhrisTaskResourceValueSet
Id:             ihris-task-resource
Title:          "Code system for task permissions."
* ^date = "2024-03-26T09:25:04.362Z"
* ^version = "0.4.0"
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


Instance:       ihris-task-navigation-profile
InstanceOf:     IhrisTask
Usage:          #example
Title:          "iHRIS Task To Navigate to Profile"
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "navigation-profile"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#special
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#navigation
* extension[attributes][0].extension[instance].valueId = "profile"

Instance:      ihris-task-read-ihris-page-practitioner
InstanceOf:    IhrisTask
Usage:         #example
Title:         "iHRIS Task To Read Practitioner Page"
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-ihris-page-practitioner"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Basic
* extension[attributes][0].extension[instance].valueId = "ihris-page-practitioner"
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-write-value-set)
* extension[compositeTask][1].valueReference = Reference(Basic/ihris-task-write-practitioner-resource)
* extension[compositeTask][2].valueReference = Reference(Basic/ihris-task-write-location-resource)

Instance:       ihris-task-read-ihris-page-practitioner-role
InstanceOf:     IhrisTask
Usage:          #example
Title:          "iHRIS Task To Read PractitionerRole Page"
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-ihris-page-practitioner-role"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Basic
* extension[attributes][0].extension[instance].valueId = "ihris-page-practitionerrole"
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-write-practitioner-role-resource)
* extension[compositeTask][1].valueReference = Reference(Basic/ihris-task-write-practitioner-resource)
* extension[compositeTask][2].valueReference = Reference(Basic/ihris-task-write-location-resource)

Instance:       ihris-task-read-questionnaire-leave
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read Questionnaire ihris-leave"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-questionnaire"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Questionnaire
* extension[attributes][0].extension[instance].valueId = "ihris-leave"
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-questionnaire-resource)

Instance:       ihris-task-write-questionnaire-leave
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Questionnaire ihris-leave"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-questionnaire"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Questionnaire
* extension[attributes][0].extension[instance].valueId = "ihris-leave"
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-questionnaire-resource)

Instance:       ihris-task-write-questionnaire-change-password
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Questionnaire ihris-password"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-questionnaire"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#Questionnaire
* extension[attributes][0].extension[instance].valueId = "ihris-change-password"

Instance:        ihris-task-navigation-leave
InstanceOf:      IhrisTask
Usage:           #example
Title:           "iHRIS Task To Navigate to Leave"
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "navigation-leave"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#special
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#navigation
* extension[attributes][0].extension[instance].valueId = "leaveRequest"

Instance:        ihris-task-navigation-evaluation
InstanceOf:      IhrisTask
Usage:           #example
Title:           "iHRIS Task To Navigate to evaluation"
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "navigation-evaluation"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#special
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#navigation
* extension[attributes][0].extension[instance].valueId = "evaluation"

Instance:        ihris-task-navigation-password
InstanceOf:      IhrisTask
Usage:           #example
Title:           "iHRIS Task To Navigate to password"
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "navigation-password"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#special
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#navigation
* extension[attributes][0].extension[instance].valueId = "password"

Instance:      ihris-role-self
InstanceOf:    IhrisRole
Usage:         #example
Title:         "iHRIS Self Service Role"
* code = IhrisResourceCodeSystem#role
* extension[name].valueString = "Self Service Role"
* extension[primary].valueBoolean = false
* extension[task][0].valueReference = Reference(Basic/ihris-task-read-questionnaire-resource)
* extension[task][1].valueReference = Reference(Basic/ihris-task-navigation-profile)
* extension[task][2].valueReference = Reference(Basic/ihris-task-navigation-leave)
// * extension[task][3].valueReference = Reference(Basic/ihris-task-navigation-evaluation)
* extension[task][3].valueReference = Reference(Basic/ihris-task-navigation-password)
* extension[task][4].valueReference = Reference(Basic/ihris-task-read-ihris-page-practitioner)
* extension[task][5].valueReference = Reference(Basic/ihris-task-read-ihris-page-practitioner-role)
* extension[task][6].valueReference = Reference(Basic/ihris-task-read-code-system)
* extension[task][7].valueReference = Reference(Basic/ihris-task-read-value-set)
* extension[task][8].valueReference = Reference(Basic/ihris-task-read-location-resource)
* extension[task][9].valueReference = Reference(Basic/ihris-task-read-practitioner-resource)
* extension[task][10].valueReference = Reference(Basic/ihris-task-read-practitioner-role-resource)
* extension[task][11].valueReference = Reference(Basic/ihris-task-write-practitioner-resource)
* extension[task][12].valueReference = Reference(Basic/ihris-task-read-questionnaire-response-resource)
* extension[task][13].valueReference = Reference(Basic/ihris-task-read-basic-resource)
* extension[task][14].valueReference = Reference(Basic/ihris-task-write-questionnaire-response-resource)
* extension[task][15].valueReference = Reference(Basic/ihris-task-write-questionnaire-resource)
* extension[task][16].valueReference = Reference(Basic/ihris-task-read-questionnaire-leave)
* extension[task][17].valueReference = Reference(Basic/ihris-task-write-questionnaire-leave)
* extension[task][18].valueReference = Reference(Basic/ihris-task-write-basic-resource)
* extension[task][19].valueReference = Reference(Basic/ihris-task-write-questionnaire-change-password)
* extension[task][20].valueReference = Reference(Basic/ihris-task-write-person-resource)

// Instance: ihris-role-admin
// InstanceOf: Basic
// Usage: #example
// * meta.profile = "http://ihris.org/fhir/StructureDefinition/ihris-role"
// * code = http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem#role
// * extension[0].url = "http://ihris.org/fhir/StructureDefinition/ihris-basic-name"
// * extension[=].valueString = "Admin Role"
// * extension[+].url = "http://ihris.org/fhir/StructureDefinition/ihris-role-primary"
// * extension[=].valueBoolean = true
// * extension[+].extension[0].url = "permission"
// * extension[=].extension[=].valueCode = #*
// * extension[=].extension[+].url = "resource"
// * extension[=].extension[=].valueCode = #*
// * extension[=].url = "http://ihris.org/fhir/StructureDefinition/ihris-task"
// * extension[+].url = "http://ihris.org/fhir/StructureDefinition/ihris-assign-role"
// * extension[=].valueReference = Reference(Basic/ihris-role-open)

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

Instance:       ihris-task-write-auditevent-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write AuditEvent resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "write-auditevent-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#AuditEvent
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-auditevent-resource)

Instance:       ihris-task-read-auditevent-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Read AuditEvent resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-auditevent-resource"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#AuditEvent

Instance:       ihris-task-write-valueset-resource
InstanceOf:     IhrisTask
Title:          "iHRIS Task To Write Valueset Resource"
Usage:          #example
* code = IhrisResourceCodeSystem#task
* extension[name].valueString = "read-value-set"
* extension[attributes][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#write
* extension[attributes][0].extension[resource].valueCode = IhrisTaskResourceCodeSystem#ValueSet
* extension[compositeTask][0].valueReference = Reference(Basic/ihris-task-read-value-set)

Instance:         ihris-page-role
InstanceOf:       IhrisPage
Title:            "Roles" 
Usage:            #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-role)
* extension[display].extension[link][0].extension[field].valueString = "Basic.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "secondary"
* extension[display].extension[link][0].extension[url].valueUrl = "/questionnaire/ihris-role/role/FIELD"
* extension[display].extension[link][1].extension[field].valueString = ""
* extension[display].extension[link][1].extension[text].valueString = "View Other Roles"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/resource/search/role"
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-role/role"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[display].extension[search][0].valueString = "Id|Basic.id"
* extension[display].extension[search][1].valueString = "Name|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-basic-name').valueString"
* extension[display].extension[search][2].valueString = "Role Reference|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-assign-role').valueReference.reference"
* extension[display].extension[filter][0].valueString = "Role|Basic.extension:id:contains"
* extension[section][0].extension[title].valueString = "Role"
* extension[section][0].extension[description].valueString = "System User Role details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:name.value[x]:valueString"
* extension[section][0].extension[field][1].valueString = "Basic.extension:role.value[x]:valueReference"
* extension[section][0].extension[field][2].valueString = "Basic.extension:task.value[x]:valueReference"
* extension[section][0].extension[field][3].valueString = "Basic.extension:primary.value[x]:valueBoolean"


Instance:         IhrisRole
InstanceOf:       IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS AddRole Workflow"
* description = "iHRIS workflow to record a Role"
* id = "ihris-role"
* url = "http://ihris.org/fhir/Questionnaire/ihris-role"
* name = "ihris-role"
* status = #active
* date = 2022-02-20
* purpose = "Workflow page for recording a user role information."

* item[0].linkId = "Basic"
* item[0].text = "Add Role"
* item[0].type = #group
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-role"

* item[0].item[0].linkId = "Basic.id"
* item[0].item[0].text = "Role Details"
* item[0].item[0].type = #group
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-role#Basic.id"

* item[0].item[0].item[0].linkId = "Basic.extension[0]"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-role#Basic.extension:name.value[x]:valueString"
* item[0].item[0].item[0].text = "Role Name"
* item[0].item[0].item[0].type = #string
* item[0].item[0].item[0].required = false
* item[0].item[0].item[0].repeats = false

* item[0].item[0].item[1].linkId = "Basic.extension[1]#preload"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-role#Basic.extension:task.value[x]:valueReference"
* item[0].item[0].item[1].text = "Tasks"
* item[0].item[0].item[1].type = #reference
* item[0].item[0].item[1].required = false
* item[0].item[0].item[1].repeats = true

* item[0].item[0].item[2].linkId = "Basic.extension[2]#preload"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-role#Basic.extension:role.value[x]:valueReference"
* item[0].item[0].item[2].text = "Roles"
* item[0].item[0].item[2].type = #reference
* item[0].item[0].item[2].required = false
* item[0].item[0].item[2].repeats = true

* item[0].item[0].item[3].linkId = "Basic.extension[3]"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-role#Basic.extension:primary.value[x]:valueBoolean"
* item[0].item[0].item[3].text = "Is Role Primary"
* item[0].item[0].item[3].type = #boolean
* item[0].item[0].item[3].required = true
* item[0].item[0].item[3].repeats = false

Instance:         ihris-page-task
InstanceOf:       IhrisPage
Title:            "iHRIS Tasks" 
Usage:            #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-task)
* extension[display].extension[link][0].extension[field].valueString = "Basic.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "secondary"
* extension[display].extension[link][0].extension[url].valueUrl = "/questionnaire/ihris-task/task/FIELD"
* extension[display].extension[link][1].extension[field].valueString = ""
* extension[display].extension[link][1].extension[text].valueString = "View Other Tasks"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/resource/search/task"
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-task/task"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[display].extension[search][0].valueString = "Id|Basic.id"
* extension[display].extension[search][1].valueString = "Name|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-basic-name').valueString"
* extension[display].extension[filter][0].valueString = "Task|Basic.extension:id:contains"
* extension[section][0].extension[title].valueString = "Task"
* extension[section][0].extension[description].valueString = "iHRIS User task details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:name.value[x]:valueString"
* extension[section][0].extension[field][1].valueString = "Basic.extension:attributes"
* extension[section][0].extension[field][2].valueString = "Basic.extension:compositeTask"


Instance:         IhrisTask
InstanceOf:       IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Add Task Workflow"
* description = "iHRIS workflow to record a Role"
* id = "ihris-task"
* url = "http://ihris.org/fhir/Questionnaire/ihris-task"
* name = "ihris-task"
* status = #active
* date = 2022-02-20
* purpose = "Workflow page for user role tasks information."

* item[0].linkId = "Basic"
* item[0].text = "Add Task"
* item[0].type = #group
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task"

* item[0].item[0].linkId = "Basic.extension[0]"
* item[0].item[0].text = "Task Attributes"
* item[0].item[0].type = #group
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:attributes"

* item[0].item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:attributes.extension:permission.value[x]:valueCode"
* item[0].item[0].item[0].text = "Permission"
* item[0].item[0].item[0].type = #choice
* item[0].item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-task-permission"
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false

* item[0].item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:attributes.extension:resource.value[x]:valueCode"
* item[0].item[0].item[1].text = "Resource"
* item[0].item[0].item[1].type = #choice
* item[0].item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-task-resource"
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:attributes.extension:instance.value[x]:valueId"
* item[0].item[0].item[2].text = "Instance"
* item[0].item[0].item[2].type = #string
* item[0].item[0].item[2].required = false
* item[0].item[0].item[2].repeats = false

* item[0].item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:attributes.extension:constraint.value[x]:valueString"
* item[0].item[0].item[3].text = "Constraint"
* item[0].item[0].item[3].type = #string
* item[0].item[0].item[3].required = false
* item[0].item[0].item[3].repeats = false

* item[0].item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[0].item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:attributes.extension:field.value[x]:valueString"
* item[0].item[0].item[4].text = "Field"
* item[0].item[0].item[4].type = #string
* item[0].item[0].item[4].required = false
* item[0].item[0].item[4].repeats = false

* item[0].item[1].linkId = "CompositeTasks"
* item[0].item[1].text = "Composite/Linked Tasks"
* item[0].item[1].type = #group
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:compositeTask"

* item[0].item[1].item[0].linkId = "linkedtasks" 
* item[0].item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-task#Basic.extension:compositeTask.value[x]:valueReference"
* item[0].item[1].item[0].text = "Composite/Linked Tasks"
* item[0].item[1].item[0].type = #reference
* item[0].item[1].item[0].required = false
* item[0].item[1].item[0].repeats = true