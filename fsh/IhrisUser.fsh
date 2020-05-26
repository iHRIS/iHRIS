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

Extension:      IhrisUserRole
Id:             ihris-user-role
Title:          "iHRIS User Role"
Description:    "iHRIS User Roles with list of tasks given by this role."
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only Coding
* valueCoding 1..1

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

Instance:       ihris-user-admin
InstanceOf:     IhrisPersonUser
Title:          "iHRIS Admin User"
Usage:          #example
* telecom[Email].value = "admin@ihris.org"
* name[Fullname].text = "iHRIS Admin"
* identifier[0].system = "google"
* identifier[0].value = "12345"
* extension[IhrisPassword].extension[password].valueString = "PASS"
* extension[IhrisPassword].extension[salt].valueString = "SALT"
