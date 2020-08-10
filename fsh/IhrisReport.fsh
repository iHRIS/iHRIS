Profile:        IhrisReport
Parent:         Basic
Id:             ihris-report
Title:          "iHRIS Report"
Description:    "iHRIS Profile of the Basic resource to manage reports."
* extension contains
      IhrisReportDetails named reportDetails 1..1 MS

Extension:      IhrisReportDetails
Id:             ihris-report-details
Title:          "iHRIS Report Details"
Description:    "iHRIS Report Details."
* ^context.type = #element
* ^context.expression = "IhrisReport"
* extension contains
      name 1..1 MS and
      displayCheckbox 1..1 MS and
      graphDefinition 1..1 MS and
      IhrisResourceRelationships named resourceRelationships 1..* MS
* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Report Display Name"
* extension[displayCheckbox].value[x] only boolean
* extension[displayCheckbox].valueBoolean 0..1 MS
* extension[displayCheckbox].valueBoolean ^label = "Whether checkboxes should be displayed or not on the report"
* extension[graphDefinition].value[x] only Reference
* extension[graphDefinition].valueReference only Reference(GraphDefinition)
* extension[graphDefinition].valueReference 1..1 MS
* extension[graphDefinition].valueReference ^label = "Relationships Between Resources"

Extension:      IhrisResourceRelationships
Id:             ihris-resource-relationships
Title:          "iHRIS Resource Relationships"
Description:    "iHRIS Resource Relationships"
* ^context.type = #element
* ^context.expression = "IhrisResourceRelationships"
* extension contains
      name 1..1 MS and
      field 1..* MS and
      filter 1..* MS and
      query 0..1 MS
* extension[name].value[x] only Reference
* extension[name].valueReference only Reference(StructureDefinition)
* extension[name].valueReference 1..1 MS
* extension[name].valueReference ^label = "Resource Name"
* extension[field].value[x] only string
* extension[field].valueString 1..1 MS
* extension[field].valueString ^label = "Report Fields"
* extension[filter].value[x] only string
* extension[filter].valueString 1..1 MS
* extension[filter].valueString ^label = "Report Filters"
* extension[query].value[x] only string
* extension[query].valueString 1..1 MS
* extension[query].valueString ^label = "Query to Include Resource"
* extension[filter].value[x] only string
* extension[filter].valueString 1..1 MS
* extension[filter].valueString ^label = "Data filters"
