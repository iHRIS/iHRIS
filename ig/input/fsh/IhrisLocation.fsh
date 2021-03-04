Profile:        IhrisJurisdiction
Parent:         Location
Id:             ihris-jurisdiction
Title:          "iHRIS Jurisdiction"
Description:    "iHRIS Profile of Locations to manage jurisdictions."
* type 2..* MS
* physicalType 1..1 MS
* name 1..1 MS
* status 1..1 MS
* partOf 0..1 MS
* partOf only Reference(IhrisJurisdiction)
* extension contains http://hl7.org/fhir/StructureDefinition/location-boundary-geojson named geojson 0..*

Profile:        IhrisFacility
Parent:         Location
Id:             ihris-facility
Title:          "iHRIS Facility"
Description:    "iHRIS Profile of Locations to manage facilities."
* type 2..* MS
* physicalType 1..1 MS
* name 1..1 MS
* status 1..1 MS
* position 0..1 MS
* partOf 1..1 MS 
* partOf only Reference(IhrisJurisdiction)
