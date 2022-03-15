Instance:       ihris-es-contacts-report
InstanceOf:     IhrisRelationship
Title:          "NHWR Relationship"
Usage:          #example

* code.text = "iHRISRelationship"
* code.coding = #iHRISRelationship
* subject.reference = "StructureDefinition/ihris-practitioner"
* extension[reportdetails].extension[name].valueString = "practitioner"
* extension[reportdetails].extension[label].valueString = "NHWR Contacts"
* extension[reportdetails].extension[resource].valueString = "Practitioner"
* extension[reportdetails].extension[query].valueString = "active=true"
* extension[reportdetails].extension[reportelement][0].extension[label].valueString = "prefix"
* extension[reportdetails].extension[reportelement][0].extension[name].valueString = "name.prefix"
* extension[reportdetails].extension[reportelement][0].extension[display].valueString = "Prefix"

* extension[reportdetails].extension[reportelement][1].extension[label].valueString = "given"
* extension[reportdetails].extension[reportelement][1].extension[name].valueString = "name.where(use='official').first().given"
* extension[reportdetails].extension[reportelement][1].extension[display].valueString = "Given name"

* extension[reportdetails].extension[reportelement][2].extension[label].valueString = "family"
* extension[reportdetails].extension[reportelement][2].extension[name].valueString = "name.where(use='official').family"
* extension[reportdetails].extension[reportelement][2].extension[display].valueString = "Family name"

* extension[reportdetails].extension[reportelement][3].extension[label].valueString = "given"
* extension[reportdetails].extension[reportelement][3].extension[name].valueString = "name.where(use='official').first().given"
* extension[reportdetails].extension[reportelement][3].extension[display].valueString = "Given name"

* extension[reportdetails].extension[reportelement][4].extension[label].valueString = "phone"
* extension[reportdetails].extension[reportelement][4].extension[name].valueString = "telecom.where(system='phone').value"
* extension[reportdetails].extension[reportelement][4].extension[display].valueString = "Phone"

* extension[reportdetails].extension[reportelement][5].extension[label].valueString = "email"
* extension[reportdetails].extension[reportelement][5].extension[name].valueString = "telecom.where(system='email').value"
* extension[reportdetails].extension[reportelement][5].extension[display].valueString = "Email"