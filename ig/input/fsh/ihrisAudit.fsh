Profile:        IhrisAuditEvent
Parent:         AuditEvent
Id:             ihris-auditevent
Title:          "iHRIS Audit Event"
Description:    "iHRIS profile for AuditEvent"
* type 1..1 MS
* type ^label = "Type"
* subtype 0..1 MS
* subtype ^label = "SubType"
* action 0..1 MS
* action ^label = "Action"
* recorded 1..1 MS
* recorded ^label = "Time Recorded"
* outcome 1..1 MS
* outcome ^label = "Outcome"
* agent 1..* MS
* agent ^label = "Agent"
* agent.altId 0..1 MS
* agent.altId ^label = "User AltId"
* agent.name 0..1 MS
* agent.name ^label = "Name"
* agent.requestor 1..1 MS
* agent.requestor ^label = "Requestor"
* agent.network 0..1 MS
* agent.network ^label = "Network"
* agent.network.address 0..1 MS
* agent.network.address ^label = "Network Address"
* agent.network.type 0..1 MS
* agent.network.type ^label = "Type of Network Device"
* source 1..1 MS
* source ^label = "Audit Event Reporter"
* source.observer 1..1 MS
* source.observer ^label = "Identity Of Source"
* source.type 0..* MS
* source.type ^label = "Type of Source"
* entity 0..* MS
* entity ^label = "Entity/Data"
* entity.what 0..1 MS
* entity.what ^label = "Resource"
* entity.detail 0..* MS
* entity.detail ^label = "Additional Information"

Instance:       ihris-page-auditevent
InstanceOf:     IhrisPage
Title:          "AuditEvent"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-auditevent)
* extension[display].extension[search][0].valueString = "Id|AuditEvent.id"
* extension[display].extension[search][1].valueString = "User AltId|AuditEvent.agent.altId"
* extension[display].extension[search][2].valueString = "User|AuditEvent.agent.name"
* extension[display].extension[search][3].valueString = "Action|AuditEvent.subtype.display"
* extension[display].extension[search][4].valueString = "Resource|AuditEvent.entity.what.reference"
* extension[display].extension[search][5].valueString = "Outcome|AuditEvent.outcome"
* extension[display].extension[search][6].valueString = "Resource(If Error)|AuditEvent.entity.detail.where(type='resource').valueString"
* extension[display].extension[search][7].valueString = "Error|AuditEvent.entity.detail.where(type='error').valueString"
* extension[display].extension[search][8].valueString = "Time/Date|AuditEvent.recorded"
* extension[display].extension[filter][0].valueString = "Action|subtype|http://dicom.nema.org/resources/ontology/DCM"
* extension[display].extension[filter][1].valueString = "User AltId|altid"
* extension[display].extension[filter][2].valueString = "User|agent-name:contains"
* extension[display].extension[filter][3].valueString = "Date|date"
* extension[section][0].extension[title].valueString = "Audit Events/Logs"
* extension[section][0].extension[description].valueString = "System Logs details"
* extension[section][0].extension[name].valueString = "AuditEvent"
* extension[section][0].extension[field][0].valueString = "AuditEvent.agent.altIdd"
* extension[section][0].extension[field][1].valueString = "AuditEvent.agent.name"
* extension[section][0].extension[field][2].valueString = "AuditEvent.subtype.display"
* extension[section][0].extension[field][3].valueString = "AuditEvent.entity.what.reference"
* extension[section][0].extension[field][4].valueString = "AuditEvent.outcome"
* extension[section][0].extension[field][5].valueString = "AuditEvent.recorded"