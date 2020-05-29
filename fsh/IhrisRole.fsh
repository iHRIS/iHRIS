Profile:        IhrisRole
Parent:         Basic
Id:             ihris-role
Title:          "iHRIS Role"
Description:    "iHRIS Profile of the Basic resource to manage roles."
* code = IhrisResourceCodeSystem#role
* modifierExtension contains
      IhrisRolePrimary named primary 1..1 and
      IhrisAssignRole named role 0..* and
      IhrisTask named task 0..*

Invariant:      ihris-task-profile-resource
Description:    "Only one of extension[profile].valueCode or extension[resource].valueReference SHALL be present."
Expression:     "extension(url = profile).exists() xor extension(url = resource).exists()"
Severity:       #error
XPath:          "exists(f:extension(url = profile)) != exists(f:extension(url = resource))"

Extension:      IhrisTask
Id:             ihris-task
Title:          "iHRIS Task"
Description:    "iHRIS Task to be assigned to task groups or roles."
* ^context.type = #element
* ^context.expression = IhrisRole
* obeys ihris-task-profile-resource
* extension contains
      permission 1..1 MS and
      profile 0..1 MS and
      field 0..1 MS and
      resource 0..1 MS
* extension[permission].value[x] only code
* extension[permission].valueCode from IhrisTaskPermissionValueSet (required)
* extension[profile].value[x] only code
* extension[profile].valueCode from IhrisTaskProfileValueSet (extensible)
* extension[field].value[x] only string
* extension[resource].value[x] only Reference

Extension:      IhrisRolePrimary
Id:             ihris-role-primary
Title:          "iHRIS Role Primary"
Description:    "iHRIS flag for roles to indicate a primary role for assignment to users."
* ^context[1].type = #element
* ^context[1].expression = IhrisRole
* value[x] only boolean
* valueBoolean 1..1 

Extension:      IhrisAssignRole
Id:             ihris-assign-role
Title:          "iHRIS Assign Role"
Description:    "iHRIS Assign Role to a user or other role."
* ^context[0].type = #element
* ^context[0].expression = "Person"
* ^context[1].type = #element
* ^context[1].expression = IhrisRole
* value[x] only Reference
* valueReference only Reference(IhrisRole)

CodeSystem:     IhrisTaskPermissionCodeSystem
Id:             ihris-task-permission
Title:          "Code system for task permissions."
* #*      "All"     "Can do any task."
* #read   "Read"    "Can read the given resource."
* #write  "Write"   "Can write the given resource."
* #delete "Delete"  "Can delete the given resource."

ValueSet:       IhrisTaskPermissionValueSet
Id:             ihris-task-permission
Title:          "Code system for task permissions."
* codes from system IhrisTaskPermissionCodeSystem

CodeSystem:     IhrisTaskProfileCodeSystem
Id:             ihris-task-profile
Title:          "Code system for task permissions."
* #*                    "All"
* #Practitioner         "Practitioner"
* #ihris-practitioner   "ihris-practitioner"
* #StructureDefinition  "StructureDefinition"
* #ValueSet             "ValueSet"
* #CodeSystem           "CodeSystem"

ValueSet:       IhrisTaskProfileValueSet
Id:             ihris-task-profile
Title:          "Code system for task permissions."
* codes from system IhrisTaskProfileCodeSystem

Instance:       ihris-role-open
InstanceOf:     IhrisRole
Title:          "iHRIS Open Role"
Usage:          #example
* code = IhrisResourceCodeSystem#role
* modifierExtension[primary].valueBoolean = true
* modifierExtension[task][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* modifierExtension[task][0].extension[profile].valueCode = IhrisTaskProfileCodeSystem#StructureDefinition
* modifierExtension[task][1].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#CodeSystem
* modifierExtension[task][1].extension[profile].valueCode = IhrisTaskProfileCodeSystem#CodeSystem
* modifierExtension[task][2].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#read
* modifierExtension[task][2].extension[profile].valueCode = IhrisTaskProfileCodeSystem#ValueSet

Instance:       ihris-role-admin
InstanceOf:     IhrisRole
Title:          "iHRIS Admin Role"
Usage:          #example
* code = IhrisResourceCodeSystem#role
* modifierExtension[primary].valueBoolean = true
* modifierExtension[task][0].extension[permission].valueCode = IhrisTaskPermissionCodeSystem#*
* modifierExtension[task][0].extension[profile].valueCode = IhrisTaskProfileCodeSystem#*
* modifierExtension[role][0].valueReference = Reference(Basic/ihris-role-open)
