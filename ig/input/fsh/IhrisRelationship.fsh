Profile:        IhrisRelationship
Parent:         Basic
Id:             iHRISRelationship
Title:          "iHRIS Resources Relationship Profile"
Description:    "iHRIS Resources Relationship Profile"

* extension contains
      IhrisReportDetails named reportdetails 1..1 MS and
      IhrisReportLink named reportlink 0..* MS

Extension:      IhrisReportDetails
Id:             iHRISReportDetails
Title:          "Details of a report"
Description:    "Defines the primary resource of the relationship"
* ^context.type = #element
* ^context.expression = "Basic"
* extension contains
      name 1..1 MS and
      label 1..1 MS and
      resource 1..1 MS and
      resourcePage 0..1 MS and
      initialFilter 0..1 MS and
      query 0..1 MS and
      cachingDisabled 0..1 MS and
      displayCheckbox 0..1 MS and
      locationBasedConstraint 0..1 MS and
      IhrisReportElement named reportelement 0..* MS
* extension[name].value[x] only string
* extension[name].valueString 1..1
* extension[name].valueString ^label = "Unique name of the primary resource in the relationship"
* extension[label].value[x] only string
* extension[label].valueString 1..1
* extension[label].valueString ^label = "Relationship title"
* extension[resource].value[x] only string
* extension[resource].valueString 1..1
* extension[resource].valueString ^label = "Resource type of the primary resource"
* extension[resourcePage].value[x] only string
* extension[resourcePage].valueString 0..1
* extension[resourcePage].valueString ^label = "Resource Page of the primary resource to display the data on click"
* extension[initialFilter].value[x] only string
* extension[initialFilter].valueString 1..1
* extension[initialFilter].valueString ^label = "Initial Profile filter to limit instances of this resource"
* extension[query].value[x] only string
* extension[query].valueString 1..1
* extension[query].valueString ^label = "FHIR path to limit instances of this resource"
* extension[cachingDisabled].value[x] only boolean
* extension[cachingDisabled].valueBoolean 1..1
* extension[cachingDisabled].valueBoolean ^label = "Disable caching data for this relationship"
* extension[displayCheckbox].value[x] only boolean
* extension[displayCheckbox].valueBoolean 1..1
* extension[displayCheckbox].valueBoolean ^label = "Whether rows of the report are selectable or not"
* extension[locationBasedConstraint].value[x] only boolean
* extension[locationBasedConstraint].valueBoolean 1..1
* extension[locationBasedConstraint].valueBoolean ^label = "Whether rows of the report are are limited by location or not"



Extension:      IhrisReportLink
Id:             iHRISReportLink
Title:          "Links to the primary resource"
Description:    "Links to the primary resource"
* extension contains
      name 1..1 MS and
      resource 1..1 MS and
      query 0..1 MS and
      initialFilter 0..1 MS and
      linkElement 1..1 MS and
      linkTo 1..1 MS and
      linkElementSearchParameter 0..1 MS and
      multiple 0..1 MS and
      IhrisReportElement named reportelement 0..* MS
* extension[name].value[x] only string
* extension[name].valueString 1..1
* extension[name].valueString ^label = "Unique name of the link"
* extension[resource].value[x] only string
* extension[resource].valueString 1..1
* extension[resource].valueString ^label = "FHIR resource type being linked"
* extension[query].value[x] only string
* extension[query].valueString 1..1
* extension[query].valueString ^label = "FHIR path to limit instances of this resource"
* extension[initialFilter].value[x] only string
* extension[initialFilter].valueString 1..1
* extension[initialFilter].valueString ^label = "Initial Profile filter to limit instances of this resource"
* extension[linkElement].value[x] only string
* extension[linkElement].valueString 1..1
* extension[linkElement].valueString ^label = "FHIR path of the field this resource used to link to the relationship"
* extension[linkTo].value[x] only string
* extension[linkTo].valueString 1..1
* extension[linkTo].valueString ^label = "FHIR path to the field of the resource that this resource linked to"
* extension[linkElementSearchParameter].value[x] only string
* extension[linkElementSearchParameter].valueString 1..1
* extension[linkElementSearchParameter].valueString ^label = "Search parameter to the resource this resource links to, only for reverse links"


Extension:      IhrisReportElement
Id:             iHRISReportElement
Title:          "Resource Fields"
Description:    "Lists fields of a resource to be displayed/cached"
* extension contains
      fhirpath 0..1 MS and
      function 0..1 MS and
      name 1..1 MS and
      display 0..1 MS and
      filter 0..1 MS and
      dropDownFilter 0..1 MS and
      order 0..1 MS
* extension[fhirpath].value[x] only string
* extension[fhirpath].valueString 1..1
* extension[fhirpath].valueString ^label = "FHIR path to the field"
* extension[function].value[x] only string
* extension[function].valueString 1..1
* extension[function].valueString ^label = "External function to be called to calculate value"
* extension[name].value[x] only string
* extension[name].valueString 1..1
* extension[name].valueString ^label = "Name of the field unique to the relationship"
* extension[display].value[x] only string
* extension[display].valueString 1..1
* extension[display].valueString ^label = "Human readable name if the relation is to be displayed on the UI"
* extension[filter].value[x] only boolean
* extension[filter].valueBoolean 1..1
* extension[filter].valueBoolean ^label = "Display as a filter"
* extension[dropDownFilter].value[x] only boolean
* extension[dropDownFilter].valueBoolean 1..1
* extension[dropDownFilter].valueBoolean ^label = "Display as a dropdown filter"
* extension[order].value[x] only integer
* extension[order].valueInteger 1..1
* extension[order].valueInteger ^label = "Order of the Field"


Instance:       ihris-es-report-mhero-send-message
InstanceOf:     IhrisRelationship
Title:          "iHRIS Relationship Example"
Usage:          #example

* code.text = "iHRIS Relationship"
* extension[reportdetails].extension[name].valueString = "mheropractitioner"
* extension[reportdetails].extension[label].valueString = "Employee List"
* extension[reportdetails].extension[resource].valueString = "Practitioner"
* extension[reportdetails].extension[query].valueString = "identifier.system=http://app.rapidpro.io/contact-uuid"
* extension[reportdetails].extension[displayCheckbox].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[name].valueString = "fullname"
* extension[reportdetails].extension[reportelement][0].extension[fhirpath].valueString = "name.where(use='official').last().text"
* extension[reportdetails].extension[reportelement][0].extension[display].valueString = "Fullname"
* extension[reportdetails].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[dropDownFilter].valueBoolean = false
* extension[reportdetails].extension[reportelement][1].extension[name].valueString = "phone"
* extension[reportdetails].extension[reportelement][1].extension[fhirpath].valueString = "telecom.where(system='phone').value"
* extension[reportdetails].extension[reportelement][1].extension[display].valueString = "Phone Number"
* extension[reportlink].extension[name].valueString = "group"
* extension[reportlink].extension[resource].valueString = "Group"
* extension[reportlink].extension[linkElement].valueString = "Group.member.entity.reference"
* extension[reportlink].extension[linkTo].valueString = "mheropractitioner"
* extension[reportlink].extension[linkElementSearchParameter].valueString = "member"
* extension[reportlink].extension[multiple].valueBoolean = true
* extension[reportlink].extension[reportelement][0].extension[name].valueString = "groupname"
* extension[reportlink].extension[reportelement][0].extension[fhirpath].valueString = "name"
* extension[reportlink].extension[reportelement][0].extension[display].valueString = "Contact Group"
* extension[reportlink].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true
* extension[reportlink].extension[name].valueString = "role"
* extension[reportlink].extension[resource].valueString = "PractitionerRole"
* extension[reportlink].extension[linkElement].valueString = "PractitionerRole.practitioner.reference"
* extension[reportlink].extension[linkTo].valueString = "mheropractitioner"
* extension[reportlink].extension[linkElementSearchParameter].valueString = "practitioner"
* extension[reportlink].extension[multiple].valueBoolean = false
* extension[reportlink].extension[name].valueString = "facility"
* extension[reportlink].extension[resource].valueString = "Location"
* extension[reportlink].extension[linkElement].valueString = "Location.id"
* extension[reportlink].extension[linkTo].valueString = "role.location"
* extension[reportlink].extension[multiple].valueBoolean = false
* extension[reportlink].extension[reportelement][0].extension[name].valueString = "facilityName"
* extension[reportlink].extension[reportelement][0].extension[fhirpath].valueString = "name"
* extension[reportlink].extension[reportelement][0].extension[display].valueString = "Facility"
* extension[reportlink].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true
* extension[reportlink].extension[name].valueString = "facility"
* extension[reportlink].extension[resource].valueString = "Location"
* extension[reportlink].extension[linkElement].valueString = "Location.id"
* extension[reportlink].extension[linkTo].valueString = "role.location"
* extension[reportlink].extension[multiple].valueBoolean = false
* extension[reportlink].extension[reportelement][0].extension[name].valueString = "facilityName"
* extension[reportlink].extension[reportelement][0].extension[fhirpath].valueString = "name"
* extension[reportlink].extension[reportelement][0].extension[display].valueString = "Facility"
* extension[reportlink].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true