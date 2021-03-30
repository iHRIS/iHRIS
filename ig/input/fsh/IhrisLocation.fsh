Profile:        IhrisJurisdiction
Parent:         Location
Id:             ihris-jurisdiction
Title:          "iHRIS Jurisdiction"
Description:    "iHRIS Profile of Locations to manage jurisdictions."
* type 1..1 MS
* type ^label = "Location Type"
* type.coding 1..1 MS
* type.coding ^label = "Location Type"
* type.coding from IhrisJurisdictionType (required)
* physicalType 1..1 MS
* physicalType ^label = "Location Physical Type"
* name 1..1 MS
* name ^label = "Name"
* status 1..1 MS
* status ^label = "Status"
* partOf 0..1 MS
* partOf only Reference(IhrisJurisdiction)
* partOf ^label = "Part Of(Country/Region/District/County)"
* extension contains http://hl7.org/fhir/StructureDefinition/location-boundary-geojson named geojson 0..*

Profile:        IhrisFacility
Parent:         Location
Id:             ihris-facility
Title:          "iHRIS Facility"
Description:    "iHRIS Profile of Locations to manage facilities."
* type 1..* MS
* type ^label = "Facilty Service Type"
* type.coding 1..1 MS
* type.coding ^label = "Facilty Service Type"
* physicalType 1..1 MS
* physicalType ^label = "Facilty Physical Type"
* name 1..1 MS
* name ^label = "Name"
* status 1..1 MS
* status ^label = "Status"
* position 0..1 MS
* position ^label = "Co-ordinates"
* partOf 1..1 MS 
* partOf only Reference(IhrisJurisdiction)
* partOf ^label = "Part Of(Country/Region/Zone/Woreda)"

ValueSet:         IhrisJurisdictionType
Id:               ihris-jurisdiction-type
Title:            "iHRIS Jurisdiction Type ValueSet"
* ^date = "2020-11-12T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisJurisdictionType

CodeSystem:      IhrisJurisdictionType
Id:              ihris-jurisdiction-type
Title:           "Jurisdiction Type(Country/Region/District/County)"
* ^date = "2020-11-12T08:41:04.362Z"
* ^version = "0.3.0"
* #country "Country" "Country"
* #region "Region" "Region"
* #district "District" "District"
* #county "County" "County"

Instance:       ihris-page-facility
InstanceOf:     IhrisPage
Title:          "iHRIS Facility Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-facility)
* extension[display].extension[search][0].valueString = "Facility Name|name"
* extension[display].extension[search][1].valueString = "Facility Type|type[1].text"
* extension[display].extension[search][2].valueString = "Facility Physical Type|physicalType.text"
* extension[display].extension[search][3].valueString = "Jurisdiction|partOf.reference"
* extension[display].extension[search][4].valueString = "Status|status"
/* extension[display].extension[search][3].valueString = "Longitute|position.longitude"
* extension[display].extension[search][4].valueString = "Latitude|position.latitude"*/
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Type|type|http://terminology.hl7.org/CodeSystem/v3-RoleCode"
* extension[display].extension[filter][2].valueString = "Physical Type|physicalType|http://hl7.org/fhir/ValueSet/location-physical-type"
* extension[section][0].extension[title].valueString = "Facility"
* extension[section][0].extension[description].valueString = "Facility/Duty Post details"
* extension[section][0].extension[name].valueString = "Facility"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.type"
* extension[section][0].extension[field][2].valueString = "Location.physicalType"
* extension[section][0].extension[field][3].valueString = "Location.partOf"
* extension[section][0].extension[field][4].valueString = "Location.status"
* extension[section][0].extension[field][5].valueString = "Location.position"
/* extension[section][1].extension[title].valueString = "Geographic location"
* extension[section][1].extension[description].valueString = "Geo-Coordinates for this Locatio"
* extension[section][1].extension[name].valueString = "coordinates"
* extension[section][1].extension[field][0].valueString = "Location.position.longitude"
* extension[section][1].extension[field][1].valueString = "Location.position.latitude"
* extension[section][1].extension[title].valueString = "Contact Details"
* extension[section][1].extension[description].valueString = "email, phone numbers"
* extension[section][1].extension[name].valueString = "contact"
* extension[section][1].extension[field][0].valueString = "Location.telecom"
* extension[section][2].extension[title].valueString = "Location"
* extension[section][2].extension[description].valueString = "Location this Location is partOf"
* extension[section][2].extension[name].valueString = "location"
* extension[section][2].extension[field][0].valueString = "Location.partOf"*/

Instance:       ihris-page-location
InstanceOf:     IhrisPage
Title:          "iHRIS Location Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-jurisdiction)
* extension[display].extension[search][0].valueString = "Name|name"
* extension[display].extension[search][1].valueString = "Type|type.coding.code"
* extension[display].extension[search][2].valueString = "Physical Type|physicalType.text"
* extension[display].extension[search][3].valueString = "Jurisdiction|partOf.reference"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Type|type|http://ihris.org/fhir/ValueSet/ihris-jurisdiction-type"
* extension[display].extension[filter][2].valueString = "Jurisdiction|partOf"
* extension[section][0].extension[title].valueString = "Geographical Location"
* extension[section][0].extension[description].valueString = "Geographical Location details"
* extension[section][0].extension[name].valueString = "Geographical Location"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.type"
* extension[section][0].extension[field][2].valueString = "Location.physicalType"
* extension[section][0].extension[field][3].valueString = "Location.partOf"
* extension[section][0].extension[field][4].valueString = "Location.status"