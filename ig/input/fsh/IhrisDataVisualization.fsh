Profile:        IhrisDataVisualization
Parent:         Basic
Id:             ihris-data-visualization
Title:          "iHRIS Data Visualizer"
Description:    "iHRIS Profile of the Basic resource to manage visualizations."
* code = IhrisResourceCodeSystem#visualization
* extension contains
      IhrisBasicName named name 1..1 MS and
      IhrisVisualizationDataset named dataset 1..1 MS and
      IhrisVisualizationCategories named categories 1..* MS and
      IhrisVisualizationSeries named series 1..* MS and
      IhrisVisualizationFilters named filters 0..* MS and
      IhrisVisualizationPermissions named permissions 1..1 MS and
      IhrisVisualizationSettings named settings 0..* MS

Extension:      IhrisVisualizationDataset
Id:             ihris-visualization-dataset
Title:          "iHRIS Visualization Dataset"
Description:    "iHRIS visualization dataset"
* ^context[0].type = #element
* ^context[0].expression = "IhrisDataVisualization"
* extension contains
      id 1..1 MS and
      name 1..1 MS
* extension[id].value[x] only string
* extension[id].valueString 1..1 MS
* extension[id].valueString ^label = "Dataset ID"

* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Dataset Name"

Extension:      IhrisVisualizationCategories
Id:             ihris-visualization-categories
Title:          "iHRIS Visualization Categories"
Description:    "iHRIS visualization categories"
* ^context[0].type = #element
* ^context[0].expression = "IhrisDataVisualization"
* extension contains
      name 0..* MS and
      selectedValues 0..* MS and
      defaultFilter 1..1 MS and
      filterCondition 0..1 MS

* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Category Name"

* extension[selectedValues].value[x] only base64Binary
* extension[selectedValues].valueBase64Binary 1..1 MS
* extension[selectedValues].valueBase64Binary ^label = "Filter Categories by Selected Values"

* extension[defaultFilter].value[x] only string
* extension[defaultFilter].valueString 1..1 MS
* extension[defaultFilter].valueString ^label = "Categories Default Filter"

* extension[filterCondition].value[x] only string
* extension[filterCondition].valueString 1..1 MS
* extension[filterCondition].valueString ^label = "Categories Filter Condition"

Extension:      IhrisVisualizationSeries
Id:             ihris-visualization-series
Title:          "iHRIS Visualization Series"
Description:    "iHRIS visualization series"
* ^context[0].type = #element
* ^context[0].expression = "IhrisDataVisualization"
* extension contains
      name 0..* MS and
      aggsBy 1..1 MS and
      selectedValues 0..* MS and
      defaultFilter 1..1 MS and
      filterCondition 0..1 MS

* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Series Name"

* extension[aggsBy].value[x] only string
* extension[aggsBy].valueString 1..1 MS
* extension[aggsBy].valueString ^label = "Series Aggregation"

* extension[selectedValues].value[x] only base64Binary
* extension[selectedValues].valueBase64Binary 1..1 MS
* extension[selectedValues].valueBase64Binary ^label = "Filter Series by Selected Values"

* extension[defaultFilter].value[x] only string
* extension[defaultFilter].valueString 1..1 MS
* extension[defaultFilter].valueString ^label = "Series Default Filter"

* extension[filterCondition].value[x] only string
* extension[filterCondition].valueString 1..1 MS
* extension[filterCondition].valueString ^label = "Series Filter Condition"

Extension:      IhrisVisualizationFilters
Id:             ihris-visualization-filters
Title:          "iHRIS Visualization Filters"
Description:    "iHRIS visualization filters"
* ^context[0].type = #element
* ^context[0].expression = "IhrisDataVisualization"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Filters"

Extension:      IhrisVisualizationSettings
Id:             ihris-visualization-settings
Title:          "iHRIS Visualization Settings"
Description:    "iHRIS visualization settings for the data visualizer"
* ^context[0].type = #element
* ^context[0].expression = "IhrisDataVisualization"
* value[x] only base64Binary
* valueBase64Binary 1..1 MS
* valueBase64Binary ^label = "Settings"

Extension:      IhrisVisualizationPermissions
Id:             ihris-visualization-permissions
Title:          "iHRIS Visualization Permissions"
Description:    "iHRIS Visualization Permissions"
* ^context.type = #element
* ^context.expression = "IhrisDataVisualization"
* extension contains
      shared 1..1 MS

* extension[shared].value[x] only boolean
* extension[shared].valueBoolean 1..1 MS
* extension[shared].valueBoolean ^label = "Visualization Sharing"