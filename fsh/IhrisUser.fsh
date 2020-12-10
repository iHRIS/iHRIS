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
      IhrisAssignRole named role 0..* MS and
      IhrisPassword named password 0..1 MS
* extension[role].valueReference.reference MS

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
* extension[password].valueString ^label = "Password"
* extension[password].valueString 1..1 MS
* extension[salt].value[x] only string
* extension[salt].valueString ^label = "Salt"
* extension[salt].valueString 1..1 MS

Instance:       ihris-user-admin
InstanceOf:     IhrisPersonUser
Title:          "iHRIS Admin User"
Usage:          #example
* telecom[Email].value = "admin@ihris.org"
* name[Fullname].text = "iHRIS Admin"
* identifier[0].system = "google"
* identifier[0].value = "12345"
* extension[password].extension[password].valueString = "PASS"
* extension[password].extension[salt].valueString = "SALT"
* extension[role][0].valueReference = Reference(Basic/ihris-role-admin)

Instance:       ihris-page-users
InstanceOf:     IhrisPage
Title:          "User"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-person-user)
* extension[display].extension[link][0].extension[field].valueString = "Person.id"
* extension[display].extension[link][0].extension[text].valueString = "View User"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/users/FIELD"
* extension[display].extension[link][1].extension[field].valueString = ""
* extension[display].extension[link][1].extension[text].valueString = "Add Another User"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/questionnaire/ihris-user/user"
* extension[display].extension[search][0].valueString = "User|Person.name.where(use='official').text"
* extension[display].extension[search][1].valueString = "Username/Email|Person.telecom.where(system='email').value"
* extension[display].extension[search][2].valueString = "Role|Person.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-assign-role').valueReference.reference"
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-user/user"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[section][0].extension[title].valueString = "System Users"
* extension[section][0].extension[description].valueString = "System Users details"
* extension[section][0].extension[name].valueString = "Person"
* extension[section][0].extension[field][0].valueString = "Person.name"
* extension[section][0].extension[field][1].valueString = "Person.telecom.value"
* extension[section][0].extension[field][2].valueString = "Person.extension:role.value[x]:valueReference"

Instance:       IhrisUser
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Users Workflow"
* description = "iHRIS workflow to record a Users"
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
* item[0].extension[constraint].extension[expression].valueString = "where(linkId='Person.extension[1].extension[2]').answer.first().valueString == where(linkId='Person.extension[1].extension[1]').answer.first().valueString"
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

* item[0].item[2].linkId = "Practitioner.telecom[0].system"
* item[0].item[2].text = "Telecom System"
* item[0].item[2].type = #choice
* item[0].item[2].required = true
* item[0].item[2].repeats = false
* item[0].item[2].readOnly = true
* item[0].item[2].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[0].item[2].answerOption.initialSelected = true

* item[0].item[3].linkId = "Practitioner.telecom[0].value"
* item[0].item[3].text = "Email"
* item[0].item[3].type = #string
* item[0].item[3].required = true
* item[0].item[3].repeats = false
* item[0].item[3].extension[constraint].extension[key].valueId = "ihris-email-check"
* item[0].item[3].extension[constraint].extension[severity].valueCode = #error
* item[0].item[3].extension[constraint].extension[expression].valueString = "matches('^[0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4}$')"
* item[0].item[3].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[0].item[4].linkId = "Person.extension[0]"
* item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:role.value[x]:valueReference"
* item[0].item[4].text = "Role"
* item[0].item[4].type = #reference
* item[0].item[4].required = true
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Person.extension[1].extension[0]"
* item[0].item[5].text = "Password"
* item[0].item[5].type = #string
* item[0].item[5].required = true
* item[0].item[5].repeats = false

* item[0].item[6].linkId = "Person.extension[1].extension[1]"
* item[0].item[6].text = "Confirm Password"
* item[0].item[6].type = #string
* item[0].item[6].required = true
* item[0].item[6].repeats = false