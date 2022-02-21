Profile:        IhrisPersonUser
Parent:         Person
Id:             ihris-person-user
Title:          "NHWR User"
Description:    "NHWR profile of the Person resource to manage user access."
* name 1..1 MS
* name ^label = "Name"
* name ^slicing.discriminator.type = #pattern
* name ^slicing.discriminator.path = "use"
* name ^slicing.rules = #open
* name.use = #official
* name.text 1..1 MS
* name.text ^label = "Fullname"
* telecom 1..1 MS
* telecom ^label = "Email"
* telecom ^slicing.discriminator.type = #pattern
* telecom ^slicing.discriminator.path = "system"
* telecom ^slicing.rules = #open
* telecom.system = #email
* telecom.value 1..1 MS
* telecom.value ^label = "Email"
* extension contains 
      IhrisAssignRole named role 0..1 MS and
      IhrisPassword named password 0..1 MS and
      IhrisUserLocation named location 0..* MS
* extension[role] ^label = "Role(s)"
* extension[role].valueReference.reference MS
* extension[location] ^label = "Location/Facility"
* extension[location].valueReference.reference MS

Extension:      IhrisPassword
Id:             ihris-password
Title:          "NHWR Password"
Description:    "NHWR password extension for local users."
* ^context.type = #element
* ^context.expression = "Person"
* extension contains 
      password 1..1 MS and
      salt 1..1 MS
* extension[password].value[x] only string
* extension[password].valueString ^label = "Password"
* extension[password].valueString 1..1 MS
* extension[salt].value[x] only string
* extension[salt].valueString ^label = "Salt"
* extension[salt].valueString 1..1 MS

Extension:      IhrisUserLocation
Id:             ihris-user-location
Title:          "NHWR User Location"
Description:    "NHWR user Location extension for local users."
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference ^label = "Location/Facility"
* valueReference only Reference(Location)
* valueReference.reference 1..1 MS
* valueReference.reference ^label = "Location/Facility"

Instance:       ihris-user-admin
InstanceOf:     IhrisPersonUser
Title:          "NHWR Admin User"
Usage:          #example
* telecom.value = "admin@nhwr.org"
* name.text = "NHWR Admin"
* identifier[0].system = "google"
* identifier[0].value = "12345"
* extension[password].extension[password].valueString = "PASS"
* extension[password].extension[salt].valueString = "SALT"
* extension[role][0].valueReference = Reference(Basic/ihris-role-admin)

Instance:       ihris-page-user
InstanceOf:     IhrisPage
Title:          "User"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-person-user)
* extension[display].extension[link][0].extension[field].valueString = ""
* extension[display].extension[link][0].extension[text].valueString = "Add Another NHWR User"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/questionnaire/ihris-user/user"
* extension[display].extension[search][0].valueString = "User|Person.name.where(use='official').text"
* extension[display].extension[search][1].valueString = "Username/Email|Person.telecom.where(system='email').value"
* extension[display].extension[search][2].valueString = "Role|Person.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-assign-role').valueReference.reference"
* extension[display].extension[search][3].valueString = "Location|Person.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-user-location').valueReference.reference"
* extension[display].extension[filter][0].valueString = "User|name:contains"
* extension[display].extension[field][0].extension[path].valueString = "Person.extension:password.extension:password.value[x]:valueString"
* extension[display].extension[field][0].extension[type].valueString = "password"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-user/user"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[section][0].extension[title].valueString = "Person"
* extension[section][0].extension[description].valueString = "NHWR System User details"
* extension[section][0].extension[name].valueString = "Person"
* extension[section][0].extension[field][0].valueString = "Person.name"
* extension[section][0].extension[field][1].valueString = "Person.telecom"
* extension[section][0].extension[field][2].valueString = "Person.extension:role.value[x]:valueReference"
* extension[section][0].extension[field][3].valueString = "Person.extension:location.value[x]:valueReference"
* extension[section][0].extension[field][4].valueString = "Person.extension:password.extension:password.value[x]:valueString"

Instance:       IhrisUser
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "NHWR Users Workflow"
* description = "NHWR workflow to record a Users"
* id = "ihris-user"
* url = "http://ihris.org/fhir/Questionnaire/ihris-user"
* name = "ihris-user"
* status = #active
* date = 2020-12-08
* purpose = "Workflow page for recording a user's information."

* item[0].linkId = "Person"
* item[0].text = "User"
* item[0].type = #group
* item[0].extension[constraint].extension[key].valueId = "ihris-password-check"
* item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].extension[constraint].extension[expression].valueString = "where(linkId='password').answer.first().valueString = where(linkId='confrimpassword').answer.first().valueString"
* item[0].extension[constraint].extension[human].valueString = "Please make sure Password and Confrim Password Match."

* item[0].item[0].linkId = "Person.name[0].text"
* item[0].item[0].text = "Name"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false
* item[0].item[0].extension[constraint].extension[key].valueId = "ihris-name-check"
* item[0].item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].item[0].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[0].extension[constraint].extension[human].valueString = "Name must be only text."

* item[0].item[1].linkId = "Person.name[0].use"
* item[0].item[1].text = "Use"
* item[0].item[1].type = #choice
* item[0].item[1].required = true
* item[0].item[1].repeats = false
* item[0].item[1].readOnly = true
* item[0].item[1].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[1].answerOption.initialSelected = true

* item[0].item[2].linkId = "Person.telecom[0].system"
* item[0].item[2].text = "Telecom System"
* item[0].item[2].type = #choice
* item[0].item[2].required = true
* item[0].item[2].repeats = false
* item[0].item[2].readOnly = true
* item[0].item[2].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[0].item[2].answerOption.initialSelected = true

* item[0].item[3].linkId = "Person.telecom[0].value"
* item[0].item[3].text = "Email"
* item[0].item[3].type = #string
* item[0].item[3].required = true
* item[0].item[3].repeats = false
* item[0].item[3].extension[constraint].extension[key].valueId = "ihris-email-check"
* item[0].item[3].extension[constraint].extension[severity].valueCode = #error
* item[0].item[3].extension[constraint].extension[expression].valueString = "matches('^[0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4}$')"
* item[0].item[3].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[0].item[4].linkId = "role"
* item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:role.value[x]:valueReference"
* item[0].item[4].text = "Role"
* item[0].item[4].type = #reference
* item[0].item[4].required = true
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "location"
* item[0].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:location.value[x]:valueReference"
* item[0].item[5].text = "Location/Facility"
* item[0].item[5].type = #reference
* item[0].item[5].required = false
* item[0].item[5].repeats = false

* item[0].item[6].linkId = "password#password"
* item[0].item[6].text = "Password"
* item[0].item[6].type = #string
* item[0].item[6].required = true
* item[0].item[6].repeats = false

* item[0].item[7].linkId = "confrimpassword#password"
* item[0].item[7].text = "Confirm Password"
* item[0].item[7].type = #string
* item[0].item[7].required = true
* item[0].item[7].repeats = false

Instance:       IhrisChangePassword
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "NHWR Change Password Workflow"
* description = "NHWR workflow to Change Users Password"
* id = "ihris-change-password"
* url = "http://ihris.org/fhir/Questionnaire/ihris-change-password"
* name = "ihris-change-password"
* status = #active
* date = 2020-12-08
* purpose = "Workflow page for changing a user's password."

* item[0].linkId = "Person"
* item[0].text = "Change Password"
* item[0].type = #group
* item[0].extension[constraint][0].extension[key].valueId = "ihris-password-check"
* item[0].extension[constraint][0].extension[severity].valueCode = #error
* item[0].extension[constraint][0].extension[expression].valueString = "where(linkId='newpassword').answer.first().valueString = where(linkId='confrimpassword').answer.first().valueString"
* item[0].extension[constraint][0].extension[human].valueString = "Please make sure New Password and Confrim Password Match."
* item[0].extension[constraint][1].extension[key].valueId = "ihris-oldpassword-check"
* item[0].extension[constraint][1].extension[severity].valueCode = #error
* item[0].extension[constraint][1].extension[expression].valueString = "where(linkId='oldpassword').answer.first().valueString != where(linkId='newpassword').answer.first().valueString"
* item[0].extension[constraint][1].extension[human].valueString = "Please make sure New Password is not the Same as Old Password."

* item[0].item[0].linkId = "oldpassword#password"
* item[0].item[0].text = "Old Password"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "newpassword#password"
* item[0].item[1].text = "Password"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = false
* item[0].item[1].extension[constraint].extension[key].valueId = "ihris-password-strength-check"
* item[0].item[1].extension[constraint].extension[severity].valueCode = #error
* item[0].item[1].extension[constraint].extension[expression].valueString = "matches('^(?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')"
* item[0].item[1].extension[constraint].extension[human].valueString = "Password Should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"

* item[0].item[2].linkId = "confrimpassword#password"
* item[0].item[2].text = "Confirm Password"
* item[0].item[2].type = #string
* item[0].item[2].required = true
* item[0].item[2].repeats = false

// search roles page
Instance:         ihris-page-roles
InstanceOf:       IhrisPage
Title:            "NHWR Roles" 
Usage:            #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-role)
* extension[display].extension[link][0].extension[field].valueString = ""
* extension[display].extension[link][0].extension[text].valueString = "NHWR Roles"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = ""
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-add-role/user"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[display].extension[search][0].valueString = "Id|Basic.id"
* extension[display].extension[search][1].valueString = "Name|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-basic-name').valueString"
* extension[display].extension[search][2].valueString = "Reference|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-assign-role').valueReference.reference"
* extension[display].extension[filter][0].valueString = "Role|Basic.extension:id:contains"

// add roles page
Instance:         ihris-page-add-role
InstanceOf:       IhrisQuestionnaire
Usage:          #definition
* title = "NHWR AddRole Workflow"
* description = "NHWR workflow to record a Role"
* id = "ihris-add-role"
* url = "http://ihris.org/fhir/Questionnaire/ihris-add-role"
* name = "ihris-add-role"
* status = #active
* date = 2022-02-20
* purpose = "Workflow page for recording a user role information."

* item[0].linkId = "Basic"
* item[0].text = "Add  Role"
* item[0].type = #group

* item[0].item[0].linkId = "rolename#rolename"
* item[0].item[0].text = "Role Name"
* item[0].item[0].type = #string
* item[0].item[0].required = false
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "tasks#tasks"
* item[0].item[1].text = "Tasks "
* item[0].item[1].type = #string
* item[0].item[1].required = false
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "resource#resource"
* item[0].item[2].text = "Resource"
* item[0].item[2].type = #string
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "permissions#permissions"
* item[0].item[3].text = "Permissions"
* item[0].item[3].type = #string
* item[0].item[3].required = false
* item[0].item[3].repeats = false