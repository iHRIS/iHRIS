Profile:        IhrisBasicEmergency
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-emergency
Title:          "Emergency Information"
Description:    "iHRIS Profile of the Basic resource for Emergency."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisEmergency named emergency 1..1 MS
* extension[emergency] ^label = "Emergency"
* extension[emergency].extension[name].valueString 1..1 MS
* extension[emergency].extension[relation].valueCoding 1..1 MS
* extension[emergency].extension[phone].valueString MS
* extension[emergency].extension[mobile].valueString MS
* extension[emergency].extension[workPhone].valueString MS
* extension[emergency].extension[workEmail].valueString MS
* extension[emergency].extension[otherEmail].valueString MS
* extension[emergency].extension[address].valueString MS
* extension[emergency].extension[remark].valueString MS
* extension[emergency].extension[attachment].valueAttachment MS
    
Extension:      IhrisEmergency
Id:             ihris-emergency
Title:          "Emergency details"
* extension contains name 1..1 MS and
    relation 1..1 MS and
    phone 0..1 MS and
    mobile 0..1 MS and
    workPhone 0..1 MS and
    workEmail 0..1 MS and
    otherEmail 0..1 MS and
    address 0..1 MS and
    remark 0..1 MS and
    attachment 0..1 MS
* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Full Name"
* extension[name].valueString ^constraint[0].key = "ihris-name-check"
* extension[name].valueString ^constraint[0].severity = #error
* extension[name].valueString ^constraint[0].expression = "matches('^[A-Za-z ]*$')"
* extension[name].valueString ^constraint[0].human = "Name must be only text."
* extension[relation].value[x] only Coding
* extension[relation].valueCoding 1..1 MS
* extension[relation].valueCoding ^label = "Relationship"
* extension[relation].valueCoding from IhrisRelationValueSet (required)
* extension[phone].value[x] only string
* extension[phone].valueString 0..1 MS
* extension[phone].valueString ^label = "Home Phone"
* extension[mobile].value[x] only string
* extension[mobile].valueString 1..1 MS
* extension[mobile].valueString ^label = "Mobile Phone"
* extension[workPhone].value[x] only string
* extension[workPhone].valueString 0..1 MS
* extension[workPhone].valueString ^label = "Work Phone"
* extension[workEmail].value[x] only string
* extension[workEmail].valueString 0..1 MS
* extension[workEmail].valueString ^label = "Work Email"
* extension[otherEmail].value[x] only string
* extension[otherEmail].valueString 0..1 MS
* extension[otherEmail].valueString ^label = "Other Email"
* extension[address].value[x] only string
* extension[address].valueString 0..1 MS
* extension[address].valueString ^label = "P.O.BOX"
* extension[attachment].value[x] only Attachment
* extension[attachment].valueAttachment 0..1 MS
* extension[attachment].valueAttachment ^label = "Attachment"

Instance:       IhrisPractitionerWorkflowEmergency
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Emergency Workflow"
* description = "iHRIS workflow to record a Emergency"
* id = "ihris-emergency"
* url = "http://ihris.org/fhir/Questionnaire/ihris-emergency"
* name = "ihris-emergency"
* status = #active
* date = 2020-09-02
* purpose = "Workflow page for recording a Emergency information."

* item[0].linkId = "Basic"
* item[0].text = "Emergency"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Full Name"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false
* item[0].item[0].extension[constraint].extension[key].valueId = "ihris-given-name-check"
* item[0].item[0].extension[constraint].extension[severity].valueCode = #error
* item[0].item[0].extension[constraint].extension[expression].valueString = "matches('^[A-Za-z ]*$')"
* item[0].item[0].extension[constraint].extension[human].valueString = "Name must be only text."

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Relation"
* item[0].item[1].type = #choice
* item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-relation-valueset"
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Home Phone"
* item[0].item[2].type = #string
* item[0].item[2].required = false
* item[0].item[2].repeats = false
/* item[0].item[2].extension[constraint].extension[key].valueId = "ihris-home-phone-check"
* item[0].item[2].extension[constraint].extension[severity].valueCode = #error
* item[0].item[2].extension[constraint].extension[expression].valueString = "matches('^(([+][2][5][1][1-9][0-9]{8})|([0][1-9][0-9]{8})|$)')"
* item[0].item[2].extension[constraint].extension[human].valueString = "Phone Number is not properly formatted."*/

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Mobile Phone"
* item[0].item[3].type = #string
* item[0].item[3].required = false
* item[0].item[3].repeats = false
/* item[0].item[3].extension[constraint].extension[key].valueId = "ihris-mobile-phone-check"
* item[0].item[3].extension[constraint].extension[severity].valueCode = #error
* item[0].item[3].extension[constraint].extension[expression].valueString = "matches('^(([+][2][5][1][1-9][0-9]{8})|([0][1-9][0-9]{8})|$)')"
* item[0].item[3].extension[constraint].extension[human].valueString = "Phone Number is not properly formatted."*/

* item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[0].item[4].text = "Work Phone"
* item[0].item[4].type = #string
* item[0].item[4].required = false
* item[0].item[4].repeats = false
/* item[0].item[4].extension[constraint].extension[key].valueId = "ihris-work-phone-check"
* item[0].item[4].extension[constraint].extension[severity].valueCode = #error
* item[0].item[4].extension[constraint].extension[expression].valueString = "matches('^(([+][2][5][1][1-9][0-9]{8})|([0][1-9][0-9]{8})|$)')"
* item[0].item[4].extension[constraint].extension[human].valueString = "Phone Number is not properly formatted."*/

* item[0].item[5].linkId = "Basic.extension[0].extension[5]"
* item[0].item[5].text = "Work Email"
* item[0].item[5].type = #string
* item[0].item[5].required = false
* item[0].item[5].repeats = false
* item[0].item[5].extension[constraint].extension[key].valueId = "ihris-work-email-check"
* item[0].item[5].extension[constraint].extension[severity].valueCode = #error
* item[0].item[5].extension[constraint].extension[expression].valueString = "matches('^$|^([0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4})$')"
* item[0].item[5].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[0].item[6].linkId = "Basic.extension[0].extension[6]"
* item[0].item[6].text = "Other Email"
* item[0].item[6].type = #string
* item[0].item[6].required = false
* item[0].item[6].repeats = false
* item[0].item[6].extension[constraint].extension[key].valueId = "ihris-other-email-check"
* item[0].item[6].extension[constraint].extension[severity].valueCode = #error
* item[0].item[6].extension[constraint].extension[expression].valueString = "matches('^$|^([0-9a-zA-Z_.]+@([0-9a-zA-Z]+[.])+[a-zA-Z]{2,4})$')"
* item[0].item[6].extension[constraint].extension[human].valueString = "Email Address is not properly formatted."

* item[0].item[7].linkId = "Basic.extension[0].extension[7]"
* item[0].item[7].text = "P.O.BOX"
* item[0].item[7].type = #text
* item[0].item[7].required = false
* item[0].item[7].repeats = false

* item[0].item[8].linkId = "Basic.extension[0].extension[8]"
* item[0].item[8].text = "Remark"
* item[0].item[8].type = #text
* item[0].item[8].required = false
* item[0].item[8].repeats = false

* item[0].item[9].linkId = "Basic.extension[0].extension[9]"
* item[0].item[9].text = "Attachment"
* item[0].item[9].type = #attachment
* item[0].item[9].required = false
* item[0].item[9].repeats = false

Instance:       ihris-page-emergency
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Emergency Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-emergency)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Emergency|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-emergency').extension.where(url='name').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Emergency Contact"
* extension[section][0].extension[description].valueString = "Emergency Contact details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:emergency.extension:name.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:emergency.extension:altlangName.value[x]:valueString"
* extension[section][0].extension[field][3].valueString = "Basic.extension:emergency.extension:relation.value[x]:valueCoding"
* extension[section][0].extension[field][4].valueString = "Basic.extension:emergency.extension:phone.value[x]:valueString"
* extension[section][0].extension[field][5].valueString = "Basic.extension:emergency.extension:mobile.value[x]:valueString"
* extension[section][0].extension[field][6].valueString = "Basic.extension:emergency.extension:workPhone.value[x]:valueString"
* extension[section][0].extension[field][7].valueString = "Basic.extension:emergency.extension:otherPhone.value[x]:valueString"
* extension[section][0].extension[field][8].valueString = "Basic.extension:emergency.extension:workEmail.value[x]:valueString"
* extension[section][0].extension[field][9].valueString = "Basic.extension:emergency.extension:otherEmail.value[x]:valueString"
* extension[section][0].extension[field][10].valueString = "Basic.extension:emergency.extension:location.value[x]:valueReference"
* extension[section][0].extension[field][11].valueString = "Basic.extension:emergency.extension:city.value[x]:valueString"
* extension[section][0].extension[field][12].valueString = "Basic.extension:emergency.extension:kebele.value[x]:valueString"
* extension[section][0].extension[field][13].valueString = "Basic.extension:emergency.extension:houseNumber.value[x]:valueString"
* extension[section][0].extension[field][14].valueString = "Basic.extension:emergency.extension:address.value[x]:valueAddress"
* extension[section][0].extension[field][15].valueString = "Basic.extension:emergency.extension:remark.value[x]:valueString"
* extension[section][0].extension[field][16].valueString = "Basic.extension:emergency.extension:attachment.value[x]:valueAttachment"