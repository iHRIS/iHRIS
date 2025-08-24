Profile:        IhrisCountry
Parent:         Location
Id:             ihris-country
Title:          "Country"
Description:    "iHRIS Profile of Locations to manage jurisdictions."
* type 1..1 MS
* type ^label = "Location Type"
* type.coding 1..1 MS
* type.coding ^label = "Location Type"
* type.coding from IhrisJurisdictionType (required)
* identifier 0..1 MS
* identifier ^label = "Identifier"
* identifier.value MS
* identifier.value ^label = "Code"
* physicalType 1..1 MS
* physicalType ^label = "Location Physical Type"
* name 1..1 MS
* name ^label = "Name"
* status 1..1 MS
* status ^label = "Status"
* partOf 0..0 MS
* extension contains http://ihris.org/fhir/StructureDefinition/location-boundary-geojson named boundary 0..1 MS
* extension[boundary] 0..1 MS
* extension[boundary] ^label = "Location Boundary (GeoJSON)"
* extension[boundary].valueAttachment 0..1 MS
* extension[boundary].valueAttachment ^label = "Location Boundary (GeoJSON)"
* extension[boundary].valueAttachment.contentType = #application/geo+json
* extension[boundary].valueAttachment.data MS

Profile:        IhrisRegion
Parent:         Location
Id:             ihris-region
Title:          "Region"
Description:    "iHRIS Profile of Locations to manage jurisdictions."
* type 1..1 MS
* type ^label = "Location Type"
* type.coding 1..1 MS
* type.coding ^label = "Location Type"
* type.coding from IhrisJurisdictionType (required)
* identifier 0..1 MS
* identifier ^label = "Identifier"
* identifier.value MS
* identifier.value ^label = "Code"
* physicalType 1..1 MS
* physicalType ^label = "Location Physical Type"
* name 1..1 MS
* name ^label = "Name"
* status 1..1 MS
* status ^label = "Status"
* partOf 1..1 MS
* partOf only Reference(IhrisCountry)
* partOf ^label = "Country"
* extension contains http://ihris.org/fhir/StructureDefinition/location-boundary-geojson named boundary 0..1 MS
* extension[boundary] 0..1 MS
* extension[boundary] ^label = "Location Boundary (GeoJSON)"
* extension[boundary].valueAttachment 0..1 MS
* extension[boundary].valueAttachment ^label = "Location Boundary (GeoJSON)"
* extension[boundary].valueAttachment.contentType = #application/geo+json
* extension[boundary].valueAttachment.data MS

Profile:        IhrisDistrict
Parent:         Location
Id:             ihris-district
Title:          "District"
Description:    "iHRIS Profile of Locations to manage jurisdictions."
* type 1..1 MS
* type ^label = "Location Type"
* type.coding 1..1 MS
* type.coding ^label = "Location Type"
* type.coding from IhrisJurisdictionType (required)
* identifier 0..1 MS
* identifier ^label = "Identifier"
* identifier.value MS
* identifier.value ^label = "Code"
* physicalType 1..1 MS
* physicalType ^label = "Location Physical Type"
* name 1..1 MS
* name ^label = "Name"
* status 1..1 MS
* status ^label = "Status"
* partOf 1..1 MS
* partOf only Reference(IhrisRegion)
* partOf ^label = "Region"
* extension contains http://ihris.org/fhir/StructureDefinition/location-boundary-geojson named boundary 0..1 MS
* extension[boundary] 0..1 MS
* extension[boundary] ^label = "Location Boundary (GeoJSON)"
* extension[boundary].valueAttachment 0..1 MS
* extension[boundary].valueAttachment ^label = "Location Boundary (GeoJSON)"
* extension[boundary].valueAttachment.contentType = #application/geo+json
* extension[boundary].valueAttachment.data MS

Profile:        IhrisFacility
Parent:         Location
Id:             ihris-facility
Title:          "Facility"
Description:    "Profile of Locations to manage facilities."
* type 1..1 MS
* type ^label = "Facility Type"
* type.coding 1..1 MS
* type.coding from FacilityTypeValueSet
* type.coding ^label = "Facility Type"
* identifier 0..1 MS
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
* partOf only Reference(IhrisDistrict)
* partOf ^label = "Location"
* extension contains
        IhrisFacilityOwnership named ownership 0..1 MS
* extension[ownership].valueCoding MS
* extension[ownership] ^label = "Ownership"

CodeSystem:       FacilityTypeCodeSystem
Id:               facility-type-codesystem
Title:            "Facility Type Code System"
* ^date = "2024-02-19T13:43:00.000Z"
* ^version = "0.1.0"

ValueSet:         FacilityTypeValueSet
Id:               facility-type-valueset
Title:            "Facility Type ValueSet"
* ^date = "2024-02-19T13:43:00.000Z"
* ^version = "0.1.0"
* codes from system FacilityTypeCodeSystem

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
* ^date = "2023-06-12T08:41:04.362Z"
* ^version = "0.5.0"
* codes from system IhrisJurisdictionType

CodeSystem:      IhrisJurisdictionType
Id:              ihris-jurisdiction-type
Title:           "Jurisdiction Type"
* ^date = "2023-06-12T08:41:04.362Z"
* ^version = "0.6.0"
* #country "Country" "Country"
* #region "Region" "Region"
* #district "District" "District"
* #ta "TA" "TA"


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

Alias: $m49.htm = http://unstats.un.org/unsd/methods/m49/m49.htm

Extension: LocBoundaryGeojson
Id: location-boundary-geojson
Title: "Location Boundary (GeoJSON)"
Description: "A boundary shape that represents the outside edge of the location (in GeoJSON format) This shape may have holes, and disconnected shapes."
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.5.1102"
* ^version = "1.0.0"
* ^experimental = false
* ^date = "2020-12-28T16:55:11+11:00"
* ^publisher = "HL7 International / FHIR Infrastructure"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/Special/committees/fhir-i"
* ^jurisdiction = $m49.htm#001
* ^context.type = #element
* ^context.expression = "Location"
* . 0..1
* . ^short = "A boundary shape that represents the outside edge of the location (in GeoJSON format)"
* . ^definition = "A boundary shape that represents the outside edge of the location (in GeoJSON format) This shape may have holes, and disconnected shapes."
* . ^comment = "The format of the content is GeoJSON in both the JSON and XML formats. It will be stored in the resource using the .data property, and externally referenced via the URL property. The mimetype to be used will be 'application/geo+json'."
* value[x] 0..1
* value[x] only Attachment

Extension:      LocationCode
Id:             locationcode
Title:          "Code"
Description:    "Code."
* ^context.type = #element
* ^context.expression = "Location"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Code"

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

Instance:       ihris-page-facility-type
InstanceOf:     IhrisPage
Title:          "Facility Type Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/facility-type-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Action|display"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Facility Type"
* extension[section][0].extension[description].valueString = "Facility Type"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"


Instance:       ihris-page-ihris-facility
InstanceOf:     IhrisPage
Title:          "iHRIS Facility Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-facility)
* extension[display].extension[search][0].valueString = "Facility Name|name"
* extension[display].extension[search][1].valueString = "Facility Type|type.coding.display"
* extension[display].extension[search][2].valueString = "Location|partOf"
* extension[display].extension[search][3].valueString = "Status|status"
* extension[display].extension[search][4].valueString = "Longitute|position.longitude"
* extension[display].extension[search][5].valueString = "Latitude|position.latitude"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Type|type|http://ihris.org/fhir/ValueSet/facility-type-valueset"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/ihris-facility/FIELD?edit=true"
* extension[display].extension[link][0].extension[field].valueString = "Location.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "primary"
* extension[section][0].extension[title].valueString = "Facility"
* extension[section][0].extension[description].valueString = "Facility"
* extension[section][0].extension[name].valueString = "Location"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.type"
* extension[section][0].extension[field][2].valueString = "Location.identifier"
* extension[section][0].extension[field][3].valueString = "Location.partOf"
* extension[section][0].extension[field][4].valueString = "Location.status"
* extension[section][0].extension[field][5].valueString = "Location.position"

Instance:       ihris-page-ihris-country
InstanceOf:     IhrisPage
Title:          "District Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-country)
* extension[display].extension[search][0].valueString = "Name|name"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/ihris-country/FIELD?edit=true"
* extension[display].extension[link][0].extension[field].valueString = "Location.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "primary"
* extension[section][0].extension[title].valueString = "Countries"
* extension[section][0].extension[description].valueString = "Countries"
* extension[section][0].extension[name].valueString = "Countries"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.type"
* extension[section][0].extension[field][2].valueString = "Location.status"
* extension[section][0].extension[field][3].valueString = "Location.extension:boundary"

Instance:       ihris-page-ihris-region
InstanceOf:     IhrisPage
Title:          "Region Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-region)
* extension[display].extension[search][0].valueString = "Name|name"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/ihris-region/FIELD?edit=true"
* extension[display].extension[link][0].extension[field].valueString = "Location.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "primary"
* extension[section][0].extension[title].valueString = "Regions"
* extension[section][0].extension[description].valueString = "Regions"
* extension[section][0].extension[name].valueString = "region"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.identifier"
* extension[section][0].extension[field][2].valueString = "Location.type"
* extension[section][0].extension[field][3].valueString = "Location.partOf"
* extension[section][0].extension[field][4].valueString = "Location.status"
* extension[section][0].extension[field][5].valueString = "Location.extension:boundary"

Instance:       ihris-page-ihris-district
InstanceOf:     IhrisPage
Title:          "Namibia District Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-district)
* extension[display].extension[search][0].valueString = "Name|name"
* extension[display].extension[search][1].valueString = "Region|partOf"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/ihris-district/FIELD?edit=true"
* extension[display].extension[link][0].extension[field].valueString = "Location.id"
* extension[display].extension[link][0].extension[text].valueString = "Edit"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-pencil"
* extension[display].extension[link][0].extension[class].valueString = "primary"
* extension[section][0].extension[title].valueString = "Districts"
* extension[section][0].extension[description].valueString = "Districts"
* extension[section][0].extension[name].valueString = "Districts"
* extension[section][0].extension[field][0].valueString = "Location.name"
* extension[section][0].extension[field][1].valueString = "Location.identifier"
* extension[section][0].extension[field][2].valueString = "Location.type"
* extension[section][0].extension[field][3].valueString = "Location.partOf"
* extension[section][0].extension[field][4].valueString = "Location.status"
* extension[section][0].extension[field][5].valueString = "Location.extension:boundary"