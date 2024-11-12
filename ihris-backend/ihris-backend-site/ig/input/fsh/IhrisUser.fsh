Profile:        IhrisPersonUser
Parent:         Person
Id:             ihris-person-user
Title:          "System User"
Description:    "iHRIS profile of the Person resource to manage user access."
* active 1..1 MS
* active ^label = "Active"
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
      InitialPassword named initial-password 0..1 MS and
      OldPassword named old-password 0..1 MS and
      ConfirmInitialPassword named confirm-initial-password 0..1 MS and
      IhrisUserLocation named location 0..* MS and
      IhrisPractitionerReference named practitioner 0..1 MS and
      IhrisUserOtp named otp 0..1 MS and
      IhrisFirstTimeLogin named firstTimeLogin 1..1 MS
* extension[role] ^label = "Role(s)"
* extension[role].valueReference.reference MS
* extension[location] ^label = "Location"
* extension[location].valueReference.reference MS
* extension[practitioner] ^label = "Self Service Practitioner"
* extension[practitioner].valueReference MS
* extension[old-password] ^label = "Old Password"
* extension[old-password].valueString MS
* extension[initial-password] ^label = "Initial Password"
* extension[initial-password].valueString MS
* extension[confirm-initial-password] ^label = "Confirm Password"
* extension[confirm-initial-password].valueString MS

Extension: IhrisUserOtp
Id: ihris-user-otp
Title: "Ihris User Otp"
Description: "iHRIS user otp extension"
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

Extension: IhrisFirstTimeLogin
Id: ihris-first-time-login
Title: "Ihris first time login"
Description: "iHRIS first time login extension"
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only boolean
* valueBoolean 1..1

Extension:      IhrisPassword
Id:             ihris-password
Title:          "iHRIS Password"
Description:    "iHRIS password extension for local users."
* ^context.type = #element
* ^context.expression = "Person"
* extension contains
      resetPasswordToken 1..1 MS and
      resetPasswordExpiry 1..1 MS and
      passwordChanged 1..1 MS and
      password 1..1 MS and
      salt 1..1 MS
* extension[resetPasswordToken].value[x] only string
* extension[resetPasswordToken].valueString ^label = "restPasswordToken"
* extension[resetPasswordToken].valueString 1..1 MS
* extension[resetPasswordExpiry].value[x] only string
* extension[resetPasswordExpiry].valueString ^label = "resetPasswordExpiry"
* extension[resetPasswordExpiry].valueString 1..1 MS
* extension[passwordChanged].value[x] only boolean
* extension[passwordChanged].valueBoolean ^label = "Password Changed"
* extension[passwordChanged].valueBoolean 1..1 MS
* extension[password].value[x] only string
* extension[password].valueString ^label = "Password"
* extension[password].valueString 1..1 MS
* extension[salt].value[x] only string
* extension[salt].valueString ^label = "Salt"
* extension[salt].valueString 1..1 MS

Extension:      OldPassword
Id: old-password
Title: "Old Password"
Description: "Old Password"
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only string
* valueString 1..1

Extension:      InitialPassword
Id: initial-password
Title: "Password"
Description: "Password"
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only string
* valueString 1..1

Extension:      ConfirmInitialPassword
Id: confirm-initial-password
Title: "Confirm Password"
Description: "Confirm Password"
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only string
* valueString 1..1

Extension:      IhrisUserLocation
Id:             ihris-user-location
Title:          "iHRIS User Location"
Description:    "iHRIS user Location extension for local users."
* ^context.type = #element
* ^context.expression = "Person"
* value[x] only Reference(IhrisJurisdiction or IhrisFacility)
* valueReference 1..1 MS
* valueReference ^label = "Location"
* valueReference.reference 1..1 MS
* valueReference.reference ^label = "Location"

/*Instance:       ihris-user-admin
InstanceOf:     IhrisPersonUser
Title:          "iHRIS Admin User"
Usage:          #example
* telecom.value = "admin@ihris.org"
* name.text = "iHRIS Admin"
* identifier[0].system = "google"
* identifier[0].value = "12345"
* extension[password].extension[resetPasswordToken].valueString = "PASS"
* extension[password].extension[resetPasswordExpiry].valueString = "PASS"
* extension[password].extension[password].valueString = "PASS"
* extension[password].extension[salt].valueString = "SALT"
* extension[role][0].valueReference = Reference(Basic/ihris-role-admin)*/

Instance: ihris-user-admin
InstanceOf: IhrisPersonUser
Usage: #example
* meta.profile = "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
* extension[0].url = "http://ihris.org/fhir/StructureDefinition/ihris-password"
* extension[=].extension[0].url = "password"
* extension[=].extension[=].valueString = "0da67ef3726a1e0adfbd3c3880c00f33167daeab1f8c728e10b547d382c2b91a96402958209d6af3c947ae9ab53d879dddb79ad046454ade2b12257fe792f8fa"
* extension[=].extension[+].url = "salt"
* extension[=].extension[=].valueString = "239cfeb1222bfb394549125b234e668e"
* extension[+].url = "http://ihris.org/fhir/StructureDefinition/ihris-assign-role"
* extension[=].valueReference = Reference(Basic/ihris-role-admin)
* name.use = #official
* name.text = "iHRIS Admin"
* telecom.system = #email
* telecom.value = "admin@ihris.org"
* active = true

Instance: ihris-user-loggedout
InstanceOf: Person
Usage: #example
* meta.profile = "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
* extension.url = "http://ihris.org/fhir/StructureDefinition/ihris-assign-role"
* extension.valueReference = Reference(Basic/ihris-role-open)
* name.use = #official
* name.text = "Logged Out"
* telecom.system = #email
* telecom.value = "loggedout@ihris.org"

Instance: ihris-user-demo
InstanceOf: Person
Usage: #example
* meta.profile = "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
* extension[0].url = "http://ihris.org/fhir/StructureDefinition/ihris-password"
* extension[=].extension[0].url = "password"
* extension[=].extension[=].valueString = "0da67ef3726a1e0adfbd3c3880c00f33167daeab1f8c728e10b547d382c2b91a96402958209d6af3c947ae9ab53d879dddb79ad046454ade2b12257fe792f8fa"
* extension[=].extension[+].url = "salt"
* extension[=].extension[=].valueString = "239cfeb1222bfb394549125b234e668e"
* extension[+].url = "http://ihris.org/fhir/StructureDefinition/ihris-assign-role"
* extension[=].valueReference = Reference(Basic/ihris-role-hrmanager)
* name.use = #official
* name.text = "iHRIS Demo User"
* telecom.system = #email
* telecom.value = "demo@ihris.org"

Instance:       ihris-page-user
InstanceOf:     IhrisPage
Title:          "User"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-person-user)
* extension[display].extension[link][0].extension[field].valueString = "Person.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit User"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/questionnaire/ihris-user/user/FIELD"
* extension[display].extension[link][1].extension[text].valueString = "Add Another User"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/questionnaire/ihris-user/user"
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
* extension[section][0].extension[description].valueString = "System User details"
* extension[section][0].extension[name].valueString = "Person"
* extension[section][0].extension[field][0].valueString = "Person.name"
* extension[section][0].extension[field][1].valueString = "Person.telecom"
* extension[section][0].extension[field][2].valueString = "Person.extension:role.value[x]:valueReference"
* extension[section][0].extension[field][3].valueString = "Person.extension:location.value[x]:valueReference"
* extension[section][0].extension[field][4].valueString = "Person.extension:practitioner.value[x]:valueReference"

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
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
* item[0].text = "User"
* item[0].type = #group
* item[0].extension[constraint].extension[key].valueId = "ihris-password-check"
* item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].extension[constraint].extension[expression].valueString = "where(linkId='password').answer.first().valueString = where(linkId='confrimpassword').answer.first().valueString"
* item[0].extension[constraint].extension[human].valueString = "Please make sure Password and Confrim Password Match."

* item[0].item[0].linkId = "Person.name[0].text"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.name.text"
* item[0].item[0].text = "Name"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false
* item[0].item[0].extension[constraint].extension[key].valueId = "ihris-name-check"
* item[0].item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].item[0].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[0].extension[constraint].extension[human].valueString = "Name must be only text."

* item[0].item[1].linkId = "Person.name[0].use"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.name.use"
* item[0].item[1].text = "Use"
* item[0].item[1].type = #choice
* item[0].item[1].required = true
* item[0].item[1].repeats = false
* item[0].item[1].readOnly = true
* item[0].item[1].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[1].answerOption.initialSelected = true

* item[0].item[2].linkId = "Person.telecom[0].system"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.telecom.system"
* item[0].item[2].text = "Telecom System"
* item[0].item[2].type = #choice
* item[0].item[2].required = true
* item[0].item[2].repeats = false
* item[0].item[2].readOnly = true
* item[0].item[2].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[0].item[2].answerOption.initialSelected = true

* item[0].item[3].linkId = "Person.telecom[0].value"
* item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.telecom.value"
* item[0].item[3].text = "Email"
* item[0].item[3].type = #string
* item[0].item[3].required = true
* item[0].item[3].repeats = false
* item[0].item[3].extension[constraint].extension[key].valueId = "ihris-email-check"
* item[0].item[3].extension[constraint].extension[severity].valueCode = #error
* item[0].item[3].extension[constraint].extension[expression].valueString = "matches('^[0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4}$')"
* item[0].item[3].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[0].item[4].linkId = "Person.extension[0]#preloaded"
* item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:role.value[x]:valueReference"
* item[0].item[4].text = "Role"
* item[0].item[4].type = #reference
* item[0].item[4].required = true
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Person.extension[1]"
* item[0].item[5].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:practitioner.value[x]:valueReference"
* item[0].item[5].text = "Practitioner of this account"
* item[0].item[5].type = #reference
* item[0].item[5].required = false
* item[0].item[5].repeats = false

* item[0].item[6].linkId = "display1"
* item[0].item[6].text = "If location is assigned to a user, a user will only have access to records of that respective location"
* item[0].item[6].type = #display
* item[0].item[6].required = true
* item[0].item[6].repeats = false

* item[0].item[7].linkId = "Person.extension[2]#tree"
* item[0].item[7].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:location.value[x]:valueReference"
* item[0].item[7].text = "Location"
* item[0].item[7].type = #reference
* item[0].item[7].required = false
* item[0].item[7].repeats = false

* item[0].item[8].linkId = "Person.active"
* item[0].item[8].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.active"
* item[0].item[8].text = "Active?"
* item[0].item[8].type = #boolean
* item[0].item[8].required = true
* item[0].item[8].repeats = false
* item[0].item[8].readOnly = true
* item[0].item[8].answerOption.valueString = "true"
* item[0].item[8].answerOption.initialSelected = true

* item[0].item[9].linkId = "display2"
* item[0].item[9].text = "If editing, leave blank to keep the same password. Password is required if not editing"
* item[0].item[9].type = #display
* item[0].item[9].required = true
* item[0].item[9].repeats = false

* item[0].item[10].linkId = "Person.extension[3]#password"
* item[0].item[10].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:initial-password.value[x]:valueString"
* item[0].item[10].text = "Password"
* item[0].item[10].type = #string
* item[0].item[10].required = false
* item[0].item[10].repeats = false

* item[0].item[11].linkId = "Person.extension[4]#password"
* item[0].item[11].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:confirm-initial-password.value[x]:valueString"
* item[0].item[11].text = "Confirm Password"
* item[0].item[11].type = #string
* item[0].item[11].required = false
* item[0].item[11].repeats = false

Instance:       IhrisChangePassword
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Change Password Workflow"
* description = "iHRIS workflow to Change Users Password"
* id = "ihris-change-password"
* url = "http://ihris.org/fhir/Questionnaire/ihris-change-password"
* name = "ihris-change-password"
* status = #active
* date = 2020-12-08
* purpose = "Workflow page for changing a user's password."

* item[0].linkId = "Person"
* item[0].text = "Change Password"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.id"
* item[0].type = #group
* item[0].extension[constraint][0].extension[key].valueId = "ihris-password-check"
* item[0].extension[constraint][0].extension[severity].valueCode = #error
* item[0].extension[constraint][0].extension[expression].valueString = "where(linkId='Person.extension[1]').answer.first().valueString = where(linkId='Person.extension[2]').answer.first().valueString"
* item[0].extension[constraint][0].extension[human].valueString = "Please make sure New Password and Confrim Password Match."
* item[0].extension[constraint][1].extension[key].valueId = "ihris-oldpassword-check"
* item[0].extension[constraint][1].extension[severity].valueCode = #error
* item[0].extension[constraint][1].extension[expression].valueString = "where(linkId='Person.extension[0]').answer.first().valueString != where(linkId='Person.extension[1]').answer.first().valueString"
* item[0].extension[constraint][1].extension[human].valueString = "Please make sure New Password is not the Same as Old Password."

* item[0].item[0].linkId = "Person.extension[0]#password"
* item[0].item[0].text = "Old Password"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:old-password.value[x]:valueString"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Person.extension[1]#password"
* item[0].item[1].text = "Password"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:initial-password.value[x]:valueString"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = false
* item[0].item[1].extension[constraint].extension[key].valueId = "ihris-password-strength-check"
* item[0].item[1].extension[constraint].extension[severity].valueCode = #error
* item[0].item[1].extension[constraint].extension[expression].valueString = "matches('^(?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')"
* item[0].item[1].extension[constraint].extension[human].valueString = "Password Should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"

* item[0].item[2].linkId = "Person.extension[2]#password"
* item[0].item[2].text = "Confirm Password"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-person-user#Person.extension:confirm-initial-password.value[x]:valueString"
* item[0].item[2].type = #string
* item[0].item[2].required = true
* item[0].item[2].repeats = false
