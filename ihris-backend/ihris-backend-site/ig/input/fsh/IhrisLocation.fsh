Profile:        IhrisJurisdiction
Parent:         Location
Id:             ihris-jurisdiction
Title:          "Jurisdiction"
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
* extension contains http://hl7.org/fhir/StructureDefinition/location-boundary-geojson named geojson 0..1
* extension[geojson] ^label = "Location Boundary(Geojson)"

Profile:        IhrisFacility
Parent:         Location
Id:             ihris-facility
Title:          "iHRIS Facility"
Description:    "iHRIS Profile of Locations to manage facilities."
* type 1..* MS
* type ^label = "Facility Service Type"
* type.coding 1..1 MS
* type.coding from IhrisFacilityTypeValueSet
* type.coding ^label = "Facility Service Type"
* physicalType 1..1 MS
* physicalType ^label = "Facility Physical Type"
* physicalType.coding 1..1 MS
* physicalType.coding ^label = "Facility Physical Type"
* identifier MS
* identifier ^label = "Identifier"
* identifier.use 1..1
* identifier.value MS
* identifier.value ^label = "Value"
* identifier.type MS
* identifier.type ^label = "Type"
* identifier.type.coding MS
* identifier.type.coding ^label = "Type"
* identifier.type.coding from IhrisFacilityIdentifierValueSet
* identifier.type from IhrisFacilityIdentifierValueSet
* extension contains
        IhrisFacilityOwnership named ownership 0..1 MS /*and
        IhrisFacilityInformationDetails named facilityInformationDetails 0..1 MS
* extension[ownership].valueCoding MS
* extension[ownership] ^label = "Ownership"
* extension[facilityInformationDetails].extension[logo].valueAttachment ^label = "Facility Logo"
* extension[facilityInformationDetails].extension[logo].valueAttachment MS
* extension[facilityInformationDetails].extension[stamp].valueAttachment ^label = "Facility Stamp"
* extension[facilityInformationDetails].extension[stamp].valueAttachment MS
* extension[facilityInformationDetails].extension[signature].valueAttachment ^label = "Facility Signature"
* extension[facilityInformationDetails].extension[signature].valueAttachment MS*/
* name 1..1 MS
* name ^label = "Name"
* status 1..1 MS
* status ^label = "Status"
* position 0..1 MS
* position ^label = "Co-ordinates"
* position.longitude 1..1 MS
* position.longitude ^label = "Longitude"
* position.latitude 1..1 MS
* position.latitude ^label = "Latitude"
* partOf 1..1 MS 
* partOf only Reference(IhrisJurisdiction)
* partOf ^label = "Part Of(Country/Region/District/County)"

ValueSet:         IhrisFacilityIdentifierValueSet
Id:               ihris-Facility-identifier-valueset
Title:            "iHRIS facility Identifier ValueSet"
* ^date = "2022-02-13T08:41:04.362Z"
* ^version = "0.4.0"
* codes from system IhrisFacilityIdentifierCodeSystem

CodeSystem:       IhrisFacilityIdentifierCodeSystem
Id:               ihris-Facility-identifier
Title:            "Identifier Type"
* ^date = "2022-02-13T08:41:04.362Z"
* ^version = "0.4.0"
* #dhis2Id "DHIS2 ID"
* #mfrId "MFR ID"

/*Extension: IhrisFacilityInformationDetails
Id: ihris-facility-information-details
Title: "Ihris Facility Information Details"
Description: "Defines the primary resource of the facility information "
* ^context.type = #element
* ^context.expression = "Basic"
*  extension contains
        logo 0..1 MS and
        stamp 0..1 MS and
        signature 0..1 MS
* extension[logo].value[x] only Attachment
* extension[logo].valueAttachment 0..1 MS
* extension[logo].valueAttachment ^label = "Facility Logo"
* extension[stamp].value[x] only Attachment
* extension[stamp].valueAttachment 0..1 MS
* extension[stamp].valueAttachment ^label = "Facility Stamp"
* extension[signature].value[x] only Attachment
* extension[signature].valueAttachment 0..1 MS
* extension[signature].valueAttachment ^label = "Facility Authority Signature"*/

ValueSet:         IhrisFacilityOwnershipValueSet
Id:               Ihris-facility-ownership
Title:            "iHRIS Facility Ownership ValueSet"
* ^date = "2022-02-23T08:41:04.362Z"
* ^version = "0.4.0"
* codes from system IhrisFacilityOwnershipTypeCodeSystem

CodeSystem:      IhrisFacilityOwnershipTypeCodeSystem
Id:             Ihris-facility-ownership-type
Title:           "Facility Ownership Type"
* ^date = "2022-02-23T08:41:04.362Z"
* ^version = "0.4.0"
* #private "Private" 
* #government "Government"
* #NGO "NGO's"

ValueSet:         IhrisJurisdictionType
Id:               ihris-jurisdiction-type
Title:            "iHRIS Jurisdiction Type ValueSet"
* ^date = "2020-11-12T08:41:04.362Z"
* ^version = "0.4.0"
* codes from system IhrisJurisdictionType

CodeSystem:      IhrisJurisdictionType
Id:              ihris-jurisdiction-type
Title:           "Jurisdiction Type"
* ^date = "2020-11-12T08:41:04.362Z"
* ^version = "0.4.0"
* #country "Country" "Country"
* #municipality "Municipality" "Municipality"
* #subdistrict "Sub District" "Sub District"
* #village "Village" "Village"

ValueSet:         IhrisFacilityTypeValueSet
Id:               ihris-facility-type
Title:            "iHRIS Facility Type ValueSet"
* ^date = "2022-02-25T08:41:04.362Z"
* ^version = "0.9.0"
* codes from system IhrisFacilityType

CodeSystem:      IhrisFacilityType
Id:              ihris-facility-type
Title:           "Facility Type"
* ^date = "2022-02-25T08:41:04.362Z"
* ^version = "0.9.0"
* #hospital "Hospital"
* #HC "Health Center"
* #HP "Health Post"
* #LAB "Laboratory"
* #IC "Imaging Center"
* #SC "Specaility Clinic"
* #CLC "Clinic"
* #SPC "Speciality Center"
* #PHARM "Pharmacy"
* #HI "Health Institution"
* #HSC "Health Science College"
* #AGN "Agencies"
* #NGOs "NGOs"
* #ASSO "Association"

Extension:      IhrisFacilityOwnership
Id:             ihris-facility-ownership-prefix
Title:          "iHRIS facility ownership type"
Description:    "iHRIS extension for Personal Prefix."
* ^context.type = #element
* ^context.expression = "Location"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Ownership"
* valueCoding from IhrisFacilityOwnershipValueSet (required)


Instance:       ihris-page-facility
InstanceOf:     IhrisPage
Title:          "iHRIS Facility Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-facility)
* extension[display].extension[search][0].valueString = "Facility Name|name"
* extension[display].extension[search][1].valueString = "Facility Type|type.coding.display"
* extension[display].extension[search][2].valueString = "Facility Physical Type|physicalType.coding.display"
* extension[display].extension[search][3].valueString = "Report To|partOf.reference"
* extension[display].extension[search][4].valueString = "Status|status"
* extension[display].extension[search][5].valueString = "Longitute|position.longitude"
* extension[display].extension[search][6].valueString = "Latitude|position.latitude"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Type|type|http://ihris.org/fhir/ValueSet/ihris-facility-type"
* extension[display].extension[filter][2].valueString = "Physical Type|physicalType|http://hl7.org/fhir/ValueSet/location-physical-type"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/facility/FIELD?edit=true"
* extension[display].extension[link][0].extension[field].valueString = "Location.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "secondary"
* extension[section][0].extension[title].valueString = "Facility"
* extension[section][0].extension[description].valueString = "Facility/Duty Post details"
* extension[section][0].extension[name].valueString = "Location"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][2].valueString = "Location.type"
* extension[section][0].extension[field][1].valueString = "Location.physicalType"
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
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/location/FIELD?edit=true"
* extension[display].extension[link][0].extension[field].valueString = "Location.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "secondary"
* extension[section][0].extension[title].valueString = "Geographical Location"
* extension[section][0].extension[description].valueString = "Geographical Location details"
* extension[section][0].extension[name].valueString = "Geographical Location"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.type"
* extension[section][0].extension[field][2].valueString = "Location.physicalType"
* extension[section][0].extension[field][3].valueString = "Location.partOf"
* extension[section][0].extension[field][4].valueString = "Location.status"