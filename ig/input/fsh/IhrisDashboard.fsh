Profile:        IhrisDashboard
Parent:         Basic
Id:             ihris-dashboard
Title:          "iHRIS Dashboard"
Description:    "iHRIS Profile of the Basic resource to manage dashboards."
* code = IhrisResourceCodeSystem#dashboard
* extension contains
      IhrisBasicName named name 1..1 MS and
      IhrisDashboardVisualization named visualization 1..* MS

Extension:      IhrisDashboardVisualization
Id:             ihris-dashboard-visualization
Title:          "iHRIS Dashboard Visualization"
Description:    "iHRIS Dashboard Visualization"
* ^context[0].type = #element
* ^context[0].expression = "IhrisDashboard"
* extension contains
      vizID 1..1 MS and
      horizontal 1..1 MS and
      vertical 1..1 MS and
      width 1..1 MS and
      height 1..1 MS and
      heightPx 1..1 MS and
      itemID 1..1 MS and
      static 1..1 MS
* extension[vizID].value[x] only string
* extension[vizID].valueString 1..1 MS
* extension[vizID].valueString ^label = "Visualization ID"

* extension[horizontal].value[x] only decimal
* extension[horizontal].valueDecimal 1..1 MS
* extension[horizontal].valueDecimal ^label = "Visualization Horizontal Position"

* extension[vertical].value[x] only decimal
* extension[vertical].valueDecimal 1..1 MS
* extension[vertical].valueDecimal ^label = "Visualization Vertical Position"

* extension[width].value[x] only decimal
* extension[width].valueDecimal 1..1 MS
* extension[width].valueDecimal ^label = "Visualization Width Position"

* extension[height].value[x] only decimal
* extension[height].valueDecimal 1..1 MS
* extension[height].valueDecimal ^label = "Visualization Height Position"

* extension[heightPx].value[x] only decimal
* extension[heightPx].valueDecimal 1..1 MS
* extension[heightPx].valueDecimal ^label = "Visualization Height Position In Pixel"

* extension[itemID].value[x] only integer
* extension[itemID].valueInteger 1..1 MS
* extension[itemID].valueInteger ^label = "Visualization Unique ID On The Dashboard"

* extension[static].value[x] only boolean
* extension[static].valueBoolean 1..1 MS
* extension[static].valueBoolean ^label = "Whether Visualization Can Be Moved or Not"