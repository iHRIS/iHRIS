Profile:        IhrisPersonUser
Parent:         Person
Id:             ihris-person-user
Title:          "iHRIS Person profile for users."
Description:    "iHRIS profile of the Person resource to manage user access."
* telecom 1..1
* telecom ^slicing.discriminator.type = #pattern
* telecom ^slicing.discriminator.path = "system"
* telecom ^slicing.rules = #open
* telecom contains Email 1..1
* telecom[Email].system = #email
* telecom[Email].value 1..1
* name 1..1
* name ^slicing.discriminator.type = #pattern
* name ^slicing.discriminator.path = "use"
* name ^slicing.rules = #open
* name contains Fullname 1..1
* name[Fullname].use = #official
* name[Fullname].text 1..1
* extension contains 
      IhrisUserRole named role 0..* and
      IhrisPassword named password 0..1

Profile:        IhrisTaskGroup
Parent:         Basic
Id:             ihris-basic-task-group
Title:          "iHRIS Task Group"
Description:    "iHRIS profile of the Basic resource to manage task groups."
* identifier 1..1
* identifier.value 1..1
* identifier.use = #official
* identifier.type 0..0
* identifier.system 0..0
* identifier.period 0..0
* identifier.assigner 0..0
* subject 0..0
* code from IhrisResourceValueSet
* code = IhrisResourceCodeSystem#task-group
* extension contains 
    IhrisTaskEntry named task 0..* and
    IhrisTaskGroupEntry named group 0..*
    
Profile:        IhrisRole
Parent:         Basic
Id:             ihris-basic-task-group
Title:          "iHRIS Role"
Description:    "iHRIS profile of the Basic resource to manage user roles."
* code = IhrisResourceCodeSystem#role


Extension:      IhrisUserRole
Id:             ihris-user-role
Title:          "iHRIS User Role"
Description:    "iHRIS User Roles with list of tasks given by this role."
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only Reference
* valueReference 1..1
* valueReference only Reference(IhrisRole)
* valueReference.reference 1..1
* valueReference.type 0..0
* valueReference.identifier 0..0
* valueReference.display 0..0

Extension:      IhrisPassword
Id:             ihris-password
Title:          "iHRIS Password"
Description:    "iHRIS password extension for local users."
* ^context.type = #element
* ^context.expression = "Person"
* extension contains 
      password 1..1 MS and
      salt 1..1 MS
* extension[password].value[x] only string
* extension[password].valueString 1..1
* extension[salt].value[x] only string
* extension[salt].valueString 1..1

Extension:      IhrisTaskEntry
Id:             ihris-task-entry
Title:          "iHRIS Task Entry"
Description:    "A task assigned to a task group (or role)."
* ^context.type = #element
* ^context.expression = "Basic"
* value[x] only string
* valueString 1..1

Extension:      IhrisTaskGroupEntry
Id:             ihris-task-group-entry
Title:          "iHRIS Group"
Description:    "A task group assigned to a role or task group."
* ^context.type = #element
* ^context.expression = "Basic"
* value[x] only Reference
* valueReference 1..1
* valueReference only Reference(IhrisTaskGroup)
* valueReference.reference 1..1
* valueReference.type 0..0
* valueReference.identifier 0..0
* valueReference.display 0..0

Instance:       ihris-role-admin
InstanceOf:     IhrisRole
Title:          "iHRIS Admin User Role"
Usage:          #example
* extension[IhrisTaskEntry][0].valueString = "user/*.*"

Instance:       ihris-role-any
InstanceOf:     IhrisRole
Title:          "iHRIS Any User Role"
Usage:          #example
* extension[IhrisTaskEntry][0].valueString = "user/StructureDefinition.read"

Instance:       ihris-user-admin
InstanceOf:     IhrisPersonUser
Title:          "iHRIS Admin User"
Usage:          #example
* telecom[Email].value = "admin@ihris.org"
* name[Fullname].text = "iHRIS Admin"
* identifier[0].system = "google"
* identifier[0].value = "12345"
* extension[IhrisUserRole].valueReference = Reference(Basic/ihris-role-admin)
* extension[IhrisPassword].extension[password].valueString = "PASS"
* extension[IhrisPassword].extension[salt].valueString = "SALT"
