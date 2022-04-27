Profile:        IhrisPersonUser
Parent:         Person
Id:             ihris-person-user
Title:          "System User"
Description:    "NHWR profile of the Person resource to manage user access."
* name 1..1 MS
* name ^label = "Name"
* name ^slicing.discriminator.type = #pattern
* name ^slicing.discriminator.path = "use"
* name ^slicing.rules = #open
* name.use = #official
* name.use MS
* name.use ^label = "Use"
* name.text 1..1 MS
* name.text ^label = "Fullname"
* name.family 1..1 MS
* name.family ^label = "Surname (Family)"
* name.given 1..1 MS
* name.given ^label = "Given Name (Given)"
* telecom 1..1 MS
* telecom ^label = "Email"
* telecom ^slicing.discriminator.type = #pattern
* telecom ^slicing.discriminator.path = "system"
* telecom ^slicing.rules = #open
* telecom.system MS
* telecom.system ^label = "Contact Type"
* telecom.system = #email
* telecom.value 1..1 MS
* telecom.value ^label = "Email"
* extension contains 
      IhrisAssignRole named role 0..1 MS and
      IhrisPassword named password 0..1 MS and
      IhrisUserOtp named otp 0..1 MS and
      IhrisUserGroup named group 0..1 MS 
      // IhrisUserLocation named location 0..* MS
* extension[role] ^label = "Role(s)"
* extension[role].valueReference.reference MS
* extension[group] ^label = "Group(s)"
* extension[group].valueReference.reference MS
// * extension[location] ^label = "Location/Facility"
// * extension[location].valueReference.reference MS

Extension:      IhrisPassword
Id:             ihris-password
Title:          "NHWR Password"
Description:    "NHWR password extension for local users."
* ^context.type = #element
* ^context.expression = "Person"
* extension contains 
      resetPasswordToken 1..1 MS and
      resetPasswordExpiry 1..1 MS and
      password 1..1 MS and
      salt 1..1 MS
* extension[resetPasswordToken].value[x] only string
* extension[resetPasswordToken].valueString ^label = "restPasswordToken"
* extension[resetPasswordToken].valueString 1..1 MS
* extension[resetPasswordExpiry].value[x] only string
* extension[resetPasswordExpiry].valueString ^label = "resetPasswordExpiry"
* extension[resetPasswordExpiry].valueString 1..1 MS
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


// extension to hold otp
Extension: IhrisUserOtp
Id: ihris-user-otp
Title: "Ihris User Otp"
Description: "NHWR user otp extension"
* ^context.type = #element
* ^context.expression = "Person"
* extension contains 
      code 1..1 MS and 
      expiresIn 1..1 MS
* extension[code].value[x] only string
* extension[code].valueString ^label = "Code"
* extension[code].valueString 1..1 MS
* extension[expiresIn].value[x] only string
* extension[expiresIn].valueString ^label = "expiresIn"
* extension[expiresIn].valueString 1..1 MS



Instance:       ihris-user-admin
InstanceOf:     IhrisPersonUser
Title:          "NHWR Admin User"
Usage:          #example
* telecom.value = "admin@ihris.org"
* name.text = "NHWR Admin"
* name.family = "Admin"
* name.given = "NHWR"
* identifier[0].system = "google"
* identifier[0].value = "12345"
* extension[password].extension[resetPasswordToken].valueString = "PASS"
* extension[password].extension[resetPasswordExpiry].valueString = "PASS"
* extension[password].extension[password].valueString = "PASS"
* extension[password].extension[salt].valueString = "SALT"
* extension[otp].extension[code].valueString = "123456"
* extension[otp].extension[expiresIn].valueString = "10s"
* extension[role][0].valueReference = Reference(Basic/ihris-role-admin)

Instance:       ihris-page-user
InstanceOf:     IhrisPage
Title:          "User"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-person-user)
// * extension[display].extension[link][0].extension[field].valueString = ""
// * extension[display].extension[link][0].extension[text].valueString = "Add Another User"
// * extension[display].extension[link][0].extension[button].valueBoolean = true
// * extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
// * extension[display].extension[link][0].extension[url].valueUrl = "/questionnaire/ihris-user/user"
* extension[display].extension[search][0].valueString = "Surname|Person.name.where(use='official').family"
* extension[display].extension[search][1].valueString = "Given Name|Person.name.where(use='official').given"
* extension[display].extension[search][2].valueString = "User|Person.name.where(use='official').text"
* extension[display].extension[search][3].valueString = "Username/Email|Person.telecom.where(system='email').value"
* extension[display].extension[search][4].valueString = "Role|Person.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-assign-role').valueReference.reference"
* extension[display].extension[search][5].valueString = "Group|Person.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-user-group').valueReference.reference"
* extension[display].extension[filter][0].valueString = "User|name:contains"
* extension[display].extension[field][0].extension[path].valueString = "Person.extension:password.extension:password.value[x]:valueString"
* extension[display].extension[field][0].extension[type].valueString = "password"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[display].extension[add].extension[url].valueUrl = "/questionnaire/ihris-user/user"
* extension[display].extension[add].extension[icon].valueString = "mdi-account-plus"
* extension[display].extension[add].extension[class].valueString = "accent"
* extension[section][0].extension[title].valueString = "User"
* extension[section][0].extension[description].valueString = "System User details"
* extension[section][0].extension[name].valueString = "Person"
* extension[section][0].extension[field][0].valueString = "Person.name"
* extension[section][0].extension[field][1].valueString = "Person.telecom"
* extension[section][0].extension[field][2].valueString = "Person.extension:role.value[x]:valueReference"
// * extension[section][0].extension[field][3].valueString = "Person.extension:location.value[x]:valueReference"
* extension[section][0].extension[field][3].valueString = "Person.extension:password.extension:password.value[x]:valueString"

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

* item[0].item[1].linkId = "Person.name[0].family"
* item[0].item[1].text = "Surname"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = false
* item[0].item[1].extension[constraint].extension[key].valueId = "ihris-name-check"
* item[0].item[1].extension[constraint].extension[severity].valueCode = #error
* item[0].item[1].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[1].extension[constraint].extension[human].valueString = "Name must be only text."

* item[0].item[2].linkId = "Person.name[0].given"
* item[0].item[2].text = "Given Name"
* item[0].item[2].type = #string
* item[0].item[2].required = true
* item[0].item[2].repeats = false
* item[0].item[2].extension[constraint].extension[key].valueId = "ihris-name-check"
* item[0].item[2].extension[constraint].extension[severity].valueCode = #error
* item[0].item[2].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[2].extension[constraint].extension[human].valueString = "Name must be only text."

* item[0].item[3].linkId = "Person.name[0].use"
* item[0].item[3].text = "Use"
* item[0].item[3].type = #choice
* item[0].item[3].required = true
* item[0].item[3].repeats = false
* item[0].item[3].readOnly = true
* item[0].item[3].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[3].answerOption.initialSelected = true

* item[0].item[4].linkId = "Person.telecom[0].system"
* item[0].item[4].text = "Telecom System"
* item[0].item[4].type = #choice
* item[0].item[4].required = true
* item[0].item[4].repeats = false
* item[0].item[4].readOnly = true
* item[0].item[4].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[0].item[4].answerOption.initialSelected = true

* item[0].item[5].linkId = "Person.telecom[0].value"
* item[0].item[5].text = "Email"
* item[0].item[5].type = #string
* item[0].item[5].required = true
* item[0].item[5].repeats = false
* item[0].item[5].extension[constraint].extension[key].valueId = "ihris-email-check"
* item[0].item[5].extension[constraint].extension[severity].valueCode = #error
* item[0].item[5].extension[constraint].extension[expression].valueString = "matches('^[0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4}$')"
* item[0].item[5].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[0].item[6].linkId = "role"
* item[0].item[6].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:role.value[x]:valueReference"
* item[0].item[6].text = "Role"
* item[0].item[6].type = #reference
* item[0].item[6].required = true
* item[0].item[6].repeats = false

* item[0].item[7].linkId = "group"
* item[0].item[7].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:group.value[x]:valueReference"
* item[0].item[7].text = "Group"
* item[0].item[7].type = #reference
* item[0].item[7].required = true
* item[0].item[7].repeats = false

* item[0].item[8].linkId = "password#password"
* item[0].item[8].text = "Password"
* item[0].item[8].type = #string
* item[0].item[8].required = true
* item[0].item[8].repeats = false

* item[0].item[9].linkId = "confrimpassword#password"
* item[0].item[9].text = "Confirm Password"
* item[0].item[9].type = #string
* item[0].item[9].required = true
* item[0].item[9].repeats = false

Instance:       IhrisChangePassword
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "NHWR Change Password Workflow"
* description = "iHRIS workflow to Change Users Password"
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
