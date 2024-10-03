CodeSystem:     IhrisResourceCodeSystem
Id:             ihris-resource-codesystem
Title:          "Code System for iHRIS Basic Resources."
* #role         "iHRIS Role"        "User roles that are available to be assigned to users."
* #task         "iHRIS Task"        "Role tasks that are available to be assigned to roles"
* #page         "iHRIS Page"        "Page definitions for viewing and editing resources."
* #practitioner-link         "iHRIS Practitioner Link"        "Basic resource for customization that links to a Practitioner."
* #training-link "iHRIS Training Link"        "Basic resource for customization that links to a Qualify training."
* #visualization "iHRIS Data Visualization" "iHRIS Data Visualization"
* #dashboard "iHRIS Dashboard" "iHRIS Dashboard"
* #resourcedata "Resource Data" "Resource Data"
* #standard-list "Standard List" "Standard List"

ValueSet:       IhrisResourceValueSet
Id:             ihris-resource-valueset
Title:          "Value Set for iHRIS Basic Resources."
* codes from system IhrisResourceCodeSystem
